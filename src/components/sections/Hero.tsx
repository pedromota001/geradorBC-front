import { Button } from '../ui/Button'

interface HeroProps {
  onCTAClick: () => void
}

export function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-white pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-gray-900">
          Gere seu business case,{' '}
          <span className="text-brand">simples como uma conversa.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Transforme suas ideias em documentos profissionais através de uma
          conversa natural com IA.
        </p>

        <div className="pt-4">
          <Button onClick={onCTAClick} size="xl" className="shadow-lg hover:shadow-xl">
            Gere Agora
          </Button>
        </div>
      </div>
    </section>
  )
}
