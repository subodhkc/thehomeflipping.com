import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'

export function createDealAnalyzerSpreadsheet(): Buffer {
  // Create workbook
  const wb = XLSX.utils.book_new()

  // Deal Analysis Sheet
  const dealData = [
    ['DEAL ANALYSIS WORKSHEET', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['PROPERTY INFORMATION', '', '', '', '', '', '', ''],
    ['Address', '', '', '', '', '', '', ''],
    ['City', '', '', '', '', '', '', ''],
    ['State', '', '', '', '', '', '', ''],
    ['Zip', '', '', '', '', '', '', ''],
    ['Square Feet', '', '', '', '', '', '', ''],
    ['Bedrooms', '', '', '', '', '', '', ''],
    ['Bathrooms', '', '', '', '', '', '', ''],
    ['Year Built', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['FINANCIALS', '', '', '', '', '', '', ''],
    ['Purchase Price', '', '', '', '', '', '', ''],
    ['Repair Costs', '', '', '', '', '', '', ''],
    ['Closing Costs', '', '', '', '', '', '', ''],
    ['Holding Costs', '', '', '', '', '', '', ''],
    ['Financing Costs', '', '', '', '', '', '', ''],
    ['Total Investment', '=SUM(B14:B18)', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['VALUE ANALYSIS', '', '', '', '', '', '', ''],
    ['ARV (After Repair Value)', '', '', '', '', '', '', ''],
    ['Profit Potential', '=B20-B19', '', '', '', '', '', ''],
    ['ROI', '=B21/B19', '', '', '', '', '', ''],
    ['70% Rule Max Offer', '=B20*0.7', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['COMPARABLE SALES', '', '', '', '', '', '', ''],
    ['Comp 1', '', '', '', '', '', '', ''],
    ['Address', '', '', '', '', '', '', ''],
    ['Sold Price', '', '', '', '', '', '', ''],
    ['$/SqFt', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['Comp 2', '', '', '', '', '', '', ''],
    ['Address', '', '', '', '', '', '', ''],
    ['Sold Price', '', '', '', '', '', '', ''],
    ['$/SqFt', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['Comp 3', '', '', '', '', '', '', ''],
    ['Address', '', '', '', '', '', '', ''],
    ['Sold Price', '', '', '', '', '', '', ''],
    ['$/SqFt', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['Average $/SqFt', '=AVERAGE(D28,D34,D40)', '', '', '', '', '', ''],
    ['Estimated ARV', '=B42*B8', '', '', '', '', '', '']
  ]

  const dealWS = XLSX.utils.aoa_to_sheet(dealData)
  XLSX.utils.book_append_sheet(wb, dealWS, 'Deal Analysis')

  // Repair Costs Sheet
  const repairData = [
    ['REHAB COST ESTIMATOR', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['EXTERIOR', 'Low', 'High', 'Average', 'Notes', '', '', ''],
    ['Roof', '5000', '15000', '=AVERAGE(B3:C3)', '', '', '', ''],
    ['Siding', '3000', '12000', '=AVERAGE(B4:C4)', '', '', '', ''],
    ['Windows', '200', '800', '=AVERAGE(B5:C5)', '', '', '', ''],
    ['Paint Exterior', '2000', '5000', '=AVERAGE(B6:C6)', '', '', '', ''],
    ['Landscaping', '500', '3000', '=AVERAGE(B7:C7)', '', '', '', ''],
    ['Driveway', '1000', '5000', '=AVERAGE(B8:C8)', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['KITCHEN', 'Low', 'High', 'Average', 'Notes', '', '', ''],
    ['Cabinets', '3000', '15000', '=AVERAGE(B11:C11)', '', '', '', ''],
    ['Countertops', '1500', '5000', '=AVERAGE(B12:C12)', '', '', '', ''],
    ['Appliances', '2000', '8000', '=AVERAGE(B13:C13)', '', '', '', ''],
    ['Flooring', '1000', '4000', '=AVERAGE(B14:C14)', '', '', '', ''],
    ['Backsplash', '300', '1500', '=AVERAGE(B15:C15)', '', '', '', ''],
    ['Lighting', '200', '1000', '=AVERAGE(B16:C16)', '', '', '', ''],
    ['Plumbing', '500', '2000', '=AVERAGE(B17:C17)', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['BATHROOM', 'Low', 'High', 'Average', 'Notes', '', '', ''],
    ['Vanity', '300', '1500', '=AVERAGE(B20:C20)', '', '', '', ''],
    ['Toilet', '200', '800', '=AVERAGE(B21:C21)', '', '', '', ''],
    ['Tub/Shower', '800', '3000', '=AVERAGE(B22:C22)', '', '', '', ''],
    ['Tile', '500', '3000', '=AVERAGE(B23:C23)', '', '', '', ''],
    ['Fixtures', '300', '1500', '=AVERAGE(B24:C24)', '', '', '', ''],
    ['Flooring', '300', '1500', '=AVERAGE(B25:C25)', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['TOTALS', '', '', '', '', '', '', ''],
    ['Exterior Total', '=SUM(D3:D8)', '', '', '', '', '', ''],
    ['Kitchen Total', '=SUM(D11:D17)', '', '', '', '', '', ''],
    ['Bathroom Total', '=SUM(D20:D25)', '', '', '', '', '', ''],
    ['Grand Total', '=SUM(D29:D31)', '', '', '', '', '', '']
  ]

  const repairWS = XLSX.utils.aoa_to_sheet(repairData)
  XLSX.utils.book_append_sheet(wb, repairWS, 'Repair Costs')

  // Generate buffer
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  return buf as Buffer
}

export function createRehabEstimator(): Buffer {
  const wb = XLSX.utils.book_new()

  const rehabData = [
    ['REHAB COST ESTIMATOR - DETAILED', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['Category', 'Item', 'Unit', 'Unit Cost', 'Quantity', 'Total', 'Notes', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['DEMOLITION', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Interior Demo', 'SF', '2', '', '=E5*F5', '', '', '', '', ''],
    ['', 'Exterior Demo', 'SF', '3', '', '=E6*F6', '', '', '', '', ''],
    ['', 'Dumpster', 'Each', '500', '', '=E7*F7', '', '', '', '', ''],
    ['', 'Permits', 'Each', '1500', '', '=E8*F8', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['ROOFING', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Tear Off', 'SQ', '1.5', '', '=E11*F11', '', '', '', '', ''],
    ['', 'New Roof', 'SQ', '4', '', '=E12*F12', '', '', '', '', ''],
    ['', 'Flashing', 'LF', '10', '', '=E13*F13', '', '', '', '', ''],
    ['', 'Gutters', 'LF', '8', '', '=E14*F14', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['HVAC', '', '', '', '', '', '', '', '', '', ''],
    ['', 'New System', 'Ton', '3000', '', '=E17*F17', '', '', '', '', ''],
    ['', 'Ductwork', 'System', '1500', '', '=E18*F18', '', '', '', '', ''],
    ['', 'Thermostat', 'Each', '200', '', '=E19*F19', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['ELECTRICAL', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Panel Upgrade', 'Each', '2000', '', '=E22*F22', '', '', '', '', ''],
    ['', 'Rewire', 'SF', '8', '', '=E23*F23', '', '', '', '', ''],
    ['', 'Outlets', 'Each', '150', '', '=E24*F24', '', '', '', '', ''],
    ['', 'Light Fixtures', 'Each', '100', '', '=E25*F25', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['PLUMBING', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Rough-in', 'Fixture', '500', '', '=E28*F28', '', '', '', '', ''],
    ['', 'Water Heater', 'Each', '1200', '', '=E29*F29', '', '', '', '', ''],
    ['', 'Pipes', 'LF', '15', '', '=E30*F30', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['INSULATION', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Attic', 'SQ', '1.5', '', '=E33*F33', '', '', '', '', ''],
    ['', 'Walls', 'SQ', '2', '', '=E34*F34', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['DRYWALL', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Hang', 'SF', '2', '', '=E37*F37', '', '', '', '', ''],
    ['', 'Tape & Finish', 'SF', '2.5', '', '=E38*F38', '', '', '', '', ''],
    ['', 'Texture', 'SF', '1', '', '=E39*F39', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['FLOORING', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Tile', 'SF', '8', '', '=E42*F42', '', '', '', '', ''],
    ['', 'Hardwood', 'SF', '10', '', '=E43*F43', '', '', '', '', ''],
    ['', 'Carpet', 'SF', '4', '', '=E44*F44', '', '', '', '', ''],
    ['', 'Vinyl', 'SF', '5', '', '=E45*F45', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['PAINTING', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Interior', 'SF', '2.5', '', '=E48*F48', '', '', '', '', ''],
    ['', 'Exterior', 'SF', '3', '', '=E49*F49', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['TOTALS', '', '', '', '', '=SUM(G5:G49)', '', '', '', '', '']
  ]

  const rehabWS = XLSX.utils.aoa_to_sheet(rehabData)
  XLSX.utils.book_append_sheet(wb, rehabWS, 'Rehab Estimator')

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  return buf as Buffer
}

export function createBuyerListTemplate(): Buffer {
  const wb = XLSX.utils.book_new()

  const buyerData = [
    ['CASH BUYER DATABASE', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Date Added', 'Buyer Name', 'Company', 'Phone', 'Email', 'Type', 'Areas', 'Price Range', 'Bed/Bath', 'Property Type', 'Notes', 'Last Contact', 'Deals Closed', 'Preferred Contact', 'Status'],
    ['=TODAY()', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['SUMMARY', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Total Buyers', '=COUNTA(B4:B100)', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Active Buyers', '=COUNTIF(O4:O100,"Active")', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Hot Buyers', '=COUNTIF(O4:O100,"Hot")', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Deals This Month', '=COUNTIFS(M4:M100,">="&EOMONTH(TODAY(),-1)+1,M4:M100,"<="&EOMONTH(TODAY(),0))', '', '', '', '', '', '', '', '', '', '', '', '', '']
  ]

  const buyerWS = XLSX.utils.aoa_to_sheet(buyerData)
  XLSX.utils.book_append_sheet(wb, buyerWS, 'Buyer List')

  // Add second sheet for tracking
  const trackingData = [
    ['DEAL TRACKING', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['Date', 'Property Address', 'Buyer', 'Purchase Price', 'Assignment Fee', 'Status', 'Close Date', 'Notes', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['MONTHLY TOTALS', '', '', '', '', '', '', '', '', '', ''],
    ['This Month', '', '', '', '=SUM(D4:D100)', '=SUM(E4:E100)', '', '', '', '', ''],
    ['YTD Total', '', '', '', '=SUM(D4:D100)', '=SUM(E4:E100)', '', '', '', '', '']
  ]

  const trackingWS = XLSX.utils.aoa_to_sheet(trackingData)
  XLSX.utils.book_append_sheet(wb, trackingWS, 'Deal Tracking')

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  return buf as Buffer
}

export function createCompAnalysisTemplate(): Buffer {
  const wb = XLSX.utils.book_new()

  const compData = [
    ['COMPARABLE MARKET ANALYSIS', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['SUBJECT PROPERTY', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Address', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['City/State', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Square Feet', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Bedrooms', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Bathrooms', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Year Built', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Lot Size', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Garage', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Pool', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['COMPARABLES', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Comp #1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Address', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Sold Date', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Sold Price', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['$/SqFt', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Square Feet', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Bedrooms', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Bathrooms', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Year Built', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Lot Size', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Garage', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Pool', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Condition', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Location', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ADJUSTMENTS', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Size Adjustment', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Condition Adj', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Location Adj', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Feature Adj', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Time Adj', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Net Adj', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Adjusted Price', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Adjusted $/SqFt', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['RECONCILIATION', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Average $/SqFt', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Subject ARV', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['Low Range', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['High Range', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
  ]

  const compWS = XLSX.utils.aoa_to_sheet(compData)
  XLSX.utils.book_append_sheet(wb, compWS, 'Comp Analysis')

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  return buf as Buffer
}

export async function createAllSpreadsheets() {
  const outputDir = path.join(process.cwd(), '../products/spreadsheets')
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const spreadsheets = [
    { name: 'deal-analyzer.xlsx', creator: createDealAnalyzerSpreadsheet },
    { name: 'rehab-cost-estimator.xlsx', creator: createRehabEstimator },
    { name: 'buyer-list-template.xlsx', creator: createBuyerListTemplate },
    { name: 'comp-analysis-template.xlsx', creator: createCompAnalysisTemplate }
  ]

  for (const sheet of spreadsheets) {
    const buffer = sheet.creator()
    const outputPath = path.join(outputDir, sheet.name)
    fs.writeFileSync(outputPath, buffer)
    console.log(`Created: ${sheet.name}`)
  }
}
