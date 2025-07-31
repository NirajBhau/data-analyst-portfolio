"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skills = [
  { name: "Python", level: 95, color: "#3B82F6", category: "Programming" },
  { name: "Power BI", level: 92, color: "#F59E0B", category: "Visualization" },
  { name: "SQL", level: 90, color: "#10B981", category: "Database" },
  { name: "Machine Learning", level: 88, color: "#8B5CF6", category: "AI/ML" },
  { name: "Tableau", level: 85, color: "#EF4444", category: "Visualization" },
  { name: "R", level: 82, color: "#06B6D4", category: "Programming" },
  { name: "Excel", level: 95, color: "#22C55E", category: "Analysis" },
  { name: "Statistics", level: 90, color: "#F97316", category: "Analysis" },
]

export default function InteractiveSkillsChart() {
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(new Array(skills.length).fill(0))
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevels(skills.map((skill) => skill.level))
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-gray-200/40 dark:border-gray-700/20">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-gray-200 text-center">Interactive Skills Proficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative"
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: skill.color }} />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {skill.category}
                  </span>
                </div>
                <motion.span
                  className="text-sm font-semibold text-gray-600 dark:text-gray-400"
                  animate={{
                    scale: hoveredSkill === index ? 1.2 : 1,
                    color: hoveredSkill === index ? skill.color : undefined,
                  }}
                >
                  {animatedLevels[index]}%
                </motion.span>
              </div>

              <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${animatedLevels[index]}%`,
                    boxShadow: hoveredSkill === index ? `0 0 20px ${skill.color}50` : "none",
                  }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {hoveredSkill === index && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.div>
              </div>

              {hoveredSkill === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg shadow-lg z-10 text-sm"
                >
                  <div className="font-semibold">{skill.name} Expertise</div>
                  <div className="text-xs opacity-80">
                    {skill.level >= 90
                      ? "Expert Level"
                      : skill.level >= 80
                        ? "Advanced"
                        : skill.level >= 70
                          ? "Intermediate"
                          : "Beginner"}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
