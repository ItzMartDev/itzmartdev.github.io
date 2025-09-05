# 🧪 Teste Rápido - Torrent Web Lite

## Como testar se está funcionando:

1. **Abra o index.html** no seu navegador
2. **Abra o console** (F12 → Console)
3. **Digite:** `runDiagnostics()` e pressione Enter
4. **Verifique a saída** - deve mostrar que WebTorrent está carregado

## Testando com um torrent real:

1. Vá para qualquer site de torrents
2. Copie um magnet link de um arquivo pequeno (vídeo ou música)
3. Cole no campo do site e clique em "Adicionar"
4. Aguarde alguns segundos - deve aparecer peers e começar o download

## Se não funcionar:

- ✅ Erros de WebSocket são normais (trackers offline)
- ✅ "Invalid asm.js" é apenas um aviso inofensivo
- ✅ Tente torrents populares com muitos peers
- ✅ Use Chrome ou Firefox para melhor compatibilidade

## Comandos úteis no console:

```javascript
// Verificar status
runDiagnostics()

// Ver torrents ativos
client ? client.torrents : 'Cliente não inicializado'

// Ver velocidade
client ? {download: client.downloadSpeed, upload: client.uploadSpeed} : 'N/A'
```
