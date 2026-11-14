# Observatory

`observatory.html` ranks every build in `catalog.js` by how much it's actually used.
A daily GitHub Action (`.github/workflows/observatory.yml`) runs
`scripts/observatory.mjs`, which writes `data/observatory.json`: a current snapshot
plus a daily history per app. Each data source switches on when its secret exists.

| Source | What it adds | Needs |
|---|---|---|
| GitHub releases | Downloads per release, stars, last push | Nothing (works now) |
| Repo traffic | Repo views and clones per day | `OBS_GH_TOKEN` secret |
| Web analytics | Visits to the Vercel-hosted apps | Web Analytics on + `VERCEL_TOKEN` |
| Live app pings | Daily/weekly/monthly active users, versions in use | Upstash Redis on Vercel |

New apps need no changes here: add them to `catalog.js` and they're tracked.

## Turning sources on

**Repo traffic.** GitHub only shows repo views to accounts with admin access, so the
default Actions token can't read them. Create a fine-grained token at
GitHub → Settings → Developer settings → Fine-grained tokens: resource owner
`real-CAK3D`, all repositories, **Administration: Read-only** (nothing else).
Add it to this repo as the Actions secret `OBS_GH_TOKEN`.

**Web analytics.** In Vercel, open each web project (shelfandstock, home-inventory,
hu-motian, nostalgiavue, cak3d-truck) → Analytics → Enable. Then create a token
at Vercel → Account Settings → Tokens and add it as the secret `VERCEL_TOKEN`,
plus `VERCEL_TEAM_ID` = `team_h7Xl4dYyZwWCJ4Xf8iP7hRu8`.

**Live app pings.** In the `cak3d_creations` Vercel project → Storage → Create →
Upstash for Redis (free tier). Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN`
to the project automatically, which switches `/api/ping` and `/api/activity` on.
Copy the same two values into this repo's Actions secrets so the daily snapshot
records them too.

Until storage is connected, `/api/ping` answers `503` and apps just ignore it.

## Adding the ping to an app

Each ping is one anonymous "opened" event: the app's catalog slug (shown on its
app page URL, e.g. `app.html?id=shelf-stock`), the platform, the version and a
random install ID. No IPs, accounts or locations are stored; the install ID only
feeds an approximate unique-user counter.

**Web apps.** One line in `index.html`:

```html
<script src="https://cak3dcreations.vercel.app/ping.js" data-app="shelf-stock" data-version="1.4.0" defer></script>
```

For a web app wrapped as an Android APK, add `data-platform="android"`.
Custom events: `window.cak3dPing('recipe_made')`.

**Android (Kotlin).** Call once from `onCreate` of the launcher activity:

```kotlin
object Observatory {
    fun ping(context: Context, app: String, event: String = "open") {
        val prefs = context.getSharedPreferences("observatory", Context.MODE_PRIVATE)
        val id = prefs.getString("iid", null) ?: java.util.UUID.randomUUID().toString().also {
            prefs.edit().putString("iid", it).apply()
        }
        val body = """{"app":"$app","platform":"android","version":"${BuildConfig.VERSION_NAME}","id":"$id","event":"$event"}"""
        Thread {
            runCatching {
                val c = java.net.URL("https://cak3dcreations.vercel.app/api/ping").openConnection() as java.net.HttpURLConnection
                c.requestMethod = "POST"; c.doOutput = true
                c.setRequestProperty("Content-Type", "application/json")
                c.connectTimeout = 5000; c.readTimeout = 5000
                c.outputStream.use { it.write(body.toByteArray()) }
                c.responseCode; c.disconnect()
            }
        }.start()
    }
}
// Observatory.ping(this, "flying-flocks")
```

Needs `<uses-permission android:name="android.permission.INTERNET" />`.

**ESP32 (Arduino).** After Wi-Fi connects, once per boot:

```cpp
#include <WiFiClientSecure.h>
#include <HTTPClient.h>

void observatoryPing(const char* app, const char* version) {
  WiFiClientSecure client;
  client.setInsecure();  // tiny anonymous ping; no secrets in it
  HTTPClient http;
  if (!http.begin(client, "https://cak3dcreations.vercel.app/api/ping")) return;
  http.addHeader("Content-Type", "application/json");
  char id[17];
  snprintf(id, sizeof id, "%016llx", ESP.getEfuseMac());  // stable per board
  String body = String("{\"app\":\"") + app + "\",\"platform\":\"esp32\",\"version\":\"" + version + "\",\"id\":\"" + id + "\"}";
  http.POST(body);
  http.end();
}
// observatoryPing("flocked-up", "0.13");
```

Raspberry Pi and Windows builds can POST the same JSON with `"platform":"pi"` or `"windows"`.

## API

- `POST /api/ping`: `{app, platform, version, id, event?}` → `204`.
  Rejects unknown apps or platforms, and IDs shorter than 8 characters.
- `GET /api/activity`: `{apps: {slug: {dau, wau, mau, opens7, versions}}}`, cached for 5 minutes.
