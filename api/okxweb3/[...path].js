import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // 构建目标 URL
    const targetUrl = "https://web3.okx.com" + req.url.replace("/api/proxy", "");

    // 转发请求
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? await req.text() : undefined,
    });

    const text = await response.text();

    // 返回结果
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

