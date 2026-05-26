// ─── Session Types ────────────────────────────────────────────────────────────

export type SessionFormat = 'remote' | 'in-person' | 'both'

export interface SessionType {
  id: string
  num: string
  name: string
  duration: number       // minutes
  format: SessionFormat
  formatLabel: string
  desc: string
  calEventTypeId: number | null  // null until Cal.com event types are configured
}

// ─── Availability ─────────────────────────────────────────────────────────────

/** Keyed by YYYY-MM-DD, values are arrays of ISO datetime strings (UTC) */
export type AvailabilityByDate = Record<string, string[]>

export interface AvailabilityResponse {
  slots: AvailabilityByDate
  error?: string
}

// ─── Booking ──────────────────────────────────────────────────────────────────

export interface BookingRequest {
  eventTypeId: number | null
  startTime: string       // ISO datetime (UTC)
  name: string
  email: string
  notes?: string
  timezone: string
}

export interface BookingResponse {
  uid: string
  title: string
  startTime: string
  endTime: string
  status: string
  attendee: {
    name: string
    email: string
  }
  error?: string
}

// ─── Wizard State ─────────────────────────────────────────────────────────────

export type BookingStep = 'session' | 'date' | 'time' | 'info' | 'confirmed'

export interface BookingState {
  step: BookingStep
  session: SessionType | null
  date: string | null     // YYYY-MM-DD
  slot: string | null     // ISO datetime (UTC)
  name: string
  email: string
  notes: string
  timezone: string
  result: BookingResponse | null
}
