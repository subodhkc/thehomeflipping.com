'use client'

import { useState } from 'react'
import { Home, Clock, DollarSign, CheckCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function SellFastPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    propertyType: 'single-family',
    condition: 'needs-work',
    timeline: 'asap',
    askingPrice: '',
    additionalInfo: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In production, this would send to your backend/CRM
    console.log('Form submitted:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You! We'll Contact You Soon
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A cash buyer from our network will reach out within 24 hours to discuss your property and provide a no-obligation offer.
            </p>
            <div className="card bg-white">
              <h3 className="font-semibold text-gray-900 mb-4">What Happens Next?</h3>
              <ol className="space-y-3 text-left text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary-600">1.</span>
                  <span>We'll review your property details</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary-600">2.</span>
                  <span>A qualified cash buyer will contact you within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary-600">3.</span>
                  <span>Schedule a quick property walkthrough (if needed)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary-600">4.</span>
                  <span>Receive a cash offer within 48 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-primary-600">5.</span>
                  <span>Close in as little as 7 days</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-500 text-white rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <Clock className="h-4 w-4" />
              Fast Cash Offers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sell Your Home for Cash in 7 Days
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              No repairs. No showings. No agent fees. Get a fair cash offer from our network of verified buyers.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Close Fast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Why Sell to a Cash Buyer?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card bg-white text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Close in 7 Days</h3>
                <p className="text-gray-600">
                  Need to sell fast? Cash buyers can close in as little as one week. No waiting for bank approvals.
                </p>
              </div>
              <div className="card bg-white text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sell As-Is</h3>
                <p className="text-gray-600">
                  No need to fix anything. Cash buyers purchase properties in any condition, saving you time and money.
                </p>
              </div>
              <div className="card bg-white text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Fees or Commissions</h3>
                <p className="text-gray-600">
                  Skip the 6% agent commission. No closing costs. No hidden fees. Keep more money in your pocket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Your Cash Offer Today
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and a cash buyer will contact you within 24 hours
              </p>
            </div>

            <div className="card bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Property Information */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="123 Main Street"
                      className="input-field"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Type *
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        required
                        className="input-field"
                      >
                        <option value="single-family">Single Family Home</option>
                        <option value="multi-family">Multi-Family</option>
                        <option value="condo">Condo/Townhouse</option>
                        <option value="land">Land</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Condition *
                      </label>
                      <select
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                        className="input-field"
                      >
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="needs-work">Needs Work</option>
                        <option value="major-repairs">Major Repairs Needed</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                        When do you need to sell? *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="input-field"
                      >
                        <option value="asap">ASAP (Within 2 weeks)</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="1-3-months">1-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="askingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Asking Price (Optional)
                      </label>
                      <input
                        type="text"
                        id="askingPrice"
                        name="askingPrice"
                        value={formData.askingPrice}
                        onChange={handleChange}
                        placeholder="$150,000"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us more about your property or situation..."
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <button type="submit" className="btn-primary w-full py-4 text-lg">
                    Get My Cash Offer <ArrowRight className="inline ml-2 h-5 w-5" />
                  </button>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    By submitting this form, you agree to be contacted by cash buyers in our network. 
                    No spam, no obligation.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Your Property</h3>
                  <p className="text-gray-600">
                    Fill out the simple form above with your property details. It takes less than 2 minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Contacted</h3>
                  <p className="text-gray-600">
                    A qualified cash buyer from our network will reach out within 24 hours to discuss your property.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Your Offer</h3>
                  <p className="text-gray-600">
                    After a quick evaluation (and optional walkthrough), you'll receive a fair, no-obligation cash offer within 48 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Close Fast</h3>
                  <p className="text-gray-600">
                    Accept the offer and close in as little as 7 days. Get your cash and move on with your life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
