'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
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

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState<string>('max-offer')

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
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
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
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Return to Homepage
          </a>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <DashboardLayout activeTool={activeTool} onToolChange={setActiveTool}>
      {renderActiveTool()}
    </DashboardLayout>
  )
}
