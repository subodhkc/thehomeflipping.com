# TheHomeFlipping.com

Digital product business selling house flipping starter kits to first-time flippers.

## Project Overview

This repository contains:

1. **Strategy Documentation** (`STRATEGY.md`) - Complete business plan, positioning, pricing, and growth strategy
2. **Content Engine** (`content-engine/`) - Automated AI-powered blog content generator for SEO
3. **Website** (coming soon) - Next.js landing page and blog

## Quick Start

### 1. Review the Strategy

Read `STRATEGY.md` for the complete business plan including:
- Market positioning and ICP definition
- Product ladder (Free → $67 → $197)
- Website copy framework
- Pricing psychology
- Organic growth tactics
- Detailed WBS (Work Breakdown Structure)

### 2. Set Up Content Engine

```bash
cd content-engine
npm install
cp .env.example .env
# Add your OpenAI API key to .env
npm run generate
```

### 3. Build the Website (Next Steps)

The website will be a Next.js application with:
- Sales landing page
- Blog for SEO content
- Lead magnet capture
- Stripe payment integration

## Product: First Flip Starter Kit ($67)

A digital toolkit for first-time house flippers:

- **Deal Analyzer Spreadsheet** - ARV, MAO, ROI calculations
- **Rehab Cost Estimator** - 260+ line items
- **Pre-Flip Checklist** - Week-by-week action plan
- **Contractor Toolkit** - Interview questions, scoping worksheets
- **First 90 Days Plan** - Step-by-step getting started guide

## Organic Growth Strategy

### Content Pillars

1. Getting Started with House Flipping
2. House Flipping Financials (ARV, ROI)
3. Finding Flip Properties
4. Renovation & Rehab
5. Financing Your Flip
6. House Flipping Business (Legal, Tax)

### Automated Content Pipeline

The content engine generates 1+ SEO-optimized blog posts daily targeting:
- High-intent keywords ("house flipping spreadsheet")
- Informational queries ("how to flip houses for beginners")
- Long-tail opportunities ("house flipping checklist for beginners")

## Revenue Targets

| Phase | Timeline | Revenue Target |
|-------|----------|----------------|
| Launch | Month 1 | $2,500 |
| Growth | Month 2-3 | $10,000 |
| Scale | Month 4-6 | $5,000/month |

## Tech Stack

- **Website**: Next.js, TailwindCSS, MDX
- **Payments**: Stripe or Gumroad
- **Email**: ConvertKit
- **Content**: OpenAI GPT-4
- **Hosting**: Vercel
- **Analytics**: Plausible

## File Structure

```
thehomeflipping.com/
├── README.md                 # This file
├── STRATEGY.md              # Complete business strategy
├── content-engine/          # AI content generator
│   ├── package.json
│   ├── .env.example
│   ├── data/
│   │   └── keywords.json    # Target keywords database
│   └── src/
│       ├── index.js         # Main entry point
│       ├── generator.js     # Article generation
│       ├── publisher.js     # File publishing
│       ├── scheduler.js     # Daily automation
│       ├── keywords.js      # Keyword management
│       ├── prompts.js       # AI prompts
│       ├── config.js        # Configuration
│       └── logger.js        # Logging
└── website/                 # (Coming soon)
    ├── content/
    │   └── blog/            # Generated articles
    └── ...
```

## Next Steps

1. [ ] Create product assets (spreadsheets, PDFs)
2. [ ] Build Next.js website with sales page
3. [ ] Set up Stripe payment flow
4. [ ] Configure ConvertKit email sequences
5. [ ] Launch beta at $27 for testimonials
6. [ ] Start content engine for daily posts
7. [ ] Promote on Reddit/Facebook groups

## License

MIT

---

*Built for aspiring house flippers who want to start with confidence.*
