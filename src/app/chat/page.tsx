'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ChatMessage } from '@/components/ChatMessage'
import { ChatInput } from '@/components/ChatInput'

interface Message {
  id: string
  sender: 'user' | 'bot'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    loadChatHistory()
  }, [isAuthenticated, router])

  const loadChatHistory = async () => {
    try {
      // TODO: Substituir pela URL real do n8n
      const response = await fetch('http://localhost:5678/webhook-test/chat-history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      // Se retornar mensagens, carrega o histórico
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages)
      } else {
        // Se não houver histórico, adiciona mensagem de boas-vindas
        setMessages([
          {
            id: '1',
            sender: 'bot',
            content: 'Olá! Bem-vindo ao CaseAI. Para começar, você pode me perguntar sobre: palavras-chave, exemplos, ajuda.',
            timestamp: new Date(),
          },
        ])
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
      // Em caso de erro, mostra mensagem padrão
      setMessages([
        {
          id: '1',
          sender: 'bot',
          content: 'Olá! Bem-vindo ao CaseAI. Como posso ajudar você hoje?',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      // TODO: Substituir pela URL real do n8n para enviar mensagem
      const response = await fetch('http://localhost:5678/webhook-test/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: data.response || 'Desculpe, não consegui processar sua mensagem.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FEFDF8] flex items-center justify-center">
        <p className="text-[#2F5233] text-xl">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FEFDF8] flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl md:text-5xl font-serif text-[#2F5233]">CaseAI</h1>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-[#567C5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-[#567C5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-[#567C5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Title */}
      <div className="border-b border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-[#2F5233]">ChatBot</h2>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}
