import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')

    console.log('=== Download Debug ===')
    console.log('Email:', email)
    
    // Check current working directory
    const cwd = process.cwd()
    console.log('Current working directory:', cwd)
    
    // Check products directory
    const productsDir = path.join(cwd, 'products')
    console.log('Products directory:', productsDir)
    console.log('Products directory exists:', fs.existsSync(productsDir))
    
    if (fs.existsSync(productsDir)) {
      const items = fs.readdirSync(productsDir)
      console.log('Products directory contents:', items)
      
      // Check pdfs directory
      const pdfsDir = path.join(productsDir, 'pdfs')
      console.log('PDFs directory:', pdfsDir)
      console.log('PDFs directory exists:', fs.existsSync(pdfsDir))
      
      if (fs.existsSync(pdfsDir)) {
        const pdfs = fs.readdirSync(pdfsDir)
        console.log('PDFs:', pdfs)
      }
      
      // Check spreadsheets directory
      const spreadsheetsDir = path.join(productsDir, 'spreadsheets')
      console.log('Spreadsheets directory:', spreadsheetsDir)
      console.log('Spreadsheets directory exists:', fs.existsSync(spreadsheetsDir))
      
      if (fs.existsSync(spreadsheetsDir)) {
        const spreadsheets = fs.readdirSync(spreadsheetsDir)
        console.log('Spreadsheets:', spreadsheets)
      }
    }

    return NextResponse.json({
      success: true,
      cwd,
      productsDir,
      exists: fs.existsSync(productsDir),
      debug: 'Download path debug completed'
    })
    
  } catch (error: any) {
    console.error('Download debug error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
