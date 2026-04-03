import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification, sendContactConfirmation } from '@/lib/contact-email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, propertyType, address, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    console.log('Contact form submission:', { name, email, phone, propertyType, address })

    // Send notification email to admin
    const adminResult = await sendContactNotification({
      to: process.env.FROM_EMAIL!,
      name,
      email,
      phone,
      message,
      propertyType,
      address
    })

    if (!adminResult.success) {
      console.error('Failed to send admin notification:', adminResult.error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const userResult = await sendContactConfirmation({ to: email, name })
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
