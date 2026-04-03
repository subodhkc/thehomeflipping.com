import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendContactEmailParams {
  to: string
  name: string
  email: string
  phone?: string
  message: string
  propertyType?: string
  address?: string
}

export async function sendContactNotification({ to, name, email, phone, message, propertyType, address }: SendContactEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: `TheHomeFlipping.com <${process.env.FROM_EMAIL!}>`,
      to: [process.env.FROM_EMAIL!], // Send to admin
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #0070c4; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
              <p>Someone wants to sell their property fast</p>
            </div>
            
            <div class="content">
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              
              <div class="field">
                <span class="label">Email:</span> ${email}
              </div>
              
              ${phone ? `
              <div class="field">
                <span class="label">Phone:</span> ${phone}
              </div>
              ` : ''}
              
              ${propertyType ? `
              <div class="field">
                <span class="label">Property Type:</span> ${propertyType}
              </div>
              ` : ''}
              
              ${address ? `
              <div class="field">
                <span class="label">Property Address:</span> ${address}
              </div>
              ` : ''}
              
              <div class="field">
                <span class="label">Message:</span><br>
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Respond within 24 hours</li>
                <li>Call the seller if phone number provided</li>
                <li>Research the property address</li>
                <li>Schedule a property visit if interested</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>This message was sent from the contact form at TheHomeFlipping.com</p>
              <p>Visit us at <a href="https://thehomeflipping.com" style="color: #0070c4;">TheHomeFlipping.com</a> for more resources</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Contact email error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Contact email service error:', error)
    return { success: false, error }
  }
}

export async function sendContactConfirmation({ to, name }: { to: string; name: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: `TheHomeFlipping.com <${process.env.FROM_EMAIL!}>`,
      to: [to],
      subject: 'We Received Your Message - TheHomeFlipping.com',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>We Received Your Message</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0070c4; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Message</h1>
              <p>We have received your inquiry</p>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out to TheHomeFlipping.com. We have received your message and will get back to you within 24 hours.</p>
              
              <p><strong>What happens next:</strong></p>
              <ul>
                <li>We review your property details</li>
                <li>We research your local market</li>
                <li>We contact you to discuss options</li>
                <li>We provide a fair cash offer if interested</li>
              </ul>
              
              <p>If you need immediate assistance, please call us at the number provided on our website.</p>
              
              <p>We look forward to helping you sell your property quickly and hassle-free.</p>
              
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
      console.error('Confirmation email error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Confirmation email service error:', error)
    return { success: false, error }
  }
}
