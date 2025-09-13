import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // 去掉 /api/okxweb3 前缀
    res.status(200).json({ url: req.url });
    const prefix = '/api/okxweb3';
    let path = req.url || '/';
    if (path.startsWith(prefix)) {
      path = path.slice(prefix.length) || '/';
    }

    // 构建目标 URL
    const targetUrl = `https://web3.okx.com${path}`;

    // 转发请求
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
