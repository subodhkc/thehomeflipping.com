import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ARV Calculator Guide | TheHomeFlipping.com',
  description: 'Learn how to calculate After Repair Value (ARV) accurately for real estate investing and house flipping.',
}

export default function ARVCalculatorGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">ARV Calculator Guide</h1>
            <p className="text-xl text-gray-600">
              Master the art of property valuation - the most critical skill in house flipping
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-900">
                <strong>ARV = After Repair Value</strong> - The estimated value of a property 
                after all renovations are complete.
              </p>
            </div>

            <h2>Why ARV Matters</h2>
            <p>Accurate ARV calculation is crucial because it determines:</p>
            <ul>
              <li>Your maximum offer price</li>
              <li>Potential profit margin</li>
              <li>Feasibility of the deal</li>
              <li>Amount you can borrow</li>
              <li>Sales price expectations</li>
            </ul>

            <h2>The Basic ARV Formula</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p><strong>ARV = Price Per SqFt × Subject Property SqFt + Adjustments</strong></p>
              <br />
              <p><strong>Step 1:</strong> Find comparable properties</p>
              <p><strong>Step 2:</strong> Calculate price per square foot</p>
              <p><strong>Step 3:</strong> Apply to subject property</p>
              <p><strong>Step 4:</strong> Make adjustments</p>
            </div>

            <h2>Finding Good Comps</h2>
            
            <h3>What Makes a Good Comp?</h3>
            <ul>
              <li>Sold within last 6 months (3 months is ideal)</li>
              <li>Same neighborhood or immediately adjacent</li>
              <li>Similar square footage (±10%)</li>
              <li>Same age (±5 years)</li>
              <li>Similar bed/bath count</li>
              <li>Similar style and construction</li>
              <li>Normal sale (not foreclosure/short sale)</li>
            </ul>
            
            <h3>Where to Find Comps</h3>
            <ul>
              <li><strong>MLS:</strong> Most accurate (requires agent)</li>
              <li><strong>Redfin:</strong> Good sold data</li>
              <li><strong>Zillow:</strong> Verify with other sources</li>
              <li><strong>County Records:</strong> Most reliable</li>
              <li><strong>Auction Results:</strong> For distressed properties</li>
            </ul>

            <h2>Step-by-Step ARV Calculation</h2>
            
            <h3>Example Property</h3>
            <ul>
              <li>Address: 123 Main St</li>
              <li>Square feet: 1,500</li>
              <li>Beds/Baths: 3/2</li>
              <li>Year built: 2005</li>
              <li>Condition: Needs full rehab</li>
            </ul>
            
            <h3>Step 1: Find Comps</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>Comp 1:</strong> 145 Main St - 1,450 sqft - Sold 2 months ago - $265,000</p>
              <p><strong>Comp 2:</strong> 160 Main St - 1,600 sqft - Sold 1 month ago - $285,000</p>
              <p><strong>Comp 3:</strong> 110 Oak St - 1,550 sqft - Sold 3 months ago - $270,000</p>
            </div>
            
            <h3>Step 2: Calculate Price Per SqFt</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p>Comp 1: $265,000 ÷ 1,450 = $182.76/sqft</p>
              <p>Comp 2: $285,000 ÷ 1,600 = $178.13/sqft</p>
              <p>Comp 3: $270,000 ÷ 1,550 = $174.19/sqft</p>
              <p><strong>Average: $178.36/sqft</strong></p>
            </div>
            
            <h3>Step 3: Apply to Subject</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p>1,500 sqft × $178.36 = $267,540</p>
              <p><strong>Base ARV: $267,540</strong></p>
            </div>
            
            <h3>Step 4: Make Adjustments</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p>Subject has newer HVAC: +$5,000</p>
              <p>Subject has no garage: -$10,000</p>
              <p>Subject on busier street: -$5,000</p>
              <p><strong>Net adjustment: -$10,000</strong></p>
              <p><strong>Final ARV: $257,540</strong></p>
            </div>

            <h2>Adjustment Guidelines</h2>
            
            <h3>Location Adjustments</h3>
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Feature</th>
                  <th className="border p-2 text-left">Superior</th>
                  <th className="border p-2 text-left">Inferior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Street</td>
                  <td className="border p-2">+$5,000</td>
                  <td className="border p-2">-$5,000</td>
                </tr>
                <tr>
                  <td className="border p-2">School District</td>
                  <td className="border p-2">+$10,000</td>
                  <td className="border p-2">-$10,000</td>
                </tr>
                <tr>
                  <td className="border p-2">Views</td>
                  <td className="border p-2">+$15,000</td>
                  <td className="border p-2">-$5,000</td>
                </tr>
              </tbody>
            </table>
            
            <h3>Feature Adjustments</h3>
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Feature</th>
                  <th className="border p-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Extra Bathroom</td>
                  <td className="border p-2">+$10,000</td>
                </tr>
                <tr>
                  <td className="border p-2">Extra Bedroom</td>
                  <td className="border p-2">+$8,000</td>
                </tr>
                <tr>
                  <td className="border p-2">Garage Space</td>
                  <td className="border p-2">+$5,000 per bay</td>
                </tr>
                <tr>
                  <td className="border p-2">Swimming Pool</td>
                  <td className="border p-2">+$15,000</td>
                </tr>
              </tbody>
            </table>

            <h2>Time Adjustments</h2>
            <p>Markets change over time. Adjust for appreciation/depreciation:</p>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>Monthly Change % = (Current Price - Old Price) ÷ Old Price ÷ Months</strong></p>
              <br />
              <p><strong>Example:</strong></p>
              <p>3 months ago: $250,000</p>
              <p>Today: $255,000</p>
              <p>Monthly increase: (255,000 - 250,000) ÷ 250,000 ÷ 3 = 0.67%</p>
              <p>For a 4-month-old comp: 4 × 0.67% = 2.68% increase</p>
            </div>

            <h2>Advanced Techniques</h2>
            
            <h3>Bracketing</h3>
            <p>Always have comps both above and below your subject property. This shows the value range.</p>
            
            <h3>Weighted Comps</h3>
            <ul>
              <li>Recent sales weigh more</li>
              <li>Similar properties weigh more</li>
              <li>Proximity matters</li>
              <li>Same neighborhood {'>'} Adjacent</li>
            </ul>
            
            <h3>Statistical Analysis</h3>
            <ul>
              <li>Calculate median and mean</li>
              <li>Look for outliers</li>
              <li>Use standard deviation</li>
              <li>Track market trends</li>
            </ul>

            <h2>Common ARV Mistakes</h2>
            <ul>
              <li>Using active listings (only sold properties)</li>
              <li>Ignoring condition differences</li>
              <li>Using old sales data</li>
              <li>Not enough comps</li>
              <li>Forgetting time adjustments</li>
              <li>Letting emotion influence value</li>
              <li>Not verifying square footage</li>
            </ul>

            <h2>ARV Quick Reference</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3>Red Flags</h3>
              <ul>
                <li>□ Only one good comp available</li>
                <li>□ Large price variance between comps</li>
                <li>□ All comps over 6 months old</li>
                <li>□ Different property types</li>
                <li>□ No recent sales in area</li>
              </ul>
              
              <h3>Best Practices</h3>
              <ul>
                <li>□ Always verify in person</li>
                <li>□ Take photos of comps</li>
                <li>□ Build a comp database</li>
                <li>□ Document your adjustments</li>
                <li>□ Be conservative</li>
              </ul>
            </div>

            <h2>The 70% Rule Connection</h2>
            <p>Once you have ARV, use the 70% rule to find your maximum offer:</p>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>MAO = (ARV × 0.70) - Repair Costs</strong></p>
              <br />
              <p>Using our example ARV of $257,540:</p>
              <p>MAO = ($257,540 × 0.70) - $45,000</p>
              <p>MAO = $180,278 - $45,000</p>
              <p><strong>Maximum Offer: $135,278</strong></p>
            </div>

            <h2>Tools & Resources</h2>
            <p>The First Flip Starter Kit includes:</p>
            <ul>
              <li>Professional ARV calculator spreadsheet</li>
              <li>Comp analysis template</li>
              <li>Adjustment matrix</li>
              <li>Market trend tracker</li>
              <li>Deal analyzer with ARV calculations</li>
            </ul>

            <div className="text-center mt-8">
              <a href="/starter-kit" className="btn-primary inline-flex items-center gap-2">
                Get ARV Calculator & Spreadsheets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
