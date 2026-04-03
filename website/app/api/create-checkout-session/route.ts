import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // For local development, create a mock checkout session
    // In production, this would use real Stripe
    const isLocalDevelopment = process.env.NEXT_PUBLIC_BASE_URL?.includes('localhost')
    
    if (isLocalDevelopment) {
      console.log('Local development detected - creating mock checkout session')
      
      const mockSessionId = 'cs_test_' + Date.now()
      const mockCheckoutUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id=${mockSessionId}`
      
      // Simulate webhook call for testing
      setTimeout(async () => {
        try {
          const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`
          await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'stripe-signature': 'test-signature'
            },
            body: JSON.stringify({
              type: 'checkout.session.completed',
              data: {
                object: {
                  id: mockSessionId,
                  customer_email: email,
                  customer_details: { name: 'Test User', email },
                  amount_total: 6700,
                  currency: 'usd',
                  payment_status: 'paid',
                  metadata: { product: 'First Flip Starter Kit' }
                }
              }
            })
          })
          console.log('Mock webhook sent for:', email)
        } catch (error) {
          console.error('Failed to send mock webhook:', error)
        }
      }, 2000) // Send webhook after 2 seconds
      
      return NextResponse.json({ 
        url: mockCheckoutUrl,
        mock: true,
        message: 'Local development - mock checkout session created'
      })
    }

    // Production code with real Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not configured')
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      metadata: {
        product: 'First Flip Starter Kit',
      },
    })

    return NextResponse.json({ url: session.url })
    
  } catch (error: any) {
    console.error('Checkout session error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
