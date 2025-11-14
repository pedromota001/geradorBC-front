'use client'

interface Message {
  id: string
  sender: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot'

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start gap-3`}>
      {isBot && (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-[#567C5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[70%] px-6 py-4 rounded-2xl ${
          isBot
            ? 'bg-gray-200 text-gray-800'
            : 'bg-gray-300 text-gray-800'
        }`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
