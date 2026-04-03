'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, Hammer, ArrowRight, Plus, Minus, Zap, List } from 'lucide-react'

// Updated 2024/2025 pricing
const rehabCategories = [
  {
    name: 'Kitchen',
    icon: '🍳',
    items: [
      { name: 'Cabinet Refinishing', lowCost: 1800, highCost: 4500 },
      { name: 'New Cabinets (Stock)', lowCost: 5000, highCost: 10000 },
      { name: 'New Cabinets (Semi-Custom)', lowCost: 10000, highCost: 18000 },
      { name: 'New Cabinets (Custom)', lowCost: 18000, highCost: 35000 },
      { name: 'Countertops (Laminate)', lowCost: 600, highCost: 1800 },
      { name: 'Countertops (Granite/Quartz)', lowCost: 2500, highCost: 6000 },
      { name: 'Appliances (Basic Package)', lowCost: 1800, highCost: 3500 },
      { name: 'Appliances (Mid-Range Package)', lowCost: 3500, highCost: 7000 },
      { name: 'Sink & Faucet', lowCost: 350, highCost: 1000 },
      { name: 'Backsplash', lowCost: 500, highCost: 2000 },
      { name: 'Kitchen Island', lowCost: 2000, highCost: 6000 },
    ],
  },
  {
    name: 'Bathroom',
    icon: '🚿',
    items: [
      { name: 'Full Remodel (Budget)', lowCost: 4000, highCost: 8000 },
      { name: 'Full Remodel (Mid-Range)', lowCost: 10000, highCost: 18000 },
      { name: 'Full Remodel (Luxury)', lowCost: 20000, highCost: 40000 },
      { name: 'Vanity & Sink', lowCost: 400, highCost: 1500 },
      { name: 'Toilet (Standard)', lowCost: 200, highCost: 500 },
      { name: 'Tub/Shower (Refinish)', lowCost: 400, highCost: 700 },
      { name: 'Tub/Shower (Replace)', lowCost: 1200, highCost: 4000 },
      { name: 'Walk-In Shower (New)', lowCost: 3500, highCost: 8000 },
      { name: 'Tile Floor', lowCost: 500, highCost: 1500 },
      { name: 'Tile Walls', lowCost: 700, highCost: 2500 },
      { name: 'Exhaust Fan', lowCost: 150, highCost: 400 },
    ],
  },
  {
    name: 'Flooring',
    icon: '🏠',
    items: [
      { name: 'Carpet (per sqft)', lowCost: 3.5, highCost: 7, perSqft: true },
      { name: 'Laminate (per sqft)', lowCost: 4.5, highCost: 9, perSqft: true },
      { name: 'LVP/LVT (per sqft)', lowCost: 5.5, highCost: 11, perSqft: true },
      { name: 'Hardwood (per sqft)', lowCost: 9, highCost: 18, perSqft: true },
      { name: 'Engineered Hardwood (per sqft)', lowCost: 6, highCost: 14, perSqft: true },
      { name: 'Tile (per sqft)', lowCost: 7, highCost: 14, perSqft: true },
      { name: 'Hardwood Refinish (per sqft)', lowCost: 3, highCost: 6, perSqft: true },
      { name: 'Subfloor Repair (per sqft)', lowCost: 3, highCost: 8, perSqft: true },
    ],
  },
  {
    name: 'Paint & Drywall',
    icon: '🎨',
    items: [
      { name: 'Interior Paint (per sqft)', lowCost: 2, highCost: 4, perSqft: true },
      { name: 'Exterior Paint (full house)', lowCost: 2500, highCost: 7000 },
      { name: 'Drywall Repair (minor)', lowCost: 250, highCost: 600 },
      { name: 'Drywall Repair (major)', lowCost: 1200, highCost: 4000 },
      { name: 'Drywall Install (per sqft)', lowCost: 2, highCost: 5, perSqft: true },
      { name: 'Popcorn Ceiling Removal (per sqft)', lowCost: 1.5, highCost: 3.5, perSqft: true },
      { name: 'Texture Matching', lowCost: 300, highCost: 800 },
    ],
  },
  {
    name: 'Exterior',
    icon: '🏡',
    items: [
      { name: 'Roof - Asphalt Shingles (full)', lowCost: 6000, highCost: 14000 },
      { name: 'Roof - Architectural Shingles', lowCost: 8000, highCost: 18000 },
      { name: 'Roof Repair (partial)', lowCost: 800, highCost: 3000 },
      { name: 'Siding Repair', lowCost: 1200, highCost: 5000 },
      { name: 'Siding Replacement (vinyl)', lowCost: 7000, highCost: 16000 },
      { name: 'Windows (each)', lowCost: 400, highCost: 1000 },
      { name: 'Entry Door (incl. install)', lowCost: 600, highCost: 2500 },
      { name: 'Garage Door (incl. install)', lowCost: 1000, highCost: 3000 },
      { name: 'Deck/Patio Repair', lowCost: 600, highCost: 2500 },
      { name: 'Deck Build (new, per sqft)', lowCost: 20, highCost: 45, perSqft: true },
      { name: 'Landscaping (basic curb appeal)', lowCost: 700, highCost: 2500 },
      { name: 'Driveway (reseal/repair)', lowCost: 300, highCost: 1200 },
    ],
  },
  {
    name: 'Systems',
    icon: '⚙️',
    items: [
      { name: 'HVAC Repair', lowCost: 600, highCost: 2500 },
      { name: 'HVAC Replacement (central)', lowCost: 6000, highCost: 14000 },
      { name: 'Mini-Split System', lowCost: 2000, highCost: 6000 },
      { name: 'Water Heater (standard)', lowCost: 900, highCost: 2200 },
      { name: 'Water Heater (tankless)', lowCost: 1500, highCost: 3500 },
      { name: 'Electrical Panel Upgrade', lowCost: 2000, highCost: 5000 },
      { name: 'Electrical (per outlet/switch)', lowCost: 100, highCost: 250 },
      { name: 'Whole House Rewire', lowCost: 8000, highCost: 20000 },
      { name: 'Plumbing Repair', lowCost: 400, highCost: 2000 },
      { name: 'Re-pipe House', lowCost: 5000, highCost: 12000 },
      { name: 'Sewer Line Repair', lowCost: 2500, highCost: 8000 },
      { name: 'Foundation Repair (minor)', lowCost: 2000, highCost: 8000 },
    ],
  },
]

const quickEstimateLevels = [
  {
    level: 'light',
    label: 'Light Rehab',
    description: 'Cosmetic only: fresh paint, carpet, fixtures, cleaning',
    lowPerSqft: 15,
    highPerSqft: 25,
    color: 'bg-green-50 border-green-300 text-green-800',
    badge: 'bg-green-100 text-green-700',
  },
  {
    level: 'medium',
    label: 'Medium Rehab',
    description: 'Kitchen update, bath refresh, new flooring, HVAC service',
    lowPerSqft: 30,
    highPerSqft: 50,
    color: 'bg-blue-50 border-blue-300 text-blue-800',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    level: 'heavy',
    label: 'Heavy Rehab',
    description: 'Full kitchen/bath gut, new systems, structural issues',
    lowPerSqft: 60,
    highPerSqft: 90,
    color: 'bg-orange-50 border-orange-300 text-orange-800',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    level: 'gut',
    label: 'Full Gut Renovation',
    description: 'Everything new — walls, systems, finishes, possibly addition',
    lowPerSqft: 100,
    highPerSqft: 150,
    color: 'bg-red-50 border-red-300 text-red-800',
    badge: 'bg-red-100 text-red-700',
  },
]

interface SelectedItem {
  categoryName: string
  itemName: string
  quantity: number
  sqft?: number
  costLevel: 'low' | 'mid' | 'high'
}

const CATEGORY_COLORS: Record<string, string> = {
  Kitchen: 'bg-amber-100 text-amber-700',
  Bathroom: 'bg-blue-100 text-blue-700',
  Flooring: 'bg-green-100 text-green-700',
  'Paint & Drywall': 'bg-purple-100 text-purple-700',
  Exterior: 'bg-orange-100 text-orange-700',
  Systems: 'bg-gray-100 text-gray-700',
}

export default function RehabCostEstimatorClient() {
  const [activeTab, setActiveTab] = useState<'quick' | 'detailed'>('quick')
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [contingency, setContingency] = useState(10)

  // Quick estimate state
  const [quickSqft, setQuickSqft] = useState<string>('')
  const [quickLevel, setQuickLevel] = useState<string>('medium')

  const addItem = (categoryName: string, item: typeof rehabCategories[0]['items'][0]) => {
    const existing = selectedItems.find(
      (si) => si.categoryName === categoryName && si.itemName === item.name
    )
    if (!existing) {
      setSelectedItems([
        ...selectedItems,
        {
          categoryName,
          itemName: item.name,
          quantity: 1,
          sqft: (item as { perSqft?: boolean }).perSqft ? 100 : undefined,
          costLevel: 'mid',
        },
      ])
    }
  }

  const removeItem = (categoryName: string, itemName: string) => {
    setSelectedItems(
      selectedItems.filter(
        (si) => !(si.categoryName === categoryName && si.itemName === itemName)
      )
    )
  }

  const updateItem = (categoryName: string, itemName: string, updates: Partial<SelectedItem>) => {
    setSelectedItems(
      selectedItems.map((si) =>
        si.categoryName === categoryName && si.itemName === itemName
          ? { ...si, ...updates }
          : si
      )
    )
  }

  const getItemCost = (selected: SelectedItem) => {
    const category = rehabCategories.find((c) => c.name === selected.categoryName)
    const item = category?.items.find((i) => i.name === selected.itemName)
    if (!item) return 0

    let baseCost = 0
    if (selected.costLevel === 'low') baseCost = item.lowCost
    else if (selected.costLevel === 'high') baseCost = item.highCost
    else baseCost = (item.lowCost + item.highCost) / 2

    if ((item as { perSqft?: boolean }).perSqft && selected.sqft) {
      return baseCost * selected.sqft
    }
    return baseCost * selected.quantity
  }

  const subtotal = selectedItems.reduce((sum, item) => sum + getItemCost(item), 0)
  const contingencyAmount = subtotal * (contingency / 100)
  const total = subtotal + contingencyAmount

  // Category breakdown for chart
  const categoryTotals = rehabCategories.map(cat => {
    const catTotal = selectedItems
      .filter(si => si.categoryName === cat.name)
      .reduce((sum, si) => sum + getItemCost(si), 0)
    return { name: cat.name, icon: cat.icon, total: catTotal }
  }).filter(c => c.total > 0)

  // Quick estimate calculations
  const quickSqftNum = parseFloat(quickSqft) || 0
  const quickLevelData = quickEstimateLevels.find(l => l.level === quickLevel) || quickEstimateLevels[1]
  const quickLow = quickSqftNum * quickLevelData.lowPerSqft
  const quickHigh = quickSqftNum * quickLevelData.highPerSqft
  const quickMid = (quickLow + quickHigh) / 2
  const quickContingencyAmt = quickMid * (contingency / 100)
  const quickTotal = quickMid + quickContingencyAmt

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Hammer className="h-4 w-4" />
              Free Calculator
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Rehab Cost Estimator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a quick ballpark or a detailed line-item renovation budget for your flip.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-gray-200 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('quick')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'quick'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Zap className="h-4 w-4" />
              Quick Estimate
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'detailed'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="h-4 w-4" />
              Detailed Estimate
            </button>
          </div>

          {/* Quick Estimate Tab */}
          {activeTab === 'quick' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-5">Property Information</h2>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Square Footage
                    </label>
                    <input
                      type="number"
                      value={quickSqft}
                      onChange={(e) => setQuickSqft(e.target.value)}
                      placeholder="1,500"
                      className="input-field"
                    />
                    <p className="text-xs text-gray-500 mt-1">Interior living area (not including garage)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Renovation Level</label>
                    <div className="space-y-3">
                      {quickEstimateLevels.map((level) => (
                        <button
                          key={level.level}
                          onClick={() => setQuickLevel(level.level)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            quickLevel === level.level
                              ? level.color + ' shadow-sm'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold">{level.label}</span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              quickLevel === level.level ? level.badge : 'bg-gray-100 text-gray-600'
                            }`}>
                              ${level.lowPerSqft}–${level.highPerSqft}/sqft
                            </span>
                          </div>
                          <p className="text-sm opacity-70">{level.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Contingency Reserve</label>
                    <select
                      value={contingency}
                      onChange={(e) => setContingency(parseInt(e.target.value))}
                      className="px-3 py-1.5 border rounded-lg text-sm"
                    >
                      <option value="5">5% — Light/newer home</option>
                      <option value="10">10% — Standard</option>
                      <option value="15">15% — Older home (pre-1980)</option>
                      <option value="20">20% — Major systems unknown</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500">Always add contingency — unexpected costs are the rule, not the exception.</p>
                </div>
              </div>

              {/* Quick Results */}
              <div className="space-y-5">
                {quickSqftNum > 0 ? (
                  <>
                    <div className="calculator-result">
                      <h2 className="text-lg font-semibold text-gray-700 mb-1">{quickLevelData.label} Estimate</h2>
                      <div className="text-4xl font-bold text-primary-700 my-3">
                        {formatCurrency(quickLow)} – {formatCurrency(quickHigh)}
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on {quickSqftNum.toLocaleString()} sqft × ${quickLevelData.lowPerSqft}–${quickLevelData.highPerSqft}/sqft
                      </p>
                    </div>

                    <div className="card">
                      <h3 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1.5 border-b border-gray-100">
                          <span className="text-gray-600">Low estimate ({quickLevelData.lowPerSqft}/sqft)</span>
                          <span className="font-semibold">{formatCurrency(quickLow)}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-gray-100">
                          <span className="text-gray-600">High estimate ({quickLevelData.highPerSqft}/sqft)</span>
                          <span className="font-semibold">{formatCurrency(quickHigh)}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-gray-100">
                          <span className="text-gray-600">Midpoint estimate</span>
                          <span className="font-semibold">{formatCurrency(quickMid)}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-gray-100">
                          <span className="text-gray-600">Contingency ({contingency}%)</span>
                          <span className="font-semibold text-orange-600">+{formatCurrency(quickContingencyAmt)}</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold text-base">
                          <span>Budget with Contingency</span>
                          <span className="text-primary-600">{formatCurrency(quickTotal)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-amber-50 border-amber-200">
                      <h3 className="font-semibold text-amber-900 mb-2">💡 Pro Tips for {quickLevelData.label}</h3>
                      <ul className="text-sm text-amber-800 space-y-1">
                        {quickLevel === 'light' && (
                          <>
                            <li>• Focus on paint, carpet, and lighting for max ROI</li>
                            <li>• Don&apos;t over-improve for the neighborhood</li>
                            <li>• Get 3 contractor bids before committing</li>
                          </>
                        )}
                        {quickLevel === 'medium' && (
                          <>
                            <li>• Kitchen and bath drive 80% of buyer value perception</li>
                            <li>• Price to the neighborhood — check comps first</li>
                            <li>• Inspect HVAC and roof before finalizing budget</li>
                          </>
                        )}
                        {quickLevel === 'heavy' && (
                          <>
                            <li>• Get a full structural inspection before purchasing</li>
                            <li>• Budget extra time — heavy rehabs often take 2× longer</li>
                            <li>• Pull permits for all major system work</li>
                          </>
                        )}
                        {quickLevel === 'gut' && (
                          <>
                            <li>• Hire a GC — do not self-manage a full gut renovation</li>
                            <li>• Carry a 25%+ contingency for unknown conditions</li>
                            <li>• Consider if the numbers support this level of investment</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => setActiveTab('detailed')}
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        Get Line-Item Detail <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="card flex flex-col items-center justify-center py-16 text-center">
                    <Hammer className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Enter square footage to estimate</h3>
                    <p className="text-sm text-gray-400 max-w-xs">
                      Select a renovation level and enter your property size to get an instant cost range.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Detailed Estimate Tab */}
          {activeTab === 'detailed' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-5">
                {rehabCategories.map((category) => (
                  <div key={category.name} className="card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {category.items.map((item) => {
                        const isSelected = selectedItems.some(
                          (si) => si.categoryName === category.name && si.itemName === item.name
                        )
                        return (
                          <button
                            key={item.name}
                            onClick={() =>
                              isSelected
                                ? removeItem(category.name, item.name)
                                : addItem(category.name, item)
                            }
                            className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                              isSelected
                                ? 'bg-orange-50 border-orange-300 text-orange-800'
                                : 'bg-white border-gray-200 hover:border-orange-200 hover:bg-orange-50/30'
                            }`}
                          >
                            <div>
                              <div className="font-medium text-sm">{item.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {formatCurrency(item.lowCost)} – {formatCurrency(item.highCost)}
                                {(item as { perSqft?: boolean }).perSqft && '/sqft'}
                              </div>
                            </div>
                            {isSelected ? (
                              <Minus className="h-4 w-4 text-orange-600 flex-shrink-0 ml-2" />
                            ) : (
                              <Plus className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="card sticky top-24 space-y-5">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-500" />
                    Cost Summary
                  </h2>

                  {selectedItems.length === 0 ? (
                    <div className="py-10 text-center">
                      <List className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">
                        Select items from the left to build your estimate
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedItems.map((item) => {
                        const category = rehabCategories.find((c) => c.name === item.categoryName)
                        const itemData = category?.items.find((i) => i.name === item.itemName)
                        const isPerSqft = (itemData as { perSqft?: boolean })?.perSqft

                        return (
                          <div key={`${item.categoryName}-${item.itemName}`} className="border-b border-gray-100 pb-3">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1 min-w-0 mr-2">
                                <div className="font-medium text-sm truncate">{item.itemName}</div>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[item.categoryName] || 'bg-gray-100 text-gray-600'}`}>
                                  {item.categoryName}
                                </span>
                              </div>
                              <button
                                onClick={() => removeItem(item.categoryName, item.itemName)}
                                className="text-red-400 hover:text-red-600 flex-shrink-0"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="flex gap-2 mb-1.5">
                              {isPerSqft ? (
                                <input
                                  type="number"
                                  value={item.sqft || 100}
                                  onChange={(e) =>
                                    updateItem(item.categoryName, item.itemName, {
                                      sqft: parseInt(e.target.value) || 0,
                                    })
                                  }
                                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                  placeholder="sqft"
                                />
                              ) : (
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateItem(item.categoryName, item.itemName, {
                                      quantity: parseInt(e.target.value) || 1,
                                    })
                                  }
                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                  min="1"
                                />
                              )}
                              <select
                                value={item.costLevel}
                                onChange={(e) =>
                                  updateItem(item.categoryName, item.itemName, {
                                    costLevel: e.target.value as 'low' | 'mid' | 'high',
                                  })
                                }
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                              >
                                <option value="low">Low</option>
                                <option value="mid">Mid</option>
                                <option value="high">High</option>
                              </select>
                            </div>

                            <div className="text-right font-semibold text-sm text-orange-600">
                              {formatCurrency(getItemCost(item))}
                            </div>
                          </div>
                        )
                      })}

                      {/* Category breakdown */}
                      {categoryTotals.length > 1 && (
                        <div className="pt-2">
                          <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">By Category</p>
                          <div className="space-y-1.5">
                            {categoryTotals.map(cat => (
                              <div key={cat.name} className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-100 rounded-full h-2">
                                  <div
                                    className="bg-orange-400 h-2 rounded-full"
                                    style={{ width: `${Math.min(100, (cat.total / subtotal) * 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500 w-16 text-right">{formatCurrency(cat.total)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 space-y-2.5 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span className="font-semibold">{formatCurrency(subtotal)}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span>Contingency</span>
                            <select
                              value={contingency}
                              onChange={(e) => setContingency(parseInt(e.target.value))}
                              className="px-2 py-1 border border-gray-300 rounded text-xs"
                            >
                              <option value="5">5%</option>
                              <option value="10">10%</option>
                              <option value="15">15%</option>
                              <option value="20">20%</option>
                            </select>
                          </div>
                          <span className="font-semibold text-orange-600">+{formatCurrency(contingencyAmount)}</span>
                        </div>

                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                          <span>Total Budget</span>
                          <span className="text-primary-600">{formatCurrency(total)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100">
                    <Link href="/tools/max-offer-calculator" className="btn-primary w-full text-center block text-sm">
                      Calculate Max Offer <ArrowRight className="inline h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 text-center">
            <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Want a 260+ Line Item Estimator?</h3>
              <p className="text-primary-100 mb-6">
                Get our detailed spreadsheet with contractor pricing, scope of work templates, and material lists.
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
