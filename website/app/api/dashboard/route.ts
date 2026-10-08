export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateDashboardToken, extractTokenFromUrl } from '@/lib/token'
import fs from 'fs'
import path from 'path'

const PRODUCTS_DIR = path.join(process.cwd(), '../products')

// Product file definitions
const PRODUCT_FILES = {
  guides: [
    { name: 'Getting Started Guide', file: 'pdfs/getting-started-guide.pdf', type: 'pdf', size: '236KB' },
    { name: 'Funding Guide', file: 'pdfs/funding-guide.pdf', type: 'pdf', size: '262KB' },
    { name: 'Wholesaling Guide', file: 'pdfs/wholesaling-guide.pdf', type: 'pdf', size: '308KB' },
    { name: 'Pre-Flip Checklist', file: 'pdfs/pre-flip-checklist.pdf', type: 'pdf', size: '107KB' },
    { name: 'Contractor Toolkit', file: 'pdfs/contractor-toolkit.pdf', type: 'pdf', size: '141KB' }
  ],
  bonuses: [
    { name: 'ARV Calculator Cheat Sheet', file: 'pdfs/arv-calculator-cheat-sheet.pdf', type: 'pdf', size: '126KB' },
    { name: 'Due Diligence Checklist', file: 'pdfs/due-diligence-checklist.pdf', type: 'pdf', size: '122KB' },
    { name: 'Comp Analysis Guide', file: 'pdfs/comp-analysis-template-guide.pdf', type: 'pdf', size: '143KB' }
  ],
  spreadsheets: [
    { name: 'Deal Analyzer', file: 'spreadsheets/deal-analyzer.xlsx', type: 'excel', size: '37KB' },
    { name: 'Rehab Cost Estimator', file: 'spreadsheets/rehab-cost-estimator.xlsx', type: 'excel', size: '34KB' },
    { name: 'Buyer List Template', file: 'spreadsheets/buyer-list-template.xlsx', type: 'excel', size: '28KB' },
    { name: 'Comp Analysis Template', file: 'spreadsheets/comp-analysis-template.xlsx', type: 'excel', size: '42KB' }
  ]
}

export async function GET(request: NextRequest) {
  try {
    // Extract token from URL
    const url = request.url
    const token = extractTokenFromUrl(url)
    
    if (!token) {
      return NextResponse.json({
        error: 'Access token required',
        message: 'Please use the link from your email to access your dashboard'
      }, { status: 401 })
    }
    
    // Validate token
    const validation = validateDashboardToken(token)
    
    if (!validation.valid || !validation.userData) {
      return NextResponse.json({
        error: validation.error || 'Invalid access token',
        message: 'Your access link may have expired. Please contact support.'
      }, { status: 401 })
    }
    
    const userData = validation.userData
    
    // Prepare dashboard data
    const dashboardData = {
      user: {
        email: userData.email,
        sessionId: userData.sessionId,
        purchaseDate: userData.purchaseDate,
        expiresAt: userData.expiresAt,
        daysRemaining: Math.ceil((userData.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      },
      products: PRODUCT_FILES,
      downloadBaseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/download`,
      summary: {
        totalFiles: Object.values(PRODUCT_FILES).flat().length,
        totalGuides: PRODUCT_FILES.guides.length,
        totalBonuses: PRODUCT_FILES.bonuses.length,
        totalSpreadsheets: PRODUCT_FILES.spreadsheets.length
      },
      purchaseInfo: {
        productName: 'First Flip Starter Kit',
        price: '$67',
        paymentStatus: 'Completed',
        paymentMethod: 'Credit Card'
      }
    }
    
    return NextResponse.json({
      success: true,
      data: dashboardData
    })
    
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({
      error: 'Dashboard access failed',
      message: 'Please try again or contact support'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, token } = await request.json()
    
    if (action === 'refresh') {
      // Token refresh endpoint (extend access)
      const validation = validateDashboardToken(token)
      
      if (!validation.valid || !validation.userData) {
        return NextResponse.json({
          error: 'Invalid token for refresh'
        }, { status: 401 })
      }
      
      // Generate new token with same data but new expiry
      const { generateDashboardToken } = await import('@/lib/token')
      const newToken = generateDashboardToken(
        validation.userData.email,
        validation.userData.sessionId
      )
      
      return NextResponse.json({
        success: true,
        newToken,
        newExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })
    }
    
    return NextResponse.json({
      error: 'Invalid action'
    }, { status: 400 })
    
  } catch (error) {
    console.error('Dashboard POST error:', error)
    return NextResponse.json({
      error: 'Request failed'
    }, { status: 500 })
  }
}
