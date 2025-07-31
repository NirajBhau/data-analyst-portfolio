"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 3 + 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      resizeCanvas()
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(100, 150, 255, 0.1)"
      ctx.lineWidth = 1

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener("resize", init)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900"
    />
  )
}
