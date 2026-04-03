import { createAllPDFs } from '../lib/pdf-generator'
import { createAllSpreadsheets } from '../lib/spreadsheet-generator'

async function main() {
  console.log('Generating all product files...')
  
  try {
    console.log('\n=== Generating PDFs ===')
    await createAllPDFs()
    
    console.log('\n=== Generating Spreadsheets ===')
    await createAllSpreadsheets()
    
    console.log('\n✅ All products generated successfully!')
    console.log('\nGenerated files:')
    console.log('PDFs (8 files):')
    console.log('- getting-started-guide.pdf')
    console.log('- funding-guide.pdf')
    console.log('- wholesaling-guide.pdf')
    console.log('- pre-flip-checklist.pdf')
    console.log('- contractor-toolkit.pdf')
    console.log('- arv-calculator-cheat-sheet.pdf')
    console.log('- due-diligence-checklist.pdf')
    console.log('- comp-analysis-template-guide.pdf')
    console.log('\nSpreadsheets (4 files):')
    console.log('- deal-analyzer.xlsx')
    console.log('- rehab-cost-estimator.xlsx')
    console.log('- buyer-list-template.xlsx')
    console.log('- comp-analysis-template.xlsx')
    
  } catch (error) {
    console.error('Error generating products:', error)
  }
}

main()
