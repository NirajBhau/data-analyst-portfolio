"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  typing?: boolean
}

const predefinedResponses = {
  greeting: [
    "Hello! I'm Alex's AI assistant. I can help you learn about data analytics services, project examples, or schedule a consultation. What would you like to know?",
    "Hi there! I'm here to help you with any questions about data analysis, machine learning, or business intelligence services. How can I assist you today?",
  ],
  services: [
    "I offer several key services:\n\n• Business Intelligence & Dashboard Development\n• Predictive Analytics & Machine Learning\n• Data Strategy & Consulting\n• Statistical Analysis & Research\n• Data Visualization & Executive Reporting\n• Team Training & Analytics Mentorship\n\nWhich service interests you most?",
  ],
  pricing: [
    "Pricing varies by project complexity:\n\n• Dashboard Development: Starting at $2,500\n• Machine Learning Projects: Starting at $5,000\n• Data Strategy Consulting: Starting at $3,500\n• Statistical Analysis: Starting at $2,000\n\nWould you like a personalized quote? I can connect you with the smart quote calculator!",
  ],
  experience: [
    "I have 6+ years of experience in data analytics with:\n\n• 75+ completed projects\n• $5M+ in cost savings delivered\n• Expertise in Python, Power BI, SQL, Machine Learning\n• Experience across finance, healthcare, retail, and tech industries\n\nWould you like to see some specific project examples?",
  ],
  contact: [
    "You can reach out through:\n\n• Email: alex.johnson@email.com\n• Phone: +1 (555) 123-4567\n• LinkedIn: linkedin.com/in/alexjohnson\n• Or use the contact form on this website\n\nWould you like me to help you schedule a consultation?",
  ],
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chatbot opens
      setTimeout(() => {
        addBotMessage(predefinedResponses.greeting[0])
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return predefinedResponses.greeting[Math.floor(Math.random() * predefinedResponses.greeting.length)]
    }

    if (input.includes("service") || input.includes("what do you do") || input.includes("offer")) {
      return predefinedResponses.services[0]
    }

    if (input.includes("price") || input.includes("cost") || input.includes("pricing") || input.includes("quote")) {
      return predefinedResponses.pricing[0]
    }

    if (input.includes("experience") || input.includes("background") || input.includes("qualification")) {
      return predefinedResponses.experience[0]
    }

    if (input.includes("contact") || input.includes("reach") || input.includes("email") || input.includes("phone")) {
      return predefinedResponses.contact[0]
    }

    if (input.includes("dashboard") || input.includes("power bi") || input.includes("tableau")) {
      return "I specialize in creating interactive dashboards using Power BI and Tableau. These include real-time data visualization, KPI tracking, and executive reporting. I've built 50+ dashboards that have improved decision-making speed by an average of 40%. Would you like to see some examples?"
    }

    if (input.includes("machine learning") || input.includes("ai") || input.includes("predictive")) {
      return "I develop machine learning solutions for predictive analytics, including customer churn prediction, demand forecasting, and risk assessment models. Recent projects achieved 85%+ accuracy rates and delivered significant ROI. What type of predictive analytics are you interested in?"
    }

    if (input.includes("python") || input.includes("sql") || input.includes("programming")) {
      return "I'm proficient in Python (95%), SQL (90%), R (82%), and various data science libraries like Pandas, Scikit-learn, and TensorFlow. I use these tools for data analysis, machine learning, and automation. What specific technical challenge are you facing?"
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! I'd be happy to discuss this in more detail. Would you like to schedule a consultation to explore your specific needs?",
      "I can help you with that! For detailed information about your specific situation, I recommend using the contact form or scheduling a call. What's the best way to reach you?",
      "Great question! While I can provide general information, Alex would be the best person to give you detailed insights. Would you like me to help you get in touch?",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const response = generateResponse(inputValue)
        setIsTyping(false)
        addBotMessage(response)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.div className="fixed bottom-6 right-6 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] z-40"
          >
            <Card className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-gray-200/60 dark:border-gray-700/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  AI Assistant
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col h-full pb-4">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === "user" ? "bg-blue-500" : "bg-gradient-to-r from-purple-500 to-pink-500"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User className="w-3 h-3 text-white" />
                          ) : (
                            <Sparkles className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div
                          className={`px-3 py-2 rounded-lg ${
                            message.sender === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about data analytics..."
                    className="flex-1 bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
