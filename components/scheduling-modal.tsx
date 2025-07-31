"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, User, Mail, MessageSquare, X, CheckCircle, Send, AlertCircle } from "lucide-react"
import { useSession, signIn } from "next-auth/react"

interface SchedulingModalProps {
  trigger: React.ReactNode
}

export default function SchedulingModal({ trigger }: SchedulingModalProps) {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    meetingType: "",
    preferredDate: "",
    preferredTime: "",
    duration: "60",
    message: "",
  })

  const meetingTypes = [
    { value: "consultation", label: "Free Consultation" },
    { value: "project-discussion", label: "Project Discussion" },
    { value: "technical-review", label: "Technical Review" },
    { value: "proposal-presentation", label: "Proposal Presentation" },
    { value: "follow-up", label: "Follow-up Meeting" },
  ]

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
  ]

  const durations = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create Google Calendar event with Google Meet
      const eventData = {
        summary: `${formData.meetingType} with ${formData.name}`,
        description: `
Meeting Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company || 'Not specified'}
- Phone: ${formData.phone || 'Not specified'}
- Meeting Type: ${meetingTypes.find(t => t.value === formData.meetingType)?.label}
- Duration: ${durations.find(d => d.value === formData.duration)?.label}

Message:
${formData.message}

---
This meeting was scheduled through Niraj Patil's portfolio.
        `.trim(),
        start: {
          dateTime: `${formData.preferredDate}T${formData.preferredTime}:00`,
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: getEndTime(formData.preferredDate, formData.preferredTime, parseInt(formData.duration)),
          timeZone: 'Asia/Kolkata',
        },
        attendees: [
          { email: 'nirajpatil020@gmail.com' },
          { email: formData.email }
        ],
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
      }

      // Send to API to create Google Calendar event
      const response = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form
        setFormData({
          name: "", email: "", company: "", phone: "", meetingType: "",
          preferredDate: "", preferredTime: "", duration: "60", message: "",
        })
      } else {
        throw new Error(result.error || 'Failed to schedule meeting')
      }
    } catch (error) {
      console.error('Scheduling error:', error)
      alert('Failed to schedule meeting. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getEndTime = (date: string, time: string, durationMinutes: number) => {
    const startDateTime = new Date(`${date}T${time}:00`)
    const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000)
    return endDateTime.toISOString()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({
      name: "", email: "", company: "", phone: "", meetingType: "",
      preferredDate: "", preferredTime: "", duration: "60", message: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Calendar className="w-5 h-5 text-blue-500" />
            Schedule a Meeting
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {status === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Loading...
              </h3>
            </motion.div>
          ) : !session ? (
            <motion.div
              key="auth-required"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Authentication Required
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You need to sign in with your Google account to schedule meetings and access your calendar.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => signIn("google")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Meeting Scheduled Successfully!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your meeting has been scheduled and added to Google Calendar. 
                Both parties will receive a Google Meet link via email.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-white/20 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/10 bg-transparent"
                >
                  Schedule Another Meeting
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Personal Information */}
              <Card className="bg-white/5 dark:bg-gray-800/5 border-gray-200/20 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                    <User className="w-4 h-4" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-800 dark:text-gray-200">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-800 dark:text-gray-200">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-800 dark:text-gray-200">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20"
                        placeholder="Your company (optional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-800 dark:text-gray-200">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20"
                        placeholder="Your phone (optional)"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Meeting Details */}
              <Card className="bg-white/5 dark:bg-gray-800/5 border-gray-200/20 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                    <Calendar className="w-4 h-4" />
                    Meeting Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meetingType" className="text-gray-800 dark:text-gray-200">
                      Meeting Type *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("meetingType", value)} required>
                      <SelectTrigger className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20">
                        <SelectValue placeholder="Select meeting type" />
                      </SelectTrigger>
                      <SelectContent>
                        {meetingTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate" className="text-gray-800 dark:text-gray-200">
                        Preferred Date *
                      </Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime" className="text-gray-800 dark:text-gray-200">
                        Preferred Time *
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("preferredTime", value)} required>
                        <SelectTrigger className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-gray-800 dark:text-gray-200">
                        Duration *
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("duration", value)} required>
                        <SelectTrigger className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durations.map((duration) => (
                            <SelectItem key={duration.value} value={duration.value}>
                              {duration.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message */}
              <Card className="bg-white/5 dark:bg-gray-800/5 border-gray-200/20 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                    <MessageSquare className="w-4 h-4" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-800 dark:text-gray-200">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20 resize-none"
                      placeholder="Tell me about your project, goals, or any specific topics you'd like to discuss..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
} 