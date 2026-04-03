'use client'

import { useState } from 'react'
import { FileText, Download, Plus, Trash2, Calculator, TrendingUp, MapPin } from 'lucide-react'

interface CompProperty {
  id: string
  address: string
  salePrice: string
  sqft: string
  beds: string
  baths: string
  lotSize: string
  yearBuilt: string
  condition: 'poor' | 'fair' | 'average' | 'good' | 'excellent'
  garage: string
  pool: boolean
  view: 'none' | 'standard' | 'premium'
  daysOnMarket: string
  saleDate: string
  distance: string
  notes: string
}

export function CompAnalysisTemplate() {
  const [subjectProperty, setSubjectProperty] = useState({
    address: '',
    sqft: '',
    beds: '',
    baths: '',
    lotSize: '',
    yearBuilt: '',
    condition: 'average' as const,
    garage: '2',
    pool: false,
    view: 'standard' as const
  })

  const [comps, setComps] = useState<CompProperty[]>([
    {
      id: '1',
      address: '',
      salePrice: '',
      sqft: '',
      beds: '',
      baths: '',
      lotSize: '',
      yearBuilt: '',
      condition: 'average',
      garage: '2',
      pool: false,
      view: 'standard',
      daysOnMarket: '',
      saleDate: '',
      distance: '',
      notes: ''
    }
  ])

  const addComp = () => {
    const newId = (comps.length + 1).toString()
    setComps([...comps, {
      id: newId,
      address: '',
      salePrice: '',
      sqft: '',
      beds: '',
      baths: '',
      lotSize: '',
      yearBuilt: '',
      condition: 'average',
      garage: '2',
      pool: false,
      view: 'standard',
      daysOnMarket: '',
      saleDate: '',
      distance: '',
      notes: ''
    }])
  }

  const removeComp = (id: string) => {
    if (comps.length > 1) {
      setComps(comps.filter(c => c.id !== id))
    }
  }

  const updateComp = (id: string, field: keyof CompProperty, value: any) => {
    setComps(comps.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const calculatePricePerSqft = (comp: CompProperty) => {
    const price = parseFloat(comp.salePrice) || 0
    const sqft = parseFloat(comp.sqft) || 1
    return price / sqft
  }

  const calculateAdjustedPricePerSqft = (comp: CompProperty) => {
    let basePricePerSqft = calculatePricePerSqft(comp)
    
    // Condition adjustments
    const conditionAdjustments: Record<string, number> = {
      poor: -15,
      fair: -10,
      average: 0,
      good: 10,
      excellent: 15
    }
    
    const subjectCondition = conditionAdjustments[subjectProperty.condition] || 0
    const compCondition = conditionAdjustments[comp.condition] || 0
    const conditionDiff = subjectCondition - compCondition
    basePricePerSqft += (basePricePerSqft * conditionDiff / 100)
    
    // Pool adjustment
    if (subjectProperty.pool && !comp.pool) basePricePerSqft += 5
    if (!subjectProperty.pool && comp.pool) basePricePerSqft -= 5
    
    // View adjustment
    const viewAdjustments: Record<string, number> = {
      none: -5,
      standard: 0,
      premium: 10
    }
    const subjectView = viewAdjustments[subjectProperty.view] || 0
    const compView = viewAdjustments[comp.view] || 0
    const viewDiff = subjectView - compView
    basePricePerSqft += (basePricePerSqft * viewDiff / 100)
    
    return basePricePerSqft
  }

  const calculateARV = () => {
    const validComps = comps.filter(c => c.salePrice && c.sqft)
    if (validComps.length === 0) return 0
    
    const adjustedPricePerSqft = validComps.map(calculateAdjustedPricePerSqft)
    const avgPricePerSqft = adjustedPricePerSqft.reduce((sum, p) => sum + p, 0) / adjustedPricePerSqft.length
    const subjectSqft = parseFloat(subjectProperty.sqft) || 1500
    return avgPricePerSqft * subjectSqft
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  const exportAnalysis = () => {
    const arv = calculateARV()
    const data = {
      subjectProperty,
      comps,
      analysis: {
        estimatedARV: arv,
        avgPricePerSqft: comps.filter(c => c.salePrice && c.sqft).length > 0 
          ? comps.filter(c => c.salePrice && c.sqft).reduce((sum, c) => sum + calculateAdjustedPricePerSqft(c), 0) / comps.filter(c => c.salePrice && c.sqft).length
          : 0,
        compCount: comps.filter(c => c.salePrice && c.sqft).length,
        date: new Date().toISOString()
      }
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `comp-analysis-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const arv = calculateARV()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Professional Comp Analysis Template
          </h3>
          <button
            onClick={exportAnalysis}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Export Analysis
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Complete professional-grade comparable analysis with automatic adjustments for condition, amenities, and market factors.
        </p>
      </div>

      {/* Subject Property */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-500" />
          Subject Property Details
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Lot Size (sqft)</label>
            <input
              type="number"
              value={subjectProperty.lotSize}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, lotSize: e.target.value })}
              placeholder="5000"
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
              onChange={(e) => setSubjectProperty({ ...subjectProperty, condition: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="poor">Poor</option>
              <option value="fair">Fair</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Garage Spaces</label>
            <input
              type="number"
              value={subjectProperty.garage}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, garage: e.target.value })}
              placeholder="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
            <select
              value={subjectProperty.view}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, view: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="none">None</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={subjectProperty.pool}
              onChange={(e) => setSubjectProperty({ ...subjectProperty, pool: e.target.checked })}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">Has Pool</label>
          </div>
        </div>
      </div>

      {/* Comparable Properties */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Comparable Properties</h3>
          <button
            onClick={addComp}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            Add Comp
          </button>
        </div>
        
        <div className="space-y-4">
          {comps.map((comp, index) => (
            <div key={comp.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Comparable {index + 1}</h4>
                {comps.length > 1 && (
                  <button
                    onClick={() => removeComp(comp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="grid md:grid-cols-4 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Address"
                  value={comp.address}
                  onChange={(e) => updateComp(comp.id, 'address', e.target.value)}
                  className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
              </div>
              
              <div className="grid md:grid-cols-6 gap-3 mb-3">
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
                  step="0.5"
                  value={comp.baths}
                  onChange={(e) => updateComp(comp.id, 'baths', e.target.value)}
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
                  type="date"
                  placeholder="Sale Date"
                  value={comp.saleDate}
                  onChange={(e) => updateComp(comp.id, 'saleDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Distance (mi)"
                  step="0.1"
                  value={comp.distance}
                  onChange={(e) => updateComp(comp.id, 'distance', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-3 mb-3">
                <select
                  value={comp.condition}
                  onChange={(e) => updateComp(comp.id, 'condition', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="poor">Poor Condition</option>
                  <option value="fair">Fair Condition</option>
                  <option value="average">Average Condition</option>
                  <option value="good">Good Condition</option>
                  <option value="excellent">Excellent Condition</option>
                </select>
                
                <select
                  value={comp.view}
                  onChange={(e) => updateComp(comp.id, 'view', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="none">No View</option>
                  <option value="standard">Standard View</option>
                  <option value="premium">Premium View</option>
                </select>
                
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                  <input
                    type="checkbox"
                    checked={comp.pool}
                    onChange={(e) => updateComp(comp.id, 'pool', e.target.checked)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">Has Pool</span>
                </div>
              </div>
              
              <textarea
                placeholder="Notes about this comparable..."
                value={comp.notes}
                onChange={(e) => updateComp(comp.id, 'notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={2}
              />
              
              {comp.salePrice && comp.sqft && (
                <div className="mt-3 flex gap-4 text-sm">
                  <span className="text-gray-600">
                    Base $/sqft: <strong>{formatCurrency(calculatePricePerSqft(comp))}</strong>
                  </span>
                  <span className="text-gray-600">
                    Adjusted $/sqft: <strong className="text-blue-600">{formatCurrency(calculateAdjustedPricePerSqft(comp))}</strong>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ARV Calculation */}
      {arv > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Estimated After Repair Value</h3>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-green-600">{formatCurrency(arv)}</p>
            <p className="text-sm text-gray-600 mt-2">
              Based on {comps.filter(c => c.salePrice && c.sqft).length} comparable properties with adjustments
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Average Price/Sqft</p>
              <p className="text-xl font-semibold text-gray-900">
                {comps.filter(c => c.salePrice && c.sqft).length > 0
                  ? formatCurrency(comps.filter(c => c.salePrice && c.sqft).reduce((sum, c) => sum + calculateAdjustedPricePerSqft(c), 0) / comps.filter(c => c.salePrice && c.sqft).length)
                  : '$0'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Subject Sqft</p>
              <p className="text-xl font-semibold text-gray-900">{subjectProperty.sqft || '1500'}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Analysis Date</p>
              <p className="text-xl font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
