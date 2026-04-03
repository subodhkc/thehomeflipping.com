'use client'

import { useState } from 'react'
import { 
  Home, 
  Calculator, 
  FileText, 
  CheckSquare, 
  TrendingUp, 
  Users, 
  Settings, 
  Menu, 
  X,
  ChevronDown,
  Download,
  Save,
  HelpCircle,
  Bell,
  User
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTool: string
  onToolChange: (tool: string) => void
}

const tools = [
  {
    category: 'Analysis',
    icon: Calculator,
    items: [
      { id: 'max-offer', name: 'Max Offer Calculator', description: 'Calculate your maximum allowable offer' },
      { id: 'arv-cheat-sheet', name: 'ARV Calculator Cheat Sheet', description: 'Quick ARV calculations and formulas' },
      { id: 'comp-analysis-guide', name: 'Comp Analysis Guide', description: 'Step-by-step comp analysis' },
      { id: 'comp-analysis-template', name: 'Comp Analysis Template', description: 'Professional comp analysis tool' }
    ]
  },
  {
    category: 'Due Diligence',
    icon: CheckSquare,
    items: [
      { id: 'due-diligence-checklist', name: 'Due Diligence Checklist', description: 'Complete property inspection checklist' },
      { id: 'rehab-cost-estimator', name: 'Rehab Cost Estimator', description: 'Detailed renovation cost calculator' }
    ]
  },
  {
    category: 'Deal Management',
    icon: TrendingUp,
    items: [
      { id: 'deal-analyzer', name: 'Deal Analyzer', description: 'Comprehensive deal analysis tool' }
    ]
  },
  {
    category: 'Buyer Management',
    icon: Users,
    items: [
      { id: 'buyer-list-template', name: 'Buyer List Template', description: 'Manage your buyer database' }
    ]
  }
]

export function DashboardLayout({ children, activeTool, onToolChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Analysis'])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const getActiveToolInfo = () => {
    for (const category of tools) {
      const tool = category.items.find(item => item.id === activeTool)
      if (tool) {
        return { ...tool, category: category.category }
      }
    }
    return null
  }

  const activeToolInfo = getActiveToolInfo()

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FlipTools Pro</h1>
                <p className="text-sm text-gray-500">Professional Real Estate Analysis</p>
              </div>
            </div>

            {activeToolInfo && (
              <div className="hidden md:block ml-8 pl-8 border-l border-gray-200">
                <h2 className="text-sm font-medium text-gray-500">{activeToolInfo.category}</h2>
                <p className="text-lg font-semibold text-gray-900">{activeToolInfo.name}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="bg-gray-200 p-2 rounded-full">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Dashboard User</p>
                <p className="text-xs text-gray-500">Premium Access</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden`}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="space-y-6">
              {tools.map((category) => (
                <div key={category.category}>
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      {category.category}
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedCategories.includes(category.category) ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedCategories.includes(category.category) && (
                    <div className="mt-2 space-y-1">
                      {category.items.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => onToolChange(tool.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            activeTool === tool.id
                              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <p className="text-sm font-medium">{tool.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{tool.description}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Auto-saved</span>
            <span className="text-green-500">●</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
