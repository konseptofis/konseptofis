import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(file) {
  const path = resolve(file);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const ORIGIN = (process.env.INDEXNOW_ORIGIN || "https://konseptofis.com").replace(/\/$/, "");
const secret = process.env.INDEXNOW_SECRET;

if (!secret) {
  console.error("INDEXNOW_SECRET tanımlı değil (.env.local veya ortam değişkeni).");
  process.exit(1);
}

const urlList = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      `${ORIGIN}/`,
      `${ORIGIN}/hizmetlerimiz/cankaya-sanal-ofis`,
      `${ORIGIN}/fiyatlar`,
      `${ORIGIN}/sik-sorulan-sorular`,
      `${ORIGIN}/iletisim`,
    ];

const res = await fetch(`${ORIGIN}/api/indexnow`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "x-indexnow-secret": secret,
  },
  body: JSON.stringify({ urlList }),
});

const text = await res.text();
console.log(res.status, text || "(empty)");
if (!res.ok) process.exit(1);
