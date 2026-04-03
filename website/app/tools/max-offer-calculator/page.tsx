import { Metadata } from 'next'
import MaxOfferCalculatorClient from './MaxOfferCalculatorClient'

export const metadata: Metadata = {
  title: 'Max Offer Calculator - 70% Rule House Flipping Calculator | TheHomeFlipping.com',
  description: 'Free house flipping max offer calculator using the 70% rule. Calculate your maximum allowable offer, ARV, repair costs, ROI, and profit margins for real estate investing.',
  keywords: 'max offer calculator, 70 rule calculator, house flipping calculator, ARV calculator, real estate investing calculator, fix and flip calculator',
  openGraph: {
    title: 'Max Offer Calculator - Free House Flipping Tool',
    description: 'Calculate your maximum allowable offer using the 70% rule for house flipping deals.',
    url: 'https://thehomeflipping.com/tools/max-offer-calculator',
    type: 'website'
  },
  alternates: {
    canonical: 'https://thehomeflipping.com/tools/max-offer-calculator'
  }
}

export default function MaxOfferCalculatorPage() {
  return <MaxOfferCalculatorClient />
}
