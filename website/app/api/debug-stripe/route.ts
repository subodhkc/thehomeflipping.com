import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Environment check:')
    console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY)
    console.log('STRIPE_SECRET_KEY length:', process.env.STRIPE_SECRET_KEY?.length)
    console.log('NEXT_PUBLIC_STRIPE_PRICE_ID:', process.env.NEXT_PUBLIC_STRIPE_PRICE_ID)
    console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL)
    
    return NextResponse.json({
      success: true,
      env: {
        stripeKeyExists: !!process.env.STRIPE_SECRET_KEY,
        stripeKeyLength: process.env.STRIPE_SECRET_KEY?.length,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL
      },
      receivedBody: body
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
