'use client'

import { useState } from 'react'
import { Calculator, DollarSign, Home, Hammer, CheckSquare, TrendingUp, AlertTriangle } from 'lucide-react'

interface CalculatorProps {
  onClose?: () => void
}

export function MaxOfferCalculator() {
  const [arv, setArv] = useState<string>('')
  const [repairCosts, setRepairCosts] = useState<string>('')
  const [profitMargin, setProfitMargin] = useState<string>('30')

  const arvNum = parseFloat(arv) || 0
  const repairNum = parseFloat(repairCosts) || 0
  const marginNum = parseFloat(profitMargin) || 30

  const maxOffer = (arvNum * (1 - marginNum / 100)) - repairNum
  const potentialProfit = arvNum - maxOffer - repairNum
  const roi = maxOffer > 0 ? ((potentialProfit / (maxOffer + repairNum)) * 100) : 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Max Offer Calculator
        </h3>
        <p className="text-sm text-gray-600 mt-1">Calculate your maximum allowable offer using the 70% rule</p>
      </div>
      
      <div className="space-y-4">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Profit Margin (%)</label>
          <input
            type="number"
            value={profitMargin}
            onChange={(e) => setProfitMargin(e.target.value)}
            placeholder="30"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {arvNum > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Max Offer:</span>
              <span className="font-bold text-green-600">{formatCurrency(maxOffer)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Potential Profit:</span>
              <span className="font-bold text-blue-600">{formatCurrency(potentialProfit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ROI:</span>
              <span className="font-bold text-purple-600">{roi.toFixed(1)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function RehabCostEstimator() {
  const [squareFeet, setSquareFeet] = useState<string>('')
  const [quality, setQuality] = useState<string>('mid')

  const sqftNum = parseFloat(squareFeet) || 0
  const costPerSqft = quality === 'basic' ? 25 : quality === 'mid' ? 45 : 75
  const totalCost = sqftNum * costPerSqft

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Hammer className="h-5 w-5 text-orange-500" />
          Rehab Cost Estimator
        </h3>
        <p className="text-sm text-gray-600 mt-1">Estimate renovation costs by square footage and quality</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
          <input
            type="number"
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            placeholder="1500"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Finish Quality</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="basic">Basic ($25/sqft)</option>
            <option value="mid">Mid-Range ($45/sqft)</option>
            <option value="high">High-End ($75/sqft)</option>
          </select>
        </div>
        
        {sqftNum > 0 && (
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Rehab Cost:</span>
              <span className="font-bold text-orange-600 text-lg">{formatCurrency(totalCost)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">at {costPerSqft}/sqft</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function ARVCalculator() {
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

  const calculateARV = () => {
    const validComps = comps.filter(comp => comp.price && comp.sqft)
    if (validComps.length === 0) return 0

    const avgPricePerSqft = validComps.reduce((sum, comp) => {
      const price = parseFloat(comp.price) || 0
      const sqft = parseFloat(comp.sqft) || 0
      return sum + (price / sqft)
    }, 0) / validComps.length

    return avgPricePerSqft * 1500 // Assuming 1500 sqft subject property
  }

  const estimatedARV = calculateARV()

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          ARV Calculator
        </h3>
        <p className="text-sm text-gray-600 mt-1">Calculate After Repair Value from comparable properties</p>
      </div>
      
      <div className="space-y-4">
        {comps.map((comp, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Comp {index + 1}</h4>
              {comps.length > 1 && (
                <button onClick={() => removeComp(index)} className="text-red-500 text-sm">
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Address"
                value={comp.address}
                onChange={(e) => updateComp(index, 'address', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Price"
                value={comp.price}
                onChange={(e) => updateComp(index, 'price', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Beds"
                value={comp.beds}
                onChange={(e) => updateComp(index, 'beds', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Baths"
                value={comp.baths}
                onChange={(e) => updateComp(index, 'baths', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Sqft"
                value={comp.sqft}
                onChange={(e) => updateComp(index, 'sqft', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        ))}
        
        <button onClick={addComp} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Comp
        </button>
        
        {estimatedARV > 0 && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated ARV:</span>
              <span className="font-bold text-blue-600 text-lg">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(estimatedARV)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Based on {comps.filter(c => c.price && c.sqft).length} comparable properties</p>
          </div>
        )}
      </div>
    </div>
  )
}
