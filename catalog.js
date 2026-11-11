/* CAK3D_Creations — shared build catalog.
   Single source of truth for the landing grid (index.html) and the per-app
   pages (app.html). Add a build once here and it shows up in both.
   Each project also carries a `th` theme {a,b} so its app page is coloured
   for the app it hosts. */
(function () {
  const R = 'https://github.com/real-CAK3D/';

  const PF = {
    web:     { l: 'Web',          c: '#5bc8b0' },
    android: { l: 'Android',      c: '#86efac' },
    windows: { l: 'Windows',      c: '#c0a978' },
    pi:      { l: 'Raspberry Pi', c: '#e0795f' },
    esp32:   { l: 'ESP32',        c: '#f0b429' },
  };

  const CATS = [
    { id: 'all',   l: 'All' },
    { id: 'rf',    l: 'RF & Sensing' },
    { id: 'tools', l: 'Field & Everyday' },
    { id: 'media', l: 'Music & Media' },
    { id: 'world', l: '3D & Sim' },
  ];

  const CATMAP = {
    'Flocked Up': 'rf', 'Flying Flocks': 'rf', 'What the Flock!': 'rf', 'Spac3-Gh0st': 'rf', 'Hu-Motian': 'rf',
    'Shelf & Stock': 'tools', 'Home Inventory': 'tools', 'MapPI3': 'tools', 'TorqueClock': 'tools', 'GTA-Watch': 'tools',
    'Foldman': 'media', 'Classipod': 'media', 'NostalgiaVue': 'media', 'The Corner Chronicle': 'media',
    'Platform of Things': 'world', 'Tiny Truck': 'world', '3D PC': 'world', 'NeuroLab': 'world',
  };

  const PROJECTS = [
    { name: 'Flocked Up', k: 'SUB-GHZ · FIRMWARE', pf: ['esp32'], th: { a: '#b24bff', b: '#ff5470' },
      desc: 'Crow-themed standalone Flipper-style firmware for the LilyGo T-Embed CC1101 Plus — sub-GHz, Wi-Fi, BLE, NFC and IR with a fluid pixel-art crow, part of the Flying Flocks fleet.',
      use: 'Flash it to a T-Embed (standalone) or drop the app image on the SD card for bmorcelli’s Launcher, then drive the crow menu with the encoder — scan, decode, replay and script sub-GHz, all in your hand.',
      feats: ['<b>CC1101 sub-GHz</b> — scan + decode (TPMS, weather, PT2262/EV1527 remotes), a 433 + full-band waterfall, and an interactive free-tune dial', '<b>Capture replay + .fu scripts</b> — play Flipper .sub/.ir, run macros, import from a drop folder (no RF jamming — refused by design)', '<b>Wi-Fi + BLE recon</b> feeding the Flying Flocks app, plus a Wi-Fi clock & weather pull', '<b>NFC (PN532) + IR</b> read / send, a live health heartbeat over BLE & USB, and an Authorize-gated BadUSB runner', '<b>SD browser + animated pixel-art crow UI</b> under bmorcelli’s Launcher'],
      long: 'Flocked Up turns the LilyGo T-Embed CC1101 Plus into a pocket signals bench with attitude. It speaks the whole Biscuit fleet protocol, so it drops onto the Flying Flocks map like any board — but it also stands completely on its own, driven by the rotary encoder through a crow-themed menu with a living, Flipper-dolphin-style mascot. The firmware is built-only and flashed by you; every transmit path is gated behind an on-device Authorize screen, and RF jamming is refused outright.',
      links: [{ t: 'Flash / Download', u: 'flash.html', go: 1 }, { t: 'Release', u: R + 'FlockedUp/releases/latest' }, { t: 'Source', u: R + 'FlockedUp' }] },

    { name: 'Flying Flocks', k: 'WARDRIVE · RF', pf: ['android', 'esp32'], th: { a: '#5fd36a', b: '#f0b429' },
      desc: 'Drive and the invisible lights up — Wi-Fi, Bluetooth, sub-GHz, cameras, mesh and aircraft, mapped live and scored. Runs on a fleet of ESP32-C5 "Biscuit" boards or just the phone.',
      use: 'Grab the phone (and a Biscuit board if you have one), start a scan, and drive. The RF around you drops onto a live map you can share, score and come back to.',
      feats: ['<b>Multi-band wardriving</b> — Wi-Fi APs & stations, Bluetooth/BLE, sub-GHz and plate cameras, all geo-tagged', '<b>ESP32-C5 "Biscuit" fleet</b> or phone-only — external boards feed the same map over USB', '<b>Fleet Health + triangulation</b> — per-board telemetry and a signal heard by two boards points at where it is', '<b>Live online layer</b> — sightings sync to a shared map with leaderboards and territory', '<b>ESP Marauder support</b> — plug one in over USB and its scans plot straight onto your map'],
      long: 'Flying Flocks is the home base for the whole fleet. The phone alone already wardrives Wi-Fi and Bluetooth; add one or more ESP32-C5 "Biscuit" boards (or the Flocked Up T-Embed) and every radio streams onto one shared, scored, living map. It is built to make the field a game — leaderboards, territory and badges — while quietly being a serious multi-band sensing platform.',
      links: [{ t: 'Download APK', u: R + 'FlyingFlocks/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'FlyingFlocks' }] },

    { name: 'Shelf & Stock', k: 'KITCHEN · INVENTORY', pf: ['web', 'android'], th: { a: '#f0b429', b: '#5fd36a' },
      desc: 'Your whole kitchen in your pocket — every cabinet, the fridge and the garage, a smart shopping list, meal planning, and recipes from what you already have.',
      use: 'Log what you own once, then shop, cook and plan from it. "What can I make tonight?" is answered from the shelves you actually have.',
      feats: ['<b>Room-by-room inventory</b> — cabinets, fridge, freezer and garage laid out like your real kitchen', '<b>Smart shopping list</b> that knows what you are low on', '<b>Meal planning</b> and recipes built from what is already in stock', '<b>Phone or browser</b> — same data on either'],
      links: [{ t: 'Open', u: 'https://shelfandstock.vercel.app', go: 1 }, { t: 'APK', u: R + 'ShelfandStock/releases/latest', apk: 1 }, { t: 'Source', u: R + 'ShelfandStock' }] },

    { name: 'Home Inventory', k: 'FAMILY · STORAGE', pf: ['web', 'android'], th: { a: '#e0795f', b: '#c0a978' },
      desc: 'Find any box on the shelf: photograph the whole storage wall, then "blender → Section 7 › Box 41" and it lights up on a map of the shelves.',
      use: 'Packing a garage or a storage unit? Photograph the wall, tag what is in each box, and never dig through totes again — just search and it points you right at it.',
      feats: ['<b>Photo-mapped shelving</b> — your real storage wall becomes a clickable map', '<b>Search any item</b> → it highlights the exact section and box', '<b>Box-level contents</b> so nothing gets lost in a tote', '<b>Shared across the family</b> on web or Android'],
      links: [{ t: 'Open', u: 'https://home-inventory-37.vercel.app', go: 1 }, { t: 'APK', u: R + 'HomeInventory/releases/latest', apk: 1 }, { t: 'Source', u: R + 'HomeInventory' }] },

    { name: 'MapPI3', k: 'TRAIL · NAV', pf: ['android', 'web', 'pi'], th: { a: '#3fa34d', b: '#86efac' },
      desc: 'A phone-first trail companion — plan, launch and navigate hikes with offline route packs and OSM trail geometry, headed for a Raspberry Pi field kit.',
      use: 'Plan a hike at home, download the route pack, and follow it on the trail with no signal — then take it into a dedicated Pi field unit.',
      feats: ['<b>Offline route packs</b> — the whole hike cached before you lose signal', '<b>Real OSM trail geometry</b>, not just roads', '<b>Plan → launch → navigate</b> in one flow', '<b>Raspberry Pi field kit</b> on the roadmap'],
      links: [{ t: 'APK', u: R + 'MapPI3/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'MapPI3' }] },

    { name: 'What the Flock!', k: 'SURVEILLANCE · DETECT', pf: ['android', 'web', 'esp32'], th: { a: '#ff5470', b: '#f0b429' },
      desc: 'Spot Flock Safety plate cameras on the road — detector firmware on a XIAO ESP32-S3 plus a phone app with camera-aware navigation.',
      use: 'Mount the detector, drive, and the app flags Flock plate-reader cameras as you approach them — mapped and camera-aware on your route.',
      feats: ['<b>XIAO ESP32-S3 detector</b> firmware sniffs for the cameras', '<b>Camera-aware navigation</b> in the companion app', '<b>Mapped sightings</b> you can review and share', '<b>Phone, web or board</b> — use what you have'],
      links: [{ t: 'APK', u: R + 'WhatTheFlock/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'WhatTheFlock' }] },

    { name: 'Foldman', k: 'FOLDABLE · MUSIC', pf: ['android'], th: { a: '#e8873a', b: '#ffe7a3' },
      desc: 'A walkman for the Galaxy Z Fold — folded it\'s a portable cassette player, unfolded it lays down into a deck with real latching keys and VU needles. Free radio, podcasts, YouTube audio and Spotify, six skins. A fork of deveshrai\'s Foldman.',
      use: 'A music player that uses the fold: pocket it closed as a walkman, open it flat as a tape deck. Free YouTube, podcasts, radio and Spotify, six skins.',
      feats: ['<b>Fold-aware UI</b> — cassette player closed, full deck open', '<b>Real latching transport keys</b> and live VU needles', '<b>Free YouTube, podcasts, radio & Spotify</b> sources — YouTube keeps playing with the screen off', '<b>Sleep timer, speed, EQ & bass boost</b>', '<b>Six skins</b>; a fork of deveshrai\'s Foldman'],
      links: [{ t: 'Download APK', u: R + 'Foldman/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'Foldman' }, { t: 'Original', u: 'https://github.com/deveshrai/Foldman' }] },

    { name: 'Classipod', k: 'CLICK WHEEL · MUSIC', pf: ['android'], th: { a: '#cfd6dd', b: '#5bc8ff' },
      desc: 'The classic click-wheel music player on your phone — spin to scroll, Cover Flow, your own library — now with a free Online menu: radio, podcasts, YouTube audio and Spotify control. A fork of Aditya R\'s Classipod.',
      use: 'Your music on a spinning click wheel, plus free internet radio, podcasts, YouTube audio with the screen off, and click-wheel control of Spotify.',
      feats: ['<b>Click wheel</b> navigation, Cover Flow and your local library', '<b>Online menu</b> — free radio, podcasts and YouTube audio (keeps playing with the screen off)', '<b>Spotify & any app</b> — play, pause and skip from the wheel', 'This product includes software developed by Aditya R.'],
      links: [{ t: 'Download APK', u: R + 'Classipod/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'Classipod' }, { t: 'Original', u: 'https://github.com/adeeteya/Classipod' }] },

    { name: 'GTA-Watch', k: 'WEARABLE · FIRMWARE', pf: ['esp32', 'android'], th: { a: '#8cd211', b: '#ff5470' },
      desc: 'A GTA-style minimap and turn-by-turn watch on an ESP32-S3 AMOLED, with an Android companion app.',
      use: 'Wear it and get a game-style minimap on your wrist — turn-by-turn directions fed from your phone, rendered like a GTA HUD.',
      feats: ['<b>GTA-style minimap</b> on an ESP32-S3 AMOLED watch', '<b>Turn-by-turn</b> directions on the wrist', '<b>Android companion</b> app feeds the route', '<b>Open firmware</b> you can flash yourself'],
      links: [{ t: 'Download', u: R + 'ESP-Watch/releases/latest', go: 1 }, { t: 'Source', u: R + 'ESP-Watch' }] },

    { name: 'Hu-Motian', k: 'SENSOR · 3D', pf: ['web', 'esp32'], th: { a: '#22d3ee', b: '#9bbf6a' },
      desc: 'A human radar: an ESP32 + 24 GHz mmWave sensor with a live 3D room where jointed figures walk, sit and lie down where it senses you.',
      use: 'Point a mmWave sensor at a room and watch a live 3D twin — figures stand, sit and lie down where real people are, no camera involved.',
      feats: ['<b>24 GHz mmWave</b> presence sensing on an ESP32', '<b>Live 3D room</b> in the browser', '<b>Jointed figures</b> that walk, sit and lie down', '<b>Camera-free</b> — motion, not video'],
      links: [{ t: 'Open', u: 'https://hu-motian.vercel.app', go: 1 }, { t: 'Firmware', u: R + 'Hu-Motian/releases/latest' }, { t: 'Source', u: R + 'Hu-Motian' }] },

    { name: 'NostalgiaVue', k: 'RETRO · MEDIA', pf: ['web', 'windows'], th: { a: '#ff6ac1', b: '#5bc8ff' },
      desc: 'A 1980s–2000s TV set in your browser — remote, channel guide, static and 770+ channels surfing archive.org, YouTube and your own clips.',
      use: 'Flip on a retro TV and channel-surf — 770+ channels of archive footage, YouTube and your own clips, complete with static between them.',
      feats: ['<b>770+ channels</b> from archive.org, YouTube and your clips', '<b>Working remote</b> and channel guide', '<b>Static & tuning</b> between channels for the full effect', '<b>Browser or Windows app</b>'],
      links: [{ t: 'Watch', u: 'https://nostalgiavue.vercel.app', go: 1 }, { t: 'Windows app', u: R + 'NostalgiaVue/releases/latest' }, { t: 'Source', u: R + 'NostalgiaVue' }] },

    { name: 'Spac3-Gh0st', k: 'RASPBERRY PI · RF', pf: ['pi', 'web'], th: { a: '#5fd36a', b: '#9b8cff' },
      desc: 'A windowed Pi hacker-companion with a Pwnagotchi-style face — passive Wi-Fi/BT/LAN awareness and a 10-theme glass dashboard for your own lab.',
      use: 'Sit a Pi on your bench and let it watch your own lab — a friendly face reacts to the Wi-Fi/BT/LAN around it on a glass dashboard.',
      feats: ['<b>Pwnagotchi-style face</b> that reacts to the airwaves', '<b>Passive</b> Wi-Fi / BT / LAN awareness', '<b>10-theme glass dashboard</b>', '<b>Your own lab only</b> — passive, not an attack tool'],
      links: [{ t: 'Release', u: R + 'Spac3-Gh0st/releases/latest', go: 1 }, { t: 'Source', u: R + 'Spac3-Gh0st' }] },

    { name: 'TorqueClock', k: 'SHOP · TIMER', pf: ['android', 'web'], th: { a: '#f0b429', b: '#e0795f' },
      desc: 'A phone-first mechanic shift and job timer — clock jobs, tally the day, and keep the shop running on time.',
      use: 'Clock on to a job, clock off when it is done, and the app tallies your day — built for a mechanic\'s shift, not an office timesheet.',
      feats: ['<b>Per-job timers</b> you start and stop on the phone', '<b>Daily tally</b> of hours and jobs', '<b>Shift tracking</b> for the shop', '<b>Phone-first</b>, works in the browser too'],
      links: [{ t: 'APK', u: R + 'Torque-Timer/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'Torque-Timer' }] },

    { name: 'Platform of Things', k: '3D · PORTFOLIO', pf: ['web'], th: { a: '#5bc8ff', b: '#b24bff' },
      desc: "A first-person 3D portfolio world — walk through CAK3D's bots, servers, apps, the garage and the trail, each its own little place.",
      use: 'Instead of a list of links, walk through CAK3D\'s work in first person — each project is a place you can visit in a little 3D world.',
      feats: ['<b>First-person 3D</b> portfolio you walk around', '<b>Each build is a place</b> — bots, servers, apps, garage, trail', '<b>Runs in any browser</b>', '<b>A playful front door</b> to everything else here'],
      links: [{ t: 'Enter', u: 'https://real-cak3d.github.io/', go: 1 }, { t: 'Source', u: R + 'platform-of-things' }] },

    { name: 'Tiny Truck', k: '3D · DRIVING', pf: ['web'], th: { a: '#f0b429', b: '#e0795f' },
      desc: "Drive a little truck around a 3D world of CAK3D's work — physics, dust, and big name-letters in the landing zone.",
      use: 'Drop into a 3D sandbox and drive a little truck around CAK3D\'s world — real physics, kicked-up dust and giant name-letters to explore.',
      feats: ['<b>Drivable truck</b> with real physics and dust', '<b>3D world</b> built around CAK3D\'s projects', '<b>Big name-letters</b> in the landing zone', '<b>Browser, no install</b>'],
      links: [{ t: 'Drive', u: 'https://cak3d-truck.vercel.app', go: 1 }, { t: 'Source', u: R + 'tiny-truck' }] },

    { name: '3D PC', k: '3D · INTERACTIVE', pf: ['web'], th: { a: '#5bc8ff', b: '#86efac' },
      desc: 'An explorable 3D computer — boot it up, sit at the desk and poke around the machine.',
      use: 'Sit down at a virtual desk, power on the machine and poke around — an explorable 3D computer you can actually boot and use.',
      feats: ['<b>Explorable 3D desk</b> and machine', '<b>Boot it up</b> and interact', '<b>A fun take</b> on a computer you can walk into', '<b>Browser-based</b>'],
      links: [{ t: 'Source', u: R + '3D-PC' }] },

    { name: 'The Corner Chronicle', k: 'NEWS · PWA', pf: ['web'], th: { a: '#c0a978', b: '#5fd36a' },
      desc: 'A newsstand on your home screen — every paper on the rack with its own cover and an unread badge, ringing when a new issue lands.',
      use: 'Add it to your home screen and it becomes a newsstand — each paper on the rack with its own cover, badging and ringing when a fresh issue drops.',
      feats: ['<b>Newsstand rack</b> — every paper with its own cover', '<b>Unread badges</b> so you see what is new at a glance', '<b>Rings</b> when a new issue lands', '<b>Installable PWA</b> on your home screen'],
      links: [{ t: 'Source', u: R + 'NewsStand' }] },

    { name: 'NeuroLab', k: 'DASHBOARD · SIM', pf: ['web'], th: { a: '#22d3ee', b: '#9b8cff' },
      desc: 'A browser mission-control dashboard for a living clean-room facility simulation — persistent state and live snapshots.',
      use: 'Run a living clean-room facility from a mission-control screen — the sim keeps ticking and the dashboard shows live, persistent state.',
      feats: ['<b>Mission-control dashboard</b> for a facility sim', '<b>Living simulation</b> that keeps running', '<b>Persistent state</b> and live snapshots', '<b>Browser-based</b>'],
      links: [{ t: 'Source', u: R + 'NeuroLab' }] },
  ];

  // Stable URL slug for a build's own page (app.html?id=slug).
  const slug = (name) => String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  PROJECTS.forEach((p) => { p.cat = CATMAP[p.name] || 'tools'; p.slug = slug(p.name); });

  window.CAK3D = { R, PF, CATS, CATMAP, PROJECTS, slug };
})();
