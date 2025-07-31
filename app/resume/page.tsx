"use client"

import { motion } from "framer-motion"
import { Download, Mail, Phone, MapPin, Award, GraduationCap, Linkedin, Github, ExternalLink, Eye, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AnimatedBackground from "@/components/animated-background"
import Navigation from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const keySkills = {
  "Programming Languages": ["Python", "SQL"],
  "Data Engineering": ["Numpy", "Pandas"],
  "Data Visualization and Reporting": ["Matplotlib", "Pyplot", "Seaborn", "Power BI", "Excel"],
  "Data Science Skills": [
    "Exploratory Data Analysis (EDA)",
    "Feature Engineering",
    "Feature Selection and Extraction",
    "Dimensionality Reduction",
    "Data Cleaning",
    "Statistical Analysis"
  ],
  "Soft Skills": [
    "Fast Learner",
    "Optimistic Attitude",
    "Strong Communication Skills",
    "Excellent Time Management"
  ]
}

const internship = {
  company: "Drashti Infotech",
  location: "Gujarat",
  role: "Data Science",
  period: "July '24 - Jan '25",
  achievements: [
    "Collaborated with data scientists on developing and deploying machine learning models while performing data cleaning, EDA, and SQL queries to extract insights.",
    "Contributed to data analysis, feature engineering, and model evaluation, while supporting the development of data visualization dashboards"
  ]
}

const projects = [
  {
    title: "Customer Churn Analysis",
    achievements: [
      "Executed a Customer Churn Analysis project by applying data analytics and machine learning methodologies to derive actionable insights",
      "Analyzed diverse datasets, performed insightful exploratory data analysis (EDA), and pinpointed key factors influencing customer attrition"
    ]
  },
  {
    title: "Movie Recommendation System",
    achievements: [
      "Led the development of a Movie Recommendation System, overseeing data collection, preprocessing, and model integration for seamless implementation",
      "Oversaw model evaluation and optimization processes, showcasing proficiency in developing recommendation systems"
    ]
  },
  {
    title: "Loan Approval Prediction",
    achievements: [
      "Led the development of a Loan Approval Prediction system, overseeing data collection, preprocessing, and integration of various variables including applicant details, financial history, and credit scores",
      "Leveraged predictive models to assess and forecast loan approval probabilities, conducting rigorous model evaluation and refining algorithms for optimal accuracy"
    ]
  },
  {
    title: "Time Series Analysis with Stock Price",
    achievements: [
      "Conducted time series analysis on stock price data with a focus on trend identification and forecasting",
      "Leveraged performance metrics to assess accuracy and crafted visualizations demonstrating trends and volatility, strengthening proficiency in market data analysis and enhancing decision-making support for investments"
    ]
  }
]

const certificates = [
  {
    name: "Data Science Certification",
    issuer: "Intellipaat",
    image: "/intellipaat-certificate-data-science_page-0001.jpg",
    description: "Comprehensive data science certification covering data analysis, machine learning, and statistical methods"
  },
  {
    name: "Power BI Certification",
    issuer: "Intellipaat",
    image: "/intellipaat-certificate-power bi_page-0001.jpg",
    description: "Advanced Power BI certification for data visualization and business intelligence"
  },
  {
    name: "SQL Certification",
    issuer: "Intellipaat",
    image: "/intellipaat-certificate-sql_page-0001.jpg",
    description: "SQL database management and query optimization certification"
  }
]

const certifications = [
  {
    name: "Completed PGP in Data Science from Intellipaat",
    details: ""
  },
  {
    name: "Completed Data Science Certification at Intellipaat",
    details: "focusing on importing and cleansing data sets, conducting data analysis and visualization, and developing machine learning models"
  }
]

const education = {
  university: "Drs Kiran & Pallavi Patel Global University (KPGU)",
  degree: "B.Tech in Computer Science & Engineering",
  cgpa: "CGPA-8.03",
  period: "Sep '21 - May '25"
}

export default function ResumePage() {
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Resume
            </h1>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Resume.pdf';
                link.download = 'Niraj_Patil.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Niraj Patil</h2>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=nirajpatil020@gmail.com&su=Resume%20Inquiry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors cursor-pointer"
                      >
                        Nirajpatil020@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Phone className="w-4 h-4 text-green-500" />
                      9724249244
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <a 
                        href="https://www.linkedin.com/in/niraj-patil-5612b21b9/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        LinkedIn
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Github className="w-4 h-4 text-gray-700 dark:text-gray-400" />
                      <a 
                        href="https://github.com/NirajBhau" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
                      >
                        Github
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-green-500" />
                      <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=nirajpatil020@gmail.com&su=Hire%20Me%20Request"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-500 transition-colors cursor-pointer"
                      >
                        Hire Me
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Career Objective */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">CAREER OBJECTIVE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Enthusiastic and detail-oriented fresher with a strong foundation in data science concepts, including data analysis, machine learning, and statistical methods. Eager to apply my knowledge to real-world challenges and contribute to data-driven decision-making in a dynamic organization. Seeking an opportunity to grow professionally while leveraging my skills in a collaborative and innovative environment.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">KEY SKILLS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(keySkills).map(([category, skills]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{category}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Internship */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">INTERNSHIP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-l-2 border-blue-500 pl-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{internship.company} | {internship.location}</h4>
                        <p className="text-blue-600 dark:text-blue-400">{internship.role}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{internship.period}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {internship.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">PROJECTS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div key={index} className="border-l-2 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{project.title}:</h4>
                        <div className="space-y-2">
                          {project.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                    <Award className="w-6 h-6 text-green-500" />
                    CERTIFICATIONS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">{cert.name}</p>
                          {cert.details && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cert.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Certificate Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                    <Award className="w-6 h-6 text-blue-500" />
                    CERTIFICATE VIEWER
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificates.map((cert, index) => (
                      <Card key={index} className="bg-white/5 dark:bg-gray-800/5 border-gray-200/20 dark:border-gray-700/10 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-gray-800 dark:text-gray-200">{cert.name}</h4>
                              <p className="text-sm text-blue-600 dark:text-blue-400">{cert.issuer}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{cert.description}</p>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Certificate
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-gray-800 dark:text-gray-200">
                                    {cert.name} - {cert.issuer}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="relative w-full h-[70vh]">
                                  <Image
                                    src={cert.image}
                                    alt={cert.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                    <GraduationCap className="w-6 h-6 text-blue-500" />
                    EDUCATION
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-l-2 border-blue-500 pl-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{education.university}</h4>
                        <p className="text-blue-600 dark:text-blue-400">{education.degree} ({education.cgpa})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{education.period}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
