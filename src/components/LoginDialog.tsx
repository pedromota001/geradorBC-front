'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from './ui/Modal'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { useAuth } from '@/contexts/AuthContext'

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [email, setEmail] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const success = await login(email, identifier)
    if (success) {
      onClose()
      router.push('/chat')
    } else {
      setError('Email ou identificador inválido')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-4xl md:text-5xl font-serif text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Identificador"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg">
            Entrar
          </Button>
        </form>
      </div>
    </Modal>
  )
}
