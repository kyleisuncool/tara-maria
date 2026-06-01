# Booking Module — Handoff Notes

## Branch
`booking-module`

---

## What's done ✓

### Module: `src/modules/booking/`
A self-contained, reusable booking module designed to drop into any Next.js project.

- **`types.ts`** — all shared TypeScript types (SessionType, BookingRequest/Response, BookingStep, etc.)
- **`config.ts`** — session type definitions with live Cal.com event type IDs wired in
- **`hooks/useAvailability.ts`** — fetches monthly slot availability from our API proxy
- **`hooks/useBooking.ts`** — submits a booking request and returns the confirmed result
- **`components/BookingWidget.tsx`** — modal orchestrator; owns all wizard state, manages availability fetch, timezone detection
- **`components/StepSessionPicker.tsx`** — step 1: choose a session type (skipped when a specific "Book" button is clicked)
- **`components/StepDatePicker.tsx`** — step 2: month calendar with available days highlighted
- **`components/StepTimePicker.tsx`** — step 3: time slots grouped by morning / afternoon / evening
- **`components/StepInfoForm.tsx`** — step 4: name, email, optional notes, submit
- **`components/StepConfirmation.tsx`** — step 5: success state with booking summary + Google Calendar link

### API proxy: `src/app/api/cal/`
- **`availability/route.ts`** — GET proxy to Cal.com v2 `/slots/available`; returns deterministic mock data when `CAL_API_KEY` is not set
- **`bookings/route.ts`** — POST proxy to Cal.com v2 `/bookings`; returns mock confirmation when `CAL_API_KEY` is not set. Notes are passed via `metadata` (not inside the `attendee` object — Cal.com rejects that).

### Booking page wiring
- **`src/app/booking/BookingSection.tsx`** — client component that renders the session list and manages the modal open/close state
- **`src/app/booking/page.tsx`** — remains a Server Component; imports `BookingSection`

### Cal.com event types (live)
All four event types are created, IDs are wired into `config.ts`:

| Session | Cal.com Event Type ID |
|---|---|
| Reiki Session | 5816597 |
| Akashic Reading | 5816606 |
| Sound Healing — Individual | 5816616 |
| Hypnotherapy | 5816624 |

### Environment
- `CAL_API_KEY` is set in `.env.local` locally and in Netlify environment variables (marked as secret)
- `ALLOWED_DEV_ORIGINS` is set in `.env.local` for local device testing — see `README.md` for instructions
- `.env.local.example` documents all variables

### Tested and verified ✓
- Full five-step booking flow works end-to-end locally and on mobile (iPhone)
- Real Cal.com availability is returned for all event types
- Booking confirmed: session appears in Cal.com dashboard, confirmation email received, Google Calendar link works
- Netlify deploy is live on the test domain with `CAL_API_KEY` in production env vars

---

## Stripe payment integration ✓

Built. The wizard now supports an optional payment step between Details and Confirmed.

### How the toggle works

Payments are controlled entirely by environment variables — no code changes needed to enable or disable them.

| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `price` in `config.ts` | Result |
|---|---|---|
| Not set | anything | Payment step **skipped**. Booking goes straight to Cal.com. Original 5-step flow. |
| Set (test or live) | `null` | Payment step **shown** in **dev/mock mode** — bypass button, no real charge. |
| Set (test or live) | a number (cents) | Payment step **shown** with real Stripe Elements form. |

To disable payments at any time: remove `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` from your environment and redeploy. The step disappears from the wizard with no code changes.

### Security model

**Card data:** Stripe Elements renders the card form inside a Stripe-hosted `<iframe>`. Card numbers, CVV, and expiry go directly from the user's browser to Stripe's servers — they never touch our server or our code. We only ever receive a `PaymentIntent` ID. This is PCI-DSS compliant out of the box.

**Server-side verification:** The bookings route retrieves the `PaymentIntent` from Stripe and confirms `status === 'succeeded'` before creating the Cal.com booking. The client cannot fake a successful payment.

**HTTPS:** Netlify provisions free SSL/TLS via Let's Encrypt automatically when a custom domain is attached.

### Server-side flow (implemented)

```
1. User completes steps 1–4: session, date, time, details
2. Wizard advances to payment step
3. Client POSTs to /api/stripe/payment-intent { sessionId }
4. Server looks up session price from config, creates PaymentIntent via Stripe API
5. Server returns { clientSecret } to client
6. Client mounts Stripe Elements using clientSecret
7. User enters card details → go directly to Stripe, never our server
8. Stripe confirms payment, returns paymentIntent.id to client
9. Client POSTs to /api/cal/bookings with paymentIntentId
10. Server retrieves PaymentIntent from Stripe, verifies status === 'succeeded'
11. Server creates Cal.com booking
12. Confirmation shown to user
```

---

### Testing locally

**1. Get Stripe test keys**

Log into [dashboard.stripe.com](https://dashboard.stripe.com) → **Developers → API Keys**. Confirm the toggle in the top-left reads **Test mode**. Copy:
- Publishable key: `pk_test_...`
- Secret key: `sk_test_...` (click Reveal)

**2. Add to `.env.local`**

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Restart the dev server after — Next.js doesn't hot-reload env changes.

**3. Set at least one price in `config.ts`**

Until Tara-Maria confirms pricing, add a placeholder in cents on one session to test the real Stripe form:

```ts
// src/modules/booking/config.ts
{ id: 'sound-healing', ..., price: 15000 }  // $150 placeholder
```

Without a price, the payment step shows a dev-mode bypass button instead of the real form (which is fine for flow testing, but won't test the actual Stripe integration).

**4. Test with Stripe test cards**

| Card number | Result |
|---|---|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 9995` | Insufficient funds (decline) |
| `4000 0025 0000 3155` | Requires 3D Secure authentication |

Expiry: any future date. CVC: any 3 digits. ZIP: any 5 digits.

After a successful test payment: check **Stripe dashboard → Test mode → Payments** to confirm the charge appears, and **Cal.com dashboard** to confirm the booking was created.

---

### Testing on Netlify (before production)

**Option A — Branch deploy (recommended)**

1. Push `booking-module` to origin
2. In Netlify: **Site → Environment Variables**, add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` using test keys
3. In Netlify: **Deploys → Branch deploys**, enable `booking-module` to get a preview URL
4. Test the full flow on the preview URL with test cards
5. Verify charges in Stripe (test mode) and bookings in Cal.com

**Option B — Test on the live test domain**

Merge `booking-module` into `main`, add the test env vars to Netlify, and verify on the test domain before attaching a real custom domain.

---

### Going to production

- [x] Confirm pricing with Tara-Maria → update `price:` (cents) for all four session types in `config.ts`
- [ ] Confirm Tara-Maria has a Stripe account (or set one up for the business)
- [ ] In Stripe dashboard → switch to **Live mode** → copy `sk_live_...` and `pk_live_...`
- [ ] In Netlify → replace test keys with live keys → redeploy
- [ ] Verify one real booking end-to-end before announcing

### Env vars (both environments)

```
STRIPE_SECRET_KEY=             # sk_test_... locally / sk_live_... in production (server-side only)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=   # pk_test_... locally / pk_live_... in production
```

---

## How to run locally
```bash
npm run dev -- --hostname 0.0.0.0
```
The full booking flow (without payment) works with no credentials. With `CAL_API_KEY` set, it hits live Cal.com availability and creates real bookings.

## Deployment
`main` branch auto-deploys to Netlify. When `booking-module` is ready to ship, open a PR into `main`.
