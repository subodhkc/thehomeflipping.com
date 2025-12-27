# Vercel Deployment Setup Guide

## Critical Issue Identified

Your Next.js application is in the `website/` subdirectory, but Vercel is trying to build from the root directory.

## ✅ Solution: Configure Root Directory in Vercel Dashboard

### Step-by-Step Instructions

#### 1. Go to Vercel Dashboard

- Visit <https://vercel.com/dashboard>
- Select your project: `thehomeflipping.com`

#### 2. Configure Root Directory

1. Click on **Settings** (top navigation)
2. Scroll to **Root Directory** section
3. Click **Edit**
4. Enter: `website`
5. Click **Save**

#### 3. Add Environment Variables

1. In Settings, go to **Environment Variables**
2. Add the following variables for **Production**:

```bash
STRIPE_SECRET_KEY=sk_live_your_production_key_here
NEXT_PUBLIC_STRIPE_PRICE_ID=price_your_production_price_id_here
NEXT_PUBLIC_BASE_URL=https://thehomeflipping.com
```

3. Click **Save** for each variable

#### 4. Redeploy

1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (optional)
5. Click **Redeploy**

## Expected Build Output

After configuration, you should see:

```text
✓ Cloning repository
✓ Installing dependencies from website/package.json
✓ Building Next.js application
✓ Deployment successful
```

## Security Updates Applied

### Next.js Version Upgraded

- **Before**: Next.js 14.0.4 (critical security vulnerability)
- **After**: Next.js 14.2.18 (patched version)

This fixes the security vulnerability mentioned in the deployment logs.

## Why vercel.json Didn't Work

Vercel's `vercel.json` configuration has limitations:

- `buildCommand` and `installCommand` are not standard Vercel configuration options
- For monorepo/subdirectory projects, Vercel requires the **Root Directory** setting in the dashboard
- This is the official recommended approach per Vercel documentation

## Troubleshooting

### If deployment still fails after setting Root Directory:

1. **Clear build cache**:
   - Go to Settings → General
   - Scroll to **Build & Development Settings**
   - Click **Clear Build Cache**
   - Redeploy

2. **Verify package.json location**:
   - Ensure `website/package.json` exists
   - Verify it contains `"next": "14.2.18"` in dependencies

3. **Check build logs**:
   - Go to Deployments tab
   - Click on the failed deployment
   - Review the full build log for specific errors

### Common Issues

**Issue**: "No Next.js version detected"
**Solution**: Root Directory must be set to `website` in Vercel Dashboard

**Issue**: "Module not found" errors
**Solution**: Run `npm install` locally in the website directory to update package-lock.json

**Issue**: Environment variables not working
**Solution**: Ensure variables are set for the correct environment (Production/Preview/Development)

## Local Testing

Before deploying, test locally:

```bash
cd website
npm install
npm run build
npm start
```

If the build succeeds locally, it should work on Vercel with the correct Root Directory setting.

## GitHub Security Alerts

The deployment log shows 13 vulnerabilities detected by GitHub Dependabot:

- 1 critical
- 5 high
- 5 moderate
- 2 low

### To Address These:

1. Go to your GitHub repository
2. Click on **Security** tab
3. Review **Dependabot alerts**
4. Update vulnerable dependencies

Or run locally:

```bash
cd website
npm audit
npm audit fix
```

**Note**: Some vulnerabilities may be in transitive dependencies and require package updates.

## Next Steps After Successful Deployment

1. ✅ Verify all pages load correctly
2. ✅ Test calculator functionality
3. ✅ Test Stripe checkout flow (use test mode first)
4. ✅ Configure custom domain
5. ✅ Set up Stripe webhooks
6. ✅ Configure email delivery service
7. ✅ Add Google Analytics

## Support

If you continue to experience issues:

1. Share the full Vercel build log
2. Verify Root Directory is set to `website`
3. Confirm environment variables are configured
4. Check that the latest code is pushed to GitHub

---

**Remember**: The key fix is setting **Root Directory to `website`** in Vercel Dashboard Settings.
