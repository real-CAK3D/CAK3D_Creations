// Shared helpers for the Observatory API: Upstash Redis over REST, the catalog's
// app slugs (for validation) and CORS. Files starting with "_" are not routes.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

let slugs;
function appSlugs() {
  if (!slugs) {
    const sandbox = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(process.cwd(), 'catalog.js'), 'utf8'), sandbox);
    slugs = new Set(sandbox.window.CAK3D.PROJECTS.map((p) => p.slug));
  }
  return slugs;
}

async function pipeline(cmds) {
  const res = await fetch(`${KV_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    body: JSON.stringify(cmds),
  });
  if (!res.ok) throw new Error(`kv ${res.status}`);
  return res.json();
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const day = (offset = 0) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);

module.exports = { connected: () => !!(KV_URL && KV_TOKEN), appSlugs, pipeline, cors, day };
