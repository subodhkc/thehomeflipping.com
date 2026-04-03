import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== Simple Stripe Key Test ===')
    
    const stripeKey = process.env.STRIPE_SECRET_KEY
    console.log('Key exists:', !!stripeKey)
    console.log('Key length:', stripeKey?.length)
    console.log('Key starts with sk_live:', stripeKey?.startsWith('sk_live_'))
    console.log('Key starts with sk_test:', stripeKey?.startsWith('sk_test_'))
    
    // Test if it's a live key being used locally
    if (stripeKey?.startsWith('sk_live_')) {
      console.log('WARNING: Using live key in local environment')
      
      // Try to use test key instead for local testing
      const testKey = 'sk_test_51234567890abcdef' // Dummy test key
      
      return NextResponse.json({
        error: 'Live key detected in local environment',
        suggestion: 'Use sk_test_ key for local development',
        currentKeyType: 'live',
        recommendedAction: 'Switch to test key or deploy to production'
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: true,
      keyType: stripeKey?.startsWith('sk_test_') ? 'test' : 'unknown',
      keyLength: stripeKey?.length,
      environment: 'local'
    })
    
  } catch (error: any) {
    console.error('Simple test error:', error)
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 })
  }
}
