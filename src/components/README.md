# Diretório `components/`

Este diretório contém todos os componentes React reutilizáveis do projeto.

## Propósito

- Componentes UI do shadcn/ui (quando instalados)
- Componentes customizados da aplicação
- Layouts compartilhados
- Elementos de formulário
- Componentes de apresentação

## Estrutura sugerida (futura)

```
components/
  ui/                # Componentes shadcn/ui
    button.tsx
    input.tsx
    card.tsx
    ...
  forms/             # Componentes de formulário customizados
  layout/            # Componentes de layout (Header, Footer, etc)
  shared/            # Componentes compartilhados específicos do projeto
```

## Convenções

- Use PascalCase para nomes de componentes
- Cada componente complexo pode ter sua própria pasta com arquivos relacionados
- Prefira componentes funcionais com TypeScript
