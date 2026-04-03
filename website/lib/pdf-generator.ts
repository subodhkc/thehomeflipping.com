import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

export async function generatePDFFromMarkdown(markdown: string, title: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  try {
    const page = await browser.newPage()
    
    // Convert markdown to basic HTML
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px;
          }
          h1 { color: #0070c4; border-bottom: 2px solid #0070c4; padding-bottom: 10px; }
          h2 { color: #0070c4; margin-top: 30px; }
          h3 { color: #22c55e; }
          ul, ol { margin: 15px 0; }
          li { margin: 5px 0; }
          strong { color: #0070c4; }
          blockquote { 
            border-left: 4px solid #0070c4; 
            padding-left: 20px; 
            margin: 20px 0; 
            font-style: italic;
            background: #f0f7ff;
            padding: 15px;
          }
          code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
          pre { 
            background: #f4f4f4; 
            padding: 15px; 
            border-radius: 5px; 
            overflow-x: auto;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #0070c4;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
          @page {
            margin: 2cm;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <p>TheHomeFlipping.com - First Flip Starter Kit</p>
        </div>
        <div class="content">
          ${markdownToHtml(markdown)}
        </div>
        <div class="footer">
          <p>© 2026 TheHomeFlipping.com | All rights reserved</p>
          <p>For personal use only. Not for resale or distribution.</p>
        </div>
      </body>
      </html>
    `
    
    await page.setContent(html, { waitUntil: 'networkidle0' })
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    })
    
    return pdf
  } finally {
    await browser.close()
  }
}

function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\* (.+)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/^\d+\. (.+)/gim, '<li>$1</li>')
    // Blockquotes
    .replace(/^> (.+)/gim, '<blockquote>$1</blockquote>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gm, '<p>$1</p>')
    // Clean up
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-6]>)/g, '$1')
    .replace(/(<\/h[1-6]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1')
    .replace(/<p>(<div)/g, '$1')
    .replace(/(<\/div>)<\/p>/g, '$1')
}

export async function createAllPDFs() {
  const guidesDir = path.join(process.cwd(), '../products/guides')
  const outputDir = path.join(process.cwd(), '../products/pdfs')
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const files = [
    { input: '01-getting-started-guide.md', output: 'getting-started-guide.pdf', title: 'Getting Started Guide' },
    { input: '02-funding-guide.md', output: 'funding-guide.pdf', title: 'Funding Your Flip' },
    { input: '03-wholesaling-guide.md', output: 'wholesaling-guide.pdf', title: 'Wholesaling Guide' },
    { input: '04-pre-flip-checklist.md', output: 'pre-flip-checklist.pdf', title: 'Pre-Flip Checklist' },
    { input: '05-contractor-toolkit.md', output: 'contractor-toolkit.pdf', title: 'Contractor Toolkit' },
    { input: '06-arv-calculator-cheat-sheet.md', output: 'arv-calculator-cheat-sheet.pdf', title: 'ARV Calculator Cheat Sheet' },
    { input: '07-due-diligence-checklist.md', output: 'due-diligence-checklist.pdf', title: 'Due Diligence Checklist' },
    { input: '08-comp-analysis-template-guide.md', output: 'comp-analysis-template-guide.pdf', title: 'Comp Analysis Template Guide' }
  ]
  
  for (const file of files) {
    const inputPath = path.join(guidesDir, file.input)
    const outputPath = path.join(outputDir, file.output)
    
    if (fs.existsSync(inputPath)) {
      const markdown = fs.readFileSync(inputPath, 'utf-8')
      const pdf = await generatePDFFromMarkdown(markdown, file.title)
      fs.writeFileSync(outputPath, pdf)
      console.log(`Created: ${file.output}`)
    }
  }
}
