'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Home, Copy, Check } from 'lucide-react'

export function ARVCheatSheet() {
  const [arv, setArv] = useState<string>('')
  const [repairCosts, setRepairCosts] = useState<string>('')
  const [closingCosts, setClosingCosts] = useState<string>('')
  const [holdingCosts, setHoldingCosts] = useState<string>('')
  const [desiredProfit, setDesiredProfit] = useState<string>('')
  const [copied, setCopied] = useState<string>('')

  const arvNum = parseFloat(arv) || 0
  const repairNum = parseFloat(repairCosts) || 0
  const closingNum = parseFloat(closingCosts) || 0
  const holdingNum = parseFloat(holdingCosts) || 0
  const profitNum = parseFloat(desiredProfit) || 0

  // ARV Formulas
  const maxOffer70 = arvNum * 0.7
  const maxOfferDetailed = arvNum - repairNum - closingNum - holdingNum - profitNum
  const maxOfferPercentage = arvNum > 0 ? ((maxOfferDetailed / arvNum) * 100) : 0
  const totalCosts = repairNum + closingNum + holdingNum + profitNum
  const potentialProfit = arvNum - maxOffer70 - totalCosts

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const formulas = [
    {
      name: '70% Rule (Quick)',
      formula: 'ARV × 0.70 = Max Offer',
      calculation: `${formatCurrency(arvNum)} × 0.70 = ${formatCurrency(maxOffer70)}`,
      result: maxOffer70
    },
    {
      name: 'Detailed Max Offer',
      formula: 'ARV - Repairs - Closing - Holding - Profit = Max Offer',
      calculation: `${formatCurrency(arvNum)} - ${formatCurrency(repairNum)} - ${formatCurrency(closingNum)} - ${formatCurrency(holdingNum)} - ${formatCurrency(profitNum)} = ${formatCurrency(maxOfferDetailed)}`,
      result: maxOfferDetailed
    },
    {
      name: 'Maximum Repair Costs',
      formula: '(ARV × 0.70) - Purchase Price = Max Repairs',
      calculation: `${formatCurrency(maxOffer70)} - Purchase Price = Max Repairs`
    },
    {
      name: 'Minimum ARV Required',
      formula: '(Purchase + Repairs + Costs + Profit) ÷ 0.70 = Required ARV',
      calculation: `(Purchase + ${formatCurrency(totalCosts)}) ÷ 0.70 = Required ARV`
    }
  ]

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-500" />
          ARV Calculator Inputs
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">After Repair Value (ARV)</label>
            <input
              type="number"
              value={arv}
              onChange={(e) => setArv(e.target.value)}
              placeholder="300000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Repair Costs</label>
            <input
              type="number"
              value={repairCosts}
              onChange={(e) => setRepairCosts(e.target.value)}
              placeholder="50000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Costs (3-5%)</label>
            <input
              type="number"
              value={closingCosts}
              onChange={(e) => setClosingCosts(e.target.value)}
              placeholder="9000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Holding Costs</label>
            <input
              type="number"
              value={holdingCosts}
              onChange={(e) => setHoldingCosts(e.target.value)}
              placeholder="5000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Desired Profit</label>
            <input
              type="number"
              value={desiredProfit}
              onChange={(e) => setDesiredProfit(e.target.value)}
              placeholder="30000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      {arvNum > 0 && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Calculation Results
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">70% Rule Max Offer</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(maxOffer70)}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Detailed Max Offer</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(maxOfferDetailed)}</p>
              <p className="text-sm text-gray-500 mt-1">{maxOfferPercentage.toFixed(1)}% of ARV</p>
            </div>
          </div>

          <div className="space-y-4">
            {formulas.map((formula, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{formula.name}</h4>
                  <button
                    onClick={() => copyToClipboard(formula.calculation, formula.name)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {copied === formula.name ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded p-3 font-mono text-sm text-gray-700 mb-2">
                  {formula.formula}
                </div>
                
                <div className="text-sm text-gray-600">
                  {formula.calculation}
                </div>
                
                {formula.result !== undefined && (
                  <div className="mt-2 text-lg font-semibold text-gray-900">
                    Result: {formatCurrency(formula.result)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-purple-500" />
          Quick Reference Rules
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">The 70% Rule</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• ARV × 70% = Maximum Offer</li>
              <li>• Accounts for repairs, closing, holding, profit</li>
              <li>• Conservative approach for beginners</li>
              <li>• Works best for fix and flips</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Typical Costs</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Closing Costs: 3-5% of purchase price</li>
              <li>• Holding Costs: $1,000-3,000/month</li>
              <li>• Desired Profit: 15-20% of ARV</li>
              <li>• Repairs: $25-75 per sq ft</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
