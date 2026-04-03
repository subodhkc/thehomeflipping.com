'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckSquare, ArrowRight, CheckCircle, XCircle, TrendingUp, DollarSign, BarChart3 } from 'lucide-react'

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

  // Cash-on-cash return (annualized)
  const annualizedProfit = holdMonths > 0 ? (profit / holdMonths) * 12 : profit
  const cashOnCash = totalInvestment > 0 ? (annualizedProfit / totalInvestment) * 100 : 0

  const mao70 = arv * 0.7 - repairs
  const mao75 = arv * 0.75 - repairs

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getDealScore = () => {
    let score = 0
    // ROI criterion (max 30 pts)
    if (roi >= 25) score += 30
    else if (roi >= 15) score += 20
    else if (roi >= 10) score += 10
    // Profit margin criterion (max 20 pts)
    if (profitMargin >= 15) score += 20
    else if (profitMargin >= 10) score += 10
    // MAO criterion (max 30 pts)
    if (purchase <= mao70) score += 30
    else if (purchase <= mao75) score += 15
    // Absolute profit criterion (max 20 pts)
    if (profit >= 30000) score += 20
    else if (profit >= 20000) score += 15
    else if (profit >= 10000) score += 10
    // Hold time bonus (max 10 pts — still caps at 100)
    if (holdMonths <= 6) score += 10
    else if (holdMonths <= 9) score += 5
    return Math.min(100, score)
  }

  const dealScore = getDealScore()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  const formatPct = (value: number) => `${value.toFixed(1)}%`

  const criteria = [
    { name: 'ROI > 20%', met: roi >= 20, value: formatPct(roi) },
    { name: 'Net Profit > $20,000', met: profit >= 20000, value: formatCurrency(profit) },
    { name: 'Below 70% MAO', met: purchase <= mao70, value: formatCurrency(purchase) },
    { name: 'Profit Margin > 10%', met: profitMargin >= 10, value: formatPct(profitMargin) },
    { name: 'Hold ≤ 6 months', met: holdMonths <= 6, value: `${holdMonths} mo` },
  ]

  const hasData = arv > 0 && purchase > 0

  // What-if scenarios: varying purchase price
  const whatIfScenarios = [0.85, 0.90, 0.95, 1.0, 1.05, 1.10].map(multiplier => {
    const adjustedPurchase = purchase * multiplier
    const adjBuyClosing = adjustedPurchase * closingBuy
    const adjTotalInvestment = adjustedPurchase + repairs + totalHoldingCosts + adjBuyClosing
    const adjTotalCosts = adjTotalInvestment + sellClosing + agentFees
    const adjProfit = arv - adjTotalCosts
    const adjROI = adjTotalInvestment > 0 ? (adjProfit / adjTotalInvestment) * 100 : 0
    const adjMet70 = adjustedPurchase <= mao70
    return { multiplier, adjustedPurchase, adjProfit, adjROI, adjMet70 }
  })

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
              Score your potential deals, check investment criteria, and explore what-if scenarios.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
                Deal Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ARV ($)</label>
                    <input
                      type="number"
                      value={metrics.arv}
                      onChange={(e) => updateMetric('arv', e.target.value)}
                      placeholder="200,000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($)</label>
                    <input
                      type="number"
                      value={metrics.purchasePrice}
                      onChange={(e) => updateMetric('purchasePrice', e.target.value)}
                      placeholder="120,000"
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
                      placeholder="30,000"
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
                      min="1"
                      max="36"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Hold Cost ($)</label>
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
                      step="0.5"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buy Closing Costs (%)</label>
                    <input
                      type="number"
                      value={metrics.closingCostsBuy}
                      onChange={(e) => updateMetric('closingCostsBuy', e.target.value)}
                      className="input-field"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sell Closing Costs (%)</label>
                    <input
                      type="number"
                      value={metrics.closingCostsSell}
                      onChange={(e) => updateMetric('closingCostsSell', e.target.value)}
                      className="input-field"
                      step="0.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-5">
              {/* Deal Score */}
              <div className={`calculator-result ${dealScore >= 70 ? 'border-green-300' : dealScore >= 50 ? 'border-yellow-300' : 'border-red-300'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Deal Score</h2>
                  <div className={`text-5xl font-bold ${getScoreColor(dealScore)}`}>
                    {hasData ? `${dealScore}` : '—'}<span className="text-2xl text-gray-400">/100</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${dealScore >= 70 ? 'bg-green-500' : dealScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: hasData ? `${dealScore}%` : '0%' }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {!hasData && 'Enter deal details to get your score'}
                  {hasData && dealScore >= 80 && 'Excellent deal — meets all key criteria'}
                  {hasData && dealScore >= 60 && dealScore < 80 && 'Good deal — meets most criteria'}
                  {hasData && dealScore >= 40 && dealScore < 60 && 'Fair deal — negotiate harder or pass'}
                  {hasData && dealScore < 40 && 'Poor deal — consider passing'}
                </p>
              </div>

              {/* Investment Criteria */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Investment Criteria</h3>
                <div className="space-y-2">
                  {criteria.map((c) => (
                    <div key={c.name} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        {hasData ? (
                          c.met ? (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                          )
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-200 flex-shrink-0" />
                        )}
                        <span className="text-sm">{c.name}</span>
                      </div>
                      <span className={`text-sm font-semibold ${hasData ? (c.met ? 'text-green-600' : 'text-red-500') : 'text-gray-300'}`}>
                        {hasData ? c.value : '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Summary */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  Financial Summary
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Purchase Price</span>
                    <span className="font-semibold">{hasData ? formatCurrency(purchase) : '—'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Repair Costs</span>
                    <span className="font-semibold text-red-500">{hasData ? '-' + formatCurrency(repairs) : '—'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Holding Costs ({holdMonths} mo × {formatCurrency(monthlyHold)}/mo)</span>
                    <span className="font-semibold text-red-500">{hasData ? '-' + formatCurrency(totalHoldingCosts) : '—'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Buying Closing</span>
                    <span className="font-semibold text-red-500">{hasData ? '-' + formatCurrency(buyClosing) : '—'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-gray-100 pt-2">
                    <span className="text-gray-600 font-medium">Total Investment</span>
                    <span className="font-bold">{hasData ? formatCurrency(totalInvestment) : '—'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Selling Costs (agent + closing)</span>
                    <span className="font-semibold text-red-500">{hasData ? '-' + formatCurrency(sellClosing + agentFees) : '—'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-200 mt-1">
                    <span className="font-semibold">Net Profit</span>
                    <span className={`font-bold text-lg ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {hasData ? formatCurrency(profit) : '—'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="bg-purple-50 rounded-lg p-2.5 text-center">
                      <div className="text-xs text-gray-500 mb-1">ROI</div>
                      <div className="font-bold text-purple-700">{hasData ? formatPct(roi) : '—'}</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                      <div className="text-xs text-gray-500 mb-1">Margin</div>
                      <div className="font-bold text-blue-700">{hasData ? formatPct(profitMargin) : '—'}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2.5 text-center">
                      <div className="text-xs text-gray-500 mb-1">CoC Return</div>
                      <div className="font-bold text-green-700">{hasData ? formatPct(cashOnCash) : '—'}</div>
                    </div>
                  </div>
                  <div className="flex justify-between py-1 mt-1">
                    <span className="text-gray-600">70% MAO</span>
                    <span className="font-semibold">{hasData ? formatCurrency(mao70) : '—'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">75% MAO</span>
                    <span className="font-semibold">{hasData ? formatCurrency(mao75) : '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What-If Scenarios */}
          {hasData && (
            <div className="card mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Purchase Price What-If Analysis
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                How your profit and ROI change at different purchase prices. Use this to know your negotiation range.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 font-medium text-gray-600">Scenario</th>
                      <th className="text-right py-2 px-3 font-medium text-gray-600">Purchase Price</th>
                      <th className="text-right py-2 px-3 font-medium text-gray-600">Net Profit</th>
                      <th className="text-right py-2 px-3 font-medium text-gray-600">ROI</th>
                      <th className="text-right py-2 pl-3 font-medium text-gray-600">70% MAO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whatIfScenarios.map(({ multiplier, adjustedPurchase, adjProfit, adjROI, adjMet70 }) => (
                      <tr
                        key={multiplier}
                        className={`border-b border-gray-50 ${multiplier === 1.0 ? 'bg-purple-50 font-semibold' : ''}`}
                      >
                        <td className="py-2.5 pr-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                            multiplier < 1.0 ? 'bg-green-100 text-green-700' :
                            multiplier > 1.0 ? 'bg-red-100 text-red-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {multiplier === 1.0 ? 'Current Offer' : `${multiplier > 1 ? '+' : ''}${((multiplier - 1) * 100).toFixed(0)}%`}
                          </span>
                        </td>
                        <td className="text-right py-2.5 px-3">{formatCurrency(adjustedPurchase)}</td>
                        <td className={`text-right py-2.5 px-3 font-semibold ${adjProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(adjProfit)}
                        </td>
                        <td className={`text-right py-2.5 px-3 font-semibold ${adjROI >= 20 ? 'text-green-600' : adjROI >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {formatPct(adjROI)}
                        </td>
                        <td className="text-right py-2.5 pl-3">
                          {adjMet70 ? (
                            <CheckCircle className="h-4 w-4 text-green-500 inline" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400 inline" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 text-center">
            <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Want Advanced Deal Analysis?</h3>
              <p className="text-primary-100 mb-6">
                Get our complete Deal Analyzer Spreadsheet with cash flow projections, multiple scenarios, and exit strategy modeling.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/tools/max-offer-calculator" className="btn-secondary inline-flex items-center gap-2">
                  Calculate Max Offer <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/starter-kit" className="bg-white text-primary-700 font-semibold py-3 px-6 rounded-lg hover:bg-primary-50 inline-flex items-center gap-2 transition-colors">
                  Get the Starter Kit <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
