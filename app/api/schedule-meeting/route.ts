import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getServerSession } from 'next-auth'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession()
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in with Google.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { summary, description, start, end, attendees, conferenceData, reminders } = body

    // Validate required fields
    if (!summary || !description || !start || !end || !attendees) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Initialize Google Calendar API with OAuth2 token
    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({
      access_token: session.accessToken as string,
    })

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Create the event
    const event = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary,
        description,
        start,
        end,
        attendees,
        conferenceData: {
          createRequest: {
            requestId: `meet-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
      },
      conferenceDataVersion: 1,
    })

    const eventData = event.data
    const meetLink = eventData.conferenceData?.entryPoints?.[0]?.uri || ''

    // Send confirmation emails to both parties
    const emailContent = `
Meeting Scheduled Successfully!

Meeting Details:
- Title: ${summary}
- Date: ${new Date(start.dateTime).toLocaleDateString()}
- Time: ${new Date(start.dateTime).toLocaleTimeString()}
- Duration: ${Math.round((new Date(end.dateTime).getTime() - new Date(start.dateTime).getTime()) / 60000)} minutes

Google Meet Link: ${meetLink}

Description:
${description}

---
This meeting was scheduled through Niraj Patil's portfolio.
    `.trim()

    // Send emails using Resend
    const emailPromises = attendees.map(attendee => 
      resend.emails.send({
        from: 'Portfolio Calendar <onboarding@resend.dev>',
        to: [attendee.email],
        subject: `Meeting Scheduled: ${summary}`,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              Meeting Scheduled Successfully!
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #475569; margin-top: 0;">Meeting Details:</h3>
              <p><strong>Title:</strong> ${summary}</p>
              <p><strong>Date:</strong> ${new Date(start.dateTime).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${new Date(start.dateTime).toLocaleTimeString()}</p>
              <p><strong>Duration:</strong> ${Math.round((new Date(end.dateTime).getTime() - new Date(start.dateTime).getTime()) / 60000)} minutes</p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #475569; margin-top: 0;">Google Meet Link:</h3>
              <p><a href="${meetLink}" style="color: #2563eb; text-decoration: none;">${meetLink}</a></p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #475569; margin-top: 0;">Description:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${description}</p>
            </div>
            
            <div style="text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              This meeting was scheduled through Niraj Patil's portfolio.
            </div>
          </div>
        `
      })
    )

    await Promise.all(emailPromises)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Meeting scheduled successfully!',
        eventId: eventData.id,
        meetLink,
        attendees: attendees.map(a => a.email)
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Schedule meeting error:', error)
    return NextResponse.json(
      { error: 'Failed to schedule meeting. Please try again.' },
      { status: 500 }
    )
  }
}

// For production implementation, you would need:

/*
1. Install Google APIs:
   npm install googleapis

2. Set up Google Calendar API credentials:
   - Go to Google Cloud Console
   - Enable Google Calendar API
   - Create OAuth2 credentials
   - Download the credentials JSON file

3. Set up environment variables:
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=your_redirect_uri

4. Implement OAuth2 flow for authentication

5. Use the actual Google Calendar API:
   const auth = new google.auth.OAuth2(
     process.env.GOOGLE_CLIENT_ID,
     process.env.GOOGLE_CLIENT_SECRET,
     process.env.GOOGLE_REDIRECT_URI
   )

   const event = await calendar.events.insert({
     auth,
     calendarId: 'primary',
     requestBody: eventData,
     conferenceDataVersion: 1,
   })
*/ 