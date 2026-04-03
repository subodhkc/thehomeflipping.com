import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendProductEmailParams {
  to: string
  customerName?: string
  dashboardUrl?: string
}

export async function sendProductDeliveryEmail({ 
  to, 
  customerName, 
  dashboardUrl 
}: { 
  to: string; 
  customerName?: string; 
  dashboardUrl?: string; 
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: `TheHomeFlipping.com <${process.env.FROM_EMAIL!}>`,
      to: [to],
      subject: 'Your First Flip Starter Kit - Access Your Downloads',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Your First Flip Starter Kit</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0070c4; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .product-list { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .bonus { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 10px 0; }
            .cta { background: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Your Flipping Journey!</h1>
              <p>Your First Flip Starter Kit is ready for you</p>
            </div>
            
            <div class="content">
              <p>Hi ${customerName},</p>
              <p>Thank you for your order! Your payment has been processed successfully. Here's how to access your First Flip Starter Kit with all 11 resources.</p>
              
              <h2>Your Essential House Flipping Tools</h2>
              <div class="product-list">
                <h3>Professional Spreadsheets</h3>
                <ul>
                  <li><strong>Deal Analyzer Spreadsheet</strong> - Calculate ARV, MAO, ROI instantly</li>
                  <li><strong>Rehab Cost Estimator</strong> - 260+ line items organized by room</li>
                  <li><strong>Buyer List Template</strong> - Track your cash buyer network</li>
                  <li><strong>Comp Analysis Template</strong> - Compare properties effectively</li>
                </ul>
              </div>
              
              <div class="product-list">
                <h3>Complete Step-by-Step Guides</h3>
                <ul>
                  <li><strong>Getting Started Guide</strong> - Find deals & auctions</li>
                  <li><strong>Funding Guide</strong> - Hard money & creative financing</li>
                  <li><strong>Wholesaling Guide</strong> - Make $5K-$50K with no money down</li>
                  <li><strong>Pre-Flip Checklist</strong> - Week-by-week action plan</li>
                  <li><strong>Contractor Toolkit</strong> - Interview & agreement templates</li>
                </ul>
              </div>
              
              <div class="bonus">
                <h2>Your 3 Exclusive Bonus Resources</h2>
                <ul>
                  <li><strong>ARV Calculator Cheat Sheet</strong> - Quick reference formulas</li>
                  <li><strong>Due Diligence Checklist</strong> - Never miss a critical step</li>
                  <li><strong>Comp Analysis Template</strong> - Professional property comparison</li>
                </ul>
              </div>
              
              <p style="text-align: center;">
                <a href="https://thehomeflipping.com/api/download?email=${encodeURIComponent(to)}" class="cta">
                  Access Your Download Portal
                </a>
              </p>
              
              ${dashboardUrl ? `
              <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f8f9ff; border-radius: 8px; border: 2px solid #e1e5ff;">
                <h3 style="color: #4f46e5; margin-bottom: 10px;">🎉 Your Personal Dashboard</h3>
                <p style="color: #6b7280; margin-bottom: 15px;">Access your personalized dashboard to:</p>
                <ul style="text-align: left; max-width: 300px; margin: 0 auto; color: #6b7280;">
                  <li>Download all your purchased files</li>
                  <li>View your purchase history</li>
                  <li>Get future updates and bonuses</li>
                </ul>
                <a href="${dashboardUrl}" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Access Your Dashboard
                </a>
                <p style="margin-top: 10px; font-size: 12px; color: #9ca3af;">This link is valid for 120 days and can be used multiple times</p>
              </div>
              ` : ''}
              
              <p><strong>Or download individual files:</strong></p>
              <ul>
                <li><a href="https://thehomeflipping.com/api/download?email=${encodeURIComponent(to)}&file=pdfs/getting-started-guide.pdf">Getting Started Guide</a></li>
                <li><a href="https://thehomeflipping.com/api/download?email=${encodeURIComponent(to)}&file=pdfs/funding-guide.pdf">Funding Guide</a></li>
                <li><a href="https://thehomeflipping.com/api/download?email=${encodeURIComponent(to)}&file=spreadsheets/deal-analyzer.xlsx">Deal Analyzer Spreadsheet</a></li>
                <li><a href="https://thehomeflipping.com/api/download?email=${encodeURIComponent(to)}&file=spreadsheets/rehab-cost-estimator.xlsx">Rehab Cost Estimator</a></li>
              </ul>
              
              <p><strong>Important:</strong></p>
              <ul>
                <li>Download links are valid for 30 days</li>
                <li>Save the files to your computer for permanent access</li>
                <li>Spreadsheets work with Excel and Google Sheets</li>
              </ul>
              
              <p>Start with the Getting Started Guide - it walks you through exactly how to use all the tools for your first flip.</p>
              
              <p>Ready to analyze your first deal? The Deal Analyzer spreadsheet is the same tool used for 17 successful house flips.</p>
              
              <p>Best regards,<br>Subodh KC<br>Founder, TheHomeFlipping.com</p>
            </div>
            
            <div class="footer">
              <p>Visit us at <a href="https://thehomeflipping.com" style="color: #0070c4;">TheHomeFlipping.com</a> for more resources</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Email error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error }
  }
}

interface SendChecklistEmailParams {
  to: string
}

export async function sendFreeChecklistEmail({ to }: SendChecklistEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: `TheHomeFlipping.com <${process.env.FROM_EMAIL!}>`,
      to: [to],
      subject: 'Your Free Pre-Flip Checklist - TheHomeFlipping.com',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Your Free Pre-Flip Checklist</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0070c4; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .checklist { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .cta { background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Pre-Flip Checklist</h1>
              <p>Your week-by-week action plan starts now</p>
            </div>
            
            <div class="content">
              <p>Here is your complete Pre-Flip Checklist - the exact roadmap that takes you from "thinking about flipping" to "sold sign in the yard."</p>
              
              <div class="checklist">
                <h2>20-Week House Flipping Timeline</h2>
                <ul>
                  <li><strong>Week 1-2:</strong> Market research and education</li>
                  <li><strong>Week 3-4:</strong> Build your team (agent, lender, contractors)</li>
                  <li><strong>Week 5-6:</strong> Property search and deal analysis</li>
                  <li><strong>Week 7-8:</strong> Make offers and negotiate</li>
                  <li><strong>Week 9-10:</strong> Due diligence and closing</li>
                  <li><strong>Week 11-16:</strong> Renovation management</li>
                  <li><strong>Week 17-20:</strong> Listing and selling</li>
                </ul>
              </div>
              
              <p style="text-align: center;">
                <a href="https://thehomeflipping.com/api/download-checklist?email=${encodeURIComponent(to)}" class="cta">
                  Download Full Checklist PDF
                </a>
              </p>
              
              <p>Want the complete toolkit? Get the First Flip Starter Kit with:</p>
              <ul>
                <li>Deal Analyzer Spreadsheet</li>
                <li>Rehab Cost Estimator</li>
                <li>3 Comprehensive Guides</li>
                <li>Contractor Templates</li>
                <li>And much more...</li>
              </ul>
              
              <p style="text-align: center;">
                <a href="https://thehomeflipping.com/starter-kit" style="color: #0070c4; font-weight: bold;">
                  Get the Complete Kit - Just $67 (Save $430)
                </a>
              </p>
              
              <p>Best regards,<br>Subodh KC<br>Founder, TheHomeFlipping.com</p>
            </div>
            
            <div class="footer">
              <p>Visit us at <a href="https://thehomeflipping.com" style="color: #0070c4;">TheHomeFlipping.com</a> for more resources</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Email error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error }
  }
}
