// GET /api/activity — live usage per app from the ping store:
// { generatedAt, apps: { slug: { dau, wau, mau, opens7, versions } } }
// Cached at the edge for 5 minutes.
const { connected, appSlugs, pipeline, cors, day } = require('./_kv');

module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!connected()) return res.status(503).json({ error: 'storage not connected' });

  const slugs = [...appSlugs()];
  const days = [...Array(30)].map((_, i) => day(i));
  const month = days[0].slice(0, 7);
  const per = 11; // 3 PFCOUNTs, 7 daily open counts, 1 version hash
  const cmds = slugs.flatMap((s) => [
    ['PFCOUNT', `u:${days[0]}:${s}`],
    ['PFCOUNT', ...days.slice(0, 7).map((d) => `u:${d}:${s}`)],
    ['PFCOUNT', ...days.map((d) => `u:${d}:${s}`)],
    ...days.slice(0, 7).map((d) => ['HGET', `e:${d}:${s}`, 'open']),
    ['HGETALL', `v:${month}:${s}`],
  ]);
  let out;
  try {
    out = await pipeline(cmds);
  } catch (e) {
    return res.status(502).json({ error: 'storage error' });
  }
  const pairs = (arr) => { const o = {}; for (let i = 0; i < (arr || []).length; i += 2) o[arr[i]] = Number(arr[i + 1]); return o; };
  const apps = {};
  slugs.forEach((s, i) => {
    const r = out.slice(i * per, i * per + per).map((x) => x.result);
    if (!r[2]) return; // no pings in 30 days
    const opens7 = r.slice(3, 10).reduce((n, v) => n + Number(v || 0), 0);
    apps[s] = { dau: r[0], wau: r[1], mau: r[2], opens7, versions: pairs(r[10]) };
  });
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  return res.status(200).json({ generatedAt: new Date().toISOString(), apps });
};
