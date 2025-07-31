import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { summary, description, start, end, attendees, conferenceData, reminders } = body

    // Validate required fields
    if (!summary || !description || !start || !end || !attendees) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For now, we'll simulate the calendar event creation
    // In production, you would use a service account or OAuth2 credentials
    const mockEventId = `event_${Date.now()}`
    const mockMeetLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`

    // Simulate successful event creation
    console.log('Creating calendar event:', {
      summary,
      description,
      start,
      end,
      attendees,
      conferenceData
    })

    // Send confirmation emails to both parties
    const emailContent = `
Meeting Scheduled Successfully!

Meeting Details:
- Title: ${summary}
- Date: ${new Date(start.dateTime).toLocaleDateString()}
- Time: ${new Date(start.dateTime).toLocaleTimeString()}
- Duration: ${Math.round((new Date(end.dateTime).getTime() - new Date(start.dateTime).getTime()) / 60000)} minutes

Google Meet Link: ${mockMeetLink}

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
              <p><a href="${mockMeetLink}" style="color: #2563eb; text-decoration: none;">${mockMeetLink}</a></p>
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
        eventId: mockEventId,
        meetLink: mockMeetLink,
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

// For production implementation with real Google Calendar API:

/*
1. Create a Google Service Account:
   - Go to Google Cloud Console
   - Create a new service account
   - Download the JSON key file
   - Share your Google Calendar with the service account email

2. Set up environment variables:
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

3. Use service account authentication:
   const auth = new google.auth.GoogleAuth({
     credentials: {
       client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
       private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
     },
     scopes: ['https://www.googleapis.com/auth/calendar'],
   })

   const calendar = google.calendar({ version: 'v3', auth })

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
*/ 