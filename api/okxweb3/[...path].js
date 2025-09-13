import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // req.url 可能是 /api/okxweb3/api/v5/dex/aggregator/quote?amount=100
    const prefix = '/api/okxweb3';
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // 去掉前缀，保留动态路径和 query
    const path = url.pathname.startsWith(prefix) ? url.pathname.slice(prefix.length) : url.pathname;

    const targetUrl = `https://web3.okx.com${path}${url.search}`;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? req.body : undefined,
    });

    const text = await response.text();
    res.status(response.status).set(Object.fromEntries(response.headers.entries())).send(text);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
