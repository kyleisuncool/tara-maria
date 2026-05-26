import type { NextRequest } from 'next/server'
import type { BookingRequest, BookingResponse } from '@/modules/booking/types'

const CAL_API_BASE = 'https://api.cal.com/v2'
const CAL_API_KEY = process.env.CAL_API_KEY

// ─── Mock booking (used when CAL_API_KEY is not set) ──────────────────────────

function generateMockBooking(req: BookingRequest): BookingResponse {
  const start = new Date(req.startTime)
  const end = new Date(start.getTime() + 60 * 60 * 1000) // +1 hour default

  return {
    uid: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: `Session with ${req.name}`,
    startTime: req.startTime,
    endTime: end.toISOString(),
    status: 'ACCEPTED',
    attendee: {
      name: req.name,
      email: req.email,
    },
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const body: BookingRequest = await request.json()

  if (!body.name || !body.email || !body.startTime || !body.timezone) {
    return Response.json({ error: 'name, email, startTime, and timezone are required' }, { status: 400 })
  }

  // ── Stub mode ──────────────────────────────────────────────────────────────
  if (!CAL_API_KEY) {
    // Simulate network latency so the loading state is visible in dev
    await new Promise((r) => setTimeout(r, 900))
    return Response.json(generateMockBooking(body))
  }

  // ── Live Cal.com API ───────────────────────────────────────────────────────
  try {
    const payload = {
      start: body.startTime,
      eventTypeId: body.eventTypeId,
      attendee: {
        name: body.name,
        email: body.email,
        timeZone: body.timezone,
      },
      // Cal.com attendee object does not accept a notes field;
      // surface it via metadata so it appears in the dashboard
      ...(body.notes ? { metadata: { notes: body.notes } } : {}),
    }

    const res = await fetch(`${CAL_API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CAL_API_KEY}`,
        'cal-api-version': '2024-08-13',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      // Log the full Cal.com error so it's visible in server logs
      console.error('[/api/cal/bookings] Cal.com error body:', JSON.stringify(err))
      throw new Error((err as { message?: string }).message ?? `Cal.com API responded ${res.status}`)
    }

    const data = await res.json()
    const booking = data?.data

    return Response.json({
      uid: booking.uid,
      title: booking.title,
      startTime: booking.start,
      endTime: booking.end,
      status: booking.status,
      attendee: {
        name: body.name,
        email: body.email,
      },
    } satisfies BookingResponse)
  } catch (err) {
    console.error('[/api/cal/bookings]', err)
    return Response.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
