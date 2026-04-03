import { NextRequest, NextResponse } from 'next/server'
import { generateDashboardToken, validateDashboardToken, createDashboardUrl } from '@/lib/token'

export async function GET(request: NextRequest) {
  try {
    // Generate a fresh token
    const email = 'integration-test@example.com'
    const sessionId = 'cs_test_integration_' + Date.now()
    
    const token = generateDashboardToken(email, sessionId)
    const dashboardUrl = createDashboardUrl(token)
    
    // Validate the token
    const validation = validateDashboardToken(token)
    
    // Test dashboard API
    const dashboardResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard?token=${token}`)
    const dashboardData = dashboardResponse.ok ? await dashboardResponse.json() : null
    
    return NextResponse.json({
      success: true,
      test: 'Complete Dashboard Integration Test',
      results: {
        tokenGenerated: !!token,
        tokenValid: validation.valid,
        dashboardApiWorking: dashboardResponse.ok,
        dashboardDataLoaded: !!dashboardData?.data,
        dashboardUrl: dashboardUrl,
        userEmail: email,
        userDaysRemaining: validation.userData?.daysRemaining,
        productCount: dashboardData?.data?.summary?.totalFiles || 0
      },
      message: validation.valid && dashboardResponse.ok 
        ? '🎉 Dashboard system is fully functional!' 
        : '⚠️ Some issues detected'
    })
    
  } catch (error) {
    console.error('Integration test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
