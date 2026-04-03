import { NextRequest, NextResponse } from 'next/server'
import { sendProductDeliveryEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const result = await sendProductDeliveryEmail({
      to: 'suvodkc@gmail.com',
      customerName: 'Test User'
    })

    return NextResponse.json({
      success: result.success,
      data: result.data,
      error: result.error
    })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
