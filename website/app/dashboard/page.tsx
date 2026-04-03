'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircle, Calculator, CheckSquare, TrendingUp, Users, FileText, Download, ArrowRight } from 'lucide-react'
import { DashboardLayout } from './components/DashboardLayout'
import { MaxOfferCalculator, RehabCostEstimator, ARVCalculator } from './components/DashboardCalculators'
import { ARVCheatSheet } from './components/ARVCheatSheet'
import { DueDiligenceChecklist } from './components/DueDiligenceChecklist'
import { CompAnalysisGuide } from './components/CompAnalysisGuide'
import { DealAnalyzer } from './components/DealAnalyzer'
import { BuyerListTemplate } from './components/BuyerListTemplate'
import { CompAnalysisTemplate } from './components/CompAnalysisTemplate'

interface DashboardData {
  user: {
    email: string
    sessionId: string
    purchaseDate: string
    expiresAt: string
    daysRemaining: number
  }
  products: {
    guides: Array<{ name: string; file: string; type: string; size: string }>
    bonuses: Array<{ name: string; file: string; type: string; size: string }>
    spreadsheets: Array<{ name: string; file: string; type: string; size: string }>
  }
  downloadBaseUrl: string
  summary: {
    totalFiles: number
    totalGuides: number
    totalBonuses: number
    totalSpreadsheets: number
  }
  purchaseInfo: {
    productName: string
    price: string
    paymentStatus: string
    paymentMethod: string
  }
}

const quickStartTools = [
  {
    id: 'max-offer',
    name: 'Max Offer Calculator',
    description: 'Calculate your MAO using the 70% rule with all realistic costs',
    icon: Calculator,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    id: 'rehab-cost-estimator',
    name: 'Rehab Cost Estimator',
    description: 'Get a quick estimate or detailed line-item renovation budget',
    icon: CheckSquare,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-700',
  },
  {
    id: 'deal-analyzer',
    name: 'Deal Analyzer',
    description: 'Score deals and explore what-if purchase price scenarios',
    icon: TrendingUp,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-700',
  },
  {
    id: 'arv-calculator',
    name: 'ARV Calculator',
    description: 'Estimate after repair value from comparable sales',
    icon: Users,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-700',
  },
]

function OverviewScreen({
  data,
  onToolChange,
}: {
  data: DashboardData | null
  onToolChange: (tool: string) => void
}) {
  const stats = [
    {
      label: 'Calculation Tools',
      value: '9',
      icon: Calculator,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Guides & Resources',
      value: data ? String(data.summary.totalGuides + data.summary.totalBonuses) : '8',
      icon: FileText,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Spreadsheet Templates',
      value: data ? String(data.summary.totalSpreadsheets) : '4',
      icon: Download,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Days Remaining',
      value: data ? String(data.user.daysRemaining) : '—',
      icon: CheckSquare,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to FlipTools Pro</h2>
            <p className="text-blue-200 text-sm max-w-lg">
              Your complete toolkit for analyzing, evaluating, and closing profitable real estate deals.
              {data && (
                <> Logged in as <span className="font-semibold text-white">{data.user.email}</span>.</>
              )}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-2`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-blue-300 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start Tools */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start — Most Used Tools</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickStartTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${tool.lightColor} flex-shrink-0`}>
                  <tool.icon className={`h-6 w-6 ${tool.textColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 leading-snug">{tool.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Downloads (if data available) */}
      {data && data.products && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Downloads</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                Guides ({data.summary.totalGuides})
              </h4>
              <ul className="space-y-1.5">
                {data.products.guides.map(guide => (
                  <li key={guide.file}>
                    <a
                      href={`${data.downloadBaseUrl}?file=${guide.file}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5"
                    >
                      <Download className="h-3 w-3 flex-shrink-0" />
                      {guide.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-500" />
                Bonus Resources ({data.summary.totalBonuses})
              </h4>
              <ul className="space-y-1.5">
                {data.products.bonuses.map(bonus => (
                  <li key={bonus.file}>
                    <a
                      href={`${data.downloadBaseUrl}?file=${bonus.file}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5"
                    >
                      <Download className="h-3 w-3 flex-shrink-0" />
                      {bonus.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-500" />
                Spreadsheets ({data.summary.totalSpreadsheets})
              </h4>
              <ul className="space-y-1.5">
                {data.products.spreadsheets.map(sheet => (
                  <li key={sheet.file}>
                    <a
                      href={`${data.downloadBaseUrl}?file=${sheet.file}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5"
                    >
                      <Download className="h-3 w-3 flex-shrink-0" />
                      {sheet.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Pro Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-amber-900 mb-3">💡 Getting Started Tips</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>• Start every deal with the <button onClick={() => onToolChange('max-offer')} className="font-semibold underline">Max Offer Calculator</button> to set your ceiling price</li>
          <li>• Use the <button onClick={() => onToolChange('rehab-cost-estimator')} className="font-semibold underline">Rehab Estimator</button> Quick Estimate for initial screening, then the Detailed tab for budgeting</li>
          <li>• Run the <button onClick={() => onToolChange('deal-analyzer')} className="font-semibold underline">Deal Analyzer</button> what-if table before every negotiation to know your walk-away price</li>
          <li>• Download the spreadsheets to keep permanent records of each deal you analyze</li>
        </ul>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState<string>('overview')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setError('Access token required. Please use the link from your email.')
      setLoading(false)
      return
    }

    fetchDashboardData(token)
  }, [searchParams])

  const fetchDashboardData = async (token: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/dashboard?token=${encodeURIComponent(token)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to load dashboard')
      }

      const result = await response.json()
      setData(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'overview':
        return <OverviewScreen data={data} onToolChange={setActiveTool} />
      case 'max-offer':
        return <MaxOfferCalculator />
      case 'rehab-cost-estimator':
        return <RehabCostEstimator />
      case 'arv-calculator':
        return <ARVCalculator />
      case 'arv-cheat-sheet':
        return <ARVCheatSheet />
      case 'due-diligence-checklist':
        return <DueDiligenceChecklist />
      case 'comp-analysis-guide':
        return <CompAnalysisGuide />
      case 'deal-analyzer':
        return <DealAnalyzer />
      case 'buyer-list-template':
        return <BuyerListTemplate />
      case 'comp-analysis-template':
        return <CompAnalysisTemplate />
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tool Coming Soon</h3>
            <p className="text-gray-600">This tool is under development and will be available soon.</p>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout activeTool={activeTool} onToolChange={setActiveTool}>
      {renderActiveTool()}
    </DashboardLayout>
  )
}
