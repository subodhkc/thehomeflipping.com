import Link from 'next/link'
import { Calculator, FileText, DollarSign, CheckCircle, ArrowRight, Star, Shield, Clock } from 'lucide-react'

const features = [
  {
    icon: Calculator,
    title: 'Deal Analyzer Spreadsheet',
    description: 'Calculate ARV, MAO, ROI, and profit in minutes with our proven formulas.',
  },
  {
    icon: FileText,
    title: 'Rehab Cost Estimator',
    description: '260+ line items to accurately estimate renovation costs for any project.',
  },
  {
    icon: CheckCircle,
    title: 'Pre-Flip Checklist',
    description: 'Week-by-week action plan from property search to sold sign.',
  },
  {
    icon: DollarSign,
    title: 'Contractor Toolkit',
    description: 'Interview questions, scoping worksheets, and agreement templates.',
  },
]

const tools = [
  { name: 'Max Offer Calculator', href: '/tools/max-offer-calculator', description: 'Calculate your maximum allowable offer using the 70% rule' },
  { name: 'Rehab Cost Estimator', href: '/tools/rehab-cost-estimator', description: 'Estimate renovation costs by room and category' },
  { name: 'Roofing Calculator', href: '/tools/roofing-calculator', description: 'Calculate roofing costs based on square footage and materials' },
  { name: 'Deal Quality Analyzer', href: '/tools/deal-analyzer', description: 'Score your deals and identify red flags' },
]

const testimonials = [
  {
    quote: "The spreadsheets alone saved me from a $30,000 mistake on my first flip. Worth every penny.",
    author: "Marcus T.",
    role: "First-time Flipper, Dallas TX",
    profit: "$42K profit on first flip",
  },
  {
    quote: "Finally, a resource that doesn't try to upsell me into a $5,000 coaching program. Just practical tools.",
    author: "Jennifer L.",
    role: "Real Estate Investor, Phoenix AZ",
    profit: "3 flips completed",
  },
  {
    quote: "I analyzed 5 deals in my first week using the toolkit. Closed my first wholesale deal 3 weeks later.",
    author: "David K.",
    role: "Wholesaler, Atlanta GA",
    profit: "$8K wholesale fee",
  },
  {
    quote: "The funding guide opened my eyes to options I didn't know existed. Got my first hard money loan approved in 10 days.",
    author: "Sarah M.",
    role: "New Investor, Miami FL",
    profit: "$55K profit",
  },
  {
    quote: "I was stuck in analysis paralysis for 6 months. This toolkit got me moving in 2 weeks. Just closed my second deal.",
    author: "Robert C.",
    role: "Part-time Flipper, Chicago IL",
    profit: "$67K total profit",
  },
  {
    quote: "The wholesaling guide is pure gold. Made $12K on my first contract assignment without using a penny of my own money.",
    author: "Mike P.",
    role: "Wholesaler, Houston TX",
    profit: "$12K assignment fee",
  },
]

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container-custom py-20 lg:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <Star className="h-4 w-4 text-accent-400" />
              <span>Trusted by 500+ first-time flippers</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Start Your First House Flip
              <span className="text-secondary-400"> Without the $50,000 Learning Curve</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl">
              The complete toolkit that turns overwhelmed beginners into confident deal analyzers. 
              Spreadsheets, checklists, and guides used by successful flippers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/starter-kit" className="btn-secondary text-lg py-4 px-8 text-center">
                Get the Starter Kit - <span className="line-through opacity-75">$497</span> $67 <ArrowRight className="inline ml-2 h-5 w-5" />
              </Link>
              <Link href="/free-checklist" className="btn-outline border-white text-white hover:bg-white hover:text-primary-800 text-lg py-4 px-8 text-center">
                Download Free Checklist
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-primary-200">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Instant download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              You&apos;ve Done the Research. Now You&apos;re Stuck.
            </h2>
            <div className="text-lg text-gray-600 space-y-4">
              <p>
                You&apos;ve watched the YouTube videos. Read the Reddit threads. 
                Maybe even attended a free webinar that turned into a $10,000 pitch.
              </p>
              <p className="font-semibold text-gray-900">
                But you&apos;re still asking:
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">🤔</div>
                <p className="font-medium text-gray-900">&quot;How do I know if a deal is actually good?&quot;</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">😰</div>
                <p className="font-medium text-gray-900">&quot;What if I miss something and lose my savings?&quot;</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">🧭</div>
                <p className="font-medium text-gray-900">&quot;Where do I even start?&quot;</p>
              </div>
            </div>
            <p className="mt-10 text-lg text-gray-600">
              The truth? <span className="font-semibold text-gray-900">Most beginners don&apos;t fail because of bad deals.</span><br />
              They fail because they never start—paralyzed by information overload.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The First Flip Starter Kit
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to evaluate deals in under 30 minutes. 
              No fluff. No upsells. Just the tools experienced flippers actually use.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/starter-kit" className="btn-primary text-lg py-4 px-8">
              Get Everything for <span className="line-through opacity-75">$497</span> Just $67 <ArrowRight className="inline ml-2 h-5 w-5" />
            </Link>
            <p className="text-center text-sm text-primary-200 mt-2">
              <strong className="text-accent-400">Save $430</strong> - Limited time pricing
            </p>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free House Flipping Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Try our free tools to analyze your first deal. No signup required.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="card hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calculator className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {tool.name} <ArrowRight className="inline h-4 w-4 ml-1" />
                    </h3>
                    <p className="text-gray-600 mt-1">{tool.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                From Learning the Hard Way to Giving You a 2-Year Head Start
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  I started house flipping in 2016 with zero experience and zero mentors. Every lesson cost me time, money, or both.
                </p>
                <p>
                  I learned by doing—and by making mistakes. I analyzed hundreds of properties, walked through dozens of distressed homes, 
                  and negotiated with sellers who thought I was crazy for wanting their "problem properties."
                </p>
                <p>
                  <strong className="text-gray-900">The breakthrough came when I won three bids in a single day.</strong> That's when I knew 
                  I had cracked the code on deal analysis and competitive bidding.
                </p>
                <p>
                  Over the years, I completed <strong className="text-primary-600">17 hands-on flips</strong> and closed <strong className="text-primary-600">43 wholesale contracts</strong>. 
                  I built systems, refined my spreadsheets, and documented everything that worked.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary-600">17</div>
                    <div className="text-sm text-gray-600">Complete house flips<br />from acquisition to sale</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary-600">43</div>
                    <div className="text-sm text-gray-600">Wholesale contract deals<br />without using my money</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary-600">3</div>
                    <div className="text-sm text-gray-600">Winning bids in one day<br />at competitive auctions</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary-600">8+</div>
                    <div className="text-sm text-gray-600">Years of field experience<br />now in your hands</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 bg-gray-50 p-8 rounded-xl border-l-4 border-primary-600">
              <p className="text-lg text-gray-700 mb-4">
                <strong className="text-gray-900">I'm no longer in the business,</strong> but I didn't want this knowledge to die with my exit. 
                These are the exact tools, systems, and insights that took me years to develop through hands-on experience in the field.
              </p>
              <p className="text-lg text-gray-700">
                For <strong className="text-primary-600">almost free</strong>, you're getting everything that will give you at least a <strong className="text-primary-600">2-year head start</strong> 
                over someone starting from scratch like I did.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from Real People
            </h2>
            <p className="text-xl text-gray-600">Join hundreds who've already started their flipping journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-white">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t pt-4 mt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-sm font-semibold text-green-600 mt-2">{testimonial.profit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-accent-500 text-white rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <Clock className="h-4 w-4" />
            Limited Time Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't Waste Time. ACT Now.
          </h2>
          <p className="text-xl text-primary-100 mb-4 max-w-3xl mx-auto">
            This $67 commitment won't make you poor, but it has a <strong className="text-accent-400">high chance of making you rich</strong>.
          </p>
          <p className="text-lg text-primary-200 mb-8 max-w-2xl mx-auto">
            Go flip with or without money. I'll give you all the insider knowledge that took me years to gather hands-on in the field.
          </p>
          <div className="bg-accent-500 text-white inline-block px-6 py-3 rounded-lg font-bold text-xl mb-6">
            <span className="line-through opacity-75 text-lg">$497</span> <span className="text-3xl">$67</span>
            <span className="text-sm font-normal ml-2">(Save $430 - 87% OFF)</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/starter-kit" className="btn-secondary text-lg py-4 px-8">
              Get Started for Just $67 <ArrowRight className="inline ml-2" />
            </Link>
            <Link href="/free-checklist" className="btn-outline border-white text-white hover:bg-white hover:text-primary-800 text-lg py-4 px-8">
              Start with Free Checklist
            </Link>
          </div>
          <p className="text-sm text-primary-300">
            Join 500+ aspiring flippers who started their journey with the First Flip Starter Kit
          </p>
        </div>
      </section>
    </div>
  )
}
