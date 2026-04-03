import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { data, error } = await resend.emails.send({
      from: `TheHomeFlipping.com <${process.env.FROM_EMAIL!}>`,
      to: ['suvodkc@gmail.com'],
      subject: 'Test Email - TheHomeFlipping.com',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Test Email</title>
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
              <h1>Test Email Successful</h1>
              <p>Resend is working correctly</p>
            </div>
            
            <div class="content">
              <p>This is a test email to verify that the Resend email service is properly configured and working.</p>
              
              <p><strong>Test Details:</strong></p>
              <ul>
                <li>Service: Resend</li>
                <li>From: ${process.env.FROM_EMAIL}</li>
                <li>To: suvodkc@gmail.com</li>
                <li>Time: ${new Date().toLocaleString()}</li>
              </ul>
              
              <p>If you receive this email, the email system is working correctly and ready to send product delivery emails and customer communications.</p>
              
              <p>Best regards,<br>Subodh KC<br>Founder, TheHomeFlipping.com</p>
            </div>
            
            <div class="footer">
              <p>This is an automated test email from TheHomeFlipping.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Test email error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error
      }, { status: 500 })
    }

    console.log('Test email sent successfully:', data)
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      data: data
    })

  } catch (error) {
    console.error('Test email service error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
