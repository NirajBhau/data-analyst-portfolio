"use client"

import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Database, TrendingUp, Award, Users, Target } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import InteractiveBackground from "@/components/interactive-background"
import Navigation from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import AIChatbot from "@/components/ai-chatbot"
import SmartSearch from "@/components/smart-search"
import { ScrollAnimation, StaggeredAnimation } from "@/components/scroll-animations"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      <Navigation />
      <ThemeToggle />
      <SmartSearch />
      <AIChatbot />

      <main className="relative z-10 lg:ml-56">
        <div className="container mx-auto px-4 pt-20 lg:pt-8">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  Data Analyst
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                  Transforming complex data into actionable business insights through advanced analytics, machine
                  learning, and compelling visualizations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/30 dark:border-gray-700/10">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Power BI</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/30 dark:border-gray-700/10">
                  <Database className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Python</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/30 dark:border-gray-700/10">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">Machine Learning</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/projects" className="flex items-center gap-2">
                    View Projects <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-200/40 dark:border-gray-700/40 hover:bg-white/10 dark:hover:bg-gray-800/10 bg-transparent"
                >
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <ScrollAnimation animation="scaleIn" className="py-20">
            <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/10 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-all duration-300">
                <div className="text-4xl font-bold text-blue-500 mb-2">75+</div>
                <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
              </div>
              <div className="text-center bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/10 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-all duration-300">
                <div className="text-4xl font-bold text-green-500 mb-2">6+</div>
                <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
              </div>
              <div className="text-center bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/10 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-all duration-300">
                <div className="text-4xl font-bold text-purple-500 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-300">Client Satisfaction</div>
              </div>
            </StaggeredAnimation>
          </ScrollAnimation>

          {/* Key Highlights */}
          <ScrollAnimation animation="fadeInUp" className="pb-20">
            <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/10">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Certified Expert</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Microsoft & Google certified with proven expertise in data analytics and business intelligence
                </p>
              </div>
              <div className="text-center bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/10">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Team Leadership</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Led cross-functional teams and mentored junior analysts in data-driven decision making
                </p>
              </div>
              <div className="text-center bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/10">
                <Target className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Business Impact</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Delivered $5M+ in cost savings and revenue optimization through strategic analytics
                </p>
              </div>
            </StaggeredAnimation>
          </ScrollAnimation>
        </div>
      </main>
    </div>
  )
}
