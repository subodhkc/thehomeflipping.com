import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Simulate a Stripe checkout.session.completed event
    const mockEvent = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_' + Date.now(),
          customer_email: 'test@example.com',
          customer_details: {
            name: 'Test User',
            email: 'test@example.com'
          },
          amount_total: 6700,
          currency: 'usd',
          payment_status: 'paid',
          metadata: {
            product: 'First Flip Starter Kit'
          }
        }
      }
    }

    // Forward this to the actual webhook
    const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'mock-signature-for-testing'
      },
      body: JSON.stringify(mockEvent)
    })

    const result = await response.json()
    
    return NextResponse.json({
      success: true,
      message: 'Mock webhook event sent',
      result: result
    })
  } catch (error) {
    console.error('Test webhook error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
