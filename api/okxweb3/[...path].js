import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // 1. 获取访问路径和 query
    const slug = req.query.slug || [];  // [...slug] 捕获路径
    const path = '/' + slug.join('/');  // 拼成 /iujk 或 /api/v5/...
    const query = req.url.includes('?') ? req.url.split('?')[1] : '';
    const targetUrl = query
      ? `https://web3.okx.com${path}?${query}`
      : `https://web3.okx.com${path}`;

    // 2. 发起请求
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? req.body : undefined,
    });

    // 3. 返回结果
    const text = await response.text();
    res.status(response.status).set(Object.fromEntries(response.headers.entries())).send(text);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
