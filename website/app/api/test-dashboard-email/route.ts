import { NextRequest, NextResponse } from 'next/server'
import { sendProductDeliveryEmail } from '@/lib/email'
import { generateDashboardToken, createDashboardUrl } from '@/lib/token'

export async function POST(request: NextRequest) {
  try {
    const { email, customerName } = await request.json()
    
    // Generate dashboard token
    const dashboardToken = generateDashboardToken(email, 'cs_test_dashboard_' + Date.now())
    const dashboardUrl = createDashboardUrl(dashboardToken)
    
    // Send email with dashboard URL
    const result = await sendProductDeliveryEmail({
      to: email,
      customerName: customerName || 'Dashboard User',
      dashboardUrl: dashboardUrl
    })
    
    return NextResponse.json({
      success: result.success,
      emailId: result.data?.id,
      dashboardUrl: dashboardUrl,
      token: dashboardToken
    })
    
  } catch (error) {
    console.error('Dashboard email test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
