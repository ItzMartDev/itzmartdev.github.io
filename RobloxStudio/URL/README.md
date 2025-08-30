# Roblox API Viewer

Uma página estática que busca e exibe dados da API do Roblox com formatação idêntica ao navegador.

## Funcionalidades

- ✅ Busca dados da API: `https://games.roblox.com/v1/games/142823291/servers/Public?sortOrder=Asc&limit=25`
- ✅ Exibe JSON com formatação idêntica ao navegador (syntax highlighting)
- ✅ Usa apenas JavaScript client-side
- ✅ Sistema de fallback com múltiplos proxies CORS públicos
- ✅ Funciona no GitHub Pages sem configuração adicional
- ✅ Tratamento de erros robusto
- ✅ Sem dependências externas

## Como Usar

### Acesso Direto
Acesse: https://itzmartdev.github.io/RobloxStudio/URL/

### Modo Desenvolvimento
Para testar localmente:
```bash
python3 -m http.server 8000
# Acesse: http://localhost:8000/RobloxStudio/URL/
```

### Forçar Modo Produção
Para testar proxies CORS localmente:
```
http://localhost:8000/RobloxStudio/URL/?production=true
```

## Tecnologias

- **HTML5** - Estrutura básica
- **CSS3** - Formatação visual similar ao navegador
- **JavaScript Vanilla** - Lógica de fetch e rendering
- **Múltiplos Proxies CORS** - Fallback automático

## Proxies CORS Utilizados

1. `api.allorigins.win` - Proxy principal
2. `thingproxy.freeboard.io` - Fallback 1
3. `corsproxy.io` - Fallback 2  
4. `api.codetabs.com` - Fallback 3
5. `cors-anywhere.herokuapp.com` - Fallback 4

## Características Visuais

- Monospace font (Consolas/Monaco)
- Syntax highlighting:
  - Chaves JSON: Roxo (`#881391`)
  - Strings: Azul (`#1a1aa6`) 
  - Números: Azul (`#1c00cf`)
  - Booleans: Azul escuro (`#0d47a1`)
  - Null: Cinza (`#808080`)
- Indentação adequada
- Bordas e padding similar ao navegador

## Arquivos

- `index.html` - Implementação principal (JavaScript client-side)
- `cloudflare-worker.js` - Implementação alternativa (referência)
- `README.md` - Esta documentação