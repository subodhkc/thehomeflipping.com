import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendProductDeliveryEmail } from '@/lib/email'
import { generateDashboardToken, createDashboardUrl } from '@/lib/token'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  // Handle test signatures for local development
  const isTestSignature = sig === 'test-signature'
  const isLocalDevelopment = process.env.NEXT_PUBLIC_BASE_URL?.includes('localhost')

  let event: Stripe.Event

  if (isTestSignature && isLocalDevelopment) {
    // Parse the mock event directly for testing
    event = JSON.parse(body)
    console.log('Using test webhook event for local development')
  } else {
    // Real Stripe webhook verification
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      console.log('Checkout session completed:', session.id)
      
      // Send delivery email
      if (session.customer_email) {
        // Generate dashboard token
        const dashboardToken = generateDashboardToken(
          session.customer_email,
          session.id
        )
        const dashboardUrl = createDashboardUrl(dashboardToken)
        
        const emailResult = await sendProductDeliveryEmail({
          to: session.customer_email,
          customerName: session.customer_details?.name || undefined,
          dashboardUrl: dashboardUrl
        })
        
        if (emailResult.success) {
          console.log('Product delivery email sent to:', session.customer_email)
          console.log('Dashboard URL:', dashboardUrl)
        } else {
          console.error('Failed to send delivery email:', emailResult.error)
        }
      }
      
      // TODO: Store purchase in database
      // TODO: Grant user access to dashboard
      
      break
      
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment succeeded:', paymentIntent.id)
      break
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log('Payment failed:', failedPayment.id)
      break
      
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
