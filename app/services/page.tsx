"use client"

import { motion } from "framer-motion"
import { BarChart3, Brain, Database, TrendingUp, Users, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedBackground from "@/components/animated-background"
import Navigation from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import SmartContactForm from "@/components/smart-contact-form"

const services = [
  {
    title: "Business Intelligence & Dashboard Development",
    description:
      "Transform your raw data into interactive, real-time dashboards that drive strategic decision-making across your organization.",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    features: [
      "Custom Power BI and Tableau dashboards",
      "Real-time data visualization",
      "KPI tracking and monitoring",
      "Executive reporting solutions",
      "Mobile-responsive designs",
      "Automated data refresh",
    ],
    deliverables: [
      "Interactive dashboard prototypes",
      "Data source integration",
      "User training and documentation",
      "Ongoing maintenance and support",
    ],
    timeline: "2-4 weeks",
  },
  {
    title: "Predictive Analytics & Machine Learning",
    description:
      "Leverage advanced algorithms and statistical models to forecast trends, predict outcomes, and optimize business processes.",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    features: [
      "Customer churn prediction",
      "Demand forecasting",
      "Risk assessment models",
      "Recommendation systems",
      "Anomaly detection",
      "A/B testing analysis",
    ],
    deliverables: [
      "Trained machine learning models",
      "Model performance reports",
      "Implementation guidelines",
      "Monitoring and maintenance plan",
    ],
    timeline: "4-8 weeks",
  },
  {
    title: "Data Strategy & Analytics Consulting",
    description:
      "Develop comprehensive data strategies that align with your business objectives and establish a data-driven culture.",
    icon: TrendingUp,
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    features: [
      "Data maturity assessment",
      "Analytics roadmap development",
      "Technology stack recommendations",
      "Data governance frameworks",
      "Team capability building",
      "ROI measurement strategies",
    ],
    deliverables: [
      "Comprehensive strategy document",
      "Implementation roadmap",
      "Technology recommendations",
      "Training curriculum",
    ],
    timeline: "3-6 weeks",
  },
  {
    title: "Statistical Analysis & Research",
    description:
      "Conduct rigorous statistical analysis and research to validate hypotheses and support evidence-based decision making.",
    icon: Database,
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    features: [
      "Hypothesis testing",
      "Regression analysis",
      "Survey design and analysis",
      "Market research studies",
      "Clinical trial analysis",
      "Academic research support",
    ],
    deliverables: [
      "Statistical analysis reports",
      "Research methodology documentation",
      "Data interpretation guides",
      "Publication-ready findings",
    ],
    timeline: "2-6 weeks",
  },
  {
    title: "Data Visualization & Executive Reporting",
    description:
      "Create compelling visual narratives that communicate complex insights clearly to stakeholders at all levels.",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    features: [
      "Custom infographic design",
      "Executive summary reports",
      "Interactive presentations",
      "Storytelling with data",
      "Brand-aligned visualizations",
      "Multi-format delivery",
    ],
    deliverables: [
      "Professional report templates",
      "Interactive visualizations",
      "Presentation materials",
      "Style guide documentation",
    ],
    timeline: "1-3 weeks",
  },
  {
    title: "Team Training & Analytics Mentorship",
    description:
      "Empower your team with data literacy skills and advanced analytics capabilities through personalized training programs.",
    icon: Users,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/20",
    features: [
      "Custom training curricula",
      "Hands-on workshops",
      "One-on-one mentoring",
      "Best practices guidance",
      "Tool-specific training",
      "Certification preparation",
    ],
    deliverables: [
      "Training materials and resources",
      "Practical exercises and projects",
      "Progress assessment reports",
      "Ongoing support access",
    ],
    timeline: "2-8 weeks",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />
      <ThemeToggle />

      <main className="relative z-10 lg:ml-56">
        <div className="container mx-auto px-4 pt-20 pb-16 lg:pt-16 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive data analytics services designed to transform your business through data-driven insights and
              strategic intelligence.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 ${service.bgColor} rounded-full flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${service.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-gray-800 dark:text-gray-200 text-lg">{service.title}</CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {service.timeline}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Deliverables:</h4>
                        <div className="space-y-1">
                          {service.deliverables.map((deliverable, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        asChild
                      >
                        <Link href="/contact">Get Quote</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Process Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-center text-gray-800 dark:text-gray-200 text-2xl mb-4">My Process</CardTitle>
                <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                  A proven methodology that ensures successful project delivery and maximum business impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-500">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Discovery</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Understanding your business objectives, data landscape, and success metrics
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-500">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Deep dive into your data, identifying patterns, opportunities, and challenges
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-purple-500">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Implementation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Building and deploying solutions with regular feedback and iteration cycles
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-orange-500">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Optimization</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Continuous monitoring, refinement, and scaling for maximum business impact
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Project Inquiry Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Start Your Project</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Get a personalized quote and timeline for your data analytics project.
              </p>
            </div>
            <SmartContactForm />
          </motion.section>

          {/* Simple CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Need More Information?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
                  Have questions about our services or want to discuss your specific needs?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/10 bg-transparent"
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/10 bg-transparent"
                    asChild
                  >
                    <Link href="/projects">View Case Studies</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
