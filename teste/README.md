# 🌊 Torrent Web Lite

Cliente WebTorrent 100% estático com design moderno, compatível com GitHub Pages.

## ✨ Características

- 🎨 **Design Moderno**: Interface escura com gradientes, animações e responsividade
- 🚀 **Streaming Direto**: Reproduza vídeos e áudios diretamente no navegador
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🔒 **Privado**: 100% local, sem uploads para servidores
- ⚡ **Rápido**: Carregamento otimizado e feedback visual em tempo real
- 🆓 **Gratuito**: Hospedagem gratuita no GitHub Pages

## 🚀 Como usar

1. Abra `index.html` em um navegador moderno (Chrome/Firefox recomendado)
2. Cole um magnet link ou solte um arquivo `.torrent`
3. Aguarde a conexão com peers WebRTC
4. Clique em "🎬 Stream" para reproduzir ou "💾 Baixar" para salvar

## 📊 Status em Tempo Real

- ⬇️ Velocidade de download
- ⬆️ Velocidade de upload
- 👥 Número de peers conectados
- 📊 Progresso de cada torrent
- 🔄 Estados: Conectando, Baixando, Completo, etc.

## ⚠️ Limitações Importantes

- **WebRTC Obrigatório**: Só funciona com torrents que têm peers WebRTC
- **Compatibilidade**: Melhor em Chrome/Firefox
- **Privacidade**: IP visível para peers (como qualquer P2P)
- **Sem UDP**: Trackers UDP não funcionam no navegador

## 🛠️ Desenvolvimento

- `index.html` - Estrutura e layout
- `styles.css` - Design moderno com CSS custom properties
- `app.js` - Lógica WebTorrent e interações
- `favicon.ico` - Ícone do site

## 📦 Deploy no GitHub Pages

1. Faça upload dos arquivos para um repositório público
2. Ative GitHub Pages nas configurações
3. Acesse via `https://username.github.io/repository`

## 🔧 Tecnologias

- **WebTorrent**: Cliente P2P para navegador
- **Vanilla JavaScript**: Sem frameworks externos
- **CSS Grid/Flexbox**: Layout responsivo
- **CSS Custom Properties**: Tema consistente

## 📝 Licença

MIT - Use por sua conta e risco. Conteúdo baixado deve respeitar direitos autorais.

---

**Aviso**: Este projeto é educacional. Não incentive ou participe de pirataria.
