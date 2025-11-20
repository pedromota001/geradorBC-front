// N8N Configuration
const isDevelopment = process.env.NODE_ENV === 'development'

const N8N_BASE_URL = isDevelopment
  ? 'http://localhost:5678'
  : 'https://businesscase-n8n-redis-production.up.railway.app'

export const n8nConfig = {
  baseUrl: N8N_BASE_URL,
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
