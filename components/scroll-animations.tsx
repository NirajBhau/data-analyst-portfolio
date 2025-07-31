"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideInUp"
  delay?: number
  duration?: number
}

export function ScrollAnimation({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    slideInUp: {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0 },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredAnimation({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  )
}
