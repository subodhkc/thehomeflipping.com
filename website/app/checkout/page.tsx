'use client'

import { useState } from 'react'
import { Shield, Lock, CheckCircle, CreditCard, ArrowRight } from 'lucide-react'

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Complete Your Order
            </h1>
            <p className="text-gray-600">You're one step away from your flipping toolkit</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="order-2 lg:order-1">
              <div className="card bg-white sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-start pb-4 border-b">
                    <div>
                      <h3 className="font-semibold text-gray-900">First Flip Starter Kit</h3>
                      <p className="text-sm text-gray-600 mt-1">Complete digital toolkit</p>
                      <div className="inline-block bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded mt-2">
                        87% OFF - SAVE $430
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 line-through">$497</div>
                      <div className="font-bold text-primary-600 text-2xl">$67</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>8 Essential Tools & Guides</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>3 Exclusive Bonuses</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Instant Download</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Lifetime Access</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>30-Day Money-Back Guarantee</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Regular Price:</span>
                    <span className="text-gray-500 line-through">$497</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600 font-semibold">You Save:</span>
                    <span className="text-green-600 font-semibold">$430 (87%)</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold border-t pt-3">
                    <span>Total Today</span>
                    <span className="text-primary-600">$67</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">One-time payment. No subscriptions. Lifetime access.</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-gray-900 mb-1">100% Secure Checkout</p>
                      <p>Your payment information is encrypted and secure. We never store your card details.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="order-1 lg:order-2">
              <div className="card bg-white">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="h-5 w-5 text-gray-600" />
                  <h2 className="text-xl font-bold text-gray-900">Secure Payment</h2>
                </div>

                <form onSubmit={handleCheckout} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="input-field"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      We'll send your download link to this email
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold text-gray-900 mb-1">Powered by Stripe</p>
                        <p>You'll be redirected to Stripe's secure checkout to complete your payment.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      'Processing...'
                    ) : (
                      <>
                        Proceed to Payment <ArrowRight className="inline ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Lock className="h-4 w-4" />
                        <span>SSL Encrypted</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        <span>PCI Compliant</span>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-primary-600">1.</span>
                      <span>Complete payment securely through Stripe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-primary-600">2.</span>
                      <span>Receive instant download link via email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-primary-600">3.</span>
                      <span>Access all 8 tools and 3 bonuses immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-primary-600">4.</span>
                      <span>Start analyzing your first deal today</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Questions? Email us at{' '}
                  <a href="mailto:support@thehomeflipping.com" className="text-primary-600 hover:underline">
                    support@thehomeflipping.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
