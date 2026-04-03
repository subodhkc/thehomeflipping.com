import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | TheHomeFlipping.com',
  description: 'Learn about TheHomeFlipping.com and our mission to help first-time house flippers succeed.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About TheHomeFlipping.com</h1>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700">
                We're here to demystify house flipping and provide first-time investors with the tools, 
                knowledge, and confidence needed to succeed in real estate investing. No gatekeeping, 
                no fluff - just practical guidance from someone who's actually done it.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Story</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-700 mb-4">
                    I started my flipping journey with lots of enthusiasm but little direction. 
                    I made expensive mistakes, learned hard lessons, and eventually developed 
                    systems that led to 17 successful flips.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The biggest realization? Most "gurus" overcomplicate things to justify 
                    their high-priced courses. The reality is, successful flipping comes down 
                    to understanding a few key principles and having the right tools.
                  </p>
                  <p className="text-gray-700">
                    That's why I created TheHomeFlipping.com - to provide what I wish I had 
                    when I started: straightforward guidance and practical tools at an affordable price.
                  </p>
                </div>
                <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Photo of founder
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Philosophy</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Education First</h3>
                  <p className="text-gray-600">
                    We believe in teaching the "why" behind every strategy so you can adapt 
                    to any market condition, not just follow a rigid formula.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Practical Tools</h3>
                  <p className="text-gray-600">
                    Our spreadsheets and checklists are the same ones used in actual flips - 
                    tested, refined, and proven to work in the real world.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">No Hype</h3>
                  <p className="text-gray-600">
                    Real estate isn't get-rich-quick. We're honest about the work involved 
                    and focused on sustainable, long-term success.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">By the Numbers</h2>
              <div className="grid md:grid-cols-4 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">17</div>
                  <div className="text-gray-600">Successful Flips</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">$2.3M</div>
                  <div className="text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">5,000+</div>
                  <div className="text-gray-600">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Makes Us Different</h2>
              <div className="bg-primary-50 p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700">No upsells or hidden fees - one price gets you everything</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700">Real-world tools, not theoretical concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700">Actually responsive to questions and support requests</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700">Focused on first-time flippers, not experienced investors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700">30-day money-back guarantee - no risk to try</span>
                  </li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-lg text-gray-700 mb-4">
                We're committed to your success. That means:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Continuously updating our materials based on market changes</li>
                <li>• Adding new tools and resources as the industry evolves</li>
                <li>• Providing honest feedback about deals and strategies</li>
                <li>• Being available to answer your questions</li>
                <li>• Never promising overnight success or unrealistic returns</li>
              </ul>
            </section>
            
            <section className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
              <p className="text-lg text-gray-700 mb-6">
                Join thousands of aspiring flippers who've taken their first step with our guidance.
              </p>
              <a href="/starter-kit" className="btn-primary inline-flex items-center gap-2">
                Get the First Flip Starter Kit
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
