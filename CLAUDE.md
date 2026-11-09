# Halepa Walk: project diary

Self-guided walking-tour app for the **Cultural Memory Coop**, covering the Halepa neighbourhood (Chania, Crete).
Goal: turn this React web app into an **Android app published on Google Play**.

This file is the running diary for that work. It lists what is done, what is next, open issues and decisions.
Update it at the end of every work session. The newest diary entry goes at the bottom of the diary.

---

## Project at a glance

- **Stack:** React 19 + Vite 8 + Leaflet 1.9 / react-leaflet 5
- **Main files:**
  - `src/App.jsx`: map, markers, route, location, layout
  - `src/pois.js`: points of interest (texts in EN / GR / DE / FR)
  - `src/icons.js`: marker icons
  - `src/Components/RouteMap.jsx`: walking route (OSRM)
  - `src/Components/BottomSheet.jsx`: POI panel on mobile
  - `src/Components/SideSheet.jsx`: POI panel on desktop
  - `src/Components/WelcomeScreen.jsx`: welcome screen
  - `src/Components/testSettingsScreen.jsx`: settings currently in use
  - `src/Components/myButtons.jsx`: recenter and settings buttons
- **Assets:** `public/photos/<poi id>.jpg`, `public/icons/`
- **Dev machine:** Windows, `C:\Users\emmanoui\Documents\GitHub\vite-project`

### How to run locally
```
npm install          # first time / after dependency changes
npm run dev          # starts https://localhost:5173 (+ Network URL and QR code for phones on the same Wi-Fi)
```
- The certificate is self-signed (`@vitejs/plugin-basic-ssl`, needed so phones allow location). Accept the browser warning once.
- Stop the server with `Ctrl + C`.
- **Testing on a phone:** use the `https://192.168.…:5173` Network address (or the QR code), and accept the certificate warning.
  - The **office network blocks device-to-device connections**, so test from home or via a phone hotspot.

### Working agreement
- When Claude edits files, **save or close those files in the editor first**. If the editor says "file changed on disk", load the new version.
  - On 2026-11-01, the editor saved older copies over Claude's edits twice.

---

## Roadmap to the Android app

Status: `[x]` done · `[~]` in progress / partly · `[ ]` to do

### Phase 0: Clean up and harden the web app
- [x] Install dependencies (`node_modules` was missing)
- [x] Leaflet CSS bundled locally (`import 'leaflet/dist/leaflet.css'` in `main.jsx`); CDN link removed
- [x] Map tiles quick fix: OSM attribution + policy-compliant URL `https://tile.openstreetmap.org/{z}/{x}/{y}.png`
- [x] Tabler icons bundled locally (`@tabler/icons-webfont`) instead of CDN `@latest`
- [x] Security clean-up: removed unused `ngrok`, ran `npm audit fix` (20 → 6 moderate warnings, all in ESLint dev tooling)
- [x] Desktop zoom buttons, bottom-right, styled like the left buttons
- [ ] Use the saved route instead of the live OSRM request (Issues #3)
- [ ] Better location handling (Issues #4)
- [ ] Layout reacts to resize / rotation (Issues #5)
- [ ] Settings fixes (Issues #6)
- [ ] Remove leftovers and dev-only dependencies (Issues #8)
- [~] **New map markers.** The old ones (pink pins, icons8 flags, Leaflet default pin) look too basic.
  - Style: white rounded badge with a pointer (matches the map buttons) and a symbol in Cultural Memory green `#658A63`. Selected = solid green, larger.
  - [~] **POI markers:** one symbol per `className` in `pois.js`. Code: `src/poiIcons.js` (add new categories to `POI_GLYPHS`), CSS block "POI markers" in `index.css`. Awaiting approval.
    - `area` (Tanning Houses, Katsampas): cluster of 3 houses
    - `consulate`: classical building with flag
    - `school`: graduation cap
    - `house`: house with chimney
    - `palace`: crown
    - `institution`: open book
    - `church`: Orthodox church with dome and cross
    - any other/missing className: dot (fallback)
  - [ ] Start / finish markers of the route (now icons8 flag PNGs)
  - [ ] "You are here" user marker (now Leaflet's default pin; also solves Issues #7)
  - [ ] Afterwards: delete unused PNGs in `public/icons/` and unused entries in `src/icons.js`

### Phase 1: Map tiles and offline decision
- [x] **Decided 2026-11-02: offline map bundled in the app.** Uses an OpenStreetMap vector extract in Protomaps **PMTiles** format (one file, no API key, no usage limits).
  - App direction: **"Paths of Memory of Chania"**, i.e. the whole central city, not only Halepa.
  - **Area:** Nea Chora / Kladissos (west) → Halepa / Koulouras (east), coast → Pasakaki / Deligianni (south), plus a small margin.
    - Bounding box: `--bbox=23.990,35.495,24.060,35.530` (west, south, east, north)
  - Expected size: a few MB (to be confirmed after extraction).
- [ ] **Decide map library:** keep Leaflet + `protomaps-leaflet` (small change; library is in maintenance mode) **or** switch to MapLibre GL via `react-map-gl` (recommended for the city-wide app; rewrite of the map part of `App.jsx`, plus bundled fonts/sprites)
- [ ] Make the map file on the dev machine (Claude's workspace cannot reach build.protomaps.com):
  - download `pmtiles.exe` from github.com/protomaps/go-pmtiles/releases
  - `pmtiles extract https://build.protomaps.com/<YYYYMMDD>.pmtiles chania.pmtiles --bbox=23.990,35.495,24.060,35.530`
  - check it at pmtiles.io, then put it in `public/maps/chania.pmtiles`
- [ ] Replace the OSM `TileLayer` with the PMTiles layer; keep "© OpenStreetMap" (+ Protomaps) attribution visible
- [ ] Limit panning/zoom to the covered area (`maxBounds`, `minZoom`)
- [ ] Label language follows the app language (`lang: 'el'` / `'en'`)
- [ ] Dark map style (`flavor: 'dark'`) follows dark mode
- [ ] **Test early in Capacitor:** PMTiles needs HTTP range requests; if the in-app server doesn't support them, load the whole file into memory instead
- [ ] Refresh the map file before each release (2-minute job)

### Phase 2: App identity
- [ ] Final app name (currently `halepa-walk` / package `vite-project` 0.0.0)
- [ ] App ID, permanent once published (proposal: `org.culturalmemory.halepawalk`)
- [ ] App icon 1024×1024 (from `public/icons/CM_logo.svg`) and splash screen
- [ ] Proper favicon and page title; `lang` attribute / language handling

### Phase 3: Installable web app (PWA): optional but recommended
- [ ] Web app manifest and service worker (`vite-plugin-pwa`), caching photos, route and map
- [ ] Deploy to hosting (GitHub Pages / Netlify / Vercel), using HTTPS
- [ ] QR code at the start of the walk pointing to the site (also covers iPhone users)

### Phase 4: Android app with Capacitor
- [ ] Install Android Studio
- [ ] `npm i @capacitor/core @capacitor/android @capacitor/geolocation` and `npm i -D @capacitor/cli`
- [ ] `npx cap init "<App name>" <app id> --web-dir dist` → `npm run build` → `npx cap add android`
- [ ] Replace `navigator.geolocation` with `@capacitor/geolocation`
- [ ] Add `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION` to `AndroidManifest.xml`
- [ ] Icons and splash: `npx @capacitor/assets generate`
- [ ] Check `targetSdkVersion` = **36** in `android/variables.gradle` (Play requirement since 31 Aug 2026)
- [ ] Test on a real phone (USB debugging), including walking the actual route

### Phase 5: Google Play preparation
- [ ] **Decide:** personal or organization developer account ($25 one-time)
  - Organization: needs a D-U-N-S number (free, can take 1–2 weeks); recommended for the Coop
  - Personal: needs a closed test with **12 testers for 14 consecutive days** before going public
- [ ] Privacy policy page (required because the app uses location)
- [ ] Store listing in EN + GR:
  - title (≤30 chars), short description (≤80), full description
  - 512×512 icon, 1024×500 feature graphic, ≥2 phone screenshots
- [ ] Data safety form, content rating questionnaire, target audience, ads declaration

### Phase 6: Signing and release
- [ ] Generate a signed App Bundle (.aab) in Android Studio
- [ ] **Back up the upload keystore and its password** (without them you cannot publish updates)
- [ ] Internal testing track → (closed test if personal account) → apply for production → review → publish

### Phase 7: Updates (after launch)
- Workflow: edit → `npm run build` → `npx cap sync` → raise `versionCode` in `android/app/build.gradle` → new .aab → upload

---

## Open issues (as of 2026-11-01)

1. ~~Tile URL~~ **Fixed 2026-11-01.** Remaining: OSM's tile policy forbids offline use and may block in-app traffic, so the Android app still needs Phase 1.
2. ~~Tabler icons from CDN~~ **Fixed 2026-11-01.** `@tabler/icons-webfont` ^3.50.0 is installed and imported in `main.jsx`. On a new machine, run `npm install` first.
3. **Route fetched live from `routing.openstreetmap.de` every time the app opens.**
   - The route never changes, so save the geometry as JSON in the project. That also makes it work offline.
   - It is currently fetched **twice**: `useOsrmRoute` is called in `App.jsx` (for route info) and again inside `RouteLayer`.
   - Some route stop labels are duplicated or missing ("Waypoint 9" twice, no "Waypoint 2"/"8").
4. **Location handling.**
   - The whole app waits on "Getting your location..." before showing anything.
   - On error it silently places the user at a made-up location (`[35.5138, 24.018]`).
   - Better: show the map immediately, and show a "location unavailable / permission denied" state.
5. **Layout not responsive at runtime.** `window.innerWidth` / `window.innerHeight` are read once while rendering.
   - Affected: mobile vs desktop panels, zoom buttons, recenter/settings button positions.
   - Rotating a phone or resizing the window does not update the layout. Use a resize listener / CSS media queries.
6. **Settings.**
   - Choices (dark mode, language, font size, route) reset on every visit; they should be saved.
   - The font-size setting only affects the desktop `SideSheet`, not the mobile `BottomSheet`.
   - In dark mode the map tiles and the white buttons stay light.
7. **Leaflet default marker icon after build.** The "You are here" pin uses Leaflet's default icon.
   - With bundlers it can show as a broken image after `npm run build`. Check once we build.
8. **Leftovers to clean up:**
   - `index copy.html`, `public/favicon_bak.svg`, `public/photos/5_bak*.jpg`
   - old `SettingsScreen.jsx` vs `testSettingsScreen.jsx`
   - unused imports (`btnStyle`, `Polyline`, `useMap`…)
9. **npm audit: 6 moderate warnings remain** in ESLint's dependencies (`minimatch` chain).
   - No fix exists yet. Dev tooling only; nothing ships to users. Re-run `npm audit` occasionally, and run `npm audit fix` (never `--force`) when updates appear.
10. **Accessibility.** Recenter and settings buttons have no `aria-label`.
11. **Photo sizes.** Some are up to ~400 KB; compress before bundling into the app.

## Decisions

| Date | Decision | Status |
|---|---|---|
| 2026-11-01 | Android route: Capacitor (wrap built app into a native project). Alternatives considered: PWA only, TWA wrapper | Recommended, to confirm |
| 2026-11-01 | Zoom +/− buttons on desktop only, bottom-right; phones use pinch-zoom | Done |
| 2026-11-02 | Map: offline OSM vector map (PMTiles) bundled in the app, covering central Chania (bbox 23.990,35.495,24.060,35.530) | Decided |
| – | Map library: Leaflet + protomaps-leaflet vs MapLibre GL | **Open** (MapLibre recommended) |
| – | Play account type: organization vs personal | **Open** |
| – | App name and app ID | **Open** |

---

## Diary

### 2026-11-01
- Reviewed options for an Android app:
  - PWA (no store)
  - TWA wrapper (Play Store, website inside)
  - Capacitor (real app, works offline)
  - Recommended: PWA first, then Capacitor for Play.
- Checked current Play rules:
  - target API 36 since 31 Aug 2026
  - 12 testers × 14 days for new personal accounts
  - sideloading verification planned globally from 2027
- `npm install` run (fixed "'vite' is not recognized").
- Leaflet CSS now imported from the npm package in `main.jsx`. The empty `src/leaflet.css` was the reason the map broke.
- OSM attribution added to the tile layer.
- Added desktop-only zoom control, bottom-right, styled like the left buttons (44×44, rounded, Tabler `ti-plus`/`ti-minus`).
  - It slides left of the side sheet when a POI is open (`.sheet-open` class + CSS in `index.css`).
- Tabler local-bundle change reverted (not installed yet). Still on CDN.
- Resolved issues #1 and #2:
  - tile URL changed to `https://tile.openstreetmap.org/{z}/{x}/{y}.png`
  - Tabler added to `package.json` + imported in `main.jsx`; CDN link removed from `index.html`
  - `npm install` run; Tabler now loads from the project
- Security: `npm install` reported 20 vulnerabilities, all in dev tooling.
  - Removed unused `ngrok`, ran `npm audit fix` → 6 moderate remain (ESLint, no fix available yet).
- Next up: decide on Phase 1 (hosted tiles vs offline map), then issue #3 (saved route).

### 2026-11-02
- Decided on an **offline map** built into the app. The app is growing into "Paths of Memory of Chania", so the map covers central Chania (Nea Chora → Halepa, coast → Pasakaki).
  - Bounding box `23.990,35.495,24.060,35.530`.
- Claude's workspace can't download from build.protomaps.com, so the map file has to be made on the dev machine with `pmtiles.exe` (steps in Phase 1).
- Open question: Leaflet + protomaps-leaflet vs MapLibre GL.
- Note: the editor again saved an old copy of CLAUDE.md over an update. **Close CLAUDE.md in the editor while Claude works.**

### 2026-11-08
- Phone couldn't open the dev server. Cause: the office Wi-Fi isolates devices; on another network it works.
- Restored the 2026-11-02 map notes in this file, which the editor had overwritten again before the commit.
- Still open: make `chania.pmtiles` (Phase 1 steps) and decide Leaflet + protomaps-leaflet vs MapLibre GL.

### 2026-11-09
- Added the "new map markers" action point.
- New POI markers built (custom SVG symbols per category, `src/poiIcons.js`).
  - All 14 POIs already had a `className`, so nothing was added to `pois.js`.
  - The old `icon: "location_icon"` field in `pois.js` is no longer used for POIs.
  - The separate selection-ring marker was removed; the selected POI now turns green and moves on top.
- Next: user approval of the POI markers → start/finish markers → user marker.
