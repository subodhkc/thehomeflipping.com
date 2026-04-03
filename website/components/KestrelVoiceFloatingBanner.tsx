'use client'

import { useState, useEffect } from 'react'
import { Bot, X, Sparkles, ArrowRight } from 'lucide-react'

export function KestrelVoiceFloatingBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => {
      if (!localStorage.getItem('kestrel-banner-dismissed')) {
        setIsVisible(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    localStorage.setItem('kestrel-banner-dismissed', 'true')
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl shadow-2xl p-5 animate-pulse-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">AI Voice Agent</p>
              <p className="text-xs text-white/80">Never miss a lead!</p>
            </div>
          </div>
          <button
            onClick={dismiss}
            className="text-white/60 hover:text-white p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          <p className="text-sm">Get 20% off at KestrelVoice.com</p>
        </div>

        <a
          href="https://kestrelvoice.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-white text-purple-600 text-center py-2.5 rounded-lg font-semibold hover:bg-white/90 transition-colors text-sm"
        >
          Get AI Receptionist
          <ArrowRight className="inline ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
