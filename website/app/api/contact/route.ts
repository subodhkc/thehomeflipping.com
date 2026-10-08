import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification, sendContactConfirmation } from '@/lib/contact-email'
import { getClientIp, isAllowedCountry, isRateLimited, isSuspiciousTiming, countUrls } from '@/lib/spam-protection'

// Return a fake success so bots can't tell they were filtered and don't adapt/retry.
function fakeSuccess() {
  return NextResponse.json({
    message: 'Message sent successfully! We\'ll respond within 24 hours.',
    success: true
  })
}

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  email: 254,
  phone: 40,
  propertyType: 60,
  address: 300,
  subject: 120,
  message: 5000,
}

export async function POST(request: NextRequest) {
  try {
    // US-only: business serves US customers exclusively.
    if (!isAllowedCountry(request)) {
      return NextResponse.json(
        { error: 'Submissions are only accepted from the United States.' },
        { status: 403 }
      )
    }

    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { name, email, phone, propertyType, address, subject, message, website, formStartedAt } = body ?? {}

    // Honeypot: this field is hidden from humans; bots fill it in.
    if (typeof website === 'string' && website.trim().length > 0) {
      return fakeSuccess()
    }

    // Timing trap: legitimate submissions come from our forms with a render
    // timestamp. Missing, forged, or impossibly-fast timestamps are bots.
    if (isSuspiciousTiming(formStartedAt)) {
      return fakeSuccess()
    }

    // Type and presence validation
    if (
      typeof name !== 'string' || !name.trim() ||
      typeof email !== 'string' || !email.trim() ||
      typeof message !== 'string' || !message.trim()
    ) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const fields: Record<string, unknown> = { name, email, phone, propertyType, address, subject, message }
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined && value !== null && typeof value !== 'string') {
        return NextResponse.json({ error: `Invalid ${key}` }, { status: 400 })
      }
      if (typeof value === 'string' && value.length > MAX_LENGTHS[key]) {
        return NextResponse.json({ error: `${key} is too long` }, { status: 400 })
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Spam heuristic: names never contain links, and real messages rarely
    // contain more than a couple.
    if (countUrls(name) > 0 || countUrls(message) > 2) {
      return NextResponse.json(
        { error: 'Your message was flagged as spam. Please remove any links and try again.' },
        { status: 400 }
      )
    }

    console.log('Contact form submission:', { name, email, phone, propertyType, address })

    const clean = (value: unknown): string | undefined =>
      typeof value === 'string' && value.trim() ? value.trim() : undefined

    // Send notification email to admin
    const adminResult = await sendContactNotification({
      to: process.env.FROM_EMAIL!,
      name: name.trim(),
      email: email.trim(),
      phone: clean(phone),
      message: message.trim(),
      subject: clean(subject),
      propertyType: clean(propertyType),
      address: clean(address)
    })

    if (!adminResult.success) {
      console.error('Failed to send admin notification:', adminResult.error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const userResult = await sendContactConfirmation({ to: email.trim(), name: name.trim() })
    if (!userResult.success) {
      console.error('Failed to send user confirmation:', userResult.error)
      // Don't fail the whole request if confirmation fails
    }

    return NextResponse.json({
      message: 'Message sent successfully! We\'ll respond within 24 hours.',
      success: true
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
