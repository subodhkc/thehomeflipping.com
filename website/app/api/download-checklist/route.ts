export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  // TODO: Generate or serve the actual checklist PDF
  // For now, we'll return a simple text version
  
  const checklistText = `
PRE-FLIP CHECKLIST - 20 Week Action Plan

WEEK 1-2: Market Research and Education
□ Research your local market thoroughly
□ Understand property values in target neighborhoods
□ Learn basic flipping terminology
□ Set your investment goals and budget
□ Build emergency fund (6 months expenses)

WEEK 3-4: Build Your Team
□ Find and interview real estate agents
□ Connect with hard money lenders
□ Build relationships with contractors
□ Find a title company or real estate attorney
□ Join local REIA meetings

WEEK 5-6: Property Search
□ Set up property alerts (MLS, auctions)
□ Drive neighborhoods looking for distressed properties
□ Network with wholesalers
□ Analyze at least 20 potential deals
□ Create your property criteria checklist

WEEK 7-8: Make Offers
□ Practice calculating MAO (Maximum Allowable Offer)
□ Make 5-10 low offers to get comfortable
□ Follow up on all submitted offers
□ Negotiate with sellers or their agents
□ Get comfortable with "no" - it's part of the process

WEEK 9-10: Due Diligence & Closing
□ Perform thorough property inspections
□ Get contractor estimates for repairs
□ Verify title is clear
□ Secure financing (hard money or private)
□ Schedule closing with title company

WEEK 11-16: Renovation Management
□ Create detailed rehab timeline
□ Order all materials upfront
□ Schedule contractors efficiently
□ Daily site visits (or project manager)
□ Track budget vs actual expenses
□ Address issues immediately

WEEK 17-20: Selling
□ List property with compelling photos
□ Host open houses
□ Review all offers with agent
□ Negotiate best price and terms
□ Schedule closing and celebrate!

Remember: Every deal teaches you something new. Stay persistent!
  `.trim()

  return new Response(checklistText, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="pre-flip-checklist.txt"`
    }
  })
}
