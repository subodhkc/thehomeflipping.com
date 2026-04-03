'use client'

import { useState } from 'react'
import { Phone, MessageCircle, Bot, ArrowRight, CheckCircle } from 'lucide-react'

export function AIVoiceBanner() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Bot className="h-8 w-8 mr-2" />
            <h2 className="text-2xl font-bold">AI Business Receptionist</h2>
          </div>
          
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Never miss a lead again! Get your AI voice agent from{' '}
            <a 
              href="https://kestrelvoice.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold underline hover:text-blue-200 transition-colors"
            >
              KestrelVoice.com
            </a>
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>

          {isExpanded && (
            <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Phone className="h-10 w-10 mb-3" />
                <h3 className="font-semibold text-lg mb-2">24/7 Answering</h3>
                <p className="text-blue-100">
                  Your AI agent handles calls anytime, capturing leads and scheduling appointments
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <MessageCircle className="h-10 w-10 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Natural Conversations</h3>
                <p className="text-blue-100">
                  Advanced AI that sounds human, understands context, and engages prospects naturally
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <CheckCircle className="h-10 w-10 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Lead Qualification</h3>
                <p className="text-blue-100">
                  Automatically qualifies leads, asks qualifying questions, and forwards hot leads
                </p>
              </div>
            </div>
          )}

          <div className="mt-8">
            <a
              href="https://kestrelvoice.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center shadow-lg"
            >
              Get Your AI Receptionist Today
              <ArrowRight className="ml-2 h-6 w-6" />
            </a>
          </div>

          <p className="mt-4 text-sm text-blue-100">
            Special offer: Mention TheHomeFlipping.com for 20% off your first 3 months!
          </p>
        </div>
      </div>
    </div>
  )
}
