import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    console.log('=== Stripe Debug Test ===')
    
    // Test 1: Basic Stripe connectivity
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'No Stripe key' }, { status: 500 })
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    console.log('Stripe client created')
    
    // Test 2: Basic API call - get account info
    try {
      const account = await stripe.accounts.retrieve()
      console.log('Stripe account ID:', account.id)
      console.log('Stripe account country:', account.country)
    } catch (accountError: any) {
      console.error('Account retrieval failed:', accountError.message)
      return NextResponse.json({ 
        error: 'Stripe API connection failed', 
        details: accountError.message 
      }, { status: 500 })
    }
    
    // Test 3: Check if price ID exists
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID
    console.log('Testing price ID:', priceId)
    
    if (!priceId) {
      return NextResponse.json({ error: 'No price ID configured' }, { status: 500 })
    }
    
    try {
      const price = await stripe.prices.retrieve(priceId)
      console.log('Price found:', {
        id: price.id,
        amount: price.amount,
        currency: price.currency,
        active: price.active,
        product: price.product
      })
      
      // Test 4: Try to create a minimal checkout session
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price: priceId,
            quantity: 1,
          }],
          mode: 'payment',
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/checkout',
        })
        
        console.log('Checkout session created:', session.id)
        
        return NextResponse.json({
          success: true,
          account: { id: account.id, country: account.country },
          price: {
            id: price.id,
            amount: price.amount,
            currency: price.currency,
            active: price.active
          },
          session: {
            id: session.id,
            url: session.url
          }
        })
        
      } catch (sessionError: any) {
        console.error('Session creation failed:', sessionError.message)
        return NextResponse.json({ 
          error: 'Checkout session creation failed', 
          details: sessionError.message,
          type: sessionError.type,
          code: sessionError.code
        }, { status: 500 })
      }
      
    } catch (priceError: any) {
      console.error('Price retrieval failed:', priceError.message)
      return NextResponse.json({ 
        error: 'Price ID not found', 
        details: priceError.message,
        priceId: priceId
      }, { status: 500 })
    }
    
  } catch (error: any) {
    console.error('General error:', error)
    return NextResponse.json({ 
      error: 'Debug test failed', 
      details: error.message 
    }, { status: 500 })
  }
}
