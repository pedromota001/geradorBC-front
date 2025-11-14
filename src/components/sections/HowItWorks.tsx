export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
            Como funciona?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Agora você pode gerar seu business case de forma prática e
            eficiente.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <div className="flex-1">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Basta fornecer as informações por meio do nosso{' '}
                <span className="font-semibold text-brand">ChatBot</span>, e nós
                nos encarregamos de criar seu business case automaticamente.
                Todos os documentos gerados ficarão disponíveis para consulta em
                sua dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-3 pt-8">
          <span className="text-sm md:text-base text-gray-500">Powered by</span>
          <img
            src="/assets/avanade.svg"
            alt="Avanade"
            className="h-7 md:h-9"
          />
        </div>
      </div>
    </section>
  )
}
