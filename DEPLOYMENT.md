# Deployment Guide for TheHomeFlipping.com

## Complete Sales Funnel Overview

Your website now has a complete conversion funnel:

```
Awareness → Interest → Exploration → Purchase → Delivery
    ↓          ↓            ↓            ↓          ↓
Homepage → Calculators → Starter Kit → Checkout → Success
    ↓          ↓            ↓            ↓          ↓
 Story    Free Tools   Testimonials   Stripe    Download
```

## Pages Created

### 1. **Homepage** (`/`)
- Your personal story (17 flips, 43 wholesale deals, 8+ years)
- Problem/solution framework
- 6 testimonials with profit results
- Free tool previews
- Urgency messaging: "$67 won't make you poor, high chance of making you rich"

### 2. **Calculators** (`/tools/*`)
- Max Offer Calculator
- Rehab Cost Estimator
- Roofing Calculator
- Deal Quality Analyzer

### 3. **Starter Kit Sales Page** (`/starter-kit`)
- Price comparison table ($67 vs $500-$25,000 competitors)
- 8 tools + 3 bonuses breakdown
- 4 testimonials with results
- Multiple CTAs with urgency

### 4. **Checkout Page** (`/checkout`)
- Stripe payment integration
- Order summary
- Secure payment form
- Trust badges

### 5. **Success/Delivery Page** (`/success`)
- Order confirmation
- Download instructions
- Next steps guide
- Upsell opportunities

### 6. **Cash Buyer Contact** (`/sell-fast`)
- Lead capture form for sellers
- "Sell in 7 days" messaging
- Property information collection
- Connects sellers to cash buyers

### 7. **Free Checklist Lead Magnet** (`/free-checklist`)
- Email capture
- Pre-flip checklist download
- Upsell to Starter Kit

## Environment Variables Setup

### Required for Vercel Deployment

Add these in your Vercel project settings under **Environment Variables**:

```bash
# Stripe (Production Keys)
STRIPE_SECRET_KEY=sk_live_your_production_key_here
NEXT_PUBLIC_STRIPE_PRICE_ID=price_your_production_price_id_here

# Base URL
NEXT_PUBLIC_BASE_URL=https://thehomeflipping.com

# OpenAI (Optional - for content engine)
OPENAI_API_KEY=sk-your_openai_key_here
```

### Getting Your Stripe Keys

1. **Create Stripe Account**: https://dashboard.stripe.com/register
2. **Create Product**:
   - Go to Products → Add Product
   - Name: "First Flip Starter Kit"
   - Price: $67 (one-time payment)
   - Copy the **Price ID** (starts with `price_`)
3. **Get API Keys**:
   - Go to Developers → API Keys
   - Copy **Secret Key** (starts with `sk_live_` for production)
   - Use test keys (`sk_test_`) for development

## Deployment Steps

### 1. Install Stripe Dependency

```bash
cd website
npm install stripe
```

### 2. Create Local Environment File

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your test keys:
```bash
STRIPE_SECRET_KEY=sk_test_your_test_key
NEXT_PUBLIC_STRIPE_PRICE_ID=price_your_test_price_id
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Test Locally

```bash
npm run dev
```

Test the checkout flow with Stripe test card:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

### 4. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd website
vercel --prod
```

Or use GitHub integration:
1. Push code to GitHub
2. Import repository in Vercel
3. Set root directory to `website`
4. Add environment variables
5. Deploy

### 5. Configure Custom Domain

In Vercel:
1. Go to Settings → Domains
2. Add `thehomeflipping.com`
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` to your domain

## Post-Deployment Checklist

- [ ] Test all calculator pages
- [ ] Test checkout flow with real payment
- [ ] Verify success page shows correct email
- [ ] Test cash buyer form submission
- [ ] Test free checklist download
- [ ] Check mobile responsiveness
- [ ] Set up Google Analytics
- [ ] Configure email delivery for downloads
- [ ] Set up Stripe webhooks for automated delivery

## Email & Product Delivery Setup

You'll need to set up automated email delivery for:
1. **Free Checklist** - Send PDF after email capture
2. **Starter Kit** - Send download link after purchase

### Options:

**Option 1: SendGrid** (Recommended)
```bash
npm install @sendgrid/mail
```

**Option 2: Resend** (Modern alternative)
```bash
npm install resend
```

**Option 3: Mailgun**
```bash
npm install mailgun-js
```

## Product File Hosting

Your digital products need to be hosted securely:

### Option 1: Vercel Blob Storage
```bash
npm install @vercel/blob
```

### Option 2: AWS S3
- Upload files to S3
- Generate signed URLs for downloads
- Set expiration times

### Option 3: Google Drive
- Upload to Google Drive
- Create service account
- Generate download links via API

## Stripe Webhook Setup (Important!)

To automatically send download links after payment:

1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://thehomeflipping.com/api/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. Copy webhook secret
5. Add to Vercel: `STRIPE_WEBHOOK_SECRET=whsec_...`

Create webhook handler at `app/api/webhook/route.ts`:
```typescript
import { NextRequest } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    // Send email with download link
    // await sendDownloadEmail(session.customer_email)
  }
  
  return new Response(JSON.stringify({ received: true }))
}
```

## Marketing & SEO

### Google Analytics Setup
Add to `app/layout.tsx`:
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
```

### Meta Tags (Already Added)
Each page has SEO metadata for:
- Title
- Description
- Open Graph tags

### Content Engine
Your automated blog content system is ready at `/content-engine`:
```bash
cd content-engine
npm install
npm run generate
```

## Monitoring

### Stripe Dashboard
Monitor:
- Revenue
- Conversion rates
- Failed payments
- Refunds

### Vercel Analytics
Track:
- Page views
- User flow
- Performance metrics

### Error Tracking
Consider adding:
- Sentry for error monitoring
- LogRocket for session replay

## Support & Maintenance

### Customer Support Email
Set up: `support@thehomeflipping.com`

### Refund Policy
30-day money-back guarantee (mentioned on site)

### Product Updates
Update files in your hosting solution and notify customers

## Cost Breakdown

**Monthly Costs:**
- Vercel: $0 (Hobby) or $20 (Pro)
- Stripe: 2.9% + $0.30 per transaction
- Email Service: $0-$15/month
- Domain: ~$12/year

**Per Sale ($67):**
- Stripe fee: ~$2.24
- Net profit: ~$64.76

## Next Steps

1. **Install Stripe**: `npm install stripe`
2. **Test locally** with test keys
3. **Deploy to Vercel** with production keys
4. **Set up email delivery** for products
5. **Configure webhooks** for automation
6. **Add Google Analytics**
7. **Start driving traffic** with content engine

## Questions?

Email: support@thehomeflipping.com

---

**Your complete sales funnel is ready to convert visitors into customers!**
