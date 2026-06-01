import type { SessionType } from './types'

/**
 * Session type definitions for Tara-Maria.
 *
 * calEventTypeId maps to the numeric ID in the Cal.com event type URL:
 * app.cal.com/event-types/<id>
 *
 * price is in cents (USD). Set to null until pricing is confirmed with
 * Tara-Maria; the booking flow works without it when payments are disabled.
 *
 * The API routes fall back to mock data when CAL_API_KEY is not set in the
 * environment, so the full booking flow works locally without credentials.
 */
export const SESSION_TYPES: SessionType[] = [
  {
    id: 'sound-healing',
    num: '01',
    name: 'Sound Healing — Individual',
    duration: 60,
    format: 'in-person',
    formatLabel: 'In person',
    desc: 'A private sound healing session tailored to your nervous system and intention. Deep listening, deep rest. No experience required.',
    calEventTypeId: 5816616,
    price: 22200,
  },
  {
    id: 'hypnotherapy',
    num: '02',
    name: 'Hypnotherapy',
    duration: 90,
    format: 'remote',
    formatLabel: 'Remote via Zoom',
    desc: 'A guided subconscious session to shift patterns and reconnect with your own knowing. Includes a custom audio recording sent after the session for continued support.',
    calEventTypeId: 5816624,
    price: 30000,
  },
  {
    id: 'reiki',
    num: '03',
    name: 'Reiki Session',
    duration: 60,
    format: 'both',
    formatLabel: 'Remote or in person',
    desc: 'A quiet, held session working with your energy field. Arrive however you are — depleted, activated, uncertain. The session meets you there. Available hands-on or at distance.',
    calEventTypeId: 5816597,
    price: 18000,
  },
  {
    id: 'akashic',
    num: '04',
    name: 'Akashic Reading',
    duration: 60,
    format: 'remote',
    formatLabel: 'Remote via Zoom',
    desc: "A guided exploration of your soul's energetic record. Readings are conversational and practical. You may bring specific questions or arrive open — both work.",
    calEventTypeId: 5816606,
    price: 30000,
  },
]

/**
 * Payment toggle: true when NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set.
 * To disable payments, remove the key from your environment and redeploy.
 */
export const PAYMENTS_ENABLED = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
