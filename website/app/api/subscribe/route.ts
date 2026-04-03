import { NextRequest, NextResponse } from 'next/server'
import { sendFreeChecklistEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    console.log('New checklist subscriber:', email)

    const emailResult = await sendFreeChecklistEmail({ to: email })
    if (!emailResult.success) {
      console.error('Free checklist email failed:', emailResult.error)
      return NextResponse.json({ error: 'Failed to send checklist. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Checklist sent! Check your inbox.', success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
