'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, Hammer, ArrowRight, Plus, Minus } from 'lucide-react'

const rehabCategories = [
  {
    name: 'Kitchen',
    items: [
      { name: 'Cabinet Refinishing', lowCost: 1500, highCost: 4000 },
      { name: 'New Cabinets (Stock)', lowCost: 4000, highCost: 8000 },
      { name: 'New Cabinets (Custom)', lowCost: 10000, highCost: 25000 },
      { name: 'Countertops (Laminate)', lowCost: 500, highCost: 1500 },
      { name: 'Countertops (Granite/Quartz)', lowCost: 2000, highCost: 5000 },
      { name: 'Appliances (Basic Package)', lowCost: 1500, highCost: 3000 },
      { name: 'Appliances (Mid-Range)', lowCost: 3000, highCost: 6000 },
      { name: 'Sink & Faucet', lowCost: 300, highCost: 800 },
      { name: 'Backsplash', lowCost: 400, highCost: 1500 },
    ],
  },
  {
    name: 'Bathroom',
    items: [
      { name: 'Full Remodel (Budget)', lowCost: 3000, highCost: 6000 },
      { name: 'Full Remodel (Mid-Range)', lowCost: 8000, highCost: 15000 },
      { name: 'Vanity & Sink', lowCost: 300, highCost: 1200 },
      { name: 'Toilet', lowCost: 150, highCost: 400 },
      { name: 'Tub/Shower (Refinish)', lowCost: 300, highCost: 600 },
      { name: 'Tub/Shower (Replace)', lowCost: 1000, highCost: 3000 },
      { name: 'Tile Floor', lowCost: 400, highCost: 1200 },
      { name: 'Tile Walls', lowCost: 600, highCost: 2000 },
    ],
  },
  {
    name: 'Flooring',
    items: [
      { name: 'Carpet (per sqft)', lowCost: 3, highCost: 6, perSqft: true },
      { name: 'Laminate (per sqft)', lowCost: 4, highCost: 8, perSqft: true },
      { name: 'LVP/LVT (per sqft)', lowCost: 5, highCost: 10, perSqft: true },
      { name: 'Hardwood (per sqft)', lowCost: 8, highCost: 15, perSqft: true },
      { name: 'Tile (per sqft)', lowCost: 6, highCost: 12, perSqft: true },
      { name: 'Hardwood Refinish (per sqft)', lowCost: 3, highCost: 6, perSqft: true },
    ],
  },
  {
    name: 'Paint & Drywall',
    items: [
      { name: 'Interior Paint (per sqft)', lowCost: 1.5, highCost: 3, perSqft: true },
      { name: 'Exterior Paint', lowCost: 2000, highCost: 6000 },
      { name: 'Drywall Repair (minor)', lowCost: 200, highCost: 500 },
      { name: 'Drywall Repair (major)', lowCost: 1000, highCost: 3000 },
      { name: 'Popcorn Ceiling Removal (per sqft)', lowCost: 1, highCost: 2, perSqft: true },
    ],
  },
  {
    name: 'Exterior',
    items: [
      { name: 'Roof (Asphalt Shingles)', lowCost: 5000, highCost: 12000 },
      { name: 'Siding Repair', lowCost: 1000, highCost: 4000 },
      { name: 'Siding Replacement', lowCost: 6000, highCost: 15000 },
      { name: 'Windows (each)', lowCost: 300, highCost: 800 },
      { name: 'Entry Door', lowCost: 500, highCost: 2000 },
      { name: 'Garage Door', lowCost: 800, highCost: 2500 },
      { name: 'Deck/Patio Repair', lowCost: 500, highCost: 2000 },
      { name: 'Landscaping (Basic)', lowCost: 500, highCost: 2000 },
    ],
  },
  {
    name: 'Systems',
    items: [
      { name: 'HVAC Repair', lowCost: 500, highCost: 2000 },
      { name: 'HVAC Replacement', lowCost: 4000, highCost: 10000 },
      { name: 'Water Heater', lowCost: 800, highCost: 2000 },
      { name: 'Electrical Panel Upgrade', lowCost: 1500, highCost: 4000 },
      { name: 'Electrical (per outlet/switch)', lowCost: 75, highCost: 200 },
      { name: 'Plumbing Repair', lowCost: 300, highCost: 1500 },
      { name: 'Re-pipe House', lowCost: 4000, highCost: 10000 },
    ],
  },
]

interface SelectedItem {
  categoryName: string
  itemName: string
  quantity: number
  sqft?: number
  costLevel: 'low' | 'mid' | 'high'
}

export default function RehabCostEstimator() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [contingency, setContingency] = useState(10)

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Hammer className="h-4 w-4" />
              Free Calculator
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Rehab Cost Estimator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estimate renovation costs by selecting items from each category. Uses industry-standard pricing.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Categories */}
            <div className="lg:col-span-2 space-y-6">
              {rehabCategories.map((category) => (
                <div key={category.name} className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.name}</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
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
                              ? 'bg-primary-50 border-primary-300 text-primary-700'
                              : 'bg-white border-gray-200 hover:border-primary-300'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500">
                              {formatCurrency(item.lowCost)} - {formatCurrency(item.highCost)}
                              {(item as { perSqft?: boolean }).perSqft && '/sqft'}
                            </div>
                          </div>
                          {isSelected ? (
                            <Minus className="h-5 w-5 text-primary-600" />
                          ) : (
                            <Plus className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary-600" />
                  Cost Summary
                </h2>

                {selectedItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Select items from the categories to build your estimate
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedItems.map((item) => {
                      const category = rehabCategories.find((c) => c.name === item.categoryName)
                      const itemData = category?.items.find((i) => i.name === item.itemName)
                      const isPerSqft = (itemData as { perSqft?: boolean })?.perSqft

                      return (
                        <div key={`${item.categoryName}-${item.itemName}`} className="border-b border-gray-100 pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-sm">{item.itemName}</div>
                              <div className="text-xs text-gray-500">{item.categoryName}</div>
                            </div>
                            <button
                              onClick={() => removeItem(item.categoryName, item.itemName)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex gap-2 mb-2">
                            {isPerSqft ? (
                              <input
                                type="number"
                                value={item.sqft || 100}
                                onChange={(e) =>
                                  updateItem(item.categoryName, item.itemName, {
                                    sqft: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-20 px-2 py-1 border rounded text-sm"
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
                                className="w-16 px-2 py-1 border rounded text-sm"
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
                              className="flex-1 px-2 py-1 border rounded text-sm"
                            >
                              <option value="low">Low</option>
                              <option value="mid">Mid</option>
                              <option value="high">High</option>
                            </select>
                          </div>

                          <div className="text-right font-semibold text-primary-600">
                            {formatCurrency(getItemCost(item))}
                          </div>
                        </div>
                      )
                    })}

                    <div className="pt-4 space-y-3">
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
                            className="px-2 py-1 border rounded text-sm"
                          >
                            <option value="5">5%</option>
                            <option value="10">10%</option>
                            <option value="15">15%</option>
                            <option value="20">20%</option>
                          </select>
                        </div>
                        <span className="font-semibold">{formatCurrency(contingencyAmount)}</span>
                      </div>

                      <div className="flex justify-between text-lg font-bold pt-3 border-t">
                        <span>Total Estimate</span>
                        <span className="text-primary-600">{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t">
                  <Link href="/tools/max-offer-calculator" className="btn-primary w-full text-center block">
                    Use in Max Offer Calculator <ArrowRight className="inline h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Want a More Detailed Estimator?</h3>
              <p className="text-primary-100 mb-6">
                Get our 260+ line item spreadsheet with contractor pricing and scope of work templates.
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
