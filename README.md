# Tara-Maria

Website for Tara-Maria — Reiki, Akashic Readings, Sound Healing, and Hypnotherapy.

**Stack:** Next.js 16 · React 19 · Tailwind v4 · TypeScript  
**Deployed on:** Netlify (`main` branch auto-deploys)

---

## Getting started

```bash
npm install
npm run dev
```

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in values as needed. Never commit `.env.local`.

| Variable | Required | Description |
|---|---|---|
| `CAL_API_KEY` | For live booking | Cal.com API key (Settings → Developer → API Keys) |
| `ALLOWED_DEV_ORIGINS` | For device testing | Comma-separated IPs allowed to reach the dev server from other devices (see below) |

---

## Testing on a phone or tablet

Next.js 16 blocks cross-origin requests to dev resources by default. To load the local dev server from another device on the same network (iPhone, iPad, etc.), you need to explicitly whitelist your Mac's local IP.

**1. Find your local IP:**
```bash
ipconfig getifaddr en0
```

**2. Add it to `.env.local`:**
```
ALLOWED_DEV_ORIGINS=192.168.x.x
```

**3. Start the dev server bound to all interfaces:**
```bash
npm run dev -- --hostname 0.0.0.0
```

**4. Open on your device:** `http://<your-ip>:3000`

> Your IP changes when you switch networks — just update `.env.local`. Nothing in the committed code needs to change. Multiple IPs can be comma-separated: `192.168.1.42,192.168.1.55`

---

## Booking module

The booking flow lives in `src/modules/booking/` and is intentionally self-contained for reuse across future client projects. API calls are proxied through `src/app/api/cal/` to keep credentials server-side.

Both routes automatically return realistic stub data when `CAL_API_KEY` is not set — the full five-step booking flow works locally without a Cal.com account.

See [`TODO.md`](./TODO.md) for current status and what's needed to connect a live Cal.com account.

---

## Branches

| Branch | Purpose |
|---|---|
| `main` | Production — auto-deploys to Netlify |
| `booking-module` | Cal.com booking integration (in progress) |
