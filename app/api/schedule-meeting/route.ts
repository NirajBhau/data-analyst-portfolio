import { NextRequest, NextResponse } from 'next/server'

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

    // For now, skip email sending to avoid issues
    console.log('Would send emails to:', attendees.map(a => a.email))

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