"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

const WORD_REVEAL_SPEED_MS = 80

export default function AnimatedResponseMessage({ text }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!text) {
      setDisplayedText("")
      return
    }

    if (displayedText === text) {
      return
    }

    setDisplayedText("")

    const words = text.split(" ")
    let currentIndex = 0

    const intervalId = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText(words.slice(0, currentIndex + 1).join(" "))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, WORD_REVEAL_SPEED_MS)

    return () => clearInterval(intervalId)
  }, [text])

  
  return <ReactMarkdown>{displayedText}</ReactMarkdown>
}
