'use client'

import { useState } from 'react'
import { TrendingUp, DollarSign, Calculator, FileText, AlertTriangle, CheckCircle } from 'lucide-react'

export function DealAnalyzer() {
  const [deal, setDeal] = useState({
    // Property Info
    address: '',
    arv: '',
    purchasePrice: '',
    rehabCosts: '',
    
    // Financing
    downPaymentPercent: '20',
    interestRate: '8',
    loanTerm: '12', // months
    
    // Costs
    closingCostsPercent: '3',
    holdingCosts: '',
    sellingCostsPercent: '6',
    
    // Timeline
    rehabMonths: '3',
    daysToSell: '60'
  })

  const updateField = (field: string, value: string) => {
    setDeal(prev => ({ ...prev, [field]: value }))
  }

  // Calculations
  const arv = parseFloat(deal.arv) || 0
  const purchasePrice = parseFloat(deal.purchasePrice) || 0
  const rehabCosts = parseFloat(deal.rehabCosts) || 0
  const downPaymentPercent = parseFloat(deal.downPaymentPercent) || 20
  const closingCostsPercent = parseFloat(deal.closingCostsPercent) || 3
  const sellingCostsPercent = parseFloat(deal.sellingCostsPercent) || 6
  const holdingCosts = parseFloat(deal.holdingCosts) || 0
  const interestRate = parseFloat(deal.interestRate) || 8
  const loanTerm = parseFloat(deal.loanTerm) || 12

  const loanAmount = purchasePrice * (1 - downPaymentPercent / 100)
  const downPayment = purchasePrice * (downPaymentPercent / 100)
  const closingCosts = purchasePrice * (closingCostsPercent / 100)
  const sellingCosts = arv * (sellingCostsPercent / 100)
  
  // Interest calculation (simple interest for flip timeline)
  const interestCosts = loanAmount * (interestRate / 100) * (loanTerm / 12)
  
  const totalInvestment = downPayment + closingCosts + rehabCosts + holdingCosts + interestCosts
  const netProfit = arv - purchasePrice - rehabCosts - closingCosts - sellingCosts - holdingCosts - interestCosts
  const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0
  const cashOnCash = downPayment > 0 ? (netProfit / downPayment) * 100 : 0
  
  // 70% Rule calculation
  const maxOffer70 = arv * 0.7
  const isGoodDeal = maxOffer70 >= (purchasePrice + rehabCosts)
  
  // Score analysis
  const score = (() => {
    let s = 0
    if (roi > 20) s += 3
    else if (roi > 15) s += 2
    else if (roi > 10) s += 1
    
    if (netProfit > 30000) s += 3
    else if (netProfit > 20000) s += 2
    else if (netProfit > 10000) s += 1
    
    if (isGoodDeal) s += 2
    
    return s
  })()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Property Information */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          Property Information
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
            <input
              type="text"
              value={deal.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="123 Main St, City, State ZIP"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">After Repair Value (ARV)</label>
            <input
              type="number"
              value={deal.arv}
              onChange={(e) => updateField('arv', e.target.value)}
              placeholder="300000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
            <input
              type="number"
              value={deal.purchasePrice}
              onChange={(e) => updateField('purchasePrice', e.target.value)}
              placeholder="200000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rehab Costs</label>
            <input
              type="number"
              value={deal.rehabCosts}
              onChange={(e) => updateField('rehabCosts', e.target.value)}
              placeholder="50000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rehab Timeline (months)</label>
            <input
              type="number"
              value={deal.rehabMonths}
              onChange={(e) => updateField('rehabMonths', e.target.value)}
              placeholder="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Financing Details */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Financing Details
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
            <input
              type="number"
              value={deal.downPaymentPercent}
              onChange={(e) => updateField('downPaymentPercent', e.target.value)}
              placeholder="20"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={deal.interestRate}
              onChange={(e) => updateField('interestRate', e.target.value)}
              placeholder="8"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (months)</label>
            <input
              type="number"
              value={deal.loanTerm}
              onChange={(e) => updateField('loanTerm', e.target.value)}
              placeholder="12"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {loanAmount > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Loan Amount:</span>
                <span className="ml-2 font-semibold text-gray-900">{formatCurrency(loanAmount)}</span>
              </div>
              <div>
                <span className="text-gray-600">Down Payment:</span>
                <span className="ml-2 font-semibold text-gray-900">{formatCurrency(downPayment)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Costs */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-orange-500" />
          Additional Costs
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Costs (%)</label>
            <input
              type="number"
              value={deal.closingCostsPercent}
              onChange={(e) => updateField('closingCostsPercent', e.target.value)}
              placeholder="3"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Holding Costs</label>
            <input
              type="number"
              value={deal.holdingCosts}
              onChange={(e) => updateField('holdingCosts', e.target.value)}
              placeholder="5000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selling Costs (%)</label>
            <input
              type="number"
              value={deal.sellingCostsPercent}
              onChange={(e) => updateField('sellingCostsPercent', e.target.value)}
              placeholder="6"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {purchasePrice > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Closing Costs:</span>
                <span className="ml-2 font-semibold text-gray-900">{formatCurrency(closingCosts)}</span>
              </div>
              <div>
                <span className="text-gray-600">Interest Costs:</span>
                <span className="ml-2 font-semibold text-gray-900">{formatCurrency(interestCosts)}</span>
              </div>
              <div>
                <span className="text-gray-600">Selling Costs:</span>
                <span className="ml-2 font-semibold text-gray-900">{formatCurrency(sellingCosts)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {purchasePrice > 0 && arv > 0 && (
        <div className="bg-white rounded-lg border-2 border-green-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Deal Analysis Results
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Net Profit</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(netProfit)}
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">ROI</p>
              <p className="text-2xl font-bold text-blue-600">{roi.toFixed(1)}%</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Cash on Cash Return</p>
              <p className="text-2xl font-bold text-purple-600">{cashOnCash.toFixed(1)}%</p>
            </div>
          </div>
          
          <div className="border-t pt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">70% Rule Check</span>
              <span className={`font-semibold ${isGoodDeal ? 'text-green-600' : 'text-red-600'}`}>
                {isGoodDeal ? '✅ Good Deal' : '❌ Over 70%'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Max offer by 70% rule: {formatCurrency(maxOffer70)} | Your total: {formatCurrency(purchasePrice + rehabCosts)}
            </p>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-gray-900">Deal Score:</span>
              <div className="flex items-center gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full ${
                      i < score ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900">{score}/8</span>
            </div>
            <p className="text-sm text-gray-600">
              {score >= 6 ? '⭐ Excellent deal - Strong buy signal' : 
               score >= 4 ? '✅ Good deal - Consider purchasing' : 
               score >= 2 ? '⚠️ Fair deal - Proceed with caution' : 
               '❌ Poor deal - Recommend passing'}
            </p>
          </div>
          
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Cost Breakdown</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Purchase Price</span>
                <span className="font-medium">{formatCurrency(purchasePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rehab Costs</span>
                <span className="font-medium">{formatCurrency(rehabCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Closing Costs</span>
                <span className="font-medium">{formatCurrency(closingCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Holding Costs</span>
                <span className="font-medium">{formatCurrency(holdingCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Costs</span>
                <span className="font-medium">{formatCurrency(interestCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Selling Costs</span>
                <span className="font-medium">{formatCurrency(sellingCosts)}</span>
              </div>
              <div className="border-t pt-1 flex justify-between font-semibold">
                <span>Total Investment</span>
                <span>{formatCurrency(totalInvestment)}</span>
              </div>
              <div className="border-t pt-1 flex justify-between font-bold text-lg">
                <span>ARV</span>
                <span className="text-green-600">{formatCurrency(arv)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
