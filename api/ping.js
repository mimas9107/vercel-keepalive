import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = process.env.TARGET_URL || 'https://YOUR_PROJECT_NAME.vercel.app/api/ping';
  
  // 避免遞迴連鎖觸發
  if (req.headers['x-self-call']) {
    return res.status(200).send('Self-ping received');
  }

  try {
    // 自我請求，並在 request header 標記避免無限 loop
    await fetch(targetUrl, {
      headers: {
        'x-self-call': '1'
      }
    });
    console.log(`[KeepAlive] Ping sent to ${targetUrl}`);
  } catch (err) {
    console.error('[KeepAlive] Error:', err.message);
  }

  res.status(200).send('OK');
}
