"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, FileText, Briefcase, User, Settings, Mail, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "page" | "project" | "service" | "skill"
  url: string
  icon: any
  tags: string[]
}

const searchData: SearchResult[] = [
  // Pages
  {
    id: "home",
    title: "Home",
    description: "Data analyst portfolio showcasing expertise in business intelligence and machine learning",
    type: "page",
    url: "/",
    icon: User,
    tags: ["portfolio", "data analyst", "home", "overview"],
  },
  {
    id: "about",
    title: "About Me",
    description: "Professional background, experience, and core values in data analytics",
    type: "page",
    url: "/about",
    icon: User,
    tags: ["about", "experience", "background", "skills", "education"],
  },
  {
    id: "projects",
    title: "Projects",
    description: "Showcase of Power BI dashboards and Python machine learning projects",
    type: "page",
    url: "/projects",
    icon: Briefcase,
    tags: ["projects", "portfolio", "power bi", "python", "machine learning"],
  },
  {
    id: "services",
    title: "Services",
    description: "Comprehensive data analytics services with detailed pricing and features",
    type: "page",
    url: "/services",
    icon: Settings,
    tags: ["services", "consulting", "pricing", "business intelligence"],
  },
  {
    id: "resume",
    title: "Resume",
    description: "Professional resume with education, certifications, and achievements",
    type: "page",
    url: "/resume",
    icon: FileText,
    tags: ["resume", "cv", "education", "certifications", "achievements"],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch for consultations and project inquiries",
    type: "page",
    url: "/contact",
    icon: Mail,
    tags: ["contact", "consultation", "inquiry", "email", "phone"],
  },

  // Projects
  {
    id: "sales-dashboard",
    title: "Sales Performance Dashboard",
    description: "Power BI dashboard tracking KPIs and forecasting trends",
    type: "project",
    url: "/projects#sales-dashboard",
    icon: Briefcase,
    tags: ["power bi", "dashboard", "sales", "kpi", "forecasting"],
  },
  {
    id: "risk-assessment",
    title: "Financial Risk Assessment",
    description: "Real-time risk monitoring with predictive modeling",
    type: "project",
    url: "/projects#risk-assessment",
    icon: Briefcase,
    tags: ["finance", "risk", "predictive modeling", "real-time"],
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance System",
    description: "Machine learning for equipment failure prediction",
    type: "project",
    url: "/projects#predictive-maintenance",
    icon: Briefcase,
    tags: ["machine learning", "python", "iot", "maintenance", "tensorflow"],
  },

  // Services
  {
    id: "bi-dashboards",
    title: "Business Intelligence & Dashboards",
    description: "Interactive dashboards and real-time data visualization",
    type: "service",
    url: "/services#bi-dashboards",
    icon: Settings,
    tags: ["business intelligence", "dashboards", "power bi", "tableau", "visualization"],
  },
  {
    id: "ml-analytics",
    title: "Machine Learning & Predictive Analytics",
    description: "Advanced algorithms for forecasting and optimization",
    type: "service",
    url: "/services#ml-analytics",
    icon: Settings,
    tags: ["machine learning", "predictive analytics", "python", "algorithms"],
  },
  {
    id: "data-strategy",
    title: "Data Strategy & Consulting",
    description: "Comprehensive data strategies and analytics roadmaps",
    type: "service",
    url: "/services#data-strategy",
    icon: Settings,
    tags: ["strategy", "consulting", "roadmap", "data governance"],
  },

  // Skills
  {
    id: "python-skill",
    title: "Python Programming",
    description: "Advanced Python skills for data analysis and machine learning",
    type: "skill",
    url: "/about#skills",
    icon: Sparkles,
    tags: ["python", "programming", "pandas", "scikit-learn", "tensorflow"],
  },
  {
    id: "powerbi-skill",
    title: "Power BI",
    description: "Expert-level Power BI development and DAX calculations",
    type: "skill",
    url: "/about#skills",
    icon: Sparkles,
    tags: ["power bi", "dax", "visualization", "business intelligence"],
  },
  {
    id: "sql-skill",
    title: "SQL & Databases",
    description: "Advanced SQL querying and database management",
    type: "skill",
    url: "/about#skills",
    icon: Sparkles,
    tags: ["sql", "database", "postgresql", "mysql", "data extraction"],
  },
]

export default function SmartSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Smart search algorithm
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const searchResults: (SearchResult & { score: number })[] = []

    searchData.forEach((item) => {
      let score = 0

      // Title exact match (highest priority)
      if (item.title.toLowerCase().includes(query)) {
        score += 100
      }

      // Description match
      if (item.description.toLowerCase().includes(query)) {
        score += 50
      }

      // Tags match
      item.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(query)) {
          score += 30
        }
      })

      // Fuzzy matching for typos
      const titleWords = item.title.toLowerCase().split(" ")
      const queryWords = query.split(" ")

      queryWords.forEach((queryWord) => {
        titleWords.forEach((titleWord) => {
          if (titleWord.includes(queryWord) || queryWord.includes(titleWord)) {
            score += 20
          }
        })
      })

      if (score > 0) {
        searchResults.push({ ...item, score })
      }
    })

    // Sort by score and return top 8 results
    const sortedResults = searchResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ score, ...item }) => item)

    setResults(sortedResults)
    setSelectedIndex(-1)
  }

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      performSearch(query)
    }, 200)

    return () => clearTimeout(delayedSearch)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }

      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
        setResults([])
      }

      if (isOpen && results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % results.length)
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1))
        } else if (e.key === "Enter" && selectedIndex >= 0) {
          e.preventDefault()
          const selectedResult = results[selectedIndex]
          window.location.href = selectedResult.url
          setIsOpen(false)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "page":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-300"
      case "project":
        return "bg-green-500/20 text-green-700 dark:text-green-300"
      case "service":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-300"
      case "skill":
        return "bg-orange-500/20 text-orange-700 dark:text-orange-300"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-300"
    }
  }

  return (
    <>
      {/* Search Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-gray-200/40 dark:border-gray-700/20 rounded-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span>Search portfolio...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">
            <span>⌘</span>K
          </kbd>
        </div>
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
            >
              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/20 shadow-2xl">
                <CardContent className="p-0">
                  {/* Search Input */}
                  <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                    <Search className="w-5 h-5 text-gray-400" />
                    <Input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search projects, services, skills..."
                      className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search Results */}
                  <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                    {results.length > 0 ? (
                      <div className="p-2">
                        {results.map((result, index) => {
                          const Icon = result.icon
                          return (
                            <Link
                              key={result.id}
                              href={result.url}
                              onClick={() => setIsOpen(false)}
                              className={`block p-3 rounded-lg transition-colors ${
                                selectedIndex === index
                                  ? "bg-blue-500/10 border border-blue-500/40 dark:border-blue-500/20"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                      {result.title}
                                    </h3>
                                    <Badge variant="secondary" className={`text-xs ${getTypeColor(result.type)}`}>
                                      {result.type}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {result.description}
                                  </p>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {result.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    ) : query.trim() ? (
                      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No results found for "{query}"</p>
                        <p className="text-sm mt-2">Try searching for projects, services, or skills</p>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Start typing to search...</p>
                        <p className="text-sm mt-2">Search across projects, services, skills, and pages</p>
                      </div>
                    )}
                  </div>

                  {/* Search Tips */}
                  {!query.trim() && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">↑↓</kbd>
                            Navigate
                          </span>
                          <span className="flex items-center gap-1">
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>
                            Select
                          </span>
                          <span className="flex items-center gap-1">
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">esc</kbd>
                            Close
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
