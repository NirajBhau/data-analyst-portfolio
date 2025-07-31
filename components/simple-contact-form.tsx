"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, Mail, Calendar } from "lucide-react"
import SchedulingModal from "./scheduling-modal"

export default function SimpleContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "", inquiryType: "" })
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Failed to send message. Please try again or contact me directly via email.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/60 dark:border-gray-700/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <Mail className="w-5 h-5 text-blue-500" />
          Send a Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Message Sent Successfully!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Thank you for reaching out. I'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-white/20 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/10 bg-transparent"
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-800 dark:text-gray-200">
                  Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20 text-gray-800 dark:text-gray-200"
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
                  className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20 text-gray-800 dark:text-gray-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiryType" className="text-gray-800 dark:text-gray-200">
                Inquiry Type
              </Label>
              <Select onValueChange={(value) => handleSelectChange("inquiryType", value)}>
                <SelectTrigger className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20">
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="project">Project Discussion</SelectItem>
                  <SelectItem value="consultation">Free Consultation</SelectItem>
                  <SelectItem value="collaboration">Partnership/Collaboration</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-800 dark:text-gray-200">
                Subject *
              </Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20 text-gray-800 dark:text-gray-200"
                placeholder="What would you like to discuss?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-800 dark:text-gray-200">
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 dark:border-gray-700/20 text-gray-800 dark:text-gray-200 resize-none"
                placeholder="Tell me about your project, goals, and how I can help..."
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
              <SchedulingModal
                trigger={
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-white/20 hover:bg-white/10 bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                }
              />
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
