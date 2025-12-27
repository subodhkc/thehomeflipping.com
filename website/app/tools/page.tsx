import Link from 'next/link'
import { Calculator, Home, DollarSign, Hammer, CheckSquare, ArrowRight } from 'lucide-react'

const tools = [
  {
    name: 'Max Offer Calculator',
    description: 'Calculate your maximum allowable offer using the 70% rule. Enter ARV and repair costs to instantly know the highest price you should pay.',
    href: '/tools/max-offer-calculator',
    icon: DollarSign,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Rehab Cost Estimator',
    description: 'Estimate renovation costs by room and category. Uses industry-standard cost per square foot calculations.',
    href: '/tools/rehab-cost-estimator',
    icon: Hammer,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Roofing Calculator',
    description: 'Calculate roofing replacement costs based on roof size, pitch, and material type.',
    href: '/tools/roofing-calculator',
    icon: Home,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Deal Quality Analyzer',
    description: 'Score your potential deals on key metrics. Identify red flags and opportunities before making an offer.',
    href: '/tools/deal-analyzer',
    icon: CheckSquare,
    color: 'bg-purple-100 text-purple-600',
  },
]

export const metadata = {
  title: 'Free House Flipping Calculators & Tools | TheHomeFlipping.com',
  description: 'Free calculators for house flippers: Max Offer Calculator, Rehab Cost Estimator, Roofing Calculator, and Deal Analyzer. No signup required.',
}

export default function ToolsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12 lg:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Calculator className="h-4 w-4" />
            Free Tools - No Signup Required
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            House Flipping Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional-grade tools to analyze deals, estimate costs, and make confident investment decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="card hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${tool.color}`}>
                  <tool.icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                    {tool.name}
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="text-gray-600 mt-2">{tool.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-secondary-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Want All the Tools in One Package?
            </h3>
            <p className="text-gray-600 mb-6">
              Get our complete First Flip Starter Kit with advanced spreadsheets, checklists, and guides.
            </p>
            <Link href="/starter-kit" className="btn-primary inline-flex items-center gap-2">
              Get the Starter Kit - $67 <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
