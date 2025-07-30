"use client"

import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { submitQuery, addUserMessage } from "../store/chatSlice"
import { Bot, Send, User, Loader2 } from "lucide-react"
import AnimatedResponseMessage from "./AnimatedResponseMessage" // Import the new component

export default function AiChatbot({ claimData }) {
  const dispatch = useDispatch()
  const { messages, status } = useSelector((state) => state.chat)
  const [input, setInput] = useState("")
  const scrollRef = useRef(null)
  const isPending = status === "loading"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status]) // Also scroll during the animation

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isPending) return

    dispatch(addUserMessage(input))
    dispatch(submitQuery({ claimData, question: input }))

    setInput("")
  }

  return (
    <div className="w-full h-[60vh] max-h-[500px] flex flex-col border rounded-lg shadow-md bg-white">
      <header className="p-4 border-b font-medium">AI Assistant</header>
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 text-sm ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && <Bot className="w-5 h-5 text-blue-600 flex-shrink-0" />}
              <div
                className={`p-3 rounded-lg max-w-xs md:max-w-sm ${
                  m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {/* Use the animated component for the assistant's messages */}
                {m.role === "assistant" ? <AnimatedResponseMessage text={m.content} /> : m.content}
              </div>
              {m.role === "user" && <User className="w-5 h-5 text-blue-600 flex-shrink-0" />}
            </div>
          ))}
          {isPending && (
            <div className="flex gap-3 justify-start">
              <Bot className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="p-3 rounded-lg bg-gray-100 flex items-center space-x-2 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this claim..."
            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending || !input.trim()}
            className="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </footer>
    </div>
  )
}
