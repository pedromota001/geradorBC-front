'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { LoginDialog } from '@/components/LoginDialog'

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  const handleCTAClick = () => {
    if (isAuthenticated) {
      // TODO: Redirecionar para página do chatbot
      console.log('Usuário autenticado - redirecionar para chatbot')
    } else {
      setIsLoginOpen(true)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Header com logo */}
      <header className="px-6 py-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif text-brand font-bold">
            CaseAI
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onCTAClick={handleCTAClick} />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Login Modal */}
      <LoginDialog isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </main>
  )
}
