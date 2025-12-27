'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, Calculator, ArrowRight, Info } from 'lucide-react'

const roofMaterials = [
  { name: '3-Tab Asphalt Shingles', lowCost: 3.5, highCost: 5.5, lifespan: '15-20 years' },
  { name: 'Architectural Shingles', lowCost: 4.5, highCost: 7, lifespan: '25-30 years' },
  { name: 'Metal Roofing', lowCost: 7, highCost: 14, lifespan: '40-70 years' },
  { name: 'Wood Shakes', lowCost: 6, highCost: 10, lifespan: '20-40 years' },
  { name: 'Clay/Concrete Tiles', lowCost: 10, highCost: 18, lifespan: '50+ years' },
  { name: 'Slate', lowCost: 15, highCost: 30, lifespan: '75-100 years' },
]

const pitchMultipliers: Record<string, number> = {
  'flat': 1.0,
  'low': 1.05,
  'medium': 1.15,
  'steep': 1.25,
  'very-steep': 1.4,
}

export default function RoofingCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [pitch, setPitch] = useState('medium')
  const [material, setMaterial] = useState(roofMaterials[1].name)
  const [tearOff, setTearOff] = useState(true)
  const [complexity, setComplexity] = useState('average')

  const lengthNum = parseFloat(length) || 0
  const widthNum = parseFloat(width) || 0
  const footprint = lengthNum * widthNum
  const pitchMultiplier = pitchMultipliers[pitch]
  const roofArea = footprint * pitchMultiplier
  const squares = roofArea / 100

  const selectedMaterial = roofMaterials.find((m) => m.name === material) || roofMaterials[1]
  const complexityMultiplier = complexity === 'simple' ? 0.9 : complexity === 'complex' ? 1.2 : 1.0
  const tearOffCost = tearOff ? squares * 100 : 0

  const materialLowCost = roofArea * selectedMaterial.lowCost * complexityMultiplier
  const materialHighCost = roofArea * selectedMaterial.highCost * complexityMultiplier

  const totalLow = materialLowCost + tearOffCost
  const totalHigh = materialHighCost + tearOffCost

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Home className="h-4 w-4" />
              Free Calculator
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Roofing Cost Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estimate roof replacement costs based on size, pitch, and material type.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary-600" />
                Roof Details
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House Length (ft)
                    </label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="50"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House Width (ft)
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="30"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roof Pitch
                  </label>
                  <select
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="input-field"
                  >
                    <option value="flat">Flat (0-2/12)</option>
                    <option value="low">Low (3-4/12)</option>
                    <option value="medium">Medium (5-7/12)</option>
                    <option value="steep">Steep (8-10/12)</option>
                    <option value="very-steep">Very Steep (11+/12)</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Steeper roofs require more material and labor
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roofing Material
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="input-field"
                  >
                    {roofMaterials.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name} ({formatCurrency(m.lowCost)}-{formatCurrency(m.highCost)}/sqft)
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Expected lifespan: {selectedMaterial.lifespan}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roof Complexity
                  </label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="input-field"
                  >
                    <option value="simple">Simple (few angles, no dormers)</option>
                    <option value="average">Average (some angles, 1-2 dormers)</option>
                    <option value="complex">Complex (many angles, multiple dormers)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="tearoff"
                    checked={tearOff}
                    onChange={(e) => setTearOff(e.target.checked)}
                    className="h-4 w-4 text-primary-600 rounded"
                  />
                  <label htmlFor="tearoff" className="text-sm text-gray-700">
                    Include tear-off of existing roof (+$100/square)
                  </label>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="calculator-result">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Estimated Cost Range</h2>
                <div className="text-3xl font-bold text-primary-700">
                  {footprint > 0 ? `${formatCurrency(totalLow)} - ${formatCurrency(totalHigh)}` : '$0'}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on {material.toLowerCase()} with {pitch} pitch
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Calculation Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">House Footprint</span>
                    <span className="font-semibold">{footprint.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Pitch Multiplier</span>
                    <span className="font-semibold">×{pitchMultiplier}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Actual Roof Area</span>
                    <span className="font-semibold">{Math.round(roofArea).toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Roofing Squares</span>
                    <span className="font-semibold">{squares.toFixed(1)} squares</span>
                  </div>
                  {tearOff && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Tear-Off Cost</span>
                      <span className="font-semibold">{formatCurrency(tearOffCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Material Cost Range</span>
                    <span className="font-semibold">
                      {formatCurrency(materialLowCost)} - {formatCurrency(materialHighCost)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card bg-blue-50 border-blue-200">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">What is a Roofing Square?</p>
                    <p>
                      A roofing square equals 100 square feet. Contractors price roofing jobs by the square.
                      A typical home has 15-30 squares.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Material Comparison */}
          <div className="card mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Material Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Material</th>
                    <th className="text-left py-3 px-4">Cost/Sq Ft</th>
                    <th className="text-left py-3 px-4">Lifespan</th>
                    <th className="text-left py-3 px-4">Your Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  {roofMaterials.map((m) => {
                    const low = roofArea * m.lowCost * complexityMultiplier + tearOffCost
                    const high = roofArea * m.highCost * complexityMultiplier + tearOffCost
                    return (
                      <tr key={m.name} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{m.name}</td>
                        <td className="py-3 px-4">
                          {formatCurrency(m.lowCost)} - {formatCurrency(m.highCost)}
                        </td>
                        <td className="py-3 px-4">{m.lifespan}</td>
                        <td className="py-3 px-4 font-semibold text-primary-600">
                          {footprint > 0 ? `${formatCurrency(low)} - ${formatCurrency(high)}` : '-'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Need to Estimate Full Rehab Costs?</h3>
              <p className="text-primary-100 mb-6">
                Use our complete Rehab Cost Estimator with 260+ line items.
              </p>
              <Link href="/tools/rehab-cost-estimator" className="btn-secondary inline-flex items-center gap-2">
                Open Rehab Estimator <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
