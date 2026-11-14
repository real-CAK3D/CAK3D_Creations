/* CAK3D Observatory ping — drop into any web app:
     <script src="https://cak3dcreations.vercel.app/ping.js" data-app="shelf-stock" data-version="1.4.0" defer></script>
   Sends one anonymous "open" per browser session: app slug, platform, version and a
   random install id kept in localStorage. No cookies, names or locations, and it
   stays silent when the browser asks not to be tracked.
   Custom events: window.cak3dPing('recipe_made')  (lowercase, digits, underscores). */
(function () {
  var s = document.currentScript;
  var app = s && s.dataset.app;
  if (!app || navigator.doNotTrack === '1' || window.doNotTrack === '1') {
    window.cak3dPing = function () {};
    return;
  }
  var endpoint = s.dataset.endpoint || 'https://cak3dcreations.vercel.app/api/ping';
  var platform = s.dataset.platform || 'web';
  var version = s.dataset.version || '';

  var id;
  try {
    id = localStorage.getItem('cak3d-iid');
    if (!id) {
      id = (window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)).replace(/[^A-Za-z0-9-]/g, '');
      localStorage.setItem('cak3d-iid', id);
    }
  } catch (e) {
    id = 'tmp' + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function send(event) {
    var body = JSON.stringify({ app: app, platform: platform, version: version, id: id, event: event || 'open' });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(endpoint, new Blob([body], { type: 'text/plain' }))) return;
    } catch (e) { /* fall through */ }
    try { fetch(endpoint, { method: 'POST', body: body, keepalive: true, mode: 'no-cors' }); } catch (e) { /* offline */ }
  }

  window.cak3dPing = send;
  try {
    if (sessionStorage.getItem('cak3d-open-' + app)) return;
    sessionStorage.setItem('cak3d-open-' + app, '1');
  } catch (e) { /* private mode: ping anyway */ }
  send('open');
})();
