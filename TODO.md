# Tara-Maria — Project Status

## Done ✓

### Site & design system
- Next.js 16 (App Router) + TypeScript + Tailwind, deployed on Netlify
- Grove Synthesis design system: Gloock/Bitter serif pairing, OKLCH palette, botanical motifs
- Responsive homepage with hero, services, events placeholder, about teaser, newsletter form
- `/about` page
- `/booking` page
- All three photos dropped in and wired up
- Positioning pivot: leads with sound healing, surfaces RN background, broadens audience framing

### Booking module (`src/modules/booking/`)
- 5-step wizard: Session → Date → Time → Details → Confirmed
- Cal.com API integration (live event type IDs wired in for all four sessions)
- Full timezone detection
- Tested end-to-end locally and on mobile (iPhone)
- Real bookings confirmed: appear in Cal.com dashboard, confirmation email received, Google Calendar link works

### Stripe payment integration
- Payment step inserted between Details and Confirmed
- Toggle: payments live when `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set; removing it skips the step entirely with no code changes
- Stripe Elements form themed to match the design system (Bitter font, Grove palette)
- Server-side PaymentIntent creation and verification before Cal.com booking is created
- Mock/dev mode when Stripe keys or prices are absent
- `netlify.toml` added to exempt publishable key from Netlify secrets scanner

### Pricing
- Sound Healing — Individual: $222
- Hypnotherapy: $300
- Reiki Session: $180
- Akashic Reading: $300
- Prices surfaced on the home page (services section) and booking page — pulled from a single source in `config.ts`

---

## Remaining

### Content & copy (partially on Tara-Maria)
- [ ] Review and finalize all homepage copy (hero, "Who this is for", services descriptions, about teaser)
- [ ] Review and finalize `/about` page copy
- [ ] Confirm session descriptions in `src/modules/booking/config.ts` match what Tara-Maria wants shown in the booking wizard
- [ ] Add real events to the events section when scheduled (currently placeholder)
- [ ] Provide reference URLs for the PRODUCT.md References section

### Newsletter — Flodesk integration
- [ ] Get Flodesk embed code or API credentials from Tara-Maria
- [ ] Wire up the newsletter form on the homepage (`src/app/page.tsx` → newsletter section)
- [ ] Options: Flodesk inline embed (simplest) or POST to Flodesk API from a Next.js route (`/api/newsletter`)
- [ ] Test signup flow end-to-end

### Production go-live
- [ ] Confirm Tara-Maria has a Stripe account (or set one up for the business)
- [ ] Swap Stripe test keys for live keys in Netlify environment variables
- [ ] Attach custom domain in Netlify → SSL provisions automatically
- [ ] Verify one real booking and payment end-to-end before announcing
- [ ] Remove or update the placeholder Partiful links in the events section

---

## How to run locally
```bash
npm run dev -- --hostname 0.0.0.0
```
- Full booking flow works with no credentials (mock mode)
- Set `CAL_API_KEY` in `.env.local` for live Cal.com availability and real bookings
- Set `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (test keys) for the real Stripe payment form

See `.env.local.example` for all variables and setup instructions.

## Deployment
`main` auto-deploys to Netlify on every push.
