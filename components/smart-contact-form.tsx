"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calculator, Calendar, Send, Sparkles, CheckCircle } from "lucide-react"
import SchedulingModal from "./scheduling-modal"

const services = [
  {
    id: "bi-dashboard",
    name: "Business Intelligence & Dashboards",
    basePrice: 2500,
    questions: [
      {
        id: "data-sources",
        label: "Number of data sources",
        type: "select",
        options: ["1-2", "3-5", "6-10", "10+"],
        multiplier: [1, 1.2, 1.5, 2],
      },
      {
        id: "dashboard-count",
        label: "Number of dashboards",
        type: "select",
        options: ["1", "2-3", "4-5", "6+"],
        multiplier: [1, 1.3, 1.6, 2.2],
      },
      { id: "real-time", label: "Real-time updates required", type: "checkbox", multiplier: 1.3 },
    ],
  },
  {
    id: "ml-analytics",
    name: "Machine Learning & Predictive Analytics",
    basePrice: 5000,
    questions: [
      {
        id: "model-complexity",
        label: "Model complexity",
        type: "select",
        options: ["Simple", "Moderate", "Complex", "Advanced"],
        multiplier: [1, 1.4, 1.8, 2.5],
      },
      {
        id: "data-volume",
        label: "Data volume",
        type: "select",
        options: ["< 1GB", "1-10GB", "10-100GB", "> 100GB"],
        multiplier: [1, 1.2, 1.5, 2],
      },
      { id: "deployment", label: "Production deployment", type: "checkbox", multiplier: 1.5 },
    ],
  },
  {
    id: "data-strategy",
    name: "Data Strategy & Consulting",
    basePrice: 3500,
    questions: [
      {
        id: "company-size",
        label: "Company size",
        type: "select",
        options: ["< 50", "50-200", "200-1000", "> 1000"],
        multiplier: [1, 1.3, 1.6, 2],
      },
      {
        id: "assessment-scope",
        label: "Assessment scope",
        type: "select",
        options: ["Department", "Division", "Company-wide"],
        multiplier: [1, 1.5, 2],
      },
      { id: "implementation", label: "Implementation support", type: "checkbox", multiplier: 1.4 },
    ],
  },
]

export default function SmartContactForm() {
  const [selectedService, setSelectedService] = useState<string>("")
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    company: "",
    message: "",
    timeline: "",
    budget: "",
  })
  const [serviceAnswers, setServiceAnswers] = useState<any>({})
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0)
  const [showQuoteCalculator, setShowQuoteCalculator] = useState(false)

  const selectedServiceData = services.find((s) => s.id === selectedService)

  const calculateEstimate = () => {
    if (!selectedServiceData) return 0

    let price = selectedServiceData.basePrice

    selectedServiceData.questions.forEach((question) => {
      const answer = serviceAnswers[question.id]
      if (question.type === "select" && answer) {
        const index = question.options?.indexOf(answer) || 0
        const multiplier = Array.isArray(question.multiplier) ? question.multiplier[index] : 1
        price *= multiplier
      } else if (question.type === "checkbox" && answer) {
        price *= question.multiplier as number
      }
    })

    return Math.round(price)
  }

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId)
    setServiceAnswers({})
    setShowQuoteCalculator(true)
  }

  const handleAnswerChange = (questionId: string, value: any) => {
    setServiceAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    setTimeout(() => {
      setEstimatedPrice(calculateEstimate())
    }, 100)
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare the message with service details
      const serviceDetails = selectedServiceData ? `
Service: ${selectedServiceData.name}
Estimated Cost: $${estimatedPrice.toLocaleString()}
Timeline: ${formData.timeline || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}

Service Specifications:
${selectedServiceData.questions.map(q => {
  const answer = serviceAnswers[q.id]
  return `- ${q.label}: ${answer || 'Not specified'}`
}).join('\n')}
      `.trim() : ''

      const fullMessage = `${formData.message}\n\n${serviceDetails}`

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Smart Inquiry: ${selectedServiceData?.name || 'Project Inquiry'}`,
          message: fullMessage,
          inquiryType: selectedService || 'smart-inquiry'
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form
        setFormData({ name: "", email: "", company: "", message: "", timeline: "", budget: "" })
        setSelectedService("")
        setServiceAnswers({})
        setEstimatedPrice(0)
        setShowQuoteCalculator(false)
      } else {
        throw new Error(result.error || 'Failed to send inquiry')
      }
    } catch (error) {
      console.error('Smart contact form error:', error)
      alert('Failed to send inquiry. Please try again or contact me directly via email.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/60 dark:border-gray-700/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <Sparkles className="w-5 h-5 text-blue-500" />
          Smart Project Inquiry
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
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Inquiry Sent Successfully!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Thank you for your inquiry. I'll review your project details and get back to you within 24 hours with a detailed proposal.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-white/20 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/10 bg-transparent"
            >
              Send Another Inquiry
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
              className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60"
            />
          </div>

          {/* Service Selection */}
          <div className="space-y-2">
            <Label>Service Interest *</Label>
            <Select onValueChange={handleServiceChange}>
              <SelectTrigger className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Service Questions */}
          <AnimatePresence>
            {showQuoteCalculator && selectedServiceData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/40 dark:border-blue-500/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Project Specification & Quote Calculator
                  </h3>
                </div>

                {selectedServiceData.questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <Label>{question.label}</Label>
                    {question.type === "select" ? (
                      <Select onValueChange={(value) => handleAnswerChange(question.id, value)}>
                        <SelectTrigger className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={question.id}
                          checked={serviceAnswers[question.id] || false}
                          onCheckedChange={(checked) => handleAnswerChange(question.id, checked)}
                        />
                        <Label htmlFor={question.id} className="text-sm">
                          Yes, include this feature
                        </Label>
                      </div>
                    )}
                  </div>
                ))}

                {estimatedPrice > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/40 dark:border-green-500/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Estimated Project Cost:</span>
                      <Badge
                        variant="secondary"
                        className="text-lg font-bold bg-green-500/20 text-green-700 dark:text-green-300"
                      >
                        ${estimatedPrice.toLocaleString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      *This is a preliminary estimate. Final pricing may vary based on detailed requirements.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timeline and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeline">Preferred Timeline</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}>
                <SelectTrigger className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP</SelectItem>
                  <SelectItem value="1-month">Within 1 month</SelectItem>
                  <SelectItem value="2-3-months">2-3 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}>
                <SelectTrigger className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5k">Under $5,000</SelectItem>
                  <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                  <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                  <SelectItem value="50k-plus">$50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Project Details</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="bg-white/10 dark:bg-gray-800/10 border-gray-300/60 resize-none"
              placeholder="Tell me more about your project goals, current challenges, and specific requirements..."
            />
          </div>

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
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Inquiry
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
