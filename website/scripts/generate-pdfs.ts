import { createAllPDFs } from '../lib/pdf-generator'

async function main() {
  console.log('Generating PDFs...')
  try {
    await createAllPDFs()
    console.log('All PDFs generated successfully!')
  } catch (error) {
    console.error('Error generating PDFs:', error)
  }
}

main()
