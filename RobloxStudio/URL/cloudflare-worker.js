// Proxy da API do Roblox que libera frame e CORS para exibir o JSON
export default {
  async fetch(request, env, ctx) {
    const incoming = new URL(request.url);
    const base = "https://games.roblox.com/v1/games/142823291/servers/Public";
    // Se não vier query, usa a padrão do seu exemplo
    const upstream = base + (incoming.search || "?sortOrder=Asc&limit=25");

    const resp = await fetch(upstream, {
      headers: { accept: "application/json" },
      cf: { cacheTtl: 30, cacheEverything: true },
    });

    // Copia os headers e ajusta para permitir exibição
    const headers = new Headers(resp.headers);
    headers.set("content-type", "application/json; charset=utf-8");
    headers.set("access-control-allow-origin", "*");
    // Remove bloqueio de frame (se houver) e permite ser iframado
    headers.delete("x-frame-options");
    headers.set("content-security-policy", "frame-ancestors *");

    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers,
    });
  },
};
