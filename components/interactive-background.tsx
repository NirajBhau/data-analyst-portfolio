"use client"

import { useEffect, useRef, useState } from "react"

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const nodes: Node[] = []
    const nodeCount = 40

    class Node {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
      connections: Node[]
      pulsePhase: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 4 + 2
        this.opacity = Math.random() * 0.6 + 0.4
        this.hue = Math.random() * 60 + 200 // Blue to purple range
        this.connections = []
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update() {
        // Mouse attraction
        const dx = mousePos.x - this.x
        const dy = mousePos.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = (200 - distance) / 200
          this.vx += (dx / distance) * force * 0.005
          this.vy += (dy / distance) * force * 0.005
        }

        this.x += this.vx
        this.y += this.vy

        // Boundary bounce with padding
        const padding = 50
        if (this.x < padding || this.x > canvas.width - padding) this.vx *= -0.8
        if (this.y < padding || this.y > canvas.height - padding) this.vy *= -0.8

        // Keep within bounds
        this.x = Math.max(padding, Math.min(canvas.width - padding, this.x))
        this.y = Math.max(padding, Math.min(canvas.height - padding, this.y))

        // Friction
        this.vx *= 0.995
        this.vy *= 0.995

        // Update pulse
        this.pulsePhase += 0.02
      }

      draw() {
        const pulseSize = this.size + Math.sin(this.pulsePhase) * 1.5
        const baseColor = `hsl(${this.hue}, 70%, 60%)`

        ctx.save()
        ctx.globalAlpha = this.opacity

        // Draw outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseSize * 3)
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 0.4)`)
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, 60%, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw main node
        ctx.fillStyle = baseColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw inner highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(this.x - pulseSize * 0.3, this.y - pulseSize * 0.3, pulseSize * 0.4, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      findConnections(nodes: Node[]) {
        this.connections = []
        nodes.forEach((node) => {
          if (node !== this) {
            const dx = this.x - node.x
            const dy = this.y - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 120) {
              this.connections.push(node)
            }
          }
        })
      }

      drawConnections() {
        this.connections.forEach((node) => {
          const dx = this.x - node.x
          const dy = this.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const opacity = ((120 - distance) / 120) * 0.3

          ctx.save()
          ctx.globalAlpha = opacity
          ctx.strokeStyle = `hsla(220, 70%, 60%, ${opacity})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)
          ctx.stroke()
          ctx.restore()
        })
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const init = () => {
      resizeCanvas()
      nodes.length = 0

      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes and find connections
      nodes.forEach((node) => {
        node.update()
        node.findConnections(nodes)
      })

      // Draw connections first
      nodes.forEach((node) => {
        node.drawConnections()
      })

      // Draw nodes on top
      nodes.forEach((node) => {
        node.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", init)

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", init)
    }
  }, [mousePos.x, mousePos.y])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900"
    />
  )
}
