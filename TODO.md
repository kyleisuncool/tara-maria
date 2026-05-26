# Booking Module — Where We Left Off

## Branch
`booking-module`

## What's done

The full booking UI and API proxy layer are built and passing a clean production build.

### Module: `src/modules/booking/`
A self-contained, reusable booking module designed to drop into any Next.js project.

- **`types.ts`** — all shared TypeScript types (SessionType, BookingRequest/Response, BookingStep, etc.)
- **`config.ts`** — session type definitions; `calEventTypeId` is `null` on all four until Cal.com event types are created
- **`hooks/useAvailability.ts`** — fetches monthly slot availability from our API proxy
- **`hooks/useBooking.ts`** — submits a booking request and returns the confirmed result
- **`components/BookingWidget.tsx`** — modal orchestrator; owns all wizard state, manages availability fetch, handles timezone detection
- **`components/StepSessionPicker.tsx`** — step 1: choose a session type (skipped when "Book" is clicked on a specific session)
- **`components/StepDatePicker.tsx`** — step 2: month calendar with available days highlighted
- **`components/StepTimePicker.tsx`** — step 3: time slots grouped by morning / afternoon / evening
- **`components/StepInfoForm.tsx`** — step 4: name, email, optional notes, submit
- **`components/StepConfirmation.tsx`** — step 5: success state with booking summary + Google Calendar link

### API proxy: `src/app/api/cal/`
- **`availability/route.ts`** — GET proxy to Cal.com v2 `/slots/available`; returns deterministic mock data when `CAL_API_KEY` is not set
- **`bookings/route.ts`** — POST proxy to Cal.com v2 `/bookings`; returns a mock booking confirmation when `CAL_API_KEY` is not set

### Booking page wiring
- **`src/app/booking/BookingSection.tsx`** — client component that renders the session list and manages the modal open/close state
- **`src/app/booking/page.tsx`** — remains a Server Component; imports `BookingSection`

### Env
- **`.env.local.example`** — documents the one required variable (`CAL_API_KEY`)

---

## What's next — Part 2

### 1. Get Cal.com event types set up
- Log into the Cal.com account
- Create four event types matching the session config:
  - Reiki Session (60 min)
  - Akashic Reading (60 min)
  - Sound Healing — Individual (60 min)
  - Hypnotherapy (90 min)
- Copy each event type's numeric ID from the URL (`cal.com/event-types/<ID>`)
- Paste IDs into `src/modules/booking/config.ts` → `calEventTypeId`

### 2. Wire up the API key
- Add `CAL_API_KEY=<your_key>` to `.env.local` locally (Settings → Developer → API Keys)
- Add the same variable to Netlify → Site settings → Environment variables
- Smoke test the full booking flow end-to-end

### 3. Test and polish
- Walk through all four session types in the live flow
- Confirm timezone display looks correct for Tara-Maria's likely user base (US timezones)
- Test on mobile — the modal is full-screen on small viewports, verify it feels right
- Check that the Google Calendar link in the confirmation step works

### 4. Nice-to-haves / future
- Cancellation / reschedule link in the confirmation email (Cal.com handles this automatically once live)
- Phone number field on `StepInfoForm` if Tara-Maria wants it
- Animate the step transitions (fade/slide between steps)
- Extract the module to a standalone npm package or shared repo for reuse across future client sites

---

## How to run locally
```bash
npm run dev
```
Navigate to `/booking`, click any "Book" button. The full five-step flow works with mock data — no Cal.com credentials needed.

## How to go live
1. Set event type IDs in `config.ts`
2. Add `CAL_API_KEY` to `.env.local` and Netlify env vars
3. Deploy — no other code changes required
