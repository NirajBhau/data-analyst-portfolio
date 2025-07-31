import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, inquiryType } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email content for notification
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}
Inquiry Type: ${inquiryType || 'Not specified'}

Message:
${message}

---
This message was sent from your portfolio contact form.
    `.trim()

    // Send email using Resend with error handling
    try {
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['nirajpatil020@gmail.com'],
        subject: `Portfolio Contact: ${subject}`,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Inquiry Type:</strong> ${inquiryType || 'Not specified'}</p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #475569; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              This message was sent from your portfolio contact form.
            </div>
          </div>
        `
      })

      if (error) {
        console.error('Resend error:', error)
        // Don't fail the entire request if email fails
        console.log('Contact form submitted but email notification failed')
      } else {
        console.log('Email sent successfully:', data)
      }

    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the entire request if email fails
      console.log('Contact form submitted but email notification failed')
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully. You will receive a response within 24 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    )
  }
} 