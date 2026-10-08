'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'

export default function MaxOfferCalculator() {
  const [arv, setArv] = useState<string>('')
  const [repairCosts, setRepairCosts] = useState<string>('')
  const [profitMargin, setProfitMargin] = useState<string>('30')
  const [wholesaleFee, setWholesaleFee] = useState<string>('0')

  const arvNum = parseFloat(arv) || 0
  const repairNum = parseFloat(repairCosts) || 0
  const marginNum = parseFloat(profitMargin) || 30
  const feeNum = parseFloat(wholesaleFee) || 0

  const maxOffer = (arvNum * (1 - marginNum / 100)) - repairNum - feeNum
  const potentialProfit = arvNum - maxOffer - repairNum - feeNum
  const roi = maxOffer > 0 ? ((potentialProfit / (maxOffer + repairNum)) * 100) : 0
  const dealQuality = maxOffer > 0 ? (roi >= 20 ? 'Excellent' : roi >= 15 ? 'Good' : roi >= 10 ? 'Fair' : 'Poor') : 'N/A'

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              Free Calculator
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Max Offer Calculator (70% Rule)
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate the maximum price you should pay for a flip property using the industry-standard 70% rule.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary-600" />
                Property Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    After Repair Value (ARV) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={arv}
                      onChange={(e) => setArv(e.target.value)}
                      placeholder="200,000"
                      className="input-field pl-8"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">What the property will be worth after repairs</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Repair Costs *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={repairCosts}
                      onChange={(e) => setRepairCosts(e.target.value)}
                      placeholder="30,000"
                      className="input-field pl-8"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Total renovation budget</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profit Margin: {profitMargin}%
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="40"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>20% (Aggressive)</span>
                    <span>30% (Standard)</span>
                    <span>40% (Conservative)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wholesale/Assignment Fee (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={wholesaleFee}
                      onChange={(e) => setWholesaleFee(e.target.value)}
                      placeholder="0"
                      className="input-field pl-8"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">If buying from a wholesaler</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="calculator-result">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Maximum Allowable Offer</h2>
                <div className="text-4xl font-bold text-primary-700">
                  {maxOffer > 0 ? formatCurrency(maxOffer) : '$0'}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  This is the highest price you should pay for this property
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary-600" />
                  Deal Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">After Repair Value</span>
                    <span className="font-semibold">{formatCurrency(arvNum)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Max Purchase Price</span>
                    <span className="font-semibold">{formatCurrency(Math.max(0, maxOffer))}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Repair Costs</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(repairNum)}</span>
                  </div>
                  {feeNum > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Wholesale Fee</span>
                      <span className="font-semibold text-red-600">-{formatCurrency(feeNum)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Potential Profit</span>
                    <span className="font-semibold text-secondary-600">{formatCurrency(Math.max(0, potentialProfit))}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">ROI</span>
                    <span className="font-semibold">{roi > 0 ? roi.toFixed(1) : 0}%</span>
                  </div>
                </div>
              </div>

              <div className={`card ${dealQuality === 'Excellent' ? 'bg-green-50 border-green-200' : dealQuality === 'Good' ? 'bg-blue-50 border-blue-200' : dealQuality === 'Fair' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  {dealQuality === 'Excellent' || dealQuality === 'Good' ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">Deal Quality: {dealQuality}</div>
                    <div className="text-sm text-gray-600">
                      {dealQuality === 'Excellent' && 'This deal has strong profit potential'}
                      {dealQuality === 'Good' && 'This deal meets standard investment criteria'}
                      {dealQuality === 'Fair' && 'Margins are tight - proceed with caution'}
                      {dealQuality === 'Poor' && 'This deal may not be profitable'}
                      {dealQuality === 'N/A' && 'Enter property details to analyze'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formula Explanation */}
          <div className="card mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How the 70% Rule Works</h2>
            <div className="bg-gray-50 rounded-lg p-6 font-mono text-center text-lg mb-6">
              MAO = (ARV × 70%) - Repair Costs - Fees
            </div>
            <div className="prose prose-gray max-w-none">
              <p>
                The 70% rule is a quick way to determine the maximum price you should pay for a flip property. 
                It ensures you leave enough room for profit after accounting for repairs, holding costs, and selling costs.
              </p>
              <h3>Why 70%?</h3>
              <ul>
                <li><strong>~10%</strong> for buying costs (closing costs, inspections)</li>
                <li><strong>~10%</strong> for selling costs (agent commissions, closing costs)</li>
                <li><strong>~10%</strong> for profit margin</li>
              </ul>
              <p>
                More conservative investors use 65% or even 60% to account for unexpected costs and market fluctuations.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
              <h3 className="text-2xl font-bold mb-3">Want More Advanced Analysis?</h3>
              <p className="text-primary-100 mb-6">
                Get our complete Deal Analyzer Spreadsheet with cash flow projections, holding costs, and multiple exit strategies.
              </p>
              <Link href="/starter-kit" className="btn-secondary inline-flex items-center gap-2">
                Get the Starter Kit <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
