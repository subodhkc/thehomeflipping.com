import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | TheHomeFlipping.com',
  description: 'Privacy policy for TheHomeFlipping.com - How we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
            <p>When you purchase our products or use our services, we may collect:</p>
            <ul>
              <li>Name and email address</li>
              <li>Payment information (processed securely by Stripe)</li>
              <li>Phone number (if provided)</li>
              <li>Communication preferences</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Usage Information</h3>
            <p>We automatically collect certain information about your device and usage:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Device and operating system</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <ul>
              <li>To process your orders and deliver purchased products</li>
              <li>To provide customer support</li>
              <li>To send important updates about your purchases</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
            <ul>
              <li>To payment processors (Stripe) for transaction processing</li>
              <li>To email service providers (Resend) for delivering your products</li>
              <li>When required by law</li>
              <li>To protect our rights, property, or safety</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p>We take appropriate security measures to protect your personal information:</p>
            <ul>
              <li>Secure HTTPS encryption</li>
              <li>PCI DSS compliant payment processing</li>
              <li>Regular security updates</li>
              <li>Limited employee access to data</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies</h2>
            <p>We use cookies to:</p>
            <ul>
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Provide personalized content</li>
              <li>Process payments securely</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Stripe</strong> - Payment processing</li>
              <li><strong>Resend</strong> - Email delivery</li>
              <li><strong>Vercel</strong> - Website hosting</li>
              <li><strong>Google Analytics</strong> - Website analytics</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
            <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">International Users</h2>
            <p>If you're accessing our services from outside the United States, please be aware that your information may be transferred to and processed in the United States.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <ul>
              <li>Email: privacy@thehomeflipping.com</li>
              <li>Address: Available upon request</li>
            </ul>
            
            <div className="mt-12 p-6 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                This privacy policy is designed to comply with GDPR, CCPA, and other applicable privacy laws. 
                By using our website, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
