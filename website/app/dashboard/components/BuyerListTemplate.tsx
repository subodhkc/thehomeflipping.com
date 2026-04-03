'use client'

import { useState } from 'react'
import { Users, Plus, Trash2, Phone, Mail, Home, DollarSign, FileText } from 'lucide-react'

interface Buyer {
  id: string
  name: string
  company: string
  phone: string
  email: string
  preferredAreas: string
  priceRange: string
  propertyTypes: string[]
  cashBuyer: boolean
  notes: string
  dateAdded: string
  lastContact: string
  status: 'active' | 'inactive' | 'hot'
}

export function BuyerListTemplate() {
  const [buyers, setBuyers] = useState<Buyer[]>([
    {
      id: '1',
      name: '',
      company: '',
      phone: '',
      email: '',
      preferredAreas: '',
      priceRange: '',
      propertyTypes: [],
      cashBuyer: false,
      notes: '',
      dateAdded: new Date().toISOString().split('T')[0],
      lastContact: '',
      status: 'active'
    }
  ])

  const propertyTypeOptions = ['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Commercial', 'Land']

  const addBuyer = () => {
    const newId = (buyers.length + 1).toString()
    setBuyers([...buyers, {
      id: newId,
      name: '',
      company: '',
      phone: '',
      email: '',
      preferredAreas: '',
      priceRange: '',
      propertyTypes: [],
      cashBuyer: false,
      notes: '',
      dateAdded: new Date().toISOString().split('T')[0],
      lastContact: '',
      status: 'active'
    }])
  }

  const removeBuyer = (id: string) => {
    if (buyers.length > 1) {
      setBuyers(buyers.filter(b => b.id !== id))
    }
  }

  const updateBuyer = (id: string, field: keyof Buyer, value: any) => {
    setBuyers(buyers.map(b => b.id === id ? { ...b, [field]: value } : b))
  }

  const togglePropertyType = (buyerId: string, type: string) => {
    const buyer = buyers.find(b => b.id === buyerId)
    if (buyer) {
      const newTypes = buyer.propertyTypes.includes(type)
        ? buyer.propertyTypes.filter(t => t !== type)
        : [...buyer.propertyTypes, type]
      updateBuyer(buyerId, 'propertyTypes', newTypes)
    }
  }

  const activeBuyers = buyers.filter(b => b.name && b.status === 'active').length
  const cashBuyers = buyers.filter(b => b.cashBuyer && b.name).length
  const totalBuyers = buyers.filter(b => b.name).length

  const exportToCSV = () => {
    const data = buyers.filter(b => b.name).map(buyer => ({
      Name: buyer.name,
      Company: buyer.company,
      Phone: buyer.phone,
      Email: buyer.email,
      'Preferred Areas': buyer.preferredAreas,
      'Price Range': buyer.priceRange,
      'Property Types': buyer.propertyTypes.join(', '),
      'Cash Buyer': buyer.cashBuyer ? 'Yes' : 'No',
      Status: buyer.status,
      'Date Added': buyer.dateAdded,
      'Last Contact': buyer.lastContact,
      Notes: buyer.notes
    }))

    if (data.length === 0) return

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `buyer-list-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Cash Buyer Database
          </h3>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FileText className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{totalBuyers}</p>
            <p className="text-sm text-gray-600">Total Buyers</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{activeBuyers}</p>
            <p className="text-sm text-gray-600">Active Buyers</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{cashBuyers}</p>
            <p className="text-sm text-gray-600">Cash Buyers</p>
          </div>
        </div>
      </div>

      {/* Buyer Forms */}
      <div className="space-y-4">
        {buyers.map((buyer, index) => (
          <div key={buyer.id} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Buyer {index + 1}</h4>
              {buyers.length > 1 && (
                <button
                  onClick={() => removeBuyer(buyer.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={buyer.name}
                  onChange={(e) => updateBuyer(buyer.id, 'name', e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={buyer.company}
                  onChange={(e) => updateBuyer(buyer.id, 'company', e.target.value)}
                  placeholder="Smith Investments LLC"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={buyer.phone}
                  onChange={(e) => updateBuyer(buyer.id, 'phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={buyer.email}
                  onChange={(e) => updateBuyer(buyer.id, 'email', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Home className="h-4 w-4 inline mr-1" />
                  Preferred Areas
                </label>
                <input
                  type="text"
                  value={buyer.preferredAreas}
                  onChange={(e) => updateBuyer(buyer.id, 'preferredAreas', e.target.value)}
                  placeholder="Downtown, Midtown, Northside"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  Price Range
                </label>
                <input
                  type="text"
                  value={buyer.priceRange}
                  onChange={(e) => updateBuyer(buyer.id, 'priceRange', e.target.value)}
                  placeholder="$100k - $300k"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Types</label>
              <div className="flex flex-wrap gap-2">
                {propertyTypeOptions.map(type => (
                  <button
                    key={type}
                    onClick={() => togglePropertyType(buyer.id, type)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      buyer.propertyTypes.includes(type)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cash Buyer</label>
                <input
                  type="checkbox"
                  checked={buyer.cashBuyer}
                  onChange={(e) => updateBuyer(buyer.id, 'cashBuyer', e.target.checked)}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={buyer.status}
                  onChange={(e) => updateBuyer(buyer.id, 'status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="active">Active</option>
                  <option value="hot">Hot Lead</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Added</label>
                <input
                  type="date"
                  value={buyer.dateAdded}
                  onChange={(e) => updateBuyer(buyer.id, 'dateAdded', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Contact</label>
                <input
                  type="date"
                  value={buyer.lastContact}
                  onChange={(e) => updateBuyer(buyer.id, 'lastContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={buyer.notes}
                onChange={(e) => updateBuyer(buyer.id, 'notes', e.target.value)}
                placeholder="Additional notes about this buyer..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Buyer Button */}
      <button
        onClick={addBuyer}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Add Another Buyer
      </button>

      {/* Quick Tips */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Quick Tips for Building Your Buyer List</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Attend local REIA (Real Estate Investors Association) meetings</li>
          <li>• Network with other wholesalers and ask for their buyer lists</li>
          <li>• Post on social media groups for real estate investors in your area</li>
          <li>• Build relationships with property management companies</li>
          <li>• Always verify cash buyer capability with proof of funds</li>
          <li>• Keep your buyer list updated - contact inactive buyers quarterly</li>
        </ul>
      </div>
    </div>
  )
}
