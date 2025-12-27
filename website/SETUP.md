# Setup Instructions

## Prerequisites
- Node.js 18+ installed
- Stripe account (for payments)
- Vercel account (for deployment)

## Local Development Setup

### 1. Install Dependencies
```bash
cd website
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your keys:

#### Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your **Secret Key** from API Keys section
3. Create a product for "First Flip Starter Kit" ($67)
4. Get the **Price ID** from the product page
5. Add both to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PRICE_ID=price_...
   ```

#### Base URL
For local development:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production (after deploying to Vercel):
```
NEXT_PUBLIC_BASE_URL=https://thehomeflipping.com
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Add Environment Variables in Vercel
In your Vercel project settings, go to **Environment Variables** and add:

```
STRIPE_SECRET_KEY=sk_live_your_production_key
NEXT_PUBLIC_STRIPE_PRICE_ID=price_your_production_price_id
NEXT_PUBLIC_BASE_URL=https://your-domain.com
OPENAI_API_KEY=sk-your_openai_key (if using)
```

**Important**: Use your **production** Stripe keys for live deployment!

### 4. Deploy
Vercel will automatically deploy your site. Every push to `main` branch will trigger a new deployment.

## Stripe Webhook Setup (Optional but Recommended)

To handle post-payment actions:

1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Add endpoint: `https://your-domain.com/api/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. Copy the **Webhook Secret**
5. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Email Delivery Setup

For the lead magnet and product delivery emails, you'll need to integrate an email service:

### Option 1: SendGrid (Recommended)
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Add to environment variables:
   ```
   SENDGRID_API_KEY=SG.your_key
   ```

### Option 2: Mailgun
1. Sign up at [Mailgun](https://www.mailgun.com/)
2. Get your API key and domain
3. Add to environment variables

### Option 3: AWS SES
1. Set up AWS SES
2. Get credentials
3. Add to environment variables

## Product File Hosting

Your digital products (PDFs, spreadsheets) need to be hosted:

### Option 1: Vercel Blob Storage
```bash
npm install @vercel/blob
```

### Option 2: AWS S3
1. Create S3 bucket
2. Upload product files
3. Generate signed URLs for downloads

### Option 3: Google Drive + Service Account
1. Upload files to Google Drive
2. Create service account
3. Generate download links

## Testing Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date and any 3-digit CVC

## Custom Domain Setup

1. In Vercel, go to **Settings > Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

## Monitoring & Analytics

### Add Google Analytics
1. Get GA4 tracking ID
2. Add to `app/layout.tsx`:
```tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
```

### Add Stripe Analytics
Monitor in Stripe Dashboard for:
- Revenue
- Conversion rates
- Failed payments

## Support

For issues:
- Check Vercel deployment logs
- Check Stripe webhook logs
- Email: support@thehomeflipping.com
