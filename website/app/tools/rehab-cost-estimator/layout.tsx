import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rehab Cost Estimator - House Renovation Cost Calculator | TheHomeFlipping.com',
  description: 'Free house flipping rehab cost estimator. Calculate renovation costs by square footage, room, and quality level. Professional renovation budget calculator for real estate investors.',
  keywords: 'rehab cost estimator, renovation cost calculator, house flipping costs, repair cost calculator, real estate renovation budget',
  openGraph: {
    title: 'Rehab Cost Estimator - Free Renovation Calculator',
    description: 'Calculate accurate renovation costs for your house flipping projects.',
    url: 'https://thehomeflipping.com/tools/rehab-cost-estimator',
    type: 'website'
  },
  alternates: {
    canonical: 'https://thehomeflipping.com/tools/rehab-cost-estimator'
  }
}

export default function RehabCostEstimatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
