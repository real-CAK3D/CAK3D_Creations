// POST /api/ping — one anonymous "app opened" (or named event) ping.
// Body (JSON, or text/plain JSON from navigator.sendBeacon):
//   { app: "<catalog slug>", platform: "web|android|windows|pi|esp32",
//     version: "1.2.3", id: "<random install id>", event?: "open" }
// Stores no IPs or user agents: the install id only goes into a HyperLogLog
// (an approximate unique counter), so it can't be read back out.
const { connected, appSlugs, pipeline, cors, day } = require('./_kv');

const PLATFORMS = new Set(['web', 'android', 'windows', 'mac', 'linux', 'pi', 'esp32']);
const TTL = 100 * 86400; // keep daily keys ~100 days
const clean = (v, re, max) => (typeof v === 'string' && v.length <= max && re.test(v) ? v : null);

module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!connected()) return res.status(503).json({ error: 'storage not connected' });

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = null; } }
  if (!b || typeof b !== 'object') return res.status(400).json({ error: 'bad body' });

  const app = clean(b.app, /^[a-z0-9-]+$/, 40);
  const platform = PLATFORMS.has(b.platform) ? b.platform : null;
  const id = clean(b.id, /^[A-Za-z0-9_-]+$/, 64);
  const version = clean(b.version || 'unknown', /^[\w.+-]+$/, 24) || 'unknown';
  const event = clean(b.event || 'open', /^[a-z0-9_]+$/, 24);
  if (!app || !appSlugs().has(app) || !platform || !id || id.length < 8 || !event) {
    return res.status(400).json({ error: 'invalid ping' });
  }

  const d = day(), month = d.slice(0, 7);
  const k = (p) => `${p}:${d}:${app}`;
  const cmds = [
    ['PFADD', k('u'), id], ['EXPIRE', k('u'), TTL],
    ['HINCRBY', k('e'), event, 1], ['EXPIRE', k('e'), TTL],
    ['HINCRBY', k('p'), platform, 1], ['EXPIRE', k('p'), TTL],
    ['HINCRBY', `v:${month}:${app}`, version, 1], ['EXPIRE', `v:${month}:${app}`, 400 * 86400],
  ];
  try {
    await pipeline(cmds);
  } catch (e) {
    return res.status(502).json({ error: 'storage error' });
  }
  return res.status(204).end();
};
