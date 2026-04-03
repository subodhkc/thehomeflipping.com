import { createAllSpreadsheets } from '../lib/spreadsheet-generator'

async function main() {
  console.log('Generating spreadsheets...')
  try {
    await createAllSpreadsheets()
    console.log('All spreadsheets generated successfully!')
  } catch (error) {
    console.error('Error generating spreadsheets:', error)
  }
}

main()
