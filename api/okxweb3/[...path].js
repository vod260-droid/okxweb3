import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // 捕获动态路径
    const pathParts = req.query.path || [];
    const dynamicPath = Array.isArray(pathParts) ? pathParts.join('/') : pathParts;

    // 拼接目标 URL
    const targetUrl = `https://web3.okx.com/${dynamicPath}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? req.body : undefined
    });

    const text = await response.text();
    res.status(response.status).set(Object.fromEntries(response.headers.entries())).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
