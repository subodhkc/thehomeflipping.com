import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Getting Started Guide | TheHomeFlipping.com',
  description: 'Complete guide to getting started with house flipping - from finding deals to closing your first flip.',
}

export default function GettingStartedGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Getting Started Guide</h1>
            <p className="text-xl text-gray-600">
              Your roadmap from beginner to successful house flipper
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-900">
                <strong>Quick Start:</strong> This guide is included in the First Flip Starter Kit 
                with detailed checklists, templates, and examples. Get the complete toolkit for just $67.
              </p>
            </div>

            <h2>Before You Begin</h2>
            <p>House flipping can be profitable, but it's not get-rich-quick. Success requires:</p>
            <ul>
              <li>Education about your local market</li>
              <li>Access to capital (cash or financing)</li>
              <li>A reliable team (agent, contractor, lender)</li>
              <li>Patience and persistence</li>
            </ul>

            <h2>Step 1: Market Research</h2>
            <p>Understanding your market is crucial. Focus on:</p>
            <ul>
              <li><strong>Neighborhoods:</strong> Identify areas with rising values</li>
              <li><strong>Property Types:</strong> Single-family homes are best for beginners</li>
              <li><strong>Price Points:</strong> Start with properties under the median home price</li>
              <li><strong>Days on Market:</strong> Look for areas with 30-60 average DOM</li>
            </ul>

            <h2>Step 2: Build Your Team</h2>
            <p>You can't do it alone. Key team members:</p>
            <ul>
              <li><strong>Real Estate Agent:</strong> Find one with investor experience</li>
              <li><strong>Contractor:</strong> Get quotes and check references</li>
              <li><strong>Lender:</strong> Pre-approval for financing</li>
              <li><strong>Title Company:</strong> For smooth closings</li>
            </ul>

            <h2>Step 3: Funding Strategy</h2>
            <p>Common funding options:</p>
            <ul>
              <li><strong>Cash:</strong> Best rates, but ties up capital</li>
              <li><strong>Hard Money:</strong> Fast approval, higher rates</li>
              <li><strong>Private Money:</strong> From individuals, flexible terms</li>
              <li><strong>Conventional:</strong> Lower rates, slower process</li>
            </ul>

            <h2>Step 4: Finding Deals</h2>
            <p>Where to find properties:</p>
            <ul>
              <li>MLS (with agent)</li>
              <li>Wholesalers</li>
              <li>Auctions</li>
              <li>Direct mail</li>
              <li>Networking</li>
            </ul>

            <h2>Step 5: Analyzing Deals</h2>
            <p>Use the 70% Rule:</p>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>MAO = (ARV × 0.70) - Repair Costs</strong></p>
              <p>MAO = Maximum Allowable Offer</p>
              <p>ARV = After Repair Value</p>
            </div>

            <h2>Step 6: Making Offers</h2>
            <p>Tips for successful offers:</p>
            <ul>
              <li>Make multiple offers</li>
              <li>Include proof of funds</li>
              <li>Be prepared to negotiate</li>
              <li>Don't get emotionally attached</li>
            </ul>

            <h2>Step 7: Due Diligence</h2>
            <p>Before closing:</p>
            <ul>
              <li>Professional inspection</li>
              <li>Verify title is clear</li>
              <li>Get contractor bids</li>
              <li>Check permit requirements</li>
              <li>Verify insurance costs</li>
            </ul>

            <h2>Step 8: The Rehab</h2>
            <p>Keys to successful renovation:</p>
            <ul>
              <li>Create detailed scope of work</li>
              <li>Get multiple bids</li>
              <li>Track budget carefully</li>
              <li>Visit site regularly</li>
              <li>Plan for delays</li>
            </ul>

            <h2>Step 9: Selling</h2>
            <p>Maximize your sale price:</p>
            <ul>
              <li>Professional photos</li>
              <li>Stage the property</li>
              <li>Price it right</li>
              <li>Be flexible with showings</li>
              <li>Review all offers</li>
            </ul>

            <h2>Common Mistakes to Avoid</h2>
            <ul>
              <li>Overpaying for properties</li>
              <li>Underestimating repair costs</li>
              <li>Not having enough reserves</li>
              <li>Skipping due diligence</li>
              <li>Trying to do everything yourself</li>
            </ul>

            <h2>Next Steps</h2>
            <p>Ready to dive deeper? The First Flip Starter Kit includes:</p>
            <ul>
              <li>Detailed deal analyzer spreadsheet</li>
              <li>Rehab cost estimator with 260+ line items</li>
              <li>Contractor templates and interview questions</li>
              <li>Complete due diligence checklist</li>
              <li>ARV calculator cheat sheet</li>
            </ul>

            <div className="text-center mt-8">
              <a href="/starter-kit" className="btn-primary inline-flex items-center gap-2">
                Get the Complete Starter Kit - $67
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
