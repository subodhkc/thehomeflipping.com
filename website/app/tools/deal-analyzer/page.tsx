'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckSquare, ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface DealMetrics {
  arv: string
  purchasePrice: string
  repairCosts: string
  holdingMonths: string
  monthlyHoldingCost: string
  closingCostsBuy: string
  closingCostsSell: string
  agentCommission: string
}

export default function DealAnalyzer() {
  const [metrics, setMetrics] = useState<DealMetrics>({
    arv: '',
    purchasePrice: '',
    repairCosts: '',
    holdingMonths: '4',
    monthlyHoldingCost: '1500',
    closingCostsBuy: '3',
    closingCostsSell: '2',
    agentCommission: '6',
  })

  const updateMetric = (key: keyof DealMetrics, value: string) => {
    setMetrics((prev) => ({ ...prev, [key]: value }))
  }

  const arv = parseFloat(metrics.arv) || 0
  const purchase = parseFloat(metrics.purchasePrice) || 0
  const repairs = parseFloat(metrics.repairCosts) || 0
  const holdMonths = parseFloat(metrics.holdingMonths) || 4
  const monthlyHold = parseFloat(metrics.monthlyHoldingCost) || 0
  const closingBuy = (parseFloat(metrics.closingCostsBuy) || 0) / 100
  const closingSell = (parseFloat(metrics.closingCostsSell) || 0) / 100
  const commission = (parseFloat(metrics.agentCommission) || 0) / 100

  const totalHoldingCosts = monthlyHold * holdMonths
  const buyClosing = purchase * closingBuy
  const sellClosing = arv * closingSell
  const agentFees = arv * commission
  const totalInvestment = purchase + repairs + totalHoldingCosts + buyClosing
  const totalCosts = totalInvestment + sellClosing + agentFees
  const profit = arv - totalCosts
  const roi = totalInvestment > 0 ? (profit / totalInvestment) * 100 : 0
  const profitMargin = arv > 0 ? (profit / arv) * 100 : 0

  const mao70 = arv * 0.7 - repairs
  const mao75 = arv * 0.75 - repairs
  const purchaseVsMao = mao70 > 0 ? ((mao70 - purchase) / mao70) * 100 : 0

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getDealScore = () => {
    let score = 0
    if (roi >= 25) score += 30
    else if (roi >= 15) score += 20
    else if (roi >= 10) score += 10
    if (profitMargin >= 15) score += 20
    else if (profitMargin >= 10) score += 10
    if (purchase <= mao70) score += 30
    else if (purchase <= mao75) score += 15
    if (profit >= 30000) score += 20
    else if (profit >= 20000) score += 15
    else if (profit >= 10000) score += 10
    return Math.min(100, score)
  }

  const dealScore = getDealScore()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const criteria = [
    { name: 'ROI > 20%', met: roi >= 20, value: `${roi.toFixed(1)}%` },
    { name: 'Profit > $20,000', met: profit >= 20000, value: formatCurrency(profit) },
    { name: 'Below 70% MAO', met: purchase <= mao70, value: formatCurrency(purchase) },
    { name: 'Profit Margin > 10%', met: profitMargin >= 10, value: `${profitMargin.toFixed(1)}%` },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <CheckSquare className="h-4 w-4" />
              Free Tool
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Deal Quality Analyzer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Score your potential deals and identify if they meet investment criteria.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Deal Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ARV ($)</label>
                    <input
                      type="number"
                      value={metrics.arv}
                      onChange={(e) => updateMetric('arv', e.target.value)}
                      placeholder="200000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($)</label>
                    <input
                      type="number"
                      value={metrics.purchasePrice}
                      onChange={(e) => updateMetric('purchasePrice', e.target.value)}
                      placeholder="120000"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repair Costs ($)</label>
                    <input
                      type="number"
                      value={metrics.repairCosts}
                      onChange={(e) => updateMetric('repairCosts', e.target.value)}
                      placeholder="30000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hold Time (months)</label>
                    <input
                      type="number"
                      value={metrics.holdingMonths}
                      onChange={(e) => updateMetric('holdingMonths', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Holding Cost ($)</label>
                    <input
                      type="number"
                      value={metrics.monthlyHoldingCost}
                      onChange={(e) => updateMetric('monthlyHoldingCost', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Commission (%)</label>
                    <input
                      type="number"
                      value={metrics.agentCommission}
                      onChange={(e) => updateMetric('agentCommission', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`calculator-result ${dealScore >= 70 ? 'border-green-300' : dealScore >= 50 ? 'border-yellow-300' : 'border-red-300'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Deal Score</h2>
                  <div className={`text-4xl font-bold ${getScoreColor(dealScore)}`}>
                    {dealScore}/100
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${dealScore >= 70 ? 'bg-green-500' : dealScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${dealScore}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  {dealScore >= 80 && 'Excellent deal - meets all key criteria'}
                  {dealScore >= 60 && dealScore < 80 && 'Good deal - meets most criteria'}
                  {dealScore >= 40 && dealScore < 60 && 'Fair deal - proceed with caution'}
                  {dealScore < 40 && 'Poor deal - consider passing'}
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Investment Criteria</h3>
                <div className="space-y-3">
                  {criteria.map((c) => (
                    <div key={c.name} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        {c.met ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className="text-sm">{c.name}</span>
                      </div>
                      <span className={`text-sm font-semibold ${c.met ? 'text-green-600' : 'text-gray-500'}`}>
                        {c.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-semibold">{formatCurrency(totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Selling Costs</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(sellClosing + agentFees)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t pt-2">
                    <span className="text-gray-600">Net Profit</span>
                    <span className={`font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(profit)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">ROI</span>
                    <span className="font-semibold">{roi.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">70% MAO</span>
                    <span className="font-semibold">{formatCurrency(mao70)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Want Advanced Deal Analysis?</h3>
              <p className="text-primary-100 mb-6">
                Get our complete Deal Analyzer Spreadsheet with cash flow projections and multiple scenarios.
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
