# Vercel KeepAlive Service
此專案為一個簡單的 Vercel Serverless Function 範例，用於定時自我呼叫以保持服務存活（Keep Alive）。

---

## 功能說明
- 定時透過 Vercel Cron 功能呼叫 `/api/ping` API。
- `/api/ping` 會向指定的目標 URL 發出 GET 請求，達到定時「ping」的效果。
- 支援環境變數 `TARGET_URL`，指定要 ping 的目標網址。
- 當 `TARGET_URL` 未設定或為空字串時，API 會安全跳過不執行請求。
- 避免自我呼叫造成無限迴圈，使用 `x-self-call` header 進行判斷。

---

## 專案結構
vercel-keepalive/
│
├── api/
│ └── ping.js # Serverless API 路由，執行 ping 邏輯
│
├── package.json # 專案依賴與設定
├── vercel.json # Vercel 平台部署設定與排程設定
└── README.md # 專案說明文件

---

## 環境變數設定
請在 Vercel 專案後台設定以下環境變數：
| 變數名稱     | 說明                      | 範例                                   |
| ------------ | ------------------------- | ------------------------------------ |
| TARGET_URL   | 需要定時 ping 的目標網址  | https://your-render-service-url/about |

---

## 部署與使用說明
1. 將本專案推送到 GitHub 或其他 Git 版本控制系統。
2. 在 Vercel 建立新專案，連接到此 Git 儲存庫。
3. 在 Vercel 後台設定環境變數 `TARGET_URL`。
4. 部署完成後，Vercel 將根據 `vercel.json` 中的 cron 設定定時執行 `/api/ping`。
5. 若 `TARGET_URL` 未設定，API 會跳過執行但仍回應 200。

---

## 本地開發
- 本地可使用 `vercel dev` 來模擬 Vercel Serverless Functions。
- 若要本地測試，建議在根目錄建立 `.env` 檔，內容如下：
TARGET_URL=https://your-render-service-url/about
- 請確保 `.env` 加入 `.gitignore`，避免敏感資訊外洩。

---

## 注意事項
- Vercel 免費方案不支援內建 Cron 排程，需搭配外部定時服務（如 UptimeRobot、cron-job.org 等）呼叫 `/api/ping`。
- Vercel Pro 以上方案可直接使用 `vercel.json` 內建的 `crons` 排程功能。

---

## 相關連結
- [Vercel Cron 功能說明](https://vercel.com/docs/concepts/functions/scheduling-cron-jobs)
- [Node Fetch 官方文件](https://www.npmjs.com/package/node-fetch)

---

## 聯絡
如有問題，歡迎提出 Issue 或聯絡維護者。
