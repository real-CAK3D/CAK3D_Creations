# Observatory: app usage pings

The Observatory dashboard lives on the main site at
https://real-cak3d.github.io/observatory.html (see `OBSERVATORY.md` in the
`real-CAK3D.github.io` repo). This hub hosts the part that needs a server: the
endpoint apps send their anonymous "opened" pings to, which gives the dashboard
daily, weekly and monthly active users per app.

Only apps listed in `catalog.js` are accepted, so a new build can send pings as
soon as it's added there.

## Turning it on

In the `cak3d_creations` Vercel project → Storage → Create → Upstash for Redis
(free tier). Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` to the project
automatically, which switches `/api/ping` and `/api/activity` on; redeploy once.
Nothing else needs the credentials: the main site reads the public `/api/activity`.

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
