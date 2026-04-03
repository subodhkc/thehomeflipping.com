'use client'

import { useState } from 'react'
import { DollarSign, Hammer, TrendingUp, Plus, X } from 'lucide-react'

export function MaxOfferCalculator() {
  const [arv, setArv] = useState<string>('')
  const [repairCosts, setRepairCosts] = useState<string>('')
  const [profitMargin, setProfitMargin] = useState<string>('30')
  const [holdingMonths, setHoldingMonths] = useState<string>('4')
  const [monthlyHoldingCost, setMonthlyHoldingCost] = useState<string>('1500')
  const [buyingClosingPct, setBuyingClosingPct] = useState<string>('2')
  const [sellingCostsPct, setSellingCostsPct] = useState<string>('8')

  const arvNum = parseFloat(arv) || 0
  const repairNum = parseFloat(repairCosts) || 0
  const marginNum = parseFloat(profitMargin) || 30
  const holdMonthsNum = parseFloat(holdingMonths) || 4
  const monthlyHoldNum = parseFloat(monthlyHoldingCost) || 1500
  const buyClosingNum = parseFloat(buyingClosingPct) || 2
  const sellCostsNum = parseFloat(sellingCostsPct) || 8

  const maxOffer = Math.max(0, (arvNum * (1 - marginNum / 100)) - repairNum)
  const holdingCosts = holdMonthsNum * monthlyHoldNum
  const buyingClosingCost = maxOffer * (buyClosingNum / 100)
  const sellingCosts = arvNum * (sellCostsNum / 100)
  const trueProfit = arvNum - maxOffer - repairNum - holdingCosts - buyingClosingCost - sellingCosts
  const totalInvestment = maxOffer + repairNum + holdingCosts + buyingClosingCost
  const trueROI = totalInvestment > 0 ? (trueProfit / totalInvestment) * 100 : 0

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  const qualityLabel =
    maxOffer <= 0 ? '' :
    trueROI >= 25 ? '✅ Excellent' :
    trueROI >= 18 ? '✅ Good' :
    trueROI >= 12 ? '⚠️ Fair' :
    '❌ Poor'

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Max Offer Calculator
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">70% rule with full cost accounting</p>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">After Repair Value (ARV)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={arv}
                onChange={(e) => setArv(e.target.value)}
                placeholder="300,000"
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Repair Costs</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={repairCosts}
                onChange={(e) => setRepairCosts(e.target.value)}
                placeholder="50,000"
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Profit Buffer: {profitMargin}%</label>
          <input
            type="range"
            min="20"
            max="40"
            value={profitMargin}
            onChange={(e) => setProfitMargin(e.target.value)}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>20% Aggressive</span>
            <span>30% Standard</span>
            <span>40% Conservative</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Hold (months)</label>
            <input
              type="number"
              value={holdingMonths}
              onChange={(e) => setHoldingMonths(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Monthly Hold Cost</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={monthlyHoldingCost}
                onChange={(e) => setMonthlyHoldingCost(e.target.value)}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Buy Closing %</label>
            <input
              type="number"
              value={buyingClosingPct}
              onChange={(e) => setBuyingClosingPct(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Sell Costs %</label>
            <input
              type="number"
              value={sellingCostsPct}
              onChange={(e) => setSellingCostsPct(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.5"
            />
          </div>
        </div>

        {arvNum > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 space-y-2.5 border border-blue-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Max Offer (MAO):</span>
              <span className="font-bold text-xl text-blue-700">{formatCurrency(maxOffer)}</span>
            </div>
            <div className="space-y-1.5 text-sm border-t border-blue-100 pt-2.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Holding Costs:</span>
                <span className="font-medium text-red-500">-{formatCurrency(holdingCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Buy + Sell Costs:</span>
                <span className="font-medium text-red-500">-{formatCurrency(buyingClosingCost + sellingCosts)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-blue-100 pt-1.5">
                <span className="text-gray-600">True Net Profit:</span>
                <span className={trueProfit >= 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(trueProfit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">True ROI:</span>
                <span className="font-medium text-purple-600">{trueROI.toFixed(1)}%</span>
              </div>
              {qualityLabel && (
                <div className="text-xs font-medium text-gray-600 pt-1">{qualityLabel}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const QUALITY_LEVELS = [
  { value: 'light', label: 'Light ($15/sqft)', costPerSqft: 15 },
  { value: 'basic', label: 'Basic ($25/sqft)', costPerSqft: 25 },
  { value: 'mid', label: 'Mid-Range ($45/sqft)', costPerSqft: 45 },
  { value: 'high', label: 'High-End ($75/sqft)', costPerSqft: 75 },
  { value: 'luxury', label: 'Luxury ($100/sqft)', costPerSqft: 100 },
]

export function RehabCostEstimator() {
  const [squareFeet, setSquareFeet] = useState<string>('')
  const [quality, setQuality] = useState<string>('mid')
  const [contingency, setContingency] = useState<number>(10)

  const sqftNum = parseFloat(squareFeet) || 0
  const selectedLevel = QUALITY_LEVELS.find(l => l.value === quality) || QUALITY_LEVELS[2]
  const baseCost = sqftNum * selectedLevel.costPerSqft
  const contingencyAmt = baseCost * (contingency / 100)
  const totalCost = baseCost + contingencyAmt

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Hammer className="h-5 w-5 text-orange-500" />
          Rehab Cost Estimator
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">Quick estimate by square footage and quality</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Property Square Footage</label>
          <input
            type="number"
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            placeholder="1,500"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Renovation Level</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {QUALITY_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Contingency Reserve</label>
          <select
            value={contingency}
            onChange={(e) => setContingency(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="5">5% — Light/newer</option>
            <option value="10">10% — Standard</option>
            <option value="15">15% — Older home</option>
            <option value="20">20% — Unknown systems</option>
          </select>
        </div>

        {sqftNum > 0 && (
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Base estimate ({selectedLevel.costPerSqft}/sqft):</span>
              <span className="font-semibold text-orange-700">{formatCurrency(baseCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Contingency ({contingency}%):</span>
              <span className="font-semibold text-orange-700">+{formatCurrency(contingencyAmt)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-orange-200 pt-2 mt-1">
              <span className="font-bold text-gray-800">Total Budget:</span>
              <span className="font-bold text-lg text-orange-600">{formatCurrency(totalCost)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function ARVCalculator() {
  const [subjectSqft, setSubjectSqft] = useState<string>('')
  const [comps, setComps] = useState([
    { address: '', price: '', beds: '', baths: '', sqft: '' }
  ])

  const addComp = () => {
    setComps([...comps, { address: '', price: '', beds: '', baths: '', sqft: '' }])
  }

  const removeComp = (index: number) => {
    setComps(comps.filter((_, i) => i !== index))
  }

  const updateComp = (index: number, field: string, value: string) => {
    const newComps = [...comps]
    newComps[index] = { ...newComps[index], [field]: value }
    setComps(newComps)
  }

  const validComps = comps.filter(comp => comp.price && comp.sqft)
  const pricesPerSqft = validComps.map(comp => (parseFloat(comp.price) || 0) / (parseFloat(comp.sqft) || 1))
  const avgPricePerSqft = pricesPerSqft.length > 0 ? pricesPerSqft.reduce((a, b) => a + b, 0) / pricesPerSqft.length : 0
  const minPricePerSqft = pricesPerSqft.length > 0 ? Math.min(...pricesPerSqft) : 0
  const maxPricePerSqft = pricesPerSqft.length > 0 ? Math.max(...pricesPerSqft) : 0

  const subjectSqftNum = parseFloat(subjectSqft) || 0
  const estimatedARV = avgPricePerSqft * subjectSqftNum
  const arvLow = minPricePerSqft * subjectSqftNum
  const arvHigh = maxPricePerSqft * subjectSqftNum

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          ARV Calculator
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">After Repair Value from comparable sales</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Subject Property (Sqft)</label>
          <input
            type="number"
            value={subjectSqft}
            onChange={(e) => setSubjectSqft(e.target.value)}
            placeholder="1,500"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-3">
          {comps.map((comp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-600">Comp {index + 1}</span>
                {comps.length > 1 && (
                  <button onClick={() => removeComp(index)} className="text-red-400 hover:text-red-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="text"
                  placeholder="Address (optional)"
                  value={comp.address}
                  onChange={(e) => updateComp(index, 'address', e.target.value)}
                  className="col-span-2 px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Sale price"
                  value={comp.price}
                  onChange={(e) => updateComp(index, 'price', e.target.value)}
                  className="px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Sqft"
                  value={comp.sqft}
                  onChange={(e) => updateComp(index, 'sqft', e.target.value)}
                  className="px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-500"
                />
                {comp.price && comp.sqft && (
                  <div className="col-span-2 text-xs text-gray-400">
                    $/sqft: {formatCurrency(parseFloat(comp.price) / parseFloat(comp.sqft))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addComp}
            className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Comp
          </button>
        </div>

        {estimatedARV > 0 && subjectSqftNum > 0 && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Estimated ARV:</span>
              <span className="font-bold text-xl text-blue-700">{formatCurrency(estimatedARV)}</span>
            </div>
            {validComps.length > 1 && (
              <div className="text-xs text-gray-500 space-y-1 border-t border-blue-100 pt-2">
                <div className="flex justify-between">
                  <span>Low range:</span>
                  <span className="font-medium">{formatCurrency(arvLow)}</span>
                </div>
                <div className="flex justify-between">
                  <span>High range:</span>
                  <span className="font-medium">{formatCurrency(arvHigh)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg $/sqft:</span>
                  <span className="font-medium">{formatCurrency(avgPricePerSqft)}/sqft</span>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-400">Based on {validComps.length} comp{validComps.length !== 1 ? 's' : ''} · {subjectSqftNum.toLocaleString()} sqft subject property</p>
          </div>
        )}
      </div>
    </div>
  )
}
