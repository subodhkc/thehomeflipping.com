'use client'

import { useState } from 'react'
import { TrendingUp, Home, MapPin, DollarSign, Plus, Trash2, Calculator } from 'lucide-react'

interface Comp {
  id: string
  address: string
  salePrice: string
  sqft: string
  beds: string
  baths: string
  yearBuilt: string
  condition: string
  daysOnMarket: string
  distance: string
}

export function CompAnalysisGuide() {
  const [subjectProperty, setSubjectProperty] = useState({
    address: '',
    sqft: '',
    beds: '',
    baths: '',
    yearBuilt: '',
    condition: 'average'
  })

  const [comps, setComps] = useState<Comp[]>([
    { id: '1', address: '', salePrice: '', sqft: '', beds: '', baths: '', yearBuilt: '', condition: '', daysOnMarket: '', distance: '' }
  ])

  const [adjustments, setAdjustments] = useState({
    sqftAdjustment: 50, // per sqft
    bedAdjustment: 10000,
    bathAdjustment: 5000,
    conditionAdjustment: 15000
  })

  const addComp = () => {
    const newId = (comps.length + 1).toString()
    setComps([...comps, { 
      id: newId, 
      address: '', 
      salePrice: '', 
      sqft: '', 
      beds: '', 
      baths: '', 
      yearBuilt: '', 
      condition: '', 
      daysOnMarket: '', 
      distance: '' 
    }])
  }

  const removeComp = (id: string) => {
    if (comps.length > 1) {
      setComps(comps.filter(c => c.id !== id))
    }
  }

  const updateComp = (id: string, field: keyof Comp, value: string) => {
    setComps(comps.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const calculateAdjustedPrice = (comp: Comp) => {
    const basePrice = parseFloat(comp.salePrice) || 0
    const subjectSqft = parseFloat(subjectProperty.sqft) || 0
    const compSqft = parseFloat(comp.sqft) || 0
    const sqftDiff = subjectSqft - compSqft
    const sqftAdjustment = sqftDiff * adjustments.sqftAdjustment

    const subjectBeds = parseFloat(subjectProperty.beds) || 0
    const compBeds = parseFloat(comp.beds) || 0
    const bedDiff = subjectBeds - compBeds
    const bedAdjustment = bedDiff * adjustments.bedAdjustment

    const subjectBaths = parseFloat(subjectProperty.baths) || 0
    const compBaths = parseFloat(comp.baths) || 0
    const bathDiff = subjectBaths - compBaths
    const bathAdjustment = bathDiff * adjustments.bathAdjustment

    return basePrice + sqftAdjustment + bedAdjustment + bathAdjustment
  }

  const calculateARV = () => {
    const validComps = comps.filter(c => c.salePrice && c.sqft)
    if (validComps.length === 0) return 0
    
    const adjustedPrices = validComps.map(calculateAdjustedPrice)
    return adjustedPrices.reduce((sum, price) => sum + price, 0) / adjustedPrices.length
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  const arv = calculateARV()

  const steps = [
    {
      title: 'Step 1: Identify Comparable Properties',
      content: 'Find 3-5 properties that sold within the last 6 months within 0.5 miles. They should be similar in size, age, beds/baths, and condition.',
      icon: MapPin
    },
    {
      title: 'Step 2: Analyze Sale Prices',
      content: 'Record the actual sale prices. Ignore active listings or pending sales. Focus on closed transactions only.',
      icon: DollarSign
    },
    {
      title: 'Step 3: Make Adjustments',
      content: 'Adjust for differences in square footage, bedrooms, bathrooms, condition, and lot size. Use the adjustment calculator below.',
      icon: Calculator
    },
    {
      title: 'Step 4: Calculate ARV',
      content: 'After adjustments, average the comparable prices. This gives you the After Repair Value for your subject property.',
      icon: TrendingUp
    }
  ]

  return (
    <div className="space-y-6">
      {/* Guide Steps */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          Step-by-Step Comp Analysis Guide
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <step.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">{step.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{step.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Property */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Home className="h-5 w-5 text-green-500" />
          Subject Property (Your Flip)
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
            <input
              type="text"
              value={subjectProperty.address}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, address: e.target.value })}
              placeholder="123 Main St, City, State ZIP"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
            <input
              type="number"
              value={subjectProperty.sqft}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, sqft: e.target.value })}
              placeholder="1500"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <input
              type="number"
              value={subjectProperty.beds}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, beds: e.target.value })}
              placeholder="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
            <input
              type="number"
              value={subjectProperty.baths}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, baths: e.target.value })}
              placeholder="2"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
            <input
              type="number"
              value={subjectProperty.yearBuilt}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, yearBuilt: e.target.value })}
              placeholder="1990"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              value={subjectProperty.condition}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, condition: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="poor">Poor (Needs major rehab)</option>
              <option value="average">Average (Some updates needed)</option>
              <option value="good">Good (Move-in ready)</option>
              <option value="excellent">Excellent (Recently renovated)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comparable Properties */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-500" />
            Comparable Properties
          </h3>
          <button
            onClick={addComp}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Comp
          </button>
        </div>
        
        <div className="space-y-4">
          {comps.map((comp, index) => (
            <div key={comp.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Comp {index + 1}</h4>
                {comps.length > 1 && (
                  <button
                    onClick={() => removeComp(comp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="grid md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Address"
                  value={comp.address}
                  onChange={(e) => updateComp(comp.id, 'address', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Sale Price"
                  value={comp.salePrice}
                  onChange={(e) => updateComp(comp.id, 'salePrice', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Sqft"
                  value={comp.sqft}
                  onChange={(e) => updateComp(comp.id, 'sqft', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Beds"
                  value={comp.beds}
                  onChange={(e) => updateComp(comp.id, 'beds', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Baths"
                  value={comp.baths}
                  onChange={(e) => updateComp(comp.id, 'baths', e.target.value)}
                  step="0.5"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Year Built"
                  value={comp.yearBuilt}
                  onChange={(e) => updateComp(comp.id, 'yearBuilt', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Days on Market"
                  value={comp.daysOnMarket}
                  onChange={(e) => updateComp(comp.id, 'daysOnMarket', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Distance (miles)"
                  value={comp.distance}
                  onChange={(e) => updateComp(comp.id, 'distance', e.target.value)}
                  step="0.1"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              
              {comp.salePrice && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Adjusted Price: <span className="font-semibold text-blue-600">{formatCurrency(calculateAdjustedPrice(comp))}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ARV Result */}
      {arv > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculated After Repair Value (ARV)</h3>
            <p className="text-4xl font-bold text-green-600">{formatCurrency(arv)}</p>
            <p className="text-sm text-gray-600 mt-2">
              Based on {comps.filter(c => c.salePrice).length} comparable properties with adjustments
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
