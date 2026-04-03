'use client'

import { useState } from 'react'
import { CheckSquare, FileText, Home, AlertTriangle, CheckCircle, Clock, Download, Save } from 'lucide-react'

interface ChecklistItem {
  id: string
  category: string
  item: string
  checked: boolean
  notes: string
  priority: 'high' | 'medium' | 'low'
}

export function DueDiligenceChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // Property Details
    { id: '1', category: 'Property Details', item: 'Verify property address and legal description', checked: false, notes: '', priority: 'high' },
    { id: '2', category: 'Property Details', item: 'Confirm parcel number and zoning', checked: false, notes: '', priority: 'high' },
    { id: '3', category: 'Property Details', item: 'Check property boundaries and survey', checked: false, notes: '', priority: 'medium' },
    { id: '4', category: 'Property Details', item: 'Verify square footage (tax records vs actual)', checked: false, notes: '', priority: 'medium' },
    
    // Financial Analysis
    { id: '5', category: 'Financial Analysis', item: 'Analyze comparable sales (last 6 months)', checked: false, notes: '', priority: 'high' },
    { id: '6', category: 'Financial Analysis', item: 'Calculate ARV (After Repair Value)', checked: false, notes: '', priority: 'high' },
    { id: '7', category: 'Financial Analysis', item: 'Estimate repair costs accurately', checked: false, notes: '', priority: 'high' },
    { id: '8', category: 'Financial Analysis', item: 'Calculate maximum allowable offer', checked: false, notes: '', priority: 'high' },
    { id: '9', category: 'Financial Analysis', item: 'Analyze ROI and profit margins', checked: false, notes: '', priority: 'high' },
    { id: '10', category: 'Financial Analysis', item: 'Check rental rates and demand', checked: false, notes: '', priority: 'medium' },
    
    // Title and Legal
    { id: '11', category: 'Title and Legal', item: 'Order title search and commitment', checked: false, notes: '', priority: 'high' },
    { id: '12', category: 'Title and Legal', item: 'Check for liens and judgments', checked: false, notes: '', priority: 'high' },
    { id: '13', category: 'Title and Legal', item: 'Verify ownership history', checked: false, notes: '', priority: 'medium' },
    { id: '14', category: 'Title and Legal', item: 'Review easements and restrictions', checked: false, notes: '', priority: 'medium' },
    { id: '15', category: 'Title and Legal', item: 'Check for HOA and associated fees', checked: false, notes: '', priority: 'medium' },
    
    // Property Inspection
    { id: '16', category: 'Property Inspection', item: 'Schedule professional home inspection', checked: false, notes: '', priority: 'high' },
    { id: '17', category: 'Property Inspection', item: 'Inspect foundation and structure', checked: false, notes: '', priority: 'high' },
    { id: '18', category: 'Property Inspection', item: 'Check roof condition and age', checked: false, notes: '', priority: 'high' },
    { id: '19', category: 'Property Inspection', item: 'Test HVAC system', checked: false, notes: '', priority: 'high' },
    { id: '20', category: 'Property Inspection', item: 'Inspect electrical system', checked: false, notes: '', priority: 'high' },
    { id: '21', category: 'Property Inspection', item: 'Check plumbing and water pressure', checked: false, notes: '', priority: 'high' },
    { id: '22', category: 'Property Inspection', item: 'Test for water damage and mold', checked: false, notes: '', priority: 'high' },
    { id: '23', category: 'Property Inspection', item: 'Inspect windows and doors', checked: false, notes: '', priority: 'medium' },
    { id: '24', category: 'Property Inspection', item: 'Check attic and insulation', checked: false, notes: '', priority: 'medium' },
    
    // Environmental
    { id: '25', category: 'Environmental', item: 'Check for lead paint (pre-1978)', checked: false, notes: '', priority: 'high' },
    { id: '26', category: 'Environmental', item: 'Test for asbestos', checked: false, notes: '', priority: 'medium' },
    { id: '27', category: 'Environmental', item: 'Check for radon gas', checked: false, notes: '', priority: 'medium' },
    { id: '28', category: 'Environmental', item: 'Verify flood zone status', checked: false, notes: '', priority: 'medium' },
    { id: '29', category: 'Environmental', item: 'Check for underground storage tanks', checked: false, notes: '', priority: 'low' },
    
    // Market Analysis
    { id: '30', category: 'Market Analysis', item: 'Research neighborhood trends', checked: false, notes: '', priority: 'high' },
    { id: '31', category: 'Market Analysis', item: 'Check crime rates and safety', checked: false, notes: '', priority: 'medium' },
    { id: '32', category: 'Market Analysis', item: 'Analyze school district ratings', checked: false, notes: '', priority: 'medium' },
    { id: '33', category: 'Market Analysis', item: 'Check local amenities and development', checked: false, notes: '', priority: 'medium' },
    { id: '34', category: 'Market Analysis', item: 'Research future area developments', checked: false, notes: '', priority: 'low' },
    
    // Utilities and Services
    { id: '35', category: 'Utilities and Services', item: 'Verify water and sewer availability', checked: false, notes: '', priority: 'high' },
    { id: '36', category: 'Utilities and Services', item: 'Check electrical service capacity', checked: false, notes: '', priority: 'medium' },
    { id: '37', category: 'Utilities and Services', item: 'Verify gas line availability', checked: false, notes: '', priority: 'medium' },
    { id: '38', category: 'Utilities and Services', item: 'Check internet and cable options', checked: false, notes: '', priority: 'low' },
    
    // Insurance and Taxes
    { id: '39', category: 'Insurance and Taxes', item: 'Get property insurance quotes', checked: false, notes: '', priority: 'high' },
    { id: '40', category: 'Insurance and Taxes', item: 'Verify current property taxes', checked: false, notes: '', priority: 'high' },
    { id: '41', category: 'Insurance and Taxes', item: 'Check for special assessments', checked: false, notes: '', priority: 'medium' },
    { id: '42', category: 'Insurance and Taxes', item: 'Research tax implications', checked: false, notes: '', priority: 'medium' }
  ])

  const categories = Array.from(new Set(checklist.map(item => item.category)))

  const toggleItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const updateNotes = (id: string, notes: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, notes } : item
    ))
  }

  const getProgress = () => {
    const checked = checklist.filter(item => item.checked).length
    const total = checklist.length
    return { checked, total, percentage: Math.round((checked / total) * 100) }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const exportChecklist = () => {
    const data = checklist.map(item => ({
      Category: item.category,
      Item: item.item,
      Status: item.checked ? 'Completed' : 'Pending',
      Priority: item.priority,
      Notes: item.notes
    }))
    
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'due-diligence-checklist.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const progress = getProgress()

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-blue-500" />
            Due Diligence Checklist
          </h3>
          
          <button
            onClick={exportChecklist}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{progress.checked} of {progress.total} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">{progress.percentage}% Complete</p>
        </div>
      </div>

      {/* Checklist by Category */}
      {categories.map(category => {
        const categoryItems = checklist.filter(item => item.category === category)
        const categoryCompleted = categoryItems.filter(item => item.checked).length
        
        return (
          <div key={category} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{category}</h4>
              <span className="text-sm text-gray-500">
                {categoryCompleted} / {categoryItems.length} completed
              </span>
            </div>
            
            <div className="space-y-3">
              {categoryItems.map(item => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(item.id)}
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <label className={`font-medium ${item.checked ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {item.item}
                        </label>
                        {getPriorityIcon(item.priority)}
                      </div>
                      
                      <textarea
                        value={item.notes}
                        onChange={(e) => updateNotes(item.id, e.target.value)}
                        placeholder="Add notes..."
                        className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
