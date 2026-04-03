'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Clock, Home, BarChart3, Info } from 'lucide-react'

export default function MaxOfferCalculatorClient() {
  const [arv, setArv] = useState<string>('')
  const [repairCosts, setRepairCosts] = useState<string>('')
  const [profitMargin, setProfitMargin] = useState<string>('30')
  const [wholesaleFee, setWholesaleFee] = useState<string>('0')
  const [holdingMonths, setHoldingMonths] = useState<string>('4')
  const [monthlyHoldingCost, setMonthlyHoldingCost] = useState<string>('1500')
  const [buyingClosingPct, setBuyingClosingPct] = useState<string>('2')
  const [sellingCostsPct, setSellingCostsPct] = useState<string>('8')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const arvNum = parseFloat(arv) || 0
  const repairNum = parseFloat(repairCosts) || 0
  const marginNum = parseFloat(profitMargin) || 30
  const feeNum = parseFloat(wholesaleFee) || 0
  const holdMonthsNum = parseFloat(holdingMonths) || 4
  const monthlyHoldNum = parseFloat(monthlyHoldingCost) || 1500
  const buyClosingNum = parseFloat(buyingClosingPct) || 2
  const sellCostsNum = parseFloat(sellingCostsPct) || 8

  // Core MAO using 70% rule (adjusted for profit margin slider)
  const maxOffer = Math.max(0, (arvNum * (1 - marginNum / 100)) - repairNum - feeNum)

  // Realistic cost calculations
  const buyingClosingCost = maxOffer * (buyClosingNum / 100)
  const holdingCosts = holdMonthsNum * monthlyHoldNum
  const sellingCosts = arvNum * (sellCostsNum / 100)

  // True profit accounting for ALL costs
  const trueProfit = arvNum - maxOffer - repairNum - feeNum - buyingClosingCost - holdingCosts - sellingCosts
  const totalInvestment = maxOffer + repairNum + buyingClosingCost + holdingCosts
  const trueROI = totalInvestment > 0 ? (trueProfit / totalInvestment) * 100 : 0
  const breakEven = arvNum - repairNum - feeNum - holdingCosts - sellingCosts - buyingClosingCost

  // Deal quality scoring (5 tiers)
  const dealQuality =
    maxOffer <= 0 ? 'N/A' :
    trueROI >= 25 ? 'Excellent' :
    trueROI >= 18 ? 'Good' :
    trueROI >= 12 ? 'Fair' :
    trueROI >= 8 ? 'Marginal' :
    'Poor'

  const dealQualityColor =
    dealQuality === 'Excellent' ? 'bg-green-50 border-green-200 text-green-700' :
    dealQuality === 'Good' ? 'bg-blue-50 border-blue-200 text-blue-700' :
    dealQuality === 'Fair' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
    dealQuality === 'Marginal' ? 'bg-orange-50 border-orange-200 text-orange-700' :
    dealQuality === 'Poor' ? 'bg-red-50 border-red-200 text-red-700' :
    'bg-gray-50 border-gray-200 text-gray-700'

  // Sensitivity analysis: MAO at different ARV assumptions
  const sensitivityRows = [-10, -5, 0, 5, 10].map(pct => {
    const adjustedArv = arvNum * (1 + pct / 100)
    const adjustedMao = Math.max(0, (adjustedArv * (1 - marginNum / 100)) - repairNum - feeNum)
    const adjustedProfit = adjustedArv - adjustedMao - repairNum - feeNum -
      (adjustedMao * buyClosingNum / 100) - holdingCosts - (adjustedArv * sellCostsNum / 100)
    return { pct, adjustedArv, adjustedMao, adjustedProfit }
  })

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  const formatPct = (value: number) => `${value >= 0 ? '' : ''}${value.toFixed(1)}%`

  const hasData = arvNum > 0 && repairNum >= 0

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
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
              Calculate the maximum price you should pay for a flip property — including all realistic costs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary-600" />
                  Property Details
                </h2>

                <div className="space-y-5">
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
                    <p className="text-xs text-gray-500 mt-1">What the property will be worth after all repairs</p>
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
                    <p className="text-xs text-gray-500 mt-1">Total renovation budget (use Rehab Estimator for detail)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profit Buffer: {profitMargin}%
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="40"
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>20% (Aggressive)</span>
                      <span>30% (Standard 70% Rule)</span>
                      <span>40% (Conservative)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wholesale / Assignment Fee
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
                    <p className="text-xs text-gray-500 mt-1">If buying from a wholesaler, add their fee here</p>
                  </div>
                </div>
              </div>

              {/* Advanced Cost Inputs */}
              <div className="card">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-600" />
                    Holding & Closing Costs
                  </h2>
                  <span className="text-sm text-primary-600 font-medium">
                    {showAdvanced ? 'Hide ▲' : 'Show ▼'}
                  </span>
                </button>

                {showAdvanced && (
                  <div className="mt-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hold Time (months)</label>
                        <input
                          type="number"
                          value={holdingMonths}
                          onChange={(e) => setHoldingMonths(e.target.value)}
                          className="input-field"
                          min="1"
                          max="24"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Hold Cost ($)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={monthlyHoldingCost}
                            onChange={(e) => setMonthlyHoldingCost(e.target.value)}
                            className="input-field pl-8"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Monthly costs: mortgage/hard money interest, taxes, insurance, utilities</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Buying Closing %</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={buyingClosingPct}
                            onChange={(e) => setBuyingClosingPct(e.target.value)}
                            className="input-field pr-8"
                            step="0.5"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Selling Costs % *</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={sellingCostsPct}
                            onChange={(e) => setSellingCostsPct(e.target.value)}
                            className="input-field pr-8"
                            step="0.5"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">* Selling costs = agent commission (6%) + closing costs (2%) = 8% default</p>
                  </div>
                )}

                {!showAdvanced && (
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-500">
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="font-medium text-gray-700">{holdMonthsNum} mo hold</div>
                      <div>{formatCurrency(holdingCosts)}</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="font-medium text-gray-700">Buy closing</div>
                      <div>{buyClosingNum}%</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="font-medium text-gray-700">Sell costs</div>
                      <div>{sellCostsNum}%</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Results */}
            <div className="space-y-5">
              {/* Primary MAO Result */}
              <div className="calculator-result">
                <h2 className="text-lg font-semibold text-gray-700 mb-1">Maximum Allowable Offer (MAO)</h2>
                <div className="text-5xl font-bold text-primary-700 my-3">
                  {hasData ? formatCurrency(maxOffer) : '$—'}
                </div>
                <p className="text-sm text-gray-600">
                  The highest price you should pay at {profitMargin}% profit buffer
                </p>
                {hasData && breakEven > 0 && (
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Break-even purchase price: {formatCurrency(breakEven)}
                  </p>
                )}
              </div>

              {/* Full Cost Breakdown */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary-600" />
                  Full Deal Analysis
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">After Repair Value</span>
                    <span className="font-semibold">{hasData ? formatCurrency(arvNum) : '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Max Purchase (MAO)</span>
                    <span className="font-semibold text-red-500">-{hasData ? formatCurrency(maxOffer) : '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Repair Costs</span>
                    <span className="font-semibold text-red-500">-{hasData ? formatCurrency(repairNum) : '—'}</span>
                  </div>
                  {feeNum > 0 && (
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-600">Wholesale Fee</span>
                      <span className="font-semibold text-red-500">-{formatCurrency(feeNum)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Holding Costs ({holdMonthsNum} mo × {formatCurrency(monthlyHoldNum)}/mo)</span>
                    <span className="font-semibold text-red-500">-{hasData ? formatCurrency(holdingCosts) : '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Buying Closing ({buyClosingNum}%)</span>
                    <span className="font-semibold text-red-500">-{hasData ? formatCurrency(buyingClosingCost) : '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Selling Costs ({sellCostsNum}%)</span>
                    <span className="font-semibold text-red-500">-{hasData ? formatCurrency(sellingCosts) : '—'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-gray-50 rounded px-2 mt-2">
                    <span className="font-semibold text-gray-800">True Net Profit</span>
                    <span className={`font-bold text-lg ${trueProfit >= 0 ? 'text-secondary-600' : 'text-red-600'}`}>
                      {hasData ? formatCurrency(trueProfit) : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">True ROI</span>
                    <span className="font-semibold">{hasData ? formatPct(trueROI) : '—'}</span>
                  </div>
                </div>
              </div>

              {/* Deal Quality */}
              <div className={`card border-2 ${dealQualityColor}`}>
                <div className="flex items-center gap-3">
                  {dealQuality === 'Excellent' || dealQuality === 'Good' ? (
                    <CheckCircle className="h-7 w-7" />
                  ) : (
                    <AlertTriangle className="h-7 w-7" />
                  )}
                  <div>
                    <div className="font-bold text-lg">Deal Quality: {dealQuality}</div>
                    <div className="text-sm opacity-80">
                      {dealQuality === 'Excellent' && 'Strong profit potential — meets all key criteria'}
                      {dealQuality === 'Good' && 'Solid deal — meets standard investment criteria'}
                      {dealQuality === 'Fair' && 'Acceptable margins — negotiate harder or reduce repairs'}
                      {dealQuality === 'Marginal' && 'Very tight margins — high execution risk'}
                      {dealQuality === 'Poor' && 'Deal is likely unprofitable at this price'}
                      {dealQuality === 'N/A' && 'Enter property details to analyze this deal'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sensitivity Analysis */}
          {hasData && arvNum > 0 && (
            <div className="card mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary-600" />
                ARV Sensitivity Analysis
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                How your MAO and profit change if your ARV estimate is off. Always underwrite to the conservative case.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 font-medium text-gray-600">ARV Scenario</th>
                      <th className="text-right py-2 px-4 font-medium text-gray-600">ARV</th>
                      <th className="text-right py-2 px-4 font-medium text-gray-600">Max Offer</th>
                      <th className="text-right py-2 pl-4 font-medium text-gray-600">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityRows.map(({ pct, adjustedArv, adjustedMao, adjustedProfit }) => (
                      <tr
                        key={pct}
                        className={`border-b border-gray-50 ${pct === 0 ? 'bg-blue-50 font-semibold' : ''}`}
                      >
                        <td className="py-2.5 pr-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                            pct < 0 ? 'bg-red-100 text-red-700' :
                            pct > 0 ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {pct === 0 ? 'Base Case' : `${pct > 0 ? '+' : ''}${pct}% ARV`}
                          </span>
                        </td>
                        <td className="text-right py-2.5 px-4">{formatCurrency(adjustedArv)}</td>
                        <td className="text-right py-2.5 px-4">{formatCurrency(adjustedMao)}</td>
                        <td className={`text-right py-2.5 pl-4 font-semibold ${adjustedProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(adjustedProfit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Formula Explanation */}
          <div className="card mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How the 70% Rule Works</h2>
            <div className="bg-gray-50 rounded-lg p-6 font-mono text-center text-lg mb-6">
              MAO = (ARV × 70%) − Repair Costs − Fees
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">~10% Buying Costs</h3>
                <p className="text-blue-700">Closing costs, inspections, title search, loan origination</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">~10% Selling Costs</h3>
                <p className="text-green-700">Agent commissions (6%), closing costs (2%), staging, misc</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">~10% Profit</h3>
                <p className="text-purple-700">Your target return on investment after all expenses</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Conservative investors often use 65% or 60% to account for unexpected costs, market fluctuations, and longer hold times.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Want More Advanced Analysis?</h3>
              <p className="text-primary-100 mb-6">
                Get our complete Deal Analyzer Spreadsheet with cash flow projections, holding costs, and multiple exit strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/tools/rehab-cost-estimator" className="btn-secondary inline-flex items-center gap-2">
                  Estimate Repair Costs <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/starter-kit" className="bg-white text-primary-700 font-semibold py-3 px-6 rounded-lg hover:bg-primary-50 inline-flex items-center gap-2 transition-colors">
                  Get the Starter Kit <Home className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
