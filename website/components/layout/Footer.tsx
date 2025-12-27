import Link from 'next/link'
import { Calculator, BookOpen, Mail, Home } from 'lucide-react'

const footerLinks = {
  tools: [
    { name: 'Max Offer Calculator', href: '/tools/max-offer-calculator' },
    { name: 'Rehab Cost Estimator', href: '/tools/rehab-cost-estimator' },
    { name: 'Roofing Calculator', href: '/tools/roofing-calculator' },
    { name: 'Deal Analyzer', href: '/tools/deal-analyzer' },
  ],
  guides: [
    { name: 'Getting Started', href: '/guides/getting-started' },
    { name: 'Funding Your Flip', href: '/guides/funding' },
    { name: 'Wholesaling Guide', href: '/guides/wholesaling' },
    { name: 'ARV Calculator Guide', href: '/guides/arv-calculator' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-white">
                The<span className="text-secondary-400">Home</span>Flipping
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              The complete toolkit for first-time house flippers. Start your flipping journey with confidence.
            </p>
            <div className="mt-6">
              <Link
                href="/starter-kit"
                className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Get the Starter Kit →
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white uppercase tracking-wider">
              <Calculator className="h-4 w-4" />
              Free Tools
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              Guides
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.guides.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white uppercase tracking-wider">
              <Home className="h-4 w-4" />
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} TheHomeFlipping.com. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Built for aspiring house flippers who want to start with confidence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
