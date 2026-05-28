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

## What's next — Stripe payment integration

### Decision: custom Stripe step, not Cal.com's native payment feature

**Why not Cal.com's built-in Stripe integration:**
- Requires a paid Cal.com plan
- Sends the user off-site to a Cal.com-hosted payment page mid-flow, breaking the branded experience
- We lose control at the most trust-sensitive moment

**The approach: Stripe Elements inline in the wizard**

Add a payment step between "Details" and "Confirmed". The Cal.com booking is only created *after* payment succeeds — so a booking is never created without payment.

```
Step 1: Session type
Step 2: Date
Step 3: Time
Step 4: Your details (name, email, notes)
Step 5: Payment  ← NEW (Stripe Elements card form)
Step 6: Confirmed
```

### Security model (important context)

**HTTPS:** Netlify provisions free SSL/TLS via Let's Encrypt automatically when a custom domain is attached. All traffic is HTTPS by default.

**Card data:** Stripe Elements renders the card form inside a Stripe-hosted `<iframe>`. Card numbers, CVV, and expiry go directly from the user's browser to Stripe's servers — they never touch our server, our code, or our database. We only ever receive a `PaymentIntent` ID (a token). This makes the integration PCI-DSS compliant out of the box.

**Localhost testing:** Stripe explicitly allows `localhost` for test mode, so the full payment flow can be built and verified before a domain is purchased.

### Proposed server-side flow

```
1. User completes steps 1–4 (session, date, time, details)
2. Client requests a PaymentIntent from our server
   POST /api/stripe/payment-intent { sessionId, amount }
3. Server creates PaymentIntent via Stripe API, returns { clientSecret }
4. Client mounts Stripe Elements using clientSecret
5. User enters card details (goes directly to Stripe, never our server)
6. Stripe confirms payment, returns success to client
7. Client calls our bookings route with paymentIntentId
8. Server verifies payment succeeded with Stripe (don't trust the client)
9. Server creates Cal.com booking
10. Confirmation shown to user
```

### Files to create

```
src/modules/booking/
  components/
    StepPayment.tsx              ← Stripe Elements card form
  hooks/
    usePaymentIntent.ts          ← fetches clientSecret from our API
src/app/api/stripe/
  payment-intent/route.ts        ← creates Stripe PaymentIntent server-side
```

### Files to update

```
src/modules/booking/
  types.ts                       ← add payment step to BookingStep, add price to SessionType
  config.ts                      ← add price per session type (need prices from Tara-Maria)
  components/BookingWidget.tsx   ← insert payment step into wizard flow
  hooks/useBooking.ts            ← accept paymentIntentId, pass to bookings route
src/app/api/cal/
  bookings/route.ts              ← verify Stripe payment before creating Cal.com booking
```

### New env vars needed

```
STRIPE_SECRET_KEY=sk_live_...     # Stripe dashboard → Developers → API Keys (server-side only)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # safe to expose to browser
```

Both need to be added to `.env.local` and Netlify environment variables.
Use `sk_test_` / `pk_test_` keys during development, `sk_live_` / `pk_live_` in production.

### Before starting

- [ ] Confirm Tara-Maria has a Stripe account (or set one up for the business)
- [ ] Get pricing for all four session types
- [ ] Add Stripe publishable + secret keys to `.env.local` and Netlify
- [ ] Install Stripe packages: `npm install stripe @stripe/stripe-js @stripe/react-stripe-js`

---

## How to run locally
```bash
npm run dev -- --hostname 0.0.0.0
```
The full booking flow (without payment) works with no credentials. With `CAL_API_KEY` set, it hits live Cal.com availability and creates real bookings.

## Deployment
`main` branch auto-deploys to Netlify. When `booking-module` is ready to ship, open a PR into `main`.
