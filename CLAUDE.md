# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site (Create React App, React 19) published at https://ivanlado.github.io. Single page, no router, no backend.

## Commands

- `npm start` — dev server (react-scripts)
- `npm run build` — production build into `build/` (gitignored)
- `npm test` — Jest watch mode; single test: `npm test -- -t "<test name>"` or `npm test -- src/App.test.js`; non-interactive: `CI=true npm test`
- `npm run deploy` — runs `build` (via `predeploy`) and publishes `build/` to the `gh-pages` branch with `gh-pages`. This pushes to the live site, so ask before running it.

Linting is CRA's built-in ESLint (`react-app` config), surfaced during `start`/`build`. There is no separate lint script.

Note: `src/App.test.js` is the unmodified CRA template (looks for "learn react") and fails against the current app.

## Architecture

**Content lives in `src/assets/data.json`.** Nearly all portfolio edits (new project, job, degree, text changes) are data edits, not component edits. Top-level keys: `meta`, `social`, `profile`, `about`, `education`, `experience`, `projects`, `footer`. `App.js` imports the JSON and passes it down as the `data` prop.

**Component flow:** `App` → `Header` (profile) + `pages/Home` → `AcademicBg` (education), `Experience`, `Projects`. `Home` owns the single shared modal state (`modalProject`, `openModal`, `closeDialog`) and passes it to all three sections; `ProjectInfo` renders the modal for a project object (image carousel + description + optional list sections).

**Project entry fields that drive rendering** (`Projects.js` / `ProjectInfo.js`):
- `show: false` hides the card.
- `live`, `repo`, `prototype` (Figma), `moreInfoLink` produce buttons. The in-app "More info" modal button appears only when there's neither `moreInfoLink` nor `prototype`.
- Modal needs `carousel` (array of image paths, may be empty) and `skills`. Optional list sections: `objectives`, `results`, `features`, `challenges`, `learnt-lessons`.

**Index coupling:** in `AcademicBg.js`, an education `details` entry with a `more` field opens `data.projects[i]`, where `i` is the detail's index within that degree. The thesis projects therefore have to stay at the start of the `projects` array, in the same order as the details. Reordering `projects` breaks those "More" buttons.

**Assets:** images are served statically from `public/assets/images/...` and referenced in JSON/JSX by relative paths such as `./assets/images/foo.png`, not imported through webpack. Styles are plain CSS in `src/App.css`, `src/index.css`, and `src/styles/`.
