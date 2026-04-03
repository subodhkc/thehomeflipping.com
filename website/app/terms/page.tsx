import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | TheHomeFlipping.com',
  description: 'Terms of Service for TheHomeFlipping.com - Rules and guidelines for using our website and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
            <p>By accessing and using TheHomeFlipping.com, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on TheHomeFlipping.com for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Products and Services</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">First Flip Starter Kit</h3>
            <p>The First Flip Starter Kit includes digital products (PDFs and spreadsheets) designed to help with house flipping education and analysis.</p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Payment Terms</h3>
            <ul>
              <li>All payments are processed securely through Stripe</li>
              <li>Prices are listed in USD</li>
              <li>All sales are final unless specifically stated</li>
              <li>30-day money-back guarantee for digital products</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Refund Policy</h3>
            <p>We offer a 30-day money-back guarantee on the First Flip Starter Kit. If you're not satisfied, contact us within 30 days of purchase for a full refund.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">User Responsibilities</h2>
            <p>As a user of our website and products, you agree to:</p>
            <ul>
              <li>Provide accurate information when making purchases</li>
              <li>Use our products for personal, non-commercial use only</li>
              <li>Not share, resell, or distribute our digital products</li>
              <li>Not attempt to reverse engineer or copy our materials</li>
              <li>Use the information responsibly and at your own risk</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
            <p>All content, products, and materials on TheHomeFlipping.com are owned by or licensed to us and are protected by copyright, trademark, and other intellectual property laws.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Disclaimer</h2>
            <p>The information on this website and in our products is provided for educational purposes only. We are not financial advisors, attorneys, or real estate professionals. The information provided should not be considered legal, financial, or investment advice.</p>
            
            <p>You should consult with qualified professionals before making any investment decisions. Real estate investing involves risk, and you could lose money.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
            <p>In no event shall TheHomeFlipping.com, its owners, or its employees be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Indemnification</h2>
            <p>You agree to indemnify and hold harmless TheHomeFlipping.com from any claims, damages, or expenses arising from your use of our website or products.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these third-party sites.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this website.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the State of [Your State], without regard to its conflict of law provisions.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Information</h2>
            <p>If you have questions about these Terms of Service, please contact us at:</p>
            <ul>
              <li>Email: support@thehomeflipping.com</li>
              <li>Address: Available upon request</li>
            </ul>
            
            <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Important Notice:</strong> Real estate investing involves substantial risk. 
                Past results are not indicative of future performance. 
                Always conduct your own due diligence and consult with qualified professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
