"use client"

import { motion } from "framer-motion"
import { Award, BookOpen, Target, Users, MapPin, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AnimatedBackground from "@/components/animated-background"
import Navigation from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

const skills = [
  { name: "Python", level: 95, color: "bg-green-500" },
  { name: "Power BI", level: 92, color: "bg-yellow-500" },
  { name: "SQL", level: 90, color: "bg-blue-500" },
  { name: "Machine Learning", level: 88, color: "bg-purple-500" },
  { name: "Tableau", level: 85, color: "bg-orange-500" },
  { name: "R", level: 82, color: "bg-cyan-500" },
  { name: "Excel", level: 95, color: "bg-green-600" },
  { name: "Statistics", level: 90, color: "bg-red-500" },
]

const experience = [
  {
    title: "Data Science Intern",
    company: "Drashti Infotech",
    period: "July '24 - Jan '25",
    location: "Gujarat",
    description:
      "Collaborated with data scientists on developing and deploying machine learning models while performing data cleaning, EDA, and SQL queries to extract insights.",
    achievements: [
      "Collaborated with data scientists on developing and deploying machine learning models while **performing data cleaning, EDA, and SQL queries to extract insights.**",
      "Contributed to data analysis, feature engineering, and model evaluation, while **supporting the development of data visualization dashboards**",
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />
      <ThemeToggle />

      <main className="relative z-10 lg:ml-56">
        <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full p-1">
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full p-2">
                    <Image
                      src="/Profile.jpeg"
                      alt="Professional headshot"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-full"
                      priority
                    />
                  </div>
                </div>
                {/* Floating elements around photo */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/2 -left-4 w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-700"></div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate data science intern with hands-on experience in machine learning, data analysis, and visualization. 
              Dedicated to transforming complex data into actionable insights through advanced analytics and compelling dashboards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Personal Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                    <Users className="w-6 h-6 text-blue-500" />
                    My Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    My passion for data science began during my academic journey, where I discovered the
                    transformative power of turning raw numbers into compelling business narratives. What started as
                    academic curiosity has evolved into a hands-on internship experience dedicated to helping organizations make informed,
                    data-driven decisions.
                  </p>
                  <p>
                    I specialize in bridging the gap between complex analytical concepts and practical business
                    applications. My approach combines statistical rigor with clear storytelling, ensuring that insights
                    not only inform but inspire action across all organizational levels.
                  </p>
                  <p>
                    During my internship at Drashti Infotech, I've gained valuable experience in machine learning model development,
                    data cleaning, exploratory data analysis, and creating visualization dashboards. I'm passionate about
                    continuous learning and staying updated with the latest trends in data science and analytics.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                    <Target className="w-6 h-6 text-purple-500" />
                    Core Values & Approach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Data Integrity</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ensuring accuracy, reliability, and ethical use of data in every analysis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Clear Communication</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Making complex insights accessible through compelling visualizations and storytelling
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Continuous Innovation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Staying at the forefront of emerging technologies and analytical methodologies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Business Impact</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Focusing on insights that drive measurable business outcomes and strategic value
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <Award className="w-6 h-6 text-green-500" />
                  Technical Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Professional Experience</h2>
            </div>

            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-gray-800 dark:text-gray-200 mb-1">{job.title}</CardTitle>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{job.company}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {job.period}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300">{job.description}</p>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Achievements:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {job.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
