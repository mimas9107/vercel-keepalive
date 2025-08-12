import fetch from 'node-fetch';

export default async function handler(req, res) {
  // 從環境變數讀取目標 URL，去除首尾空白
  const TARGET_URL = (process.env.TARGET_URL || "").trim();

  // 若未設定或為空，安全跳過不執行
  if (!TARGET_URL) {
    console.warn("[KeepAlive] TARGET_URL is not configured — skipping action.");
    return res.status(200).json({
      ok: true,
      skipped: true,
      reason: "TARGET_URL not configured or empty"
    });
  }

  // 避免自我呼叫造成無窮迴圈
  if (req.headers['x-self-call']) {
    console.log("[KeepAlive] Received self-call, exiting early.");
    return res.status(200).send("self-call acknowledged");
  }

  try {
    // 送出 GET 請求到目標 URL，並加自訂 header 標記這是自我呼叫
    const response = await fetch(TARGET_URL, {
      method: "GET",
      headers: {
        'x-self-call': '1'
      }
    });

    // 嘗試讀取回應文字（最多讀 200 字）
    const text = await response.text().catch(() => "");

    console.log(`[KeepAlive] pinged ${TARGET_URL} => ${response.status}`);

    return res.status(200).json({
      ok: true,
      skipped: false,
      status: response.status,
      preview: text.slice(0, 200)
    });
  } catch (err) {
    console.error("[KeepAlive] Error while fetching TARGET_URL:", err);
    return res.status(500).json({
      ok: false,
      skipped: false,
      error: String(err)
    });
  }
}
