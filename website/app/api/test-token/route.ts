import { NextRequest, NextResponse } from 'next/server'
import { generateDashboardToken, validateDashboardToken, createDashboardUrl } from '@/lib/token'

export async function POST(request: NextRequest) {
  try {
    const { email, sessionId } = await request.json()
    
    if (!email || !sessionId) {
      return NextResponse.json({ 
        error: 'Email and sessionId required' 
      }, { status: 400 })
    }
    
    // Generate token
    const token = generateDashboardToken(email, sessionId)
    const dashboardUrl = createDashboardUrl(token)
    
    // Validate the token (test)
    const validation = validateDashboardToken(token)
    
    return NextResponse.json({
      success: true,
      token,
      dashboardUrl,
      validation: {
        valid: validation.valid,
        userData: validation.userData,
        error: validation.error
      },
      test: 'Token generation and validation successful'
    })
    
  } catch (error) {
    console.error('Token test error:', error)
    return NextResponse.json({ 
      error: 'Token test failed' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  
  if (!token) {
    return NextResponse.json({ 
      error: 'Token parameter required' 
    }, { status: 400 })
  }
  
  const validation = validateDashboardToken(token)
  
  return NextResponse.json({
    token,
    validation
  })
}
