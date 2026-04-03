import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const PRODUCTS_DIR = path.join(process.cwd(), '../products')

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')
  const file = searchParams.get('file')

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  // TODO: Verify this email has purchased
  // For now, we'll allow downloads
  
  if (file) {
    // Serve individual file
    const filePath = path.join(PRODUCTS_DIR, file)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(file)
    
    const contentType = ext === '.pdf' ? 'application/pdf' : 
                      ext === '.xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                      'application/octet-stream'

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${path.basename(file)}"`
      }
    })
  }

  // Return list of all available files
  const pdfs = fs.readdirSync(path.join(PRODUCTS_DIR, 'pdfs')).map(f => `pdfs/${f}`)
  const spreadsheets = fs.readdirSync(path.join(PRODUCTS_DIR, 'spreadsheets')).map(f => `spreadsheets/${f}`)
  
  return NextResponse.json({
    message: 'Your First Flip Starter Kit is ready for download!',
    files: {
      guides: [
        { name: 'Getting Started Guide', file: 'pdfs/getting-started-guide.pdf' },
        { name: 'Funding Guide', file: 'pdfs/funding-guide.pdf' },
        { name: 'Wholesaling Guide', file: 'pdfs/wholesaling-guide.pdf' },
        { name: 'Pre-Flip Checklist', file: 'pdfs/pre-flip-checklist.pdf' },
        { name: 'Contractor Toolkit', file: 'pdfs/contractor-toolkit.pdf' }
      ],
      bonuses: [
        { name: 'ARV Calculator Cheat Sheet', file: 'pdfs/arv-calculator-cheat-sheet.pdf' },
        { name: 'Due Diligence Checklist', file: 'pdfs/due-diligence-checklist.pdf' },
        { name: 'Comp Analysis Guide', file: 'pdfs/comp-analysis-template-guide.pdf' }
      ],
      spreadsheets: [
        { name: 'Deal Analyzer', file: 'spreadsheets/deal-analyzer.xlsx' },
        { name: 'Rehab Cost Estimator', file: 'spreadsheets/rehab-cost-estimator.xlsx' },
        { name: 'Buyer List Template', file: 'spreadsheets/buyer-list-template.xlsx' },
        { name: 'Comp Analysis Template', file: 'spreadsheets/comp-analysis-template.xlsx' }
      ]
    }
  })
}

export async function POST(request: NextRequest) {
  const { email, fileId } = await request.json()

  if (!email || !fileId) {
    return NextResponse.json({ error: 'Email and file ID required' }, { status: 400 })
  }

  // TODO: Verify purchase
  const filePath = path.join(PRODUCTS_DIR, fileId)
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const fileBuffer = fs.readFileSync(filePath)
  const ext = path.extname(fileId)
  
  const contentType = ext === '.pdf' ? 'application/pdf' : 
                    ext === '.xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                    'application/octet-stream'

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${path.basename(fileId)}"`
    }
  })
}
