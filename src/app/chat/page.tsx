'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ChatMessage } from '@/components/ChatMessage'
import { ChatInput } from '@/components/ChatInput'

const N8N_BASE_URL = 'https://businesscase-n8n-redis-production.up.railway.app'

interface Message {
  id: string
  sender: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface GeneratedFile {
  name: string
  url: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [generatedFile, setGeneratedFile] = useState<GeneratedFile | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { isAuthenticated, userEmail } = useAuth()
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
      const response = await fetch(`${N8N_BASE_URL}/webhook/coleta-respostaERROR`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      })

      const data = await response.json()
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages)
      } else {

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
      const response = await fetch(`${N8N_BASE_URL}/webhook-test/coleta-resposta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content, email: userEmail }),
      })

      const data = await response.json()

      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages)
      }

      if (data.finished === true) {
        console.log('Entrando na geração de documentos')
        setIsGenerating(true)
        try {
          const fileResponse = await fetch(`${N8N_BASE_URL}/webhook/gerar-documentos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }),
          })
          console.log('')
          console.log('Status da resposta:', fileResponse.status)
          console.log('Content-Type:', fileResponse.headers.get('Content-Type'))

          // Converte a resposta binária em blob
          const blob = await fileResponse.blob()
          console.log('Tamanho do blob:', blob.size, 'bytes')
          console.log('Tipo do blob:', blob.type)

          // Se o arquivo for muito pequeno, provavelmente é um erro
          if (blob.size < 1000) {
            const text = await blob.text()
            console.error('Resposta inesperada:', text)
          }

          const url = URL.createObjectURL(blob)

          setGeneratedFile({
            name: 'DRAFT.pptx',
            url: url,
          })
        } catch (error) {
          console.error('Erro ao gerar documentos:', error)
        } finally {
          setIsGenerating(false)
        }
      }
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
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-[#567C5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
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

          {/* Loading indicator para geração de documento */}
          {isGenerating && (
            <div className="flex items-center gap-3 p-4 bg-[#F0F4E8] rounded-lg">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2F5233]"></div>
              <span className="text-[#2F5233]">Gerando documento...</span>
            </div>
          )}

          {/* Card do arquivo gerado */}
          {generatedFile && (
            <div className="flex items-center gap-3 p-4 bg-[#F0F4E8] rounded-lg border border-[#567C5A]">
              {/* Ícone PPTX */}
              <svg className="w-8 h-8 text-[#D04423]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13zm-4 5h2c1.1 0 2 .9 2 2s-.9 2-2 2h-1v2H7v-6zm2 3c.55 0 1-.45 1-1s-.45-1-1-1H9v2h2z"/>
              </svg>

              {/* Nome do arquivo */}
              <span className="flex-1 text-[#2F5233] font-medium">{generatedFile.name}</span>

              {/* Botão de download */}
              <a
                href={generatedFile.url}
                download={generatedFile.name}
                className="flex items-center gap-2 px-4 py-2 bg-[#2F5233] text-white rounded-lg hover:bg-[#3d6b42] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar
              </a>
            </div>
          )}
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
