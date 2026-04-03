export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateDashboardToken } from '@/lib/token'
import fs from 'fs'
import path from 'path'

const PRODUCTS_DIR = path.join(process.cwd(), '../products')

// Allowed file patterns for security
const ALLOWED_FILES = [
  'pdfs/getting-started-guide.pdf',
  'pdfs/funding-guide.pdf',
  'pdfs/wholesaling-guide.pdf',
  'pdfs/pre-flip-checklist.pdf',
  'pdfs/contractor-toolkit.pdf',
  'pdfs/arv-calculator-cheat-sheet.pdf',
  'pdfs/due-diligence-checklist.pdf',
  'pdfs/comp-analysis-template-guide.pdf',
  'spreadsheets/deal-analyzer.xlsx',
  'spreadsheets/rehab-cost-estimator.xlsx',
  'spreadsheets/buyer-list-template.xlsx',
  'spreadsheets/comp-analysis-template.xlsx'
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const file = searchParams.get('file')
    
    if (!token) {
      return NextResponse.json({
        error: 'Access token required'
      }, { status: 401 })
    }
    
    // Validate token
    const validation = validateDashboardToken(token)
    
    if (!validation.valid) {
      return NextResponse.json({
        error: validation.error || 'Invalid access token'
      }, { status: 401 })
    }
    
    if (!file) {
      return NextResponse.json({
        error: 'File parameter required'
      }, { status: 400 })
    }
    
    // Security check - ensure file is in allowed list
    if (!ALLOWED_FILES.includes(file)) {
      console.error('Unauthorized file access attempt:', file, 'for user:', validation.userData?.email)
      return NextResponse.json({
        error: 'File not authorized'
      }, { status: 403 })
    }
    
    // Check if file exists
    const filePath = path.join(PRODUCTS_DIR, file)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        error: 'File not found'
      }, { status: 404 })
    }
    
    // Read file
    const fileBuffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)
    
    // Determine content type
    let contentType = 'application/octet-stream'
    if (fileName.endsWith('.pdf')) {
      contentType = 'application/pdf'
    } else if (fileName.endsWith('.xlsx')) {
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    
    // Log download for analytics
    console.log('Dashboard download:', {
      email: validation.userData?.email,
      file: fileName,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent')
    })
    
    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'private, max-age=3600', // Cache for 1 hour, private
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL || '*'
      },
    })
    
  } catch (error) {
    console.error('Dashboard download error:', error)
    return NextResponse.json({
      error: 'Download failed'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token, files } = await request.json()
    
    if (!token) {
      return NextResponse.json({
        error: 'Access token required'
      }, { status: 401 })
    }
    
    // Validate token
    const validation = validateDashboardToken(token)
    
    if (!validation.valid) {
      return NextResponse.json({
        error: validation.error || 'Invalid access token'
      }, { status: 401 })
    }
    
    if (!files || !Array.isArray(files)) {
      return NextResponse.json({
        error: 'Files array required'
      }, { status: 400 })
    }
    
    // Generate download URLs for multiple files
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/download`
    const downloadUrls = files.map(file => ({
      name: file,
      url: `${baseUrl}?token=${encodeURIComponent(token)}&file=${encodeURIComponent(file)}`
    }))
    
    return NextResponse.json({
      success: true,
      downloads: downloadUrls
    })
    
  } catch (error) {
    console.error('Batch download error:', error)
    return NextResponse.json({
      error: 'Batch download failed'
    }, { status: 500 })
  }
}
