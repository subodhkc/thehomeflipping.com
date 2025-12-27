import Link from 'next/link'
import { Check, Star, Shield, Clock, Download, FileSpreadsheet, FileText, CheckSquare, Users, ArrowRight, TrendingUp } from 'lucide-react'

const productIncludes = [
  {
    icon: FileSpreadsheet,
    title: 'Deal Analyzer Spreadsheet',
    description: 'Calculate ARV, MAO, ROI, cash flow, and profit projections. Works with any property.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Rehab Cost Estimator',
    description: '260+ line items organized by room. Never miss a cost again.',
  },
  {
    icon: CheckSquare,
    title: 'Pre-Flip Checklist',
    description: 'Week-by-week action plan from property search to sold sign.',
  },
  {
    icon: FileText,
    title: 'Contractor Toolkit',
    description: 'Interview questions, scoping worksheets, and agreement templates.',
  },
  {
    icon: FileText,
    title: 'Getting Started Guide',
    description: 'Complete guide to finding deals, auctions, and cash buyer agencies.',
  },
  {
    icon: FileText,
    title: 'Funding Guide',
    description: 'Hard money lenders, private money, and creative financing strategies.',
  },
  {
    icon: FileText,
    title: 'Wholesaling Guide',
    description: 'Make $5K-$50K per deal without using your own money.',
  },
  {
    icon: Users,
    title: 'Buyer List Template',
    description: 'Organize and track your cash buyer network.',
  },
]

const bonuses = [
  { title: 'ARV Calculator Cheat Sheet', value: '$27' },
  { title: 'Comp Analysis Template', value: '$37' },
  { title: 'Due Diligence Checklist', value: '$17' },
]

const competitors = [
  { name: 'Fortune Builders Mastery', price: '$25,000+', type: 'Coaching Program' },
  { name: 'Flip Empire University', price: '$997-$2,997', type: 'Online Course' },
  { name: 'Real Estate Investor Bootcamp', price: '$1,500-$5,000', type: 'Live Training' },
  { name: 'House Flipping Blueprint', price: '$497', type: 'Course + Templates' },
]

const testimonials = [
  {
    quote: "I almost signed up for a $2,000 course. Found this instead and saved myself a fortune. The spreadsheets are professional-grade.",
    author: "Tom R.",
    location: "Denver, CO",
    result: "$38K profit on first flip",
  },
  {
    quote: "The wholesaling guide alone is worth 10x the price. Made my first $8K assignment fee in 3 weeks.",
    author: "Lisa K.",
    location: "Orlando, FL",
    result: "$8K wholesale fee",
  },
  {
    quote: "Finally, someone who doesn't try to upsell me into a $5,000 'mentorship'. Just practical tools that work.",
    author: "James M.",
    location: "Austin, TX",
    result: "2 flips completed",
  },
  {
    quote: "The deal analyzer saved me from a terrible deal that looked good on paper. Worth every penny.",
    author: "Patricia S.",
    location: "Phoenix, AZ",
    result: "Avoided $40K loss",
  },
]

const faqs = [
  {
    q: 'What format are the files in?',
    a: 'Spreadsheets are in Excel (.xlsx) format that also works with Google Sheets. Guides are in PDF format. Everything is instantly downloadable.',
  },
  {
    q: 'Is this for beginners or experienced flippers?',
    a: 'This kit is designed specifically for beginners doing their first 1-3 flips. Experienced flippers may find some value but likely have their own systems.',
  },
  {
    q: 'Do I need any special software?',
    a: 'Just Microsoft Excel or Google Sheets (free) and a PDF reader. No special software required.',
  },
  {
    q: 'What if it doesn\'t work for me?',
    a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied for any reason, email us and we\'ll refund your purchase.',
  },
  {
    q: 'Is this a course or coaching program?',
    a: 'No, this is a toolkit of practical resources - spreadsheets, templates, and guides. No videos, no coaching calls, no upsells.',
  },
  {
    q: 'Who created this toolkit?',
    a: 'A former house flipper with 8+ years of hands-on experience, 17 completed flips, and 43 wholesale deals. These are the actual tools and systems used in real deals.',
  },
]

export const metadata = {
  title: 'First Flip Starter Kit - $67 | TheHomeFlipping.com',
  description: 'The complete toolkit for first-time house flippers. Deal analyzer, rehab estimator, checklists, and guides. Instant download.',
}

export default function StarterKitPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-500 text-white rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <Star className="h-4 w-4" />
              Most Popular
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              First Flip Starter Kit
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Everything you need to analyze deals, estimate costs, and start your first flip with confidence.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 inline-block">
              <div className="text-center mb-4">
                <div className="text-primary-300 text-lg mb-2">Regular Price</div>
                <div className="text-5xl font-bold line-through text-primary-400">$497</div>
              </div>
              <div className="text-center">
                <div className="text-accent-400 text-lg font-semibold mb-2">Today's Price (87% OFF)</div>
                <div className="text-7xl font-bold text-white">$67</div>
                <div className="text-primary-200 mt-2">One-time payment • Lifetime access</div>
                <div className="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold mt-4 inline-block">
                  YOU SAVE $430
                </div>
              </div>
            </div>
            <Link href="/checkout" className="btn-secondary text-xl py-5 px-10">
              Get Instant Access <Download className="inline ml-2 h-5 w-5" />
            </Link>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-primary-200">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>30-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Instant download</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Lifetime access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything Inside the Kit
            </h2>
            <p className="text-xl text-gray-600">
              8 essential tools and guides to launch your flipping career
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productIncludes.map((item) => (
              <div key={item.title} className="card hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-16 bg-gradient-to-r from-accent-50 to-accent-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Plus 3 Exclusive Bonuses
            </h2>
            <div className="space-y-4">
              {bonuses.map((bonus) => (
                <div key={bonus.title} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-green-500" />
                    <span className="font-medium">{bonus.title}</span>
                  </div>
                  <span className="text-gray-500 line-through">{bonus.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-600 rounded-xl p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  Total Value: <span className="line-through text-gray-500">$497</span>
                </p>
                <p className="text-3xl font-bold text-primary-600 mb-2">
                  Today: Just $67
                </p>
                <p className="text-lg text-gray-700">
                  <span className="bg-accent-500 text-white px-3 py-1 rounded-full font-semibold">87% OFF</span>
                  {' '}Save $430 - Almost Free!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compare: Why Pay Thousands More?
              </h2>
              <p className="text-xl text-gray-600">
                Other programs charge $500-$25,000+ for similar (or less) content
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Program</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Price</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Practical Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp) => (
                    <tr key={comp.name} className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-700">{comp.name}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900">{comp.price}</td>
                      <td className="py-4 px-4 text-gray-600">{comp.type}</td>
                      <td className="py-4 px-4 text-center text-gray-400">❌</td>
                    </tr>
                  ))}
                  <tr className="bg-primary-50 border-2 border-primary-600">
                    <td className="py-4 px-4 font-bold text-primary-900">First Flip Starter Kit</td>
                    <td className="py-4 px-4 font-bold text-primary-600 text-xl">$67</td>
                    <td className="py-4 px-4 font-semibold text-primary-900">Complete Toolkit</td>
                    <td className="py-4 px-4 text-center text-2xl">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-lg">
              <p className="text-lg text-gray-700">
                <strong className="text-gray-900">Real talk:</strong> Most courses are 90% motivation and 10% actionable content. 
                This toolkit is 100% practical tools you'll use on every deal. No fluff, no filler, no upsells to a "premium tier."
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
              What Buyers Are Saying
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-sm font-semibold text-green-600 mt-2">{testimonial.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              This Kit is Perfect For You If...
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You&apos;re researching your first house flip</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You want to analyze deals but don&apos;t know where to start</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You&apos;re worried about missing hidden costs</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You want practical tools, not another course</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You&apos;re interested in wholesaling with no money down</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You need help estimating renovation costs</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You want to understand hard money and funding options</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You prefer learning by doing over watching videos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="card">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Analyze Your First Deal?
          </h2>
          <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
            Get instant access to all 8 tools and 3 bonuses for just $67.
          </p>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-accent-500 text-white rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Clock className="h-4 w-4" />
              Don't Wait - Start Today
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 inline-block">
            <div className="text-4xl font-bold mb-2">
              <span className="line-through text-primary-400 text-2xl">$497</span>
              <span className="text-white ml-3">$67</span>
            </div>
            <div className="text-accent-400 font-semibold text-lg">Save $430 (87% OFF)</div>
          </div>
          <Link href="/checkout" className="btn-secondary text-xl py-5 px-10 mb-6 inline-block">
            Get Started for Just $67 <ArrowRight className="inline ml-2 h-5 w-5" />
          </Link>
          <p className="text-lg text-primary-200 mb-4">
            This $67 won't make you poor, but it has a high chance of making you rich.
          </p>
          <p className="text-sm text-primary-300">
            <strong>Almost free</strong> compared to $25,000 courses. Same knowledge, 373x less expensive.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-primary-300">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Instant download after purchase</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
