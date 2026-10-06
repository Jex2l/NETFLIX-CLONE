# 🍿 Popcorn — Netflix-style streaming platform

A Netflix-clone streaming platform built as four independent services: a
customer-facing frontend, an admin panel for managing the catalog, a REST
API, and a file server for uploaded images/video.

## Services

| Service | Stack | Default port | Role |
|---|---|---|---|
| [`popcorn-frontend-main`](popcorn-frontend-main) | React (MUI, axios, Razorpay checkout, react-player) | 3000 | Customer-facing site: browse, watch, pay |
| [`popcorn-admin-main`](popcorn-admin-main) | React (MUI) | 3000 | Admin panel: add movies/web series/episodes, manage the homepage carousel |
| [`popcorn-api-main`](popcorn-api-main) | Node/Express + MongoDB (Mongoose) | 7000 | Auth, movies/web series catalog, carousel, filters, Razorpay payment verification |
| [`popcorn-movies-server-main`](popcorn-movies-server-main) | Node/Express + multer | 8000 | Stores and serves uploaded images/video files |

```
frontend (3000) ─┐
                  ├──► popcorn-api-main (7000) ──► MongoDB
admin (3000*)   ─┘         ▲
                            │
                  popcorn-movies-server-main (8000)  (direct image/video upload + static file serving)
```
\* frontend and admin both default to port 3000 — run only one at a time
locally, or override `PORT` for one of them (`PORT=3001 npm start`).

Each service is a standalone app with its own `package.json`, Dockerfile,
and Jenkinsfile (the Jenkinsfiles target the original `movizrate.cloud`
deployment and aren't needed for local development). There's no root-level
orchestration (no docker-compose) — start each service independently.

## ⚠️ Security note (read before running this)

This repo previously had **real-looking secrets committed directly in
`popcorn-api-main/config.json` and `popcorn-frontend-main/src/config.json`**:
a Gmail address + app password used to send verification emails, a Razorpay
test key *and secret*, and a JWT signing secret. All of these have been
moved to environment variables (see Setup below) and `config.json` is now
gitignored.

**If this repository was ever pushed with the old `config.json` files
committed, treat those credentials as compromised**, even though the
Razorpay keys are in Razorpay's *test* mode:
- Change the Gmail account's app password (or revoke it) at
  [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
- Regenerate the Razorpay test key pair in the
  [Razorpay dashboard](https://dashboard.razorpay.com/app/keys).
- The committed `JWT_SECRET` was, notably, not even a real secret — it was
  a copy of the public example token from jwt.io. Any token signed with it
  should be considered forgeable; use a fresh random string going forward.

The Razorpay **secret** was also being shipped to the browser in
`popcorn-frontend-main/src/config.json`, which it never needs (only the
public `key` is used client-side for Razorpay's checkout widget; the secret
is only for server-side signature verification, which `popcorn-api-main`
already does independently). It's been removed from the frontend config.

## Setup

### 1. popcorn-api-main (start this first — the others depend on it)

```bash
cd popcorn-api-main
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, EMAIL_ID/PASSWORD, RAZORPAY_KEY/SECRET
npm start               # nodemon index.js, listens on PORT (default 7000)
```

### 2. popcorn-movies-server-main

```bash
cd popcorn-movies-server-main
npm install
cp .env.example .env   # optional - sensible localhost defaults are used if skipped
npm start               # listens on PORT (default 8000)
```

### 3. popcorn-frontend-main / popcorn-admin-main

```bash
cd popcorn-frontend-main   # or popcorn-admin-main
npm install
npm start
```

Both currently point `src/config.json` at the original production hostnames
(`popcornapi.movizrate.cloud`, `popcorndataserver.movizrate.cloud`) rather
than reading from environment variables. **For local development, edit
`src/config.json` in each to point at your local API
(`http://localhost:7000`) and file server (`http://localhost:8000`)** before
running `npm start`.

## Bugs fixed in this pass

- `popcorn-api-main/db.js` and the movies-server had the same dead
  `if (!connect)` / `req.file === null` pattern as elsewhere in this
  workspace: `connect` is a function reference (always truthy) and multer
  sets a missing file to `undefined`, not `null` — so neither check ever
  fired. The Mongo connection error branch was silently unreachable, and a
  movies-server upload with no file attached would crash on
  `req.file.filename` instead of returning its intended 400 response. Both
  are now correct (`!req.file`, and a real `.catch` on the Mongo connect).
- `popcorn-movies-server-main`'s upload responses hardcoded the production
  file-server URL (`popcorndataserver.movizrate.cloud`) even when running
  locally. Now built from `FILE_SERVER_BASE_URL` (defaults to
  `http://localhost:<port>`).
- Removed a commented-out dead `express-fileupload` import, and a
  no-op `fileFilter` block inside `multer.diskStorage()` (that option isn't
  read from `diskStorage`'s config — it's silently ignored there; actual
  file validation isn't implemented, see Known gaps).

## Known gaps (not fixed in this pass)

- `popcorn-movies-server-main`'s `/uploadimage` and `/uploadmovie` have no
  authentication or rate limiting — anyone who can reach the service can
  upload files. Worth gating behind the same JWT auth `popcorn-api-main`
  already uses, especially since it accepts arbitrary file uploads.
- `popcorn-frontend-main` and `popcorn-admin-main` still require manually
  editing `src/config.json` to run against a local backend rather than
  reading from environment variables (Create React App's `REACT_APP_*`
  convention would be the natural fix, but it touches ~17 files across both
  apps — out of scope for this pass).
