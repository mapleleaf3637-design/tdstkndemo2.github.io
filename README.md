# The Lost Elephant Archive — Prologue

A standalone, **static GitHub Pages-compatible** mobile-landscape Visual Novel Prologue for **Hồ sơ voi thất lạc**, with a six-branch Archive Entry screen and replaceable Stage 1 / Stage 2 / Epilogue modules.

All player-facing story dialogue is in Vietnamese. The project uses HTML, CSS, and vanilla JavaScript ES modules — no build step, server, framework, account, or API required.

## Contents

```text
the-lost-elephant-archive/
├── index.html
├── assets/prologue/1.png ... 9.png    ← the supplied nine illustrations
├── css/
│   ├── global.css
│   └── prologue.css
├── js/
│   ├── main.js
│   ├── config.js                   ← image directory, dialogue speed
│   ├── router.js                   ← five screens and hash navigation
│   ├── gameState.js                ← persistent independent progress flags
│   ├── data/prologue-scenes.js     ← all nine scene descriptions / dialogue
│   ├── components/ProloguePlayer.js
│   ├── screens/ArchiveEntry.js
│   ├── screens/Epilogue.js
│   ├── stages/stage1.js            ← replaceable placeholder + tutorial info
│   └── stages/stage2.js            ← replaceable placeholder
└── README.md
```

## 1. Image files

The archive already includes the nine user-provided images, renamed **without altering their content**, in `assets/prologue/1.png` through `9.png`.

If you create a new repository manually, upload those files with those exact names. Never change the filenames without also changing the scene references in `js/data/prologue-scenes.js`. If you change the whole image folder, adjust `IMAGE_DIRECTORY` once in `js/config.js`.

The illustrations in scenes 4–7 are conceptual artwork, not exact museum artifact records; avoid attaching invented factual descriptions to them. Historical elephant riding imagery in scene 5 is not presented as a contemporary conservation recommendation.

## 2. Run locally

ES modules should run over HTTP rather than opening `index.html` from `file://`.

With Python installed, open a terminal **inside this directory** and run:

```bash
python -m http.server 8000
```

Open <http://localhost:8000/> in your browser. Alternatively use VS Code's **Live Server** extension.

For mobile tests, use your computer's local IP and the same port when both devices are on the same Wi-Fi network (and local firewall permissions allow it). Rotate the phone to landscape.

## 3. Publish to GitHub Pages

1. Create a GitHub repository, e.g. `lost-elephant-archive`.
2. Upload **the contents of this folder** to the repository root so `index.html` is at the root; keep the `assets`, `css`, and `js` subfolders intact.
3. Go to **Repository Settings → Pages → Build and deployment**.
4. Choose **Deploy from a branch**, select branch `main` and folder `/(root)`, then save.
5. After deployment, open the Pages URL GitHub provides (usually `https://<username>.github.io/<repository>/`).

All scripts, styles and illustration references are **relative**; the site works under `/<repository>/`, without server-side routing or a special `404.html`.

## 4. Dialogue and navigation

- Edit story copy and speaker labels in **`js/data/prologue-scenes.js`** only. Add a new scene as another entry with `id`, `title`, `image`, `effect`, and `dialogue` objects. The player automatically updates its scene count and next-scene navigation.
- `ProloguePlayer.js` handles the typewriter, taps, transitions, and illustration loading; no dialogue is hardcoded there.
- A **tap while typing** completes the current line. A **second tap** advances to the next line or scene. The first sentence in scene 1 types more slowly for atmosphere.
- Enter / Space also advance; when a button is focused, its native keyboard action takes precedence. Scene buttons do not trigger dialogue click handling.
- The **Aa BẬT/TẮT** control turns typewriter effects on/off and remembers the preference in localStorage. `prefers-reduced-motion` is respected.
- On scene 9, finishing the final sentence reveals **KHỞI HÀNH — ENTER ARCHIVE**. Tapping the button or advancing the final line goes to the Archive.
- **SKIP »** always goes directly to the **same Archive Entry**. It never starts Stage 1 or marks the Stage 1 tutorial complete.
- **XEM LẠI CỐT TRUYỆN** returns to scene 1 without clearing saved game progress.

## 5. Future Stage 1 integration (important)

Stage 1 currently includes an **explicit placeholder instruction panel** so that the Prologue can already be played end-to-end. The real Stage 1 tasks/tutorial have **not** been built.

1. Replace `mountStage1()` inside **`js/stages/stage1.js`** with the real gameplay component. Keep the signature `(root, { onBack })` or adjust the router import.
2. At the beginning of Stage 1, check `getGameState().stage1TutorialCompleted`. When `false`, show the required interactive tutorial before opening the first evidence task.
3. **Only after the actual Stage 1 tutorial has been shown/completed**, call `setStage1TutorialCompleted()` from `js/gameState.js`.
4. After a challenge validates the relevant evidence, call `restoreKnowledgeBranch('behavior')`, `restoreKnowledgeBranch('domestication')`, or `restoreKnowledgeBranch('care')` to unlock that Archive node. Do not unlock branches when the cutscene ends.
5. Go back to the Archive using `onBack()`, or `showArchiveEntry()` from `js/router.js`. The Archive automatically reads state and updates its labels and progress.
6. If Stage 1 needs to carry more data, add fields in `gameState.js`. Never clear existing progress in a prologue replay.

Stage 2 has a parallel placeholder in `js/stages/stage2.js` and can use branch keys `culture`, `society`, and `economy` when you develop it. Its route exists now (`#/stage-2`), but all its Archive branches are initially locked. The Epilogue route (`#/epilogue`) is also reserved.

## 6. Router API

```js
import {
  showPrologue,
  showArchiveEntry,
  startStage1,
  startStage2,
  showEpilogue,
} from './js/router.js';
```

Routes are `#/prologue`, `#/archive`, `#/stage-1`, `#/stage-2`, and `#/epilogue`. Browser Back/Forward are handled with `hashchange` and automatically teardown the old screen/player. Direct linking to a valid route is supported.

Saved `gameState` includes: `currentStage`, `completedStages`, `unlockedBranches`, `collectedEvidence`, `prologueStatus`, and `stage1TutorialCompleted`. Only the fields needed by the prototype are actively modified. `localStorage` errors are caught so private browsing doesn't crash the game.

## 7. Mobile and accessibility notes

- Designed first for smartphones **in landscape**, but scales to desktop and wider screens.
- Illustration foreground uses `object-fit: contain`, maintaining its full composition. An atmospheric image backdrop fills spare side margins on wider phones.
- An unobtrusive portrait-orientation screen prompts phone rotation; **Vẫn tiếp tục ở chế độ dọc** provides an accessibility fallback.
- Controls are real HTML buttons with keyboard focus styling; readable contrast, safe-area padding and optional reduced motion are included.
- No sound autoplay, WebGL, large frameworks or external CDNs.

## Quick manual acceptance test

1. Open the site: illustration **1** and scene 1 start.
2. While words are appearing, tap: all text should appear. Tap again: the next line appears.
3. Continue through scenes **1–9** and observe the respective backgrounds.
4. On scene 9, select **KHỞI HÀNH**: the interactive Archive opens with six branch buttons and `0/6` restored.
5. Select **ENTER ARCHIVE**: Stage 1 placeholder with tutorial introduction opens.
6. Return to Archive, select **XEM LẠI CỐT TRUYỆN**, then **SKIP »**: Archive opens, no Stage 1 tutorial completion is recorded.
7. Check `#/archive` and browser Back/Forward; confirm no repeated event handling or accidentally skipped dialogue.
8. Check in a narrow mobile landscape viewport and a portrait viewport.

---

This build prioritizes a functional Prologue, stable navigation and a clean integration boundary. Actual evidence gameplay and museum-derived explanatory content belong in the future Stage modules.
