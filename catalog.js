/* CAK3D_Creations — shared build catalog.
   Single source of truth for the landing grid (index.html) and the per-app
   pages (app.html). Add a build once here and it shows up in both.
   Each project also carries a `th` theme {a,b} so its app page is coloured
   for the app it hosts. `wip: true` marks a build that's still in the
   workshop: it gets a WORK IN PROGRESS badge and its own tab. */
(function () {
  const R = 'https://github.com/real-CAK3D/';

  const PF = {
    web:     { l: 'Web',          c: '#5bc8b0' },
    android: { l: 'Android',      c: '#86efac' },
    windows: { l: 'Windows',      c: '#c0a978' },
    pi:      { l: 'Raspberry Pi', c: '#e0795f' },
    esp32:   { l: 'ESP32',        c: '#f0b429' },
    mac:     { l: 'macOS',        c: '#c7c9d1' },
    linux:   { l: 'Linux',        c: '#f2d16b' },
    discord: { l: 'Discord',      c: '#8b95f5' },
  };

  // 'wip' is a virtual tab: it lists every build flagged `wip`, whatever its category.
  const CATS = [
    { id: 'all',   l: 'All' },
    { id: 'rf',    l: 'RF & Sensing' },
    { id: 'tools', l: 'Field & Everyday' },
    { id: 'play',  l: 'Games & Pets' },
    { id: 'media', l: 'Music & Media' },
    { id: 'world', l: '3D & Sim' },
    { id: 'wip',   l: 'In the Workshop' },
  ];

  const CATMAP = {
    'Flocked Up': 'rf', 'Flying Flocks': 'rf', 'What the Flock!': 'rf', 'MaurCAK3D': 'rf', 'Spac3-Gh0st': 'rf', 'Hu-Motian': 'rf',
    'Shelf & Stock': 'tools', 'Home Inventory': 'tools', 'MapPI3': 'tools', 'TorqueClock': 'tools', 'GTA-Watch': 'tools',
    'Scanimal': 'play', 'Pokédex': 'play', 'CYD Buddy': 'play',
    'Foldman': 'media', 'Classipod': 'media', 'NostalgiaVue': 'media', 'The Corner Chronicle': 'media',
    'Platform of Things': 'world', 'Tiny Truck': 'world', '3D PC': 'world', 'NeuroLab': 'world',
    'CAK3D-Creations Shop': 'tools', 'Onstell': 'tools', 'CAK3DBot': 'tools', 'Inventory App': 'tools',
    'Sullivan Connect': 'tools', 'Sullivan Connect App': 'tools',
  };

  const PROJECTS = [
    { name: 'Flocked Up', k: 'SUB-GHZ · FIRMWARE', pf: ['esp32'], th: { a: '#b24bff', b: '#ff5470' }, motif: 'crow',
      desc: 'Crow-themed standalone Flipper-style firmware for the LilyGo T-Embed CC1101 Plus — sub-GHz, Wi-Fi, BLE, NFC and IR with a fluid pixel-art crow, part of the Flying Flocks fleet.',
      use: 'Flash it to a T-Embed (standalone) or drop the app image on the SD card for bmorcelli’s Launcher, then drive the crow menu with the encoder — scan, decode, replay and script sub-GHz, all in your hand.',
      feats: ['<b>CC1101 sub-GHz</b> — scan + decode (TPMS, weather, PT2262/EV1527 remotes), a 433 + full-band waterfall, and an interactive free-tune dial', '<b>Capture replay + .fu scripts</b> — play Flipper .sub/.ir, run macros, import from a drop folder (no RF jamming — refused by design)', '<b>Wi-Fi + BLE recon</b> feeding the Flying Flocks app, plus a Wi-Fi clock & weather pull', '<b>NFC (PN532) + IR</b> read / send, a live health heartbeat over BLE & USB, and an Authorize-gated BadUSB runner', '<b>SD browser + animated pixel-art crow UI</b> under bmorcelli’s Launcher'],
      long: 'Flocked Up turns the LilyGo T-Embed CC1101 Plus into a pocket signals bench with attitude. It speaks the whole Biscuit fleet protocol, so it drops onto the Flying Flocks map like any board — but it also stands completely on its own, driven by the rotary encoder through a crow-themed menu with a living, Flipper-dolphin-style mascot. The firmware is built-only and flashed by you; every transmit path is gated behind an on-device Authorize screen, and RF jamming is refused outright.',
      links: [{ t: 'Flash / Download', u: 'flash.html', go: 1 }, { t: 'Release', u: R + 'FlockedUp/releases/latest' }, { t: 'Source', u: R + 'FlockedUp' }] },

    { name: 'Flying Flocks', k: 'WARDRIVE · RF', pf: ['android', 'esp32'], th: { a: '#e8a838', b: '#5cb4e8' }, motif: 'crow',
      desc: 'Drive and the invisible lights up — Wi-Fi, Bluetooth, sub-GHz, cameras, mesh and aircraft, mapped live and scored. Runs on a fleet of ESP32-C5 "Biscuit" boards or just the phone.',
      use: 'Grab the phone (and a Biscuit board if you have one), start a scan, and drive. The RF around you drops onto a live map you can share, score and come back to.',
      feats: ['<b>Multi-band wardriving</b> — Wi-Fi APs & stations, Bluetooth/BLE, sub-GHz and plate cameras, all geo-tagged', '<b>ESP32-C5 "Biscuit" fleet</b> or phone-only — external boards feed the same map over USB', '<b>Fleet Health + triangulation</b> — per-board telemetry and a signal heard by two boards points at where it is', '<b>Live online layer</b> — sightings sync to a shared map with leaderboards and territory', '<b>ESP Marauder support</b> — plug one in over USB and its scans plot straight onto your map'],
      long: 'Flying Flocks is the home base for the whole fleet. The phone alone already wardrives Wi-Fi and Bluetooth; add one or more ESP32-C5 "Biscuit" boards (or the Flocked Up T-Embed) and every radio streams onto one shared, scored, living map. It is built to make the field a game — leaderboards, territory and badges — while quietly being a serious multi-band sensing platform.',
      links: [{ t: 'Download APK', u: R + 'FlyingFlocks/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'FlyingFlocks' }] },

    { name: 'Shelf & Stock', k: 'KITCHEN · INVENTORY', pf: ['web', 'android'], th: { a: '#c9a24a', b: '#8a5a35' }, motif: 'kitchen',
      desc: 'Your whole kitchen in your pocket — every cabinet, the fridge and the garage, a smart shopping list, meal planning, and recipes from what you already have.',
      use: 'Log what you own once, then shop, cook and plan from it. "What can I make tonight?" is answered from the shelves you actually have.',
      feats: ['<b>Room-by-room inventory</b> — cabinets, fridge, freezer and garage laid out like your real kitchen', '<b>Smart shopping list</b> that knows what you are low on', '<b>Meal planning</b> and recipes built from what is already in stock', '<b>Phone or browser</b> — same data on either'],
      links: [{ t: 'Open', u: 'https://shelfandstock.vercel.app', go: 1 }, { t: 'APK', u: R + 'ShelfandStock/releases/latest', apk: 1 }, { t: 'Source', u: R + 'ShelfandStock' }] },

    { name: 'Home Inventory', k: 'FAMILY · STORAGE', pf: ['web', 'android'], th: { a: '#4f9dff', b: '#b98a5a' }, motif: 'kitchen',
      desc: 'Find any box on the shelf: photograph the whole storage wall, then "blender → Section 7 › Box 41" and it lights up on a map of the shelves.',
      use: 'Packing a garage or a storage unit? Photograph the wall, tag what is in each box, and never dig through totes again — just search and it points you right at it.',
      feats: ['<b>Photo-mapped shelving</b> — your real storage wall becomes a clickable map', '<b>Search any item</b> → it highlights the exact section and box', '<b>Box-level contents</b> so nothing gets lost in a tote', '<b>Shared across the family</b> on web or Android'],
      links: [{ t: 'Open', u: 'https://home-inventory-37.vercel.app', go: 1 }, { t: 'APK', u: R + 'HomeInventory/releases/latest', apk: 1 }, { t: 'Source', u: R + 'HomeInventory' }] },

    { name: 'MapPI3', k: 'TRAIL · NAV', pf: ['android', 'web', 'pi'], th: { a: '#6f8f48', b: '#e3c77d' }, motif: 'forest',
      desc: 'A phone-first trail companion — plan, launch and navigate hikes with offline route packs and OSM trail geometry, headed for a Raspberry Pi field kit.',
      use: 'Plan a hike at home, download the route pack, and follow it on the trail with no signal — then take it into a dedicated Pi field unit.',
      feats: ['<b>Offline route packs</b> — the whole hike cached before you lose signal', '<b>Real OSM trail geometry</b>, not just roads', '<b>Plan → launch → navigate</b> in one flow', '<b>Raspberry Pi field kit</b> on the roadmap'],
      links: [{ t: 'APK', u: R + 'MapPI3/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'MapPI3' }] },

    { name: 'What the Flock!', k: 'SURVEILLANCE · DETECT', pf: ['android', 'web', 'esp32'], th: { a: '#a855f7', b: '#a3e635' }, motif: 'crow',
      desc: 'Spot Flock Safety plate cameras on the road — detector firmware on a XIAO ESP32-S3 plus a phone app with camera-aware navigation.',
      use: 'Mount the detector, drive, and the app flags Flock plate-reader cameras as you approach them — mapped and camera-aware on your route.',
      feats: ['<b>XIAO ESP32-S3 detector</b> firmware sniffs for the cameras', '<b>Camera-aware navigation</b> in the companion app', '<b>Mapped sightings</b> you can review and share', '<b>Phone, web or board</b> — use what you have'],
      links: [{ t: 'APK', u: R + 'WhatTheFlock/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'WhatTheFlock' }] },

    { name: 'MaurCAK3D', k: 'WI-FI RECON · FIRMWARE', pf: ['esp32'], th: { a: '#5bc8b0', b: '#b24bff' }, motif: 'crow',
      desc: 'An ESP32 Marauder fork for the XIAO ESP32-C5 that joins the Flying Flocks fleet over BLE — Wi-Fi recon that streams straight onto your map, no cable.',
      use: 'Flash it to a XIAO ESP32-C5 and its Wi-Fi scans and telemetry stream over BLE into the Flying Flocks app like any Biscuit board — tether it over USB or leave it wireless.',
      feats: ['<b>ESP32 Marauder</b> Wi-Fi recon — scan APs & stations, probe/packet sniff — on a XIAO ESP32-C5', '<b>Biscuit BLE bridge</b> — joins the Flying Flocks fleet wirelessly, its scans plot straight onto the map', '<b>DATA:HEALTH telemetry</b> — live heap, uptime and status in the app\'s Fleet Health view', '<b>USB or BLE</b> — the same newline protocol over a cable or over the air'],
      long: 'MaurCAK3D is the Flying Flocks fleet\'s take on the ESP32 Marauder: justcallmekoko\'s Wi-Fi recon firmware with a Biscuit bridge grafted on, so a XIAO ESP32-C5 running it shows up in the app over BLE exactly like a Biscuit board and streams its scans onto the shared map. Built with -DBISCUIT_BRIDGE, it mirrors the same line protocol over USB-CDC and BLE.',
      links: [{ t: 'Flash / Download', u: 'flash.html', go: 1 }, { t: 'Release', u: R + 'MaurCAK3D/releases/latest' }, { t: 'Source', u: R + 'MaurCAK3D' }, { t: 'Upstream', u: 'https://github.com/justcallmekoko/ESP32Marauder' }] },

    { name: 'Foldman', k: 'FOLDABLE · MUSIC', pf: ['android'], th: { a: '#f0722b', b: '#c4501a' }, motif: 'tech',
      desc: 'A walkman for the Galaxy Z Fold — folded it\'s a portable cassette player, unfolded it lays down into a deck with real latching keys and VU needles. Free radio, podcasts, YouTube audio and Spotify, six skins. A fork of deveshrai\'s Foldman.',
      use: 'A music player that uses the fold: pocket it closed as a walkman, open it flat as a tape deck. Free YouTube, podcasts, radio and Spotify, six skins.',
      feats: ['<b>Fold-aware UI</b> — cassette player closed, full deck open', '<b>Real latching transport keys</b> and live VU needles', '<b>Free YouTube, podcasts, radio & Spotify</b> sources — YouTube keeps playing with the screen off', '<b>Sleep timer, speed, EQ & bass boost</b>', '<b>Six skins</b>; a fork of deveshrai\'s Foldman'],
      links: [{ t: 'Download APK', u: R + 'Foldman/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'Foldman' }, { t: 'Original', u: 'https://github.com/deveshrai/Foldman' }] },

    { name: 'Classipod', k: 'CLICK WHEEL · MUSIC', pf: ['android'], th: { a: '#cfd6dd', b: '#5bc8ff' }, motif: 'tech',
      desc: 'The classic click-wheel music player on your phone — spin to scroll, Cover Flow, your own library — now with a free Online menu: radio, podcasts, YouTube audio and Spotify control. A fork of Aditya R\'s Classipod.',
      use: 'Your music on a spinning click wheel, plus free internet radio, podcasts, YouTube audio with the screen off, and click-wheel control of Spotify.',
      feats: ['<b>Click wheel</b> navigation, Cover Flow and your local library', '<b>Online menu</b> — free radio, podcasts and YouTube audio (keeps playing with the screen off)', '<b>Spotify & any app</b> — play, pause and skip from the wheel', 'This product includes software developed by Aditya R.'],
      links: [{ t: 'Download APK', u: R + 'Classipod/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'Classipod' }, { t: 'Original', u: 'https://github.com/adeeteya/Classipod' }] },

    { name: 'GTA-Watch', k: 'WEARABLE · FIRMWARE', pf: ['esp32', 'android'], th: { a: '#72cc72', b: '#a64cf2' }, motif: 'tech',
      desc: 'A GTA-style minimap and turn-by-turn watch on an ESP32-S3 AMOLED, with an Android companion app.',
      use: 'Wear it and get a game-style minimap on your wrist — turn-by-turn directions fed from your phone, rendered like a GTA HUD.',
      feats: ['<b>GTA-style minimap</b> on an ESP32-S3 AMOLED watch', '<b>Turn-by-turn</b> directions on the wrist', '<b>Android companion</b> app feeds the route', '<b>Open firmware</b> you can flash yourself'],
      links: [{ t: 'Download', u: R + 'ESP-Watch/releases/latest', go: 1 }, { t: 'Source', u: R + 'ESP-Watch' }] },

    { name: 'Hu-Motian', k: 'SENSOR · 3D', pf: ['web', 'esp32'], th: { a: '#3987e5', b: '#bfe9ff' }, motif: 'ghost',
      desc: 'A human radar: an ESP32 + 24 GHz mmWave sensor with a live 3D room where jointed figures walk, sit and lie down where it senses you.',
      use: 'Point a mmWave sensor at a room and watch a live 3D twin — figures stand, sit and lie down where real people are, no camera involved.',
      feats: ['<b>24 GHz mmWave</b> presence sensing on an ESP32', '<b>Live 3D room</b> in the browser', '<b>Jointed figures</b> that walk, sit and lie down', '<b>Camera-free</b> — motion, not video'],
      links: [{ t: 'Open', u: 'https://hu-motian.vercel.app', go: 1 }, { t: 'Firmware', u: R + 'Hu-Motian/releases/latest' }, { t: 'Source', u: R + 'Hu-Motian' }] },

    { name: 'NostalgiaVue', k: 'RETRO · MEDIA', pf: ['web', 'windows'], th: { a: '#63ff6e', b: '#ffd23f' }, motif: 'tv',
      desc: 'A 1980s–2000s TV set in your browser — remote, channel guide, static and 770+ channels surfing archive.org, YouTube and your own clips.',
      use: 'Flip on a retro TV and channel-surf — 770+ channels of archive footage, YouTube and your own clips, complete with static between them.',
      feats: ['<b>770+ channels</b> from archive.org, YouTube and your clips', '<b>Working remote</b> and channel guide', '<b>Static & tuning</b> between channels for the full effect', '<b>Browser or Windows app</b>'],
      links: [{ t: 'Watch', u: 'https://nostalgiavue.vercel.app', go: 1 }, { t: 'Windows app', u: R + 'NostalgiaVue/releases/latest' }, { t: 'Source', u: R + 'NostalgiaVue' }] },

    { name: 'Spac3-Gh0st', k: 'RASPBERRY PI · RF', pf: ['pi', 'web'], th: { a: '#27c93f', b: '#ffbd2e' }, motif: 'space',
      desc: 'A windowed Pi hacker-companion with a Pwnagotchi-style face — passive Wi-Fi/BT/LAN awareness and a 10-theme glass dashboard for your own lab.',
      use: 'Sit a Pi on your bench and let it watch your own lab — a friendly face reacts to the Wi-Fi/BT/LAN around it on a glass dashboard.',
      feats: ['<b>Pwnagotchi-style face</b> that reacts to the airwaves', '<b>Passive</b> Wi-Fi / BT / LAN awareness', '<b>10-theme glass dashboard</b>', '<b>Your own lab only</b> — passive, not an attack tool'],
      links: [{ t: 'Release', u: R + 'Spac3-Gh0st/releases/latest', go: 1 }, { t: 'Source', u: R + 'Spac3-Gh0st' }] },

    { name: 'TorqueClock', k: 'SHOP · TIMER', pf: ['android', 'web'], th: { a: '#ff7a18', b: '#ffc24d' }, motif: 'clock',
      desc: 'A phone-first mechanic shift and job timer — clock jobs, tally the day, and keep the shop running on time.',
      use: 'Clock on to a job, clock off when it is done, and the app tallies your day — built for a mechanic\'s shift, not an office timesheet.',
      feats: ['<b>Per-job timers</b> you start and stop on the phone', '<b>Daily tally</b> of hours and jobs', '<b>Shift tracking</b> for the shop', '<b>Phone-first</b>, works in the browser too'],
      links: [{ t: 'APK', u: R + 'Torque-Timer/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'Torque-Timer' }] },

    { name: 'Platform of Things', k: '3D · PORTFOLIO', pf: ['web'], th: { a: '#8fbf6a', b: '#e9b949' }, motif: 'mc',
      desc: "A first-person 3D portfolio world — walk through CAK3D's bots, servers, apps, the garage and the trail, each its own little place.",
      use: 'Instead of a list of links, walk through CAK3D\'s work in first person — each project is a place you can visit in a little 3D world.',
      feats: ['<b>First-person 3D</b> portfolio you walk around', '<b>Each build is a place</b> — bots, servers, apps, garage, trail', '<b>Runs in any browser</b>', '<b>A playful front door</b> to everything else here'],
      links: [{ t: 'Enter', u: 'https://real-cak3d.github.io/', go: 1 }, { t: 'Source', u: R + 'platform-of-things' }] },

    { name: 'Tiny Truck', k: '3D · DRIVING', pf: ['web'], th: { a: '#ff87a2', b: '#d5ff95' }, motif: 'truck',
      desc: "Drive a little truck around a 3D world of CAK3D's work — physics, dust, and big name-letters in the landing zone.",
      use: 'Drop into a 3D sandbox and drive a little truck around CAK3D\'s world — real physics, kicked-up dust and giant name-letters to explore.',
      feats: ['<b>Drivable truck</b> with real physics and dust', '<b>3D world</b> built around CAK3D\'s projects', '<b>Big name-letters</b> in the landing zone', '<b>Browser, no install</b>'],
      links: [{ t: 'Drive', u: 'https://cak3d-truck.vercel.app', go: 1 }, { t: 'Source', u: R + 'tiny-truck' }] },

    { name: '3D PC', k: '3D · INTERACTIVE', pf: ['web'], th: { a: '#3d8bff', b: '#5bff8a' }, motif: 'computer',
      desc: 'An explorable 3D computer — boot it up, sit at the desk and poke around the machine.',
      use: 'Sit down at a virtual desk, power on the machine and poke around — an explorable 3D computer you can actually boot and use.',
      feats: ['<b>Explorable 3D desk</b> and machine', '<b>Boot it up</b> and interact', '<b>A fun take</b> on a computer you can walk into', '<b>Browser-based</b>'],
      links: [{ t: 'Source', u: R + '3D-PC' }] },

    { name: 'The Corner Chronicle', k: 'NEWS · PWA', pf: ['web'], th: { a: '#e07a24', b: '#9c2a1c' }, motif: 'news',
      desc: 'A newsstand on your home screen — every paper on the rack with its own cover and an unread badge, ringing when a new issue lands.',
      use: 'Add it to your home screen and it becomes a newsstand — each paper on the rack with its own cover, badging and ringing when a fresh issue drops.',
      feats: ['<b>Newsstand rack</b> — every paper with its own cover', '<b>Unread badges</b> so you see what is new at a glance', '<b>Rings</b> when a new issue lands', '<b>Installable PWA</b> on your home screen'],
      links: [{ t: 'Source', u: R + 'NewsStand' }] },

    { name: 'NeuroLab', k: 'DASHBOARD · SIM', pf: ['web'], th: { a: '#39d98a', b: '#8cd211' }, motif: 'weed',
      desc: 'A browser mission-control dashboard for a living clean-room facility simulation — persistent state and live snapshots.',
      use: 'Run a living clean-room facility from a mission-control screen — the sim keeps ticking and the dashboard shows live, persistent state.',
      feats: ['<b>Mission-control dashboard</b> for a facility sim', '<b>Living simulation</b> that keeps running', '<b>Persistent state</b> and live snapshots', '<b>Browser-based</b>'],
      links: [{ t: 'Source', u: R + 'NeuroLab' }] },

    { name: 'Scanimal', k: 'POCKET PET · SCANNER', pf: ['android'], th: { a: '#7ee081', b: '#ffb347' }, motif: 'dots',
      desc: 'A tamagotchi-style pocket buddy you raise by scanning the world — feed it barcodes, QR codes and NFC tags, take it on walks, and let it sniff Wi-Fi, Bluetooth and cell towers on a pulsing radar.',
      use: 'Hatch an egg, pick a species, and raise it from baby to elder by scanning everyday things and walking with it. No account, no AI service — everything lives on your phone.',
      feats: ['<b>Feed it by scanning</b> — every barcode, QR code, shipping label, ticket or NFC tag is a food with its own rarity and trait', '<b>11 species</b> with random colours, patterns and personalities', '<b>Walks + GPS</b> — distance, steps and pace, plus a Wi-Fi / Bluetooth / cell radar and satellite stargazing', '<b>Full life sim</b> — vitals, sickness, lives, generations and 85 achievements', '<b>Meets other Scanimals</b> nearby and talks back with a rule-based phrase brain'],
      long: 'Scanimal is a pocket buddy for Android, raised by scanning the world around you. It grows from Baby to Elder at one buddy-year per real day, gets hungry, sick and bored, and remembers what you told it about yourself. Feeding happens through the camera and NFC, walks count toward its fitness, and a radar shows the signals around you. It works offline, needs no account, and updates itself.',
      links: [{ t: 'Download APK', u: R + 'Scanimal/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'Scanimal' }] },

    { name: 'Pokédex', k: 'REAL-WORLD · CATCH', pf: ['android', 'web'], th: { a: '#e3350d', b: '#3b4cca' }, motif: 'dots',
      desc: 'A real-life Kanto-style Pokédex for your phone — walk a real map to find and catch all 1025 Pokémon, scan them in AR, and raise your buddy TamaPoke-style.',
      use: 'Open it and you are holding a Pokédex: Pokémon spawn on the map around you, the camera finds them in AR, and everything you catch can be raised on the PET screen.',
      feats: ['<b>All 1025 Pokémon</b> (Gen 1–9) in the dex and in the wild', '<b>Real map</b> with spawns and stops — walk within 80 m to catch', '<b>AR camera</b> that places Pokémon at their real compass bearing', '<b>TamaPoke pet mode</b> — feed, train, clean and evolve your buddy', '<b>Game Boy mode</b> for your own ROMs, with a two-way save link to the dex'],
      long: 'Pokédex turns your phone into a Kanto-style Pokédex that works in the real world. A map spawns Pokémon and item stops around you, an AR camera shows them at their real bearing, and every catch or hatch fills in the national dex. Your buddy lives on the PET screen, and a built-in Game Boy mode can read your own Red/Blue/Gold saves and bring your party into the dex.',
      links: [{ t: 'Download APK', u: R + 'Pokedex/releases/latest', go: 1, apk: 1 }, { t: 'Source', u: R + 'Pokedex' }] },

    { name: 'CYD Buddy', k: 'DESK PET · FIRMWARE', pf: ['esp32'], th: { a: '#5bd1ff', b: '#ff6ad5' }, motif: 'ghost',
      desc: 'A desk-buddy face for the CYD (ESP32 "Cheap Yellow Display") — animated eyes, moods and touch reactions, with its own life stats, menus and an SD-card phrase bank.',
      use: 'Flash it to a CYD and it sits on your desk with a face that reacts to you — boop it, pet it, tickle it, feed it — and its moods drift with the time of day.',
      feats: ['<b>Touch personality</b> — boop, pet, tickle, eye-poke, bored, sleepy and wake reactions', '<b>Mood system</b> with selectable personalities and time-of-day eye colours', '<b>Life stats</b> — health, hunger, play need, anxiety, plus boot and lifetime counters', '<b>On-screen menus</b> for Wi-Fi setup, face, colours and the phrase bank', '<b>SD phrase bank</b> it only writes inside its own folder'],
      long: 'CYD Buddy turns an ESP32-2432S028R "Cheap Yellow Display" into a little desk companion. Everything runs on the board itself: animated eyes, a mood engine, touch reactions, life and lifecycle stats, on-screen Wi-Fi setup and a phrase bank on the SD card.',
      links: [{ t: 'Download firmware', u: R + 'CYD-Buddy/releases/latest', go: 1 }, { t: 'Source', u: R + 'CYD-Buddy' }] },

    { name: 'Sullivan Connect', k: 'SHOP · DISCORD BOT', pf: ['discord'], th: { a: '#ff7a18', b: '#5865f2' }, motif: 'clock',
      desc: 'Your trusty shop companion — a Discord bot built for the technicians at an auto shop, streamlining the day-to-day of the location.',
      use: 'Runs the shop from Discord: inventory and restock, plus a team points system that turns the work week into a friendly competition.',
      feats: ['<b>Full inventory and restock</b> system', '<b>Interactive "Team" point system</b>', '<b>Built for technicians</b> on the shop floor', 'Private bot — no public link'],
      links: [] },

    // ---- in the workshop ----
    { name: 'CAK3D-Creations Shop', k: 'STORE · E-COMMERCE', pf: ['web'], th: { a: '#e9b949', b: '#8fbf6a' }, motif: 'dots', wip: true,
      desc: 'The CAK3D-Creations storefront — the business side of the workshop, being built into an online shop for CAK3D builds and gear.',
      use: 'The future home for buying CAK3D builds and gear. For now it is the business and portfolio site for the workshop.',
      feats: ['<b>Online shop</b> in the works', '<b>Business portfolio</b> for active CAK3D projects', '<b>Hosted on Vercel</b>, separate from the main site'],
      links: [{ t: 'Visit', u: 'https://cak3d-creations.vercel.app', go: 1 }, { t: 'Source', u: R + 'CAK3D-Creations' }] },

    { name: 'Onstell', k: 'SOFTWARE KVM · DESKTOP', pf: ['windows', 'mac', 'linux'], th: { a: '#8ab4ff', b: '#c7a6ff' }, motif: 'computer', wip: true,
      desc: 'A cross-platform software KVM in early development — make several computers feel like one desk, with the pointer, keyboard and clipboard following whichever screen you are on.',
      use: 'Line up your machines and move between them like one big display — each computer keeps its own OS and apps. The floating desktop widget is in beta; the device-to-device backend is still being built.',
      feats: ['<b>Device Desktop mode</b> — shared pointer, keyboard and clipboard between machines', '<b>Floating glass widget</b> with opacity, lock and layer controls', '<b>Windows, macOS and Linux</b> beta builds', '<b>Virtual Monitor mode</b> planned for later'],
      links: [{ t: 'Beta builds', u: R + 'Onstell/releases', go: 1 }, { t: 'Source', u: R + 'Onstell' }] },

    { name: 'CAK3DBot', k: 'DISCORD BOT · DAYZ', pf: ['discord'], th: { a: '#5865f2', b: '#f2ec50' }, motif: 'tech', wip: true,
      desc: 'A Discord server bot for the ꧁ᙃᥲყ Z ᙅᗣҜӠᙃ꧂ Discord and DayZ servers. Livonia and Sakhal are up and running, with Chernarus on the way.',
      use: 'Keeps the Days of Z community and its DayZ servers connected — inventory, socials, users and database tools, all from Discord.',
      feats: ['<b>DayZ server support</b> — Livonia and Sakhal live, Chernarus next', '<b>Inventory, socials and user commands</b>', '<b>Node.js + Discord.js</b> with MongoDB'],
      links: [{ t: 'Join the Discord', u: 'https://discord.gg/6NFd2cx9KU', go: 1 }, { t: 'Source', u: R + 'CAK3DBot' }] },

    { name: 'Inventory App', k: 'SHOP · TEAM', pf: ['android', 'web'], th: { a: '#ff7a18', b: '#4f9dff' }, motif: 'clock', wip: true,
      desc: 'A shop-floor team app in the works — inventory and restock, chores and schedules, service reports and safety, plus achievements and prizes to keep the crew going.',
      use: 'One app for running the shop crew: what is in stock, who is on what, service reports, safety and messages, with a points-and-prizes layer on top.',
      feats: ['<b>Inventory + restock requests</b>', '<b>Chores, schedules and objectives</b>', '<b>Service reports and safety</b>', '<b>Achievements and prizes</b> for the team'],
      links: [] },

    { name: 'Sullivan Connect App', k: 'SHOP · TEAM APP', pf: ['android', 'web'], th: { a: '#ff7a18', b: '#ffc24d' }, motif: 'clock', wip: true,
      desc: 'Sullivan Connect, grown from a Discord bot into a full app — inventory and employee management for the workplace, on phone or browser.',
      use: 'Takes the shop-companion bot off Discord and into its own app: stock, restock and the crew in one place.',
      feats: ['<b>Inventory management</b> for the shop', '<b>Employee management</b> for the crew', '<b>Phone or browser</b> from one codebase'],
      links: [{ t: 'Source', u: R + 'SullivanConnect-App', go: 1 }] },
  ];

  // Stable URL slug for a build's own page (app.html?id=slug).
  // Accents are folded first, so "Pokédex" becomes "pokedex" rather than "pok-dex".
  const slug = (name) => String(name).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Source-code links aren't shown on the site. The repo name is kept on `repo`
  // so the Observatory can still track the build's downloads and traffic.
  PROJECTS.forEach((p) => {
    p.cat = CATMAP[p.name] || 'tools';
    p.slug = slug(p.name);
    const src = p.links.find((l) => l.t === 'Source');
    if (src) p.repo = src.u.slice(R.length).split('/')[0];
    p.links = p.links.filter((l) => l.t !== 'Source');
  });

  window.CAK3D = { R, PF, CATS, CATMAP, PROJECTS, slug };
})();
