'use client'

import { useState } from 'react'
import {
  Home,
  Calculator,
  CheckSquare,
  TrendingUp,
  Users,
  Menu,
  X,
  ChevronDown,
  Download,
  HelpCircle,
  ExternalLink,
  BarChart3,
  FileText,
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
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    items: [
      { id: 'max-offer', name: 'Max Offer Calculator', description: 'Calculate your maximum allowable offer' },
      { id: 'arv-calculator', name: 'ARV Calculator', description: 'Estimate after repair value from comps' },
      { id: 'arv-cheat-sheet', name: 'ARV Cheat Sheet', description: 'Quick ARV formulas & reference' },
      { id: 'comp-analysis-guide', name: 'Comp Analysis Guide', description: 'Step-by-step comp analysis' },
      { id: 'comp-analysis-template', name: 'Comp Analysis Template', description: 'Professional comp analysis tool' },
    ],
  },
  {
    category: 'Due Diligence',
    icon: CheckSquare,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    items: [
      { id: 'due-diligence-checklist', name: 'Due Diligence Checklist', description: 'Complete property inspection checklist' },
      { id: 'rehab-cost-estimator', name: 'Rehab Cost Estimator', description: 'Detailed renovation cost calculator' },
    ],
  },
  {
    category: 'Deal Management',
    icon: TrendingUp,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    items: [
      { id: 'deal-analyzer', name: 'Deal Analyzer', description: 'Score deals & explore scenarios' },
    ],
  },
  {
    category: 'Buyer Management',
    icon: Users,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    items: [
      { id: 'buyer-list-template', name: 'Buyer List Template', description: 'Manage your cash buyer database' },
    ],
  },
]

const publicTools = [
  { name: 'Max Offer Calc', href: '/tools/max-offer-calculator' },
  { name: 'Rehab Estimator', href: '/tools/rehab-cost-estimator' },
  { name: 'Deal Analyzer', href: '/tools/deal-analyzer' },
  { name: 'Roofing Calc', href: '/tools/roofing-calculator' },
]

export function DashboardLayout({ children, activeTool, onToolChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Analysis', 'Due Diligence', 'Deal Management'])

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
      if (tool) return { ...tool, category: category.category }
    }
    return null
  }

  const activeToolInfo = getActiveToolInfo()

  const totalTools = tools.reduce((sum, cat) => sum + cat.items.length, 0)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white px-6 py-3 shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <button
              onClick={() => onToolChange('overview')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-green-500 p-2 rounded-lg shadow-md">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold leading-tight">FlipTools Pro</h1>
                <p className="text-xs text-blue-300">Real Estate Analysis Dashboard</p>
              </div>
            </button>

            {activeToolInfo && (
              <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-white/20 text-sm">
                <span className="text-blue-300">{activeToolInfo.category}</span>
                <span className="text-white/40">›</span>
                <span className="font-medium">{activeToolInfo.name}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Public Tools
            </a>

            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <HelpCircle className="h-5 w-5 text-blue-300" />
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-white/20">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-sm font-bold shadow-md">
                P
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium leading-tight">Premium</p>
                <p className="text-xs text-blue-300 leading-tight">{totalTools} tools unlocked</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'w-64' : 'w-0'} flex-shrink-0 transition-all duration-300 bg-slate-900 overflow-hidden flex flex-col`}
        >
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {/* Overview button */}
            <button
              onClick={() => onToolChange('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-3 ${
                activeTool === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">Dashboard Overview</span>
            </button>

            {/* Divider */}
            <div className="border-t border-slate-700 my-2" />

            {tools.map((category) => (
              <div key={category.category} className="mb-1">
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-200 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${category.bgColor}`}>
                      <category.icon className={`h-3 w-3 ${category.color}`} />
                    </div>
                    <span>{category.category}</span>
                    <span className="text-slate-600 font-normal normal-case tracking-normal">({category.items.length})</span>
                  </div>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform text-slate-500 ${
                      expandedCategories.includes(category.category) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedCategories.includes(category.category) && (
                  <div className="mt-0.5 space-y-0.5">
                    {category.items.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => onToolChange(tool.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                          activeTool === tool.id
                            ? 'bg-blue-600 text-white border-l-2 border-blue-400 pl-[10px]'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                        }`}
                      >
                        <p className="text-sm font-medium leading-tight">{tool.name}</p>
                        <p className={`text-xs mt-0.5 leading-tight ${activeTool === tool.id ? 'text-blue-200' : 'text-slate-500'}`}>
                          {tool.description}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar Footer — Quick Links */}
          <div className="border-t border-slate-700 p-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-2">Public Calculators</p>
            <div className="space-y-0.5">
              {publicTools.map(tool => (
                <a
                  key={tool.href}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  {tool.name}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {/* Breadcrumb bar */}
          {activeToolInfo && (
            <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center gap-2 text-sm text-gray-500">
              <button onClick={() => onToolChange('overview')} className="hover:text-gray-800 transition-colors">
                Dashboard
              </button>
              <span className="text-gray-300">›</span>
              <span className="text-gray-500">{activeToolInfo.category}</span>
              <span className="text-gray-300">›</span>
              <span className="text-gray-800 font-medium">{activeToolInfo.name}</span>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-2.5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <FileText className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-600">{activeToolInfo?.name || 'FlipTools Pro'}</span>
            <span className="hidden sm:inline">· All calculations are estimates. Verify with professionals before purchasing.</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
