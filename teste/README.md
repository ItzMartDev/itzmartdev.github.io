# Torrent Web Lite

Cliente WebTorrent 100% estático, compatível com GitHub Pages.

Avisos importantes:
- Funciona somente com peers via WebRTC (WebTorrent). Nem todos os torrents tradicionais terão peers WebRTC.
- Seu IP fica visível para peers (como em todo P2P). Use de forma legal e responsável.
- Projeto educacional. Não incentive ou participe de pirataria.

## Como usar
1. Abra `index.html` localmente ou publique no GitHub Pages.
2. Cole um magnet link (que tenha suporte WebRTC) ou solte um arquivo `.torrent`.
3. Clique em "Stream" para reproduzir mídia suportada (mp4/webm/ogg, mp3/m4a/wav) ou use "Baixar" para salvar o arquivo.

## Deploy no GitHub Pages (versão gratuita)
- Faça commit destes arquivos em um repositório GitHub público.
- Ative o Pages nas configurações do repositório, apontando para a branch principal (raiz).
- Opcional: inclua `CNAME` se tiver domínio próprio.

Dicas:
- Mantenha a pasta na raiz do repositório (ou ajuste a publicação para a pasta correspondente).
- Não é necessário backend; tudo roda no navegador.

## Limitações conhecidas
- Trackers UDP não funcionam no navegador; apenas trackers WebSocket (wss://).
- Alguns torrents podem nunca conectar se não há seeds com WebRTC.
- Navegadores móveis podem suspender downloads em segundo plano.

## Desenvolvimento
- `app.js` contém a lógica principal (UI + WebTorrent).
- `styles.css` cuida do visual com um tema escuro.

## Licença
MIT. Use por sua conta e risco. Conteúdo baixado via torrents deve respeitar direitos autorais.
