"use client"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import InteractiveBackground from "@/components/interactive-background"
import Navigation from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import SimpleContactForm from "@/components/simple-contact-form"
import AIChatbot from "@/components/ai-chatbot"
import SmartSearch from "@/components/smart-search"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <Navigation />
      <ThemeToggle />
      <SmartSearch />
      <AIChatbot />

      <main className="relative z-10 lg:ml-56">
        <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-16">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to transform your data into actionable insights? Let's discuss how I can help your organization make
              data-driven decisions that drive real business value and competitive advantage.
            </p>
          </ScrollAnimation>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ScrollAnimation animation="fadeInLeft" className="space-y-8">
              {/* Hire Me Button */}
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Ready to Start Your Project?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Let's discuss how I can help transform your data into actionable insights.
                    </p>
                    <Button 
                      onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nirajpatil020@gmail.com&su=Project%20Collaboration%20Request', '_blank')}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-700 text-white"
                      size="lg"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Hire Me - Start Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                      <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=nirajpatil020@gmail.com&su=Portfolio%20Inquiry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                      >
                        nirajpatil020@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
                      <a 
                        href="tel:9724249244" 
                        className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
                      >
                        +91 9724249244
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">Gujarat, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">LinkedIn</h4>
                      <a
                        href="https://www.linkedin.com/in/niraj-patil-5612b21b9/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        linkedin.com/in/niraj-patil-5612b21b9
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center">
                      <Github className="w-6 h-6 text-gray-700 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">GitHub</h4>
                      <a
                        href="https://github.com/NirajBhau"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-400 hover:underline"
                      >
                        github.com/NirajBhau
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Smart Contact Form */}
            <ScrollAnimation animation="fadeInRight">
              <SimpleContactForm />
            </ScrollAnimation>
          </div>

          {/* FAQ Section */}
          <ScrollAnimation animation="fadeInUp" className="mt-20">
            <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-center text-gray-800 dark:text-gray-200">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        What's your typical project timeline?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Project timelines vary based on complexity, but most dashboard projects take 2-4 weeks, while
                        comprehensive analytics solutions may take 6-12 weeks. I provide detailed project plans with
                        milestones.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Do you work with small businesses?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        I work with organizations of all sizes, from startups to Fortune 500 companies. Every business
                        can benefit from data-driven insights, and I tailor solutions to fit your budget and needs.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        What data sources do you work with?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        I work with various data sources including SQL databases, Excel files, APIs, cloud platforms,
                        and third-party applications like Salesforce, HubSpot, and Google Analytics. Data integration is
                        my specialty.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Do you provide ongoing support?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Yes, I offer comprehensive maintenance packages and ongoing support to ensure your analytics
                        solutions continue to deliver value as your business evolves. This includes updates, training,
                        and optimization.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </main>
    </div>
  )
}
