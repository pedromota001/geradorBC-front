// N8N Configuration
export const n8nConfig = {
  baseUrl: process.env.NEXT_PUBLIC_N8N_BASE_URL || 'http://localhost:5678',
  webhooks: {
    login: '/webhook/login',
    coletaResposta: '/webhook-test/coleta-resposta',
    coletaRespostaError: '/webhook/coleta-respostaERROR',
    gerarDocumentos: '/webhook/gerar-documentos',
  },
}

export const getN8nUrl = (endpoint: keyof typeof n8nConfig.webhooks): string => {
  return `${n8nConfig.baseUrl}${n8nConfig.webhooks[endpoint]}`
}
