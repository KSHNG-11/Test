# Test

## Frenchcore Academy

`frenchcore-academy/` is a Duolingo-style course for learning FL Studio and frenchcore
production, written in English. It is an installable web app (PWA): once installed it opens
from your home screen like a normal app and works offline. Progress is saved on the device.

### Install it

The app must be served over https (or `localhost`) to install; opening `index.html` as a
local file works for using it, but not for installing it.

- **Host it**: with GitHub Pages enabled on this repository, the app lives at
  `https://<user>.github.io/<repo>/frenchcore-academy/`. Any static host works; there is no build step.
- **Android / Chrome / Edge (desktop)**: open that address, then tap **Install** in the app's
  Settings section (or the browser's *Install app* menu entry).
- **iPhone / iPad**: open the address in Safari, tap **Share**, then **Add to Home Screen**.
- **Try it locally**: `python3 -m http.server` from the repository root, then open
  `http://localhost:8000/frenchcore-academy/`.

When you change any app file, bump `VERSION` in `frenchcore-academy/sw.js` so installed
copies download the update.

### Files

- `index.html`: the whole app (lessons, audio engine, interface).
- `manifest.webmanifest`, `sw.js`: installability and offline cache.
- `icons/`: app icons (SVG sources and PNG exports, including a maskable icon).
- `fonts/`: self-hosted fonts (Big Shoulders Display, Atkinson Hyperlegible, JetBrains Mono;
  all under the SIL Open Font License 1.1) so the app looks right offline.

What's inside:

- **Learn**: 8 units and 21 bite-sized lessons (FL Studio basics, tempo and rhythm,
  kick anatomy, distortion and the tail, groove and sidechain, arrangement, remixing into
  frenchcore, mix and loudness). Exercises include multiple choice, true/false, calculations,
  ordering, matching, listening tests and step-sequencer challenges. XP, daily goal,
  streak and hearts are included.
- **Labs**: a Kick Lab that synthesises a frenchcore kick live (pitch drop, tuned tail,
  click, distortion) and draws its waveform against the next beat, and a 16-step Beat Lab.
- **Tools**: tempo to milliseconds, a remix tempo planner (straight vs half-time,
  semitone shift when resampling), and a note-frequency table.
- **Glossary** with sources.

All sounds are generated with the Web Audio API; there are no audio files.
