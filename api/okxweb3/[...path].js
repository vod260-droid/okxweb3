import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // 去掉 /api/okxweb3 前缀
    
    const prefix = '/api/okxweb3';
    let path = req.url || '/';
    if (path.startsWith(prefix)) {
      path = path.slice(prefix.length) || '/';
    }
   const marker = "...path";
const index = path.indexOf(marker);

let result;
if (index !== -1) {
    path = path.slice(0, index);
    console.log(result);
} else {
    console.log("未找到 ...path");
}

    // 构建目标 URL
    const targetUrl = `https://web3.okx.com${path}`;
res.status(200).json({ url: req.url ,targetUrl});
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
