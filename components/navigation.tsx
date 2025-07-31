"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Menu, X, Home, User, Briefcase, FileText, Mail, ChevronRight, Github, Linkedin, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/services", label: "Services", icon: Settings },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-[60] lg:hidden bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-gray-200/40 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-56 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-r border-gray-200/40 dark:border-gray-700/20 z-50 flex-col">
        <div className="p-6">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            DataAnalyst
          </Link>
        </div>

        <div className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-800/10 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 ml-auto transition-transform ${isActive ? "rotate-90" : "group-hover:translate-x-1"}`}
                  />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-6 border-t border-gray-200/40 dark:border-gray-700/20">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Alex Johnson</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Senior Data Analyst</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-2 justify-center">
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0 hover:bg-blue-500/20 hover:text-blue-600">
              <a href="https://linkedin.com/in/alexjohnson" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 w-8 p-0 hover:bg-gray-500/20 hover:text-gray-600 dark:hover:text-gray-400"
            >
              <a href="https://github.com/alexjohnson" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200/40 dark:border-gray-700/20 z-50 lg:hidden flex flex-col"
            >
              <div className="p-6">
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  onClick={() => setIsOpen(false)}
                >
                  DataAnalyst
                </Link>
              </div>

              <div className="flex-1 px-4 py-6">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-800/10 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
                        )}
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight
                          className={`w-4 h-4 ml-auto transition-transform ${isActive ? "rotate-90" : "group-hover:translate-x-1"}`}
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Profile Section */}
              <div className="p-6 border-t border-gray-200/40 dark:border-gray-700/20">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Alex Johnson</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Senior Data Analyst</p>
                </div>

                {/* Mobile Social Links */}
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-8 w-8 p-0 hover:bg-blue-500/20 hover:text-blue-600"
                  >
                    <a href="https://linkedin.com/in/alexjohnson" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-8 w-8 p-0 hover:bg-gray-500/20 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    <a href="https://github.com/alexjohnson" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
