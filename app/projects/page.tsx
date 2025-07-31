"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, BarChart3, Code, Eye, X, TrendingUp, Users, ShoppingCart, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AnimatedBackground from "@/components/animated-background"
import Navigation from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

const powerBIProjects = [
  {
    title: "Sales Dashboard",
    description:
      "Interactive sales performance dashboard analyzing revenue trends, regional performance, product categories, and sales forecasting with real-time KPIs.",
    methodology:
      "Data extraction and transformation using Power Query, DAX calculations for KPIs and metrics, interactive visualizations with drill-down capabilities, and real-time data refresh.",
    outcomes: "Enhanced sales visibility by 40% and improved decision-making speed by 60% through centralized analytics platform.",
    technologies: ["Power BI", "SQL Server", "DAX", "Power Query"],
    image: "/sales.jfif",
    liveDemo: "https://app.fabric.microsoft.com/reportEmbed?reportId=c40a32e5-8571-43a4-bdfa-0b7bf296fed3&autoAuth=true&ctid=c6e549b3-5f45-4032-aae9-d4244dc5b2c4",
    category: "Business Intelligence",
    insights: {
      keyMetrics: ["Total Sales: $2.4M", "Growth Rate: 15.2%", "Top Region: North", "Best Product: Electronics"],
      findings: [
        "North region shows highest sales performance with 28% contribution",
        "Electronics category leads with 35% of total revenue",
        "Q4 shows strongest seasonal performance",
        "Online channel growing 25% faster than retail"
      ],
      recommendations: [
        "Focus marketing efforts on North region expansion",
        "Increase inventory for Electronics category",
        "Develop Q4 promotional strategies",
        "Invest in online channel infrastructure"
      ]
    }
  },
  {
    title: "Ola Analysis Dashboard",
    description: "Comprehensive ride-sharing analytics dashboard tracking driver performance, customer satisfaction, peak hours analysis, and operational efficiency metrics.",
    methodology:
      "Data integration from multiple sources, real-time analytics, driver performance metrics, and customer feedback analysis.",
    outcomes: "Improved driver efficiency by 20% and increased customer satisfaction scores by 15%.",
    technologies: ["Power BI", "Azure", "Real-time Analytics", "Customer Analytics"],
    image: "/ola.jfif",
    liveDemo: "https://app.fabric.microsoft.com/reportEmbed?reportId=a569886d-1505-4e6f-bed8-cd35e24a452a&autoAuth=true&ctid=c6e549b3-5f45-4032-aae9-d4244dc5b2c4",
    category: "Transportation Analytics",
    insights: {
      keyMetrics: ["Total Rides: 45,230", "Avg Rating: 4.6/5", "Peak Hours: 6-9 PM", "Top Driver: John D."],
      findings: [
        "Evening hours (6-9 PM) show highest demand",
        "Drivers with 4.8+ ratings have 30% more rides",
        "Weekend demand is 40% higher than weekdays",
        "Premium rides contribute 25% of total revenue"
      ],
      recommendations: [
        "Incentivize drivers during peak hours",
        "Implement driver training programs",
        "Develop weekend-specific promotions",
        "Expand premium service offerings"
      ]
    }
  },
  {
    title: "YouTube Analysis Dashboard",
    description: "Content performance analytics dashboard analyzing video metrics, audience engagement patterns, viewer demographics, and channel growth trends.",
    methodology:
      "YouTube API integration, content performance analysis, audience demographics, and engagement metrics tracking.",
    outcomes: "Increased video views by 40% and improved audience retention by 25%.",
    technologies: ["Power BI", "YouTube API", "Content Analytics", "Social Media Analytics"],
    image: "/youtube.png",
    liveDemo: "https://app.fabric.microsoft.com/reportEmbed?reportId=abfa5246-5f22-4c02-8f6f-f420dbb20d19&autoAuth=true&ctid=c6e549b3-5f45-4032-aae9-d4244dc5b2c4",
    category: "Content Analytics",
    insights: {
      keyMetrics: ["Total Views: 2.1M", "Subscribers: 45K", "Avg Watch Time: 8.5 min", "Engagement Rate: 6.2%"],
      findings: [
        "Tutorial videos have highest engagement rates",
        "Peak viewing time is 7-10 PM",
        "Mobile viewers contribute 65% of total views",
        "Series content shows 40% better retention"
      ],
      recommendations: [
        "Increase tutorial content production",
        "Optimize for mobile viewing experience",
        "Schedule uploads during peak hours",
        "Develop more series-based content"
      ]
    }
  },
  {
    title: "Customer Churn Dashboard",
    description: "Predictive analytics dashboard for customer churn analysis, risk assessment, and data-driven retention strategy development.",
    methodology:
      "Customer behavior analysis, churn prediction models, RFM analysis, and retention campaign effectiveness tracking.",
    outcomes: "Reduced customer churn by 30% and increased customer lifetime value by 22%.",
    technologies: ["Power BI", "Machine Learning", "Predictive Analytics", "Customer Analytics"],
    image: "/customer.png",
    liveDemo: "https://app.fabric.microsoft.com/reportEmbed?reportId=8a6c3f1c-1f08-41d2-a9eb-6c9a1c3bc6c2&autoAuth=true&ctid=c6e549b3-5f45-4032-aae9-d4244dc5b2c4",
    category: "Predictive Analytics",
    insights: {
      keyMetrics: ["Churn Rate: 12.5%", "At-Risk Customers: 2,340", "Retention Rate: 87.5%", "Avg LTV: $450"],
      findings: [
        "Customers with 3+ support tickets have 60% higher churn risk",
        "Premium plan subscribers churn 40% less",
        "Seasonal churn peaks in Q1 and Q3",
        "Email engagement correlates with retention"
      ],
      recommendations: [
        "Implement proactive support for high-risk customers",
        "Develop premium plan incentives",
        "Create seasonal retention campaigns",
        "Improve email marketing engagement"
      ]
    }
  },
]

const pythonProjects = [
  {
    title: "Movie Recommendation System",
    description:
      "Machine learning-based movie recommendation system using collaborative filtering and content-based approaches.",
    methodology:
      "Collaborative filtering, content-based filtering, matrix factorization, and hybrid recommendation algorithms.",
    outcomes: "Improved user engagement by 35% and increased movie discovery rate by 45%.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Jupyter"],
    image: "/movie.webp",
    github: "https://github.com/NirajBhau/Movie-recommendation/tree/main",
    category: "Recommendation Systems",
    analysis: {
      keyMetrics: ["Accuracy: 78%", "Precision: 0.82", "Recall: 0.75", "F1-Score: 0.78"],
      findings: [
        "Collaborative filtering shows better performance for user-based recommendations",
        "Content-based filtering excels for new user onboarding",
        "Hybrid approach provides most balanced recommendations",
        "Genre preferences strongly influence recommendation accuracy"
      ],
      recommendations: [
        "Implement real-time user feedback collection",
        "Add more diverse content features",
        "Optimize for cold-start problem",
        "Consider temporal aspects of user preferences"
      ]
    }
  },
  {
    title: "Loan Approval Prediction",
    description: "Machine learning model for predicting loan approval based on customer financial data and credit history.",
    methodology:
      "Feature engineering, ensemble methods (XGBoost, Random Forest), hyperparameter tuning, and model validation.",
    outcomes: "Achieved 89% accuracy in loan approval prediction and reduced processing time by 60%.",
    technologies: ["Python", "Streamlit", "XGBoost", "Scikit-learn", "Pandas"],
    image: "/loan.jpg",
    github: "https://github.com/NirajBhau/loan",
    liveDemo: "https://ct5hjes6ebnoosa9qecwqc.streamlit.app/",
    category: "Financial Analytics",
    analysis: {
      keyMetrics: ["Accuracy: 89%", "AUC: 0.92", "Precision: 0.87", "Recall: 0.91"],
      findings: [
        "Credit score is the most important feature for loan approval",
        "Income level and employment history show strong correlation",
        "Age and education level have moderate impact",
        "Geographic location influences approval rates"
      ],
      recommendations: [
        "Implement real-time credit score integration",
        "Add alternative data sources for better predictions",
        "Develop explainable AI for transparency",
        "Create automated approval workflows"
      ]
    }
  },
  {
    title: "Customer Churn Prediction",
    description: "Predictive analytics model for identifying customers at risk of churning using machine learning algorithms.",
    methodology:
      "Data preprocessing, feature selection, ensemble modeling (XGBoost, CatBoost, LightGBM), and model stacking.",
    outcomes: "Reduced customer churn by 25% and increased retention rate by 30%.",
    technologies: ["Python", "Streamlit", "XGBoost", "CatBoost", "LightGBM"],
    image: "/churn-streamlit.avif",
    github: "https://github.com/NirajBhau/churn-model",
    liveDemo: "https://churn-model-pjx98ybqtw56wj5basmhum.streamlit.app/",
    category: "Predictive Analytics",
    analysis: {
      keyMetrics: ["Accuracy: 85%", "AUC: 0.89", "Precision: 0.83", "Recall: 0.87"],
      findings: [
        "Service usage patterns are strong churn indicators",
        "Customer support interactions correlate with retention",
        "Contract type significantly affects churn probability",
        "Payment method influences customer loyalty"
      ],
      recommendations: [
        "Implement proactive customer support",
        "Develop personalized retention campaigns",
        "Monitor early warning signals",
        "Create loyalty programs for high-risk customers"
      ]
    }
  },
  {
    title: "US Honey Production Analysis",
    description: "Comprehensive analysis of US honey production trends, patterns, and predictive modeling.",
    methodology:
      "Exploratory data analysis, time series analysis, statistical modeling, and trend forecasting.",
    outcomes: "Identified key factors affecting honey production and predicted future trends with 82% accuracy.",
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"],
    image: "/us-honey-production-analysis.jfif",
    github: "https://github.com/NirajBhau/US-HONEY-ANALYSIS",
    category: "Data Analysis",
    analysis: {
      keyMetrics: ["Production Trend: +5.2%", "Top State: ND", "Seasonal Peak: Summer", "Forecast Accuracy: 82%"],
      findings: [
        "North Dakota leads in honey production consistently",
        "Weather patterns strongly influence production levels",
        "Seasonal variations show clear patterns",
        "Colony health correlates with production efficiency"
      ],
      recommendations: [
        "Focus on colony health monitoring",
        "Implement weather-based production planning",
        "Develop regional production strategies",
        "Invest in sustainable beekeeping practices"
      ]
    }
  },
  {
    title: "Stock Price Time Series Analysis",
    description: "Advanced time series analysis and forecasting for stock prices using machine learning models.",
    methodology:
      "Time series preprocessing, ARIMA modeling, LSTM neural networks, and ensemble forecasting methods.",
    outcomes: "Achieved 75% accuracy in short-term price predictions and identified key market patterns.",
    technologies: ["Python", "Streamlit", "TensorFlow", "Prophet", "YFinance"],
    image: "/stock.png",
    github: "https://github.com/NirajBhau/stockapp",
    liveDemo: "https://stockapp-aphy5a2ckdx75xpoq8dzmg.streamlit.app/",
    category: "Time Series Analysis",
    analysis: {
      keyMetrics: ["Prediction Accuracy: 75%", "MAE: 2.3%", "RMSE: 3.1%", "Direction Accuracy: 68%"],
      findings: [
        "LSTM models perform better for short-term predictions",
        "Technical indicators improve prediction accuracy",
        "Market volatility affects model performance",
        "Ensemble methods provide more stable predictions"
      ],
      recommendations: [
        "Incorporate more technical indicators",
        "Implement real-time data feeds",
        "Add sentiment analysis features",
        "Develop risk management strategies"
      ]
    }
  },
]

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)

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
              My Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A showcase of data analysis projects demonstrating expertise in business intelligence, machine learning,
              and advanced analytics across various industries.
            </p>
          </motion.div>

          {/* Power BI Projects */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Power BI Projects</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {powerBIProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20 hover:bg-white/20 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 dark:text-blue-300">
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-gray-800 dark:text-gray-200">{project.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Methodology:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.methodology}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Outcomes:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.outcomes}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="flex-1 min-w-[120px]">
                              <div className="flex items-center justify-center gap-2 cursor-pointer">
                                <BarChart3 className="w-4 h-4" />
                                Open Dashboard
                              </div>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                {project.title}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="w-full h-[70vh]">
                              <iframe
                                title={project.title}
                                width="100%"
                                height="100%"
                                src={project.liveDemo}
                                frameBorder="0"
                                allowFullScreen={true}
                                className="rounded-lg"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        {project.insights && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex-1 min-w-[120px]">
                                <div className="flex items-center justify-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  Insights
                                </div>
                      </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                  {project.title} - Detailed Insights
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Key Metrics */}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    Key Metrics
                                  </h3>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {project.insights.keyMetrics.map((metric, idx) => (
                                      <div key={idx} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{metric}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Key Findings */}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-green-500" />
                                    Key Findings
                                  </h3>
                                  <div className="space-y-2">
                                    {project.insights.findings.map((finding, idx) => (
                                      <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{finding}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Recommendations */}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    Recommendations
                                  </h3>
                                  <div className="space-y-2">
                                    {project.insights.recommendations.map((rec, idx) => (
                                      <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{rec}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Python Projects */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Code className="w-8 h-8 text-green-500" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Python Projects</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {pythonProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20 hover:bg-white/20 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300">
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-gray-800 dark:text-gray-200">{project.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Methodology:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.methodology}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Outcomes:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.outcomes}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button className="flex-1 min-w-[120px]" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      </Button>
                        {project.liveDemo && (
                          <Button variant="outline" className="flex-1 min-w-[120px]" asChild>
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.analysis && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex-1 min-w-[120px]">
                                <div className="flex items-center justify-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  Analysis
                                </div>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                  {project.title} - Detailed Analysis
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Key Metrics */}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    Key Metrics
                                  </h3>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {project.analysis.keyMetrics.map((metric, idx) => (
                                      <div key={idx} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{metric}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Key Findings */}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-green-500" />
                                    Key Findings
                                  </h3>
                                  <div className="space-y-2">
                                    {project.analysis.findings.map((finding, idx) => (
                                      <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{finding}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Recommendations */}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    Recommendations
                                  </h3>
                                  <div className="space-y-2">
                                    {project.analysis.recommendations.map((rec, idx) => (
                                      <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{rec}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
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
