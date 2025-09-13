// api/okxweb3/[...slug].js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // 捕获路径
    const slug = req.query.slug || [];          // [...slug] 捕获路径数组
    const path = '/' + slug.join('/');          // /iujk 或 /api/v5/...
    
    // 原始 query 参数
    const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
    
    // 构建目标 URL
    const targetUrl = queryString
      ? `https://web3.okx.com${path}?${queryString}`
      : `https://web3.okx.com${path}`;

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
