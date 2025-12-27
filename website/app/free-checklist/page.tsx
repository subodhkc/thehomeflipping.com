'use client'

import { useState } from 'react'
import { CheckCircle, Download, FileText, ArrowRight, Shield } from 'lucide-react'

export default function FreeChecklistPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  const checklistItems = [
    'Week 1-2: Market research and education',
    'Week 3-4: Build your team (agent, lender, contractors)',
    'Week 5-6: Property search and deal analysis',
    'Week 7-8: Make offers and negotiate',
    'Week 9-10: Due diligence and closing',
    'Week 11-16: Renovation management',
    'Week 17-20: Listing and selling',
  ]

  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Check Your Email!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your Pre-Flip Checklist is on its way to <strong>{email}</strong>. 
              Check your inbox (and spam folder) in the next few minutes.
            </p>
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-2">Want the Complete Toolkit?</h3>
              <p className="text-gray-600 mb-4">
                Get all 8 tools including the Deal Analyzer, Rehab Estimator, and 3 comprehensive guides.
              </p>
              <a href="/starter-kit" className="btn-primary inline-flex items-center gap-2">
                Get the Starter Kit - $67 <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent-500 text-white rounded-full px-4 py-2 text-sm font-semibold mb-6">
                  <Download className="h-4 w-4" />
                  Free Download
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  The Pre-Flip Checklist
                </h1>
                <p className="text-xl text-primary-100 mb-6">
                  A week-by-week action plan that takes you from &quot;thinking about flipping&quot; to &quot;sold sign in the yard.&quot;
                </p>
                <ul className="space-y-3 mb-8">
                  {checklistItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-primary-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="card bg-white text-gray-900">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Pre-Flip Checklist</h2>
                    <p className="text-sm text-gray-500">PDF Download</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                  </div>
                  <button type="submit" className="btn-primary w-full py-4 text-lg">
                    Download Free Checklist <Download className="inline ml-2 h-5 w-5" />
                  </button>
                </form>
                
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>No spam. Unsubscribe anytime.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why You Need This Checklist
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Stay Focused</h3>
                <p className="text-gray-600 text-sm">Know exactly what to do each week instead of getting overwhelmed.</p>
              </div>
              <div className="card">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold mb-2">Move Faster</h3>
                <p className="text-gray-600 text-sm">Skip the research paralysis and start taking action immediately.</p>
              </div>
              <div className="card">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-semibold mb-2">Miss Nothing</h3>
                <p className="text-gray-600 text-sm">Every critical step is included so you don&apos;t forget anything important.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
