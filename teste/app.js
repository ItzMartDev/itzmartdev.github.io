/*
  Torrent Web Lite – cliente WebTorrent 100% estático
  Hospedável no GitHub Pages.
  Aviso: funciona apenas com peers via WebRTC (web seeds). Trackers UDP não funcionam no browser.
*/

/* Utilidades */
const $ = (sel, el=document) => el.querySelector(sel)
const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel))
const fmtBytes = (b) => {
  if (!isFinite(b) || b <= 0) return '0 B'
  const u = ['B','KB','MB','GB','TB']
  const i = Math.floor(Math.log(b)/Math.log(1024))
  return `${(b/Math.pow(1024,i)).toFixed(i?1:0)} ${u[i]}`
}
const fmtPct = (n) => `${(n*100).toFixed(1)}%`
const isPlayable = (name) => /\.(mp4|webm|ogv|ogg|mp3|m4a|wav)$/i.test(name)

/* Estado */
let client
let torrents = []
let currentFile = null

// Verificar se WebTorrent está disponível
if (typeof WebTorrent === 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    toast('Erro: WebTorrent não carregou. Verifique sua conexão com a internet.', 'error')
  })
}

/* DOM refs */
const magnetInput = $('#magnetInput')
const addMagnetBtn = $('#addMagnetBtn')
const torrentFileInput = $('#torrentFileInput')
const dropArea = $('#dropArea')
const torrentsEl = $('#torrents')
const player = $('#player')
const playerSection = $('#playerSection')
const stopPlayerBtn = $('#stopPlayer')
const downloadCurrent = $('#downloadCurrent')
const toggleHelp = $('#toggleHelp')
const help = $('#help')

const dlSpeedEl = $('#dlSpeed')
const upSpeedEl = $('#upSpeed')
const peersEl = $('#peers')
const tcountEl = $('#tcount')

/* Trackers públicos compatíveis com WebRTC */
const DEFAULT_ANNOUNCE = [
  'wss://tracker.openwebtorrent.com',
  'wss://tracker.btorrent.xyz',
  'wss://tracker.webtorrent.dev',
  'wss://tracker.files.fm:7073/announce',
  'wss://tracker.openbittorrent.com',
  'wss://tracker.sloppyta.co:443/announce',
  'wss://tracker.novage.com.ua:443/announce',
  'wss://tracker.torrent.eu.org:451/announce',
  'wss://tracker2.dler.org:443/announce',
  'wss://tracker.0x.tf:443/announce',
  'wss://tracker1.bt.moack.co.kr:443/announce',
  'wss://tracker.monitoracitor.org:443/announce',
  'wss://tracker.renfei.net:443/announce',
  'wss://tracker.tamersunion.org:443/announce',
  'wss://tracker.lelux.fi:443/announce',
  'wss://tracker.opentrackr.org:1337/announce',
  'wss://tracker.pomf.se:443/announce',
  'wss://tracker.srv00.com:443/announce',
  'wss://tracker.theoks.net:443/announce',
  'wss://tracker.tryhackx.org:443/announce',
  'wss://tracker.xerebrov.net:443/announce',
  'wss://tracker.zemoj.com:443/announce'
]

function ensureClient() {
  if (client) return client
  client = new WebTorrent({
    tracker: { announce: DEFAULT_ANNOUNCE }
  })
  client.on('error', (err) => {
    console.error('Client error:', err)
    toast('Erro no cliente WebTorrent: ' + (err?.message || err), 'error')
  })
  client.on('warning', (err) => {
    console.warn('Client warning:', err)
    if (err.message.includes('tracker')) {
      toast('Aviso: Alguns trackers podem estar offline', 'warning')
    }
  })
  setInterval(updateGlobalStats, 800)

  // Esconder loading state quando pronto
  setTimeout(() => {
    const loadingState = document.querySelector('.loading-state')
    if (loadingState) loadingState.style.display = 'none'
    const emptyState = document.querySelector('.empty-state')
    if (emptyState && torrents.length === 0) emptyState.style.display = 'block'
  }, 2000)

  return client
}

function updateGlobalStats() {
  if (!client) return
  dlSpeedEl.textContent = fmtBytes(client.downloadSpeed) + '/s'
  upSpeedEl.textContent = fmtBytes(client.uploadSpeed) + '/s'
  peersEl.textContent = client.torrents.reduce((s,t)=> s + (t.numPeers||0), 0)
  tcountEl.textContent = client.torrents.length
}

function addTorrent(input, opts={}) {
  ensureClient()

  console.log('Adicionando torrent:', input)

  const addOpts = {
    announce: DEFAULT_ANNOUNCE,
    ...opts,
  }

  return new Promise((resolve, reject) => {
    try {
      const torrent = client.add(input, addOpts, (t) => {
        torrents.push(t)
        renderTorrent(t)
        resolve(t)
      })

      torrent.on('error', (err) => {
        console.error('Torrent error:', err)
        toast('Erro no torrent: ' + (err?.message || err), 'error')
        reject(err)
      })

      torrent.on('download', () => updateTorrentRow(torrent))
      torrent.on('upload', () => updateTorrentRow(torrent))
      torrent.on('wire', () => updateTorrentRow(torrent))
      torrent.on('done', () => updateTorrentRow(torrent))

      // Adicionar loading state
      torrent.on('metadata', () => {
        toast('Metadados carregados para ' + (torrent.name || torrent.infoHash.slice(0,8)))
        updateTorrentRow(torrent)
      })

      torrent.on('ready', () => {
        toast('Torrent pronto: ' + torrent.files.length + ' arquivos')
        updateTorrentRow(torrent)
      })

      torrent.on('noPeers', () => {
        toast('Nenhum peer encontrado. Verifique se o torrent tem suporte WebRTC ou tente outro torrent.', 'warning')
        updateTorrentRow(torrent)
      })

      // Timeout para trackers
      setTimeout(() => {
        if (torrent.numPeers === 0) {
          toast('Conexão lenta. Alguns trackers podem estar offline. Tente novamente em alguns minutos.', 'warning')
          updateTorrentRow(torrent)
        }
      }, 10000)

    } catch (e) {
      reject(e)
    }
  })
}

function renderTorrent(t) {
  const card = document.createElement('div')
  card.className = 'torrent-card'
  card.id = `t-${t.infoHash}`
  card.innerHTML = `
    <div class="torrent-title">${escapeHtml(t.name || t.infoHash)}</div>
    <div class="torrent-meta">
      <span class="tag">${t.infoHash.slice(0,8)}</span>
      <span class="tag">Peers: <span data-peers>0</span></span>
      <span class="tag">Baixado: <span data-down>0 B</span></span>
      <span class="tag">Enviado: <span data-up>0 B</span></span>
      <span class="tag status" data-status>Conectando...</span>
    </div>
    <div class="progress"><span data-progress></span></div>
    <div class="file-list" data-files></div>
    <div class="row-actions" style="display:flex; gap:8px; margin-top:8px;">
      <button data-pause>⏸️ Pausar</button>
      <button data-resume class="secondary">▶️ Retomar</button>
      <button data-remove class="secondary">🗑️ Remover</button>
      <a data-magnet class="secondary" href="#">🔗 Magnet</a>
    </div>
  `
  torrentsEl.prepend(card)

  // Esconder mensagem vazia
  const emptyState = torrentsEl.querySelector('.empty-state')
  if (emptyState) emptyState.style.display = 'none'

  // Arquivos
  const filesEl = $('[data-files]', card)
  t.files.sort((a,b)=> a.path.localeCompare(b.path))
  t.files.forEach((file) => {
    const row = document.createElement('div')
    row.className = 'file-row'
    row.innerHTML = `
      <div class="file-name">${escapeHtml(file.path)}</div>
      <button data-stream ${isPlayable(file.name)?'':'disabled'}>🎬 Stream</button>
      <a data-dl class="secondary" href="#" download>💾 Baixar</a>
    `
    filesEl.appendChild(row)

    const btnStream = $('[data-stream]', row)
    const aDl = $('[data-dl]', row)
    btnStream?.addEventListener('click', () => streamFile(t, file))
    aDl.addEventListener('click', async (e) => {
      e.preventDefault()
      const blob = await file.blob()
      const url = URL.createObjectURL(blob)
      aDl.href = url
      aDl.download = file.name
      aDl.click()
      setTimeout(()=> URL.revokeObjectURL(url), 20_000)
    })
  })

  // Ações
  $('[data-pause]', card).addEventListener('click', () => t.pause())
  $('[data-resume]', card).addEventListener('click', () => t.resume())
  $('[data-remove]', card).addEventListener('click', () => removeTorrent(t))
  $('[data-magnet]', card).addEventListener('click', (e)=>{
    e.preventDefault()
    const link = t.magnetURI
    navigator.clipboard?.writeText(link)
    toast('Magnet copiado para a área de transferência')
  })

  updateTorrentRow(t)
}

function updateTorrentRow(t) {
  const card = document.getElementById(`t-${t.infoHash}`)
  if (!card) return
  const peers = $('[data-peers]', card)
  const down = $('[data-down]', card)
  const up = $('[data-up]', card)
  const prog = $('[data-progress]', card)
  const status = $('[data-status]', card)

  peers.textContent = t.numPeers || 0
  down.textContent = fmtBytes(t.downloaded)
  up.textContent = fmtBytes(t.uploaded)
  prog.style.width = fmtPct(t.progress || 0)

  // Atualizar status
  let statusText = 'Conectando...'
  if (t.progress === 1) statusText = 'Completo ✓'
  else if (t.downloadSpeed > 0) statusText = 'Baixando...'
  else if (t.numPeers > 0) statusText = `Conectado (${t.numPeers} peers)`
  else if (t.ready) statusText = 'Pronto'
  else if (torrent && torrent.numPeers === 0 && Date.now() - (torrent.created || 0) > 5000) statusText = 'Procurando peers...'
  status.textContent = statusText
}

async function streamFile(t, file) {
  try {
    // Limpar player anterior
    player.pause()
    player.removeAttribute('src')
    player.load()

    currentFile = file
    playerSection.classList.remove('hidden')
    downloadCurrent.href = '#'
    downloadCurrent.setAttribute('download', file.name)

    toast('Carregando stream...', 'info')

    if (isPlayable(file.name)) {
      await new Promise((resolve, reject) => {
        file.renderTo(player, { autoplay: false }, (err) => {
          if (err) {
            // Ignorar erros de play interrompido ou load
            if (err.name === 'AbortError' || err.message.includes('interrupted') || err.message.includes('load request')) {
              resolve()
            } else {
              reject(err)
            }
          } else {
            resolve()
          }
        })
      })

      // Tentar play manualmente após render
      try {
        await player.play()
        toast('Stream iniciado!', 'success')
      } catch (playErr) {
        if (playErr.name !== 'AbortError') {
          console.warn('Play failed:', playErr)
          toast('Clique em play para iniciar o vídeo', 'info')
        }
      }
    } else {
      const blob = await file.blob()
      const url = URL.createObjectURL(blob)
      player.src = url
      toast('Arquivo carregado para reprodução!', 'success')
    }

    const blob = await file.blob()
    const url = URL.createObjectURL(blob)
    downloadCurrent.href = url
  } catch (e) {
    console.error('Erro no stream:', e)
    if (e.name !== 'AbortError' && !e.message.includes('interrupted') && !e.message.includes('load request')) {
      toast('Não foi possível reproduzir este arquivo: ' + (e?.message || e), 'error')
    }
  }
}

function stopPlayer() {
  player.pause()
  player.removeAttribute('src')
  player.load()
  playerSection.classList.add('hidden')
  if (downloadCurrent.href.startsWith('blob:')) URL.revokeObjectURL(downloadCurrent.href)
}

function removeTorrent(t) {
  const id = `t-${t.infoHash}`
  const el = document.getElementById(id)
  el?.remove()
  t.destroy({ destroyStore: true })
  torrents = torrents.filter(x => x.infoHash !== t.infoHash)
  updateGlobalStats()

  // Mostrar mensagem vazia se não houver torrents
  if (torrents.length === 0) {
    const emptyState = torrentsEl.querySelector('.empty-state')
    if (emptyState) emptyState.style.display = 'block'
  }
}

function toast(msg, type='info') {
  const n = document.createElement('div')
  n.className = `toast ${type}`
  n.textContent = msg
  document.body.appendChild(n)
  setTimeout(()=> n.remove(), 4000)
}

function escapeHtml(s='') {
  return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))
}

/* Eventos UI */
addMagnetBtn.addEventListener('click', async () => {
  const magnet = magnetInput.value.trim()
  if (!magnet) return toast('Informe um magnet link', 'error')
  addMagnetBtn.disabled = true
  addMagnetBtn.innerHTML = '<span class="spinner"></span> Adicionando...'
  try {
    await addTorrent(magnet)
    magnetInput.value = ''
    toast('Torrent adicionado com sucesso!', 'success')
  } catch (e) {
    toast('Erro ao adicionar magnet: ' + (e?.message || e), 'error')
  } finally {
    addMagnetBtn.disabled = false
    addMagnetBtn.innerHTML = 'Adicionar'
  }
})

magnetInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addMagnetBtn.click()
})

torrentFileInput.addEventListener('change', async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const label = $('.file-btn span')
  label.innerHTML = '<span class="spinner"></span> Carregando...'
  try {
    await addTorrent(file)
    toast('Arquivo .torrent adicionado!', 'success')
  } catch (e) {
    toast('Erro ao adicionar .torrent: ' + (e?.message || e), 'error')
  } finally {
    label.innerHTML = 'Escolher .torrent'
    torrentFileInput.value = ''
  }
})

;['dragenter','dragover'].forEach(evt => dropArea.addEventListener(evt, (e)=>{
  e.preventDefault(); e.stopPropagation(); dropArea.classList.add('dragover')
}))
;['dragleave','drop'].forEach(evt => dropArea.addEventListener(evt, (e)=>{
  e.preventDefault(); e.stopPropagation(); dropArea.classList.remove('dragover')
}))

dropArea.addEventListener('drop', async (e) => {
  const file = e.dataTransfer?.files?.[0]
  if (file && file.name.endsWith('.torrent')) {
    try { await addTorrent(file) } catch {}
  }
})

stopPlayerBtn.addEventListener('click', stopPlayer)

toggleHelp.addEventListener('click', (e)=>{
  e.preventDefault()
  help.classList.toggle('hidden')
})

/* Demos opcionais: clique para carregar exemplos conhecidos de WebTorrent */
;(function demoMagnetExamples(){
  const examples = [
    // Sintaxe: arquivos com web seeds / sementes web conhecidas
    // Estes podem ficar offline; são apenas exemplos.
    // Você pode acrescentar os seus próprios.
  ]
  if (!examples.length) return
  const wrap = document.createElement('div')
  wrap.style.marginTop = '10px'
  wrap.innerHTML = '<div class="hint">Exemplos rápidos: ' + examples.map((m,i)=>`<a href="#" data-ex${i}>#${i+1}</a>`).join(' ') + '</div>'
  $('.adder').appendChild(wrap)
  examples.forEach((magnet, i)=>{
    wrap.querySelector(`[data-ex${i}]`).addEventListener('click', async (e)=>{
      e.preventDefault()
      try { await addTorrent(magnet) } catch {}
    })
  })
})()
