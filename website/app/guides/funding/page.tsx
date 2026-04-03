import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Funding Guide | TheHomeFlipping.com',
  description: 'Complete guide to funding your house flips - from hard money to creative financing options.',
}

export default function FundingGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Funding Your Flip</h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about financing your real estate deals
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <p className="text-green-900">
                <strong>Pro Tip:</strong> Always secure funding BEFORE making offers. 
                Having proof of funds makes your offers much stronger.
              </p>
            </div>

            <h2>Understanding Your Options</h2>
            <p>Every deal is different, and so is the best financing. Consider:</p>
            <ul>
              <li>Your available capital</li>
              <li>Deal timeline</li>
              <li>Property condition</li>
              <li>Your experience level</li>
              <li>Exit strategy</li>
            </ul>

            <h2>Hard Money Loans</h2>
            <p>The most common funding for flips:</p>
            
            <h3>What They Are</h3>
            <p>Short-term, asset-based loans from private lenders.</p>
            
            <h3>Pros</h3>
            <ul>
              <li>Fast approval (days, not weeks)</li>
              <li>Based on property value, not your credit</li>
              <li>Can finance purchase AND repairs</li>
              <li>Leverage your capital for multiple deals</li>
            </ul>
            
            <h3>Cons</h3>
            <ul>
              <li>High interest rates (10-15%)</li>
              <li>Points (2-4% of loan amount)</li>
              <li>Short terms (6-12 months)</li>
              <li>Require significant equity</li>
            </ul>
            
            <h3>Typical Terms</h3>
            <ul>
              <li>LTV: 70-80% of ARV</li>
              <li>Interest: 10-15% annually</li>
              <li>Points: 2-4%</li>
              <li>Term: 6-12 months</li>
              <li>Rehab funds: Draw schedule</li>
            </ul>

            <h2>Private Money</h2>
            <p>Loans from individuals rather than companies:</p>
            
            <h3>Who to Approach</h3>
            <ul>
              <li>Wealthy friends and family</li>
              <li>Other real estate investors</li>
              <li>Professionals (doctors, lawyers)</li>
              <li>Retirement account holders</li>
            </ul>
            
            <h3>Making the Pitch</h3>
            <ul>
              <li>Show them the deal specifics</li>
              <li>Explain your experience</li>
              <li>Offer security (mortgage)</li>
              <li>Be transparent about risks</li>
              <li>Start small to build trust</li>
            </ul>

            <h2>Cash Out Refinance</h2>
            <p>Using equity from existing properties:</p>
            
            <h3>How It Works</h3>
            <ol>
              <li>Buy property with cash or hard money</li>
              <li>Complete renovations</li>
              <li>Get new appraisal</li>
              <li>Refinance at 75-80% LTV</li>
              <li>Pull out cash for next deal</li>
            </ol>
            
            <h3>Benefits</h3>
            <ul>
              <li>Lower long-term rates</li>
              <li>Keep property as rental</li>
              <li>Recycle capital quickly</li>
              <li>Tax advantages</li>
            </ul>

            <h2>Partnerships</h2>
            <p>Team up with other investors:</p>
            
            <h3>Common Structures</h3>
            <ul>
              <li><strong>Money Partner:</strong> They provide funds, you do the work</li>
              <li><strong>50/50 Split:</strong> Equal partners in all aspects</li>
              <li><strong>Silent Partner:</strong> Funds only, no involvement</li>
              <li><strong>Work Equity:</strong> Your labor for their capital</li>
            </ul>
            
            <h3>Partnership Agreement</h3>
            <p>Always have a written agreement covering:</p>
            <ul>
              <li>Capital contributions</li>
              <li>Profit split</li>
              <li>Responsibilities</li>
              <li>Exit strategy</li>
              <li>Dispute resolution</li>
            </ul>

            <h2>Creative Financing</h2>
            
            <h3>Subject-To</h3>
            <p>Take over existing mortgage payments:</p>
            <ul>
              <li>Seller deeds property to you</li>
              <li>Mortgage stays in seller's name</li>
              <li>You make payments</li>
              <li>Risky but powerful</li>
            </ul>
            
            <h3>Owner Financing</h3>
            <p>Seller acts as the bank:</p>
            <ul>
              <li>Negotiate terms directly</li>
              <li>Lower closing costs</li>
              <li>Flexible requirements</li>
              <li>Often higher interest</li>
            </ul>
            
            <h3>Lease Options</h3>
            <p>Rent with option to buy:</p>
            <ul>
              <li>Option fee upfront</li>
              <li>Rent credit toward purchase</li>
              <li>Time to secure financing</li>
              <li>Lock in purchase price</li>
            </ul>

            <h2>Business Credit</h2>
            <p>Establish business credit lines:</p>
            
            <h3>Steps to Build</h3>
            <ol>
              <li>Form LLC or corporation</li>
              <li>Get EIN from IRS</li>
              <li>Open business bank account</li>
              <li>Apply for business credit cards</li>
              <li>Establish vendor credit</li>
              <li>Build credit history</li>
            </ol>

            <h2>HELOCs and Credit Cards</h2>
            <p>Use personal credit strategically:</p>
            
            <h3>Home Equity Line</h3>
            <ul>
              <li>Lower interest rates</li>
              <li>Interest-only payments</li>
              <li>Tax deductible</li>
              <li>Puts your home at risk</li>
            </ul>
            
            <h3>Credit Cards</h3>
            <ul>
              <li>For materials only</li>
              <li>0% APR offers</li>
              <li>Rewards points</li>
              <li>High rates after promo</li>
            </ul>

            <h2>Self-Directed IRA</h2>
            <p>Use retirement funds tax-free:</p>
            
            <h3>Setup Process</h3>
            <ul>
              <li>Open self-directed IRA</li>
              <li>Rollover funds</li>
              <li>Find IRA-friendly custodian</li>
              <li>Follow all rules strictly</li>
            </ul>
            
            <h3>Rules to Follow</h3>
            <ul>
              <li>No personal benefit</li>
              <li>All profits stay in IRA</li>
              <li>Can't work on property</li>
              <li>Prohibited transactions</li>
            </ul>

            <h2>Funding Checklist</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3>Before Making Offers:</h3>
              <ul>
                <li>□ Get pre-approval from lender</li>
                <li>□ Verify proof of funds letter</li>
                <li>□ Understand all costs</li>
                <li>□ Calculate cash reserves needed</li>
                <li>□ Have backup funding source</li>
              </ul>
              
              <h3>For Each Deal:</h3>
              <ul>
                <li>□ Calculate total costs</li>
                <li>□ Verify loan amount available</li>
                <li>□ Review all terms</li>
                <li>□ Understand draw schedule</li>
                <li>□ Plan for contingencies</li>
              </ul>
            </div>

            <h2>Common Funding Mistakes</h2>
            <ul>
              <li>Not having enough reserves</li>
              <li>Ignoring closing costs</li>
              <li>Underestimating holding costs</li>
              <li>Using all your cash on one deal</li>
              <li>Not reading the fine print</li>
            </ul>

            <div className="text-center mt-8">
              <a href="/starter-kit" className="btn-primary inline-flex items-center gap-2">
                Get Funding Templates & Calculators
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
