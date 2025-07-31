"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-[60] h-10 w-10 p-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-gray-200/40 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-full"
      >
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-[60] h-10 w-10 p-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-gray-200/40 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-full transition-all duration-200 hover:scale-105"
    >
      {theme === "dark" ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-blue-500" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
