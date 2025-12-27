'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, FileText, Mail, ArrowRight, Star } from 'lucide-react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      fetch(`/api/get-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.email) {
            setEmail(data.email)
          }
        })
        .catch(err => console.error('Error fetching session:', err))
    }
  }, [searchParams])

  return (
    <div className="bg-gradient-to-br from-green-50 to-primary-50 min-h-screen py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Your Flipping Journey! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Your payment was successful. Check your email for instant access.
            </p>
          </div>

          {/* Email Confirmation */}
          <div className="card bg-white mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-4">
                  We've sent your download link to{' '}
                  <strong className="text-gray-900">{email || 'your email address'}</strong>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">Don't see it?</strong> Check your spam folder. 
                    Add <strong>support@thehomeflipping.com</strong> to your contacts to ensure delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What You Got */}
          <div className="card bg-white mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included in Your Kit</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Deal Analyzer Spreadsheet</p>
                  <p className="text-sm text-gray-600">Calculate ARV, MAO, ROI instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Rehab Cost Estimator</p>
                  <p className="text-sm text-gray-600">260+ line items by room</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Pre-Flip Checklist</p>
                  <p className="text-sm text-gray-600">Week-by-week action plan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Contractor Toolkit</p>
                  <p className="text-sm text-gray-600">Interview & agreement templates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Getting Started Guide</p>
                  <p className="text-sm text-gray-600">Find deals & auctions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Funding Guide</p>
                  <p className="text-sm text-gray-600">Hard money & creative financing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Wholesaling Guide</p>
                  <p className="text-sm text-gray-600">$5K-$50K with no money down</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Buyer List Template</p>
                  <p className="text-sm text-gray-600">Track your cash buyers</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="font-semibold text-gray-900 mb-2">Plus 3 Exclusive Bonuses:</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent-400 fill-accent-400" />
                  <span>ARV Calculator Cheat Sheet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent-400 fill-accent-400" />
                  <span>Comp Analysis Template</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent-400 fill-accent-400" />
                  <span>Due Diligence Checklist</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card bg-gradient-to-br from-primary-900 to-primary-800 text-white mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Next Steps</h2>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white text-primary-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold mb-1">Download Your Files</p>
                  <p className="text-primary-100">Click the download link in your email to get all files</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white text-primary-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold mb-1">Start with the Getting Started Guide</p>
                  <p className="text-primary-100">Read this first to understand the flipping process</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white text-primary-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold mb-1">Use the Deal Analyzer</p>
                  <p className="text-primary-100">Find a property and run the numbers using the spreadsheet</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white text-primary-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold mb-1">Follow the Pre-Flip Checklist</p>
                  <p className="text-primary-100">Stay on track with the week-by-week action plan</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Continue Exploring */}
          <div className="card bg-white text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Exploring</h2>
            <p className="text-gray-600 mb-6">
              Use our free calculators to practice analyzing deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools" className="btn-primary">
                Free Calculators <ArrowRight className="inline ml-2 h-4 w-4" />
              </Link>
              <Link href="/" className="btn-outline">
                Back to Home
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Need help? Email us at{' '}
              <a href="mailto:support@thehomeflipping.com" className="text-primary-600 hover:underline font-semibold">
                support@thehomeflipping.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
