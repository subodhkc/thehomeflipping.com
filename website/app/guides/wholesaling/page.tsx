import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wholesaling Guide | TheHomeFlipping.com',
  description: 'Complete guide to real estate wholesaling - how to make $5K-$50K with little to no money down.',
}

export default function WholesalingGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Wholesaling Guide</h1>
            <p className="text-xl text-gray-600">
              Make $5K-$50K per deal without buying properties or using your own money
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <p className="text-yellow-900">
                <strong>Quick Definition:</strong> Wholesaling is finding discounted properties, 
                putting them under contract, then selling that contract to an investor for a fee.
              </p>
            </div>

            <h2>How Wholesaling Works</h2>
            <ol>
              <li><strong>Find Distressed Property:</strong> Motivated seller, below market value</li>
              <li><strong>Negotiate Contract:</strong> Get property under contract at wholesale price</li>
              <li><strong>Find Buyer:</strong> Investor who wants the property</li>
              <li><strong>Assign Contract:</strong> Transfer your rights to buyer for assignment fee</li>
              <li><strong>Close Deal:</strong> Buyer closes, you get paid</li>
            </ol>

            <h2>Why Wholesale?</h2>
            
            <h3>Advantages</h3>
            <ul>
              <li>Little to no money needed</li>
              <li>No credit requirements</li>
              <li>No renovation work</li>
              <li>Quick profits (30-60 days)</li>
              <li>Learn the market</li>
              <li>Build buyer list</li>
            </ul>
            
            <h3>Challenges</h3>
            <ul>
              <li>Finding good deals</li>
              <li>Building buyer list</li>
              <li>Legal complexities</li>
              <li>Competition</li>
              <li>Seller education</li>
            </ul>

            <h2>Finding Motivated Sellers</h2>
            
            <h3>Marketing Methods</h3>
            <ul>
              <li><strong>Direct Mail:</strong> Absentee owners, probate, pre-foreclosure</li>
              <li><strong>Bandit Signs:</strong> "We Buy Houses" (check local laws)</li>
              <li><strong>Cold Calling:</strong> For Sale By Owner, expired listings</li>
              <li><strong>Digital Marketing:</strong> PPC, SEO, social media</li>
              <li><strong>Networking:</strong> REIA meetings, other wholesalers</li>
            </ul>
            
            <h3>Target Properties</h3>
            <ul>
              <li>Distressed condition</li>
              <li>Vacant/abandoned</li>
              <li>Divorce situations</li>
              <li>Probate/inheritance</li>
              <li>Pre-foreclosure</li>
              <li>Tax delinquent</li>
              <li>Tired landlords</li>
            </ul>

            <h2>The Perfect Wholesaling Formula</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3>Calculate Your Offer</h3>
              <p><strong>ARV × 65% - Repairs - Your Fee = Offer Price</strong></p>
              <br />
              <p><strong>Example:</strong></p>
              <ul>
                <li>ARV: $200,000</li>
                <li>65% of ARV: $130,000</li>
                <li>Repairs: $30,000</li>
                <li>Your Fee: $10,000</li>
                <li><strong>Max Offer: $90,000</strong></li>
              </ul>
            </div>

            <h2>Building Your Buyer List</h2>
            
            <h3>Where to Find Buyers</h3>
            <ul>
              <li>Cash buyers at foreclosure auctions</li>
              <li>"We Buy Houses" signs</li>
              <li>REIA meetings</li>
              <li>LinkedIn real estate groups</li>
              <li>Local meetups</li>
              <li>Property management companies</li>
            </ul>
            
            <h3>Qualifying Buyers</h3>
            <ul>
              <li>Proof of funds</li>
              <li>Closing history</li>
              <li>Target properties</li>
              <li>Geographic preferences</li>
              <li>Profit requirements</li>
            </ul>

            <h2>Next Steps</h2>
            <p>Ready to start wholesaling? The First Flip Starter Kit includes:</p>
            <ul>
              <li>Buyer list spreadsheet template</li>
              <li>Deal analyzer spreadsheet</li>
              <li>Contract templates</li>
              <li>Marketing materials</li>
              <li>Repair cost estimator</li>
            </ul>

            <div className="text-center mt-8">
              <a href="/starter-kit" className="btn-primary inline-flex items-center gap-2">
                Get Wholesaling Templates - Only $67
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
