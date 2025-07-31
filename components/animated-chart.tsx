"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedChartProps {
  data: { label: string; value: number; color: string }[]
  type: "bar" | "line" | "pie"
  title: string
}

export default function AnimatedChart({ data, type, title }: AnimatedChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    let animationProgress = 0
    const animationDuration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      animationProgress = Math.min(elapsed / animationDuration, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (type === "bar") {
        drawBarChart(ctx, data, animationProgress)
      } else if (type === "line") {
        drawLineChart(ctx, data, animationProgress)
      } else if (type === "pie") {
        drawPieChart(ctx, data, animationProgress)
      }

      if (animationProgress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isVisible, data, type])

  const drawBarChart = (ctx: CanvasRenderingContext2D, data: any[], progress: number) => {
    const padding = 40
    const chartWidth = ctx.canvas.width - padding * 2
    const chartHeight = ctx.canvas.height - padding * 2
    const barWidth = (chartWidth / data.length) * 0.8
    const maxValue = Math.max(...data.map((d) => d.value))

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight * progress
      const x = padding + (chartWidth / data.length) * index + (chartWidth / data.length - barWidth) / 2
      const y = ctx.canvas.height - padding - barHeight

      // Draw bar with gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
      gradient.addColorStop(0, item.color)
      gradient.addColorStop(1, item.color + "80")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.label, x + barWidth / 2, ctx.canvas.height - padding + 20)

      // Draw value
      if (progress > 0.8) {
        ctx.fillStyle = "#1F2937"
        ctx.font = "bold 14px sans-serif"
        ctx.fillText(item.value.toString(), x + barWidth / 2, y - 10)
      }
    })
  }

  const drawLineChart = (ctx: CanvasRenderingContext2D, data: any[], progress: number) => {
    const padding = 40
    const chartWidth = ctx.canvas.width - padding * 2
    const chartHeight = ctx.canvas.height - padding * 2
    const maxValue = Math.max(...data.map((d) => d.value))

    ctx.strokeStyle = "#3B82F6"
    ctx.lineWidth = 3
    ctx.beginPath()

    const pointsToShow = Math.floor(data.length * progress)

    data.slice(0, pointsToShow).forEach((item, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = ctx.canvas.height - padding - (item.value / maxValue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw points
      ctx.save()
      ctx.fillStyle = item.color
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    ctx.stroke()
  }

  const drawPieChart = (ctx: CanvasRenderingContext2D, data: any[], progress: number) => {
    const centerX = ctx.canvas.width / 2
    const centerY = ctx.canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40
    const total = data.reduce((sum, item) => sum + item.value, 0)

    let currentAngle = -Math.PI / 2
    const targetAngle = currentAngle + Math.PI * 2 * progress

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * Math.PI * 2 * progress

      if (currentAngle < targetAngle) {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, currentAngle, Math.min(currentAngle + sliceAngle, targetAngle))
        ctx.closePath()
        ctx.fillStyle = item.color
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      currentAngle += sliceAngle
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">{title}</h3>
      <canvas ref={canvasRef} className="w-full h-auto max-w-md mx-auto" style={{ maxHeight: "300px" }} />
    </motion.div>
  )
}
