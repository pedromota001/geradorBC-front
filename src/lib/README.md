# Diretório `lib/`

Este diretório contém utilitários, helpers e funções compartilhadas do projeto.

## Propósito

- Funções utilitárias reutilizáveis
- Helpers de validação (schemas Zod)
- Configurações de bibliotecas externas
- Constantes e tipos compartilhados
- Lógica de negócio que não pertence a componentes específicos

## Estrutura sugerida (futura)

```
lib/
  utils.ts           # Funções utilitárias gerais (já criado)
  validations/       # Schemas Zod para validação
  constants/         # Constantes da aplicação
  types/             # Tipos TypeScript compartilhados
```
