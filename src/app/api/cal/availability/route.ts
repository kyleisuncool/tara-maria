import type { NextRequest } from 'next/server'
import type { AvailabilityByDate } from '@/modules/booking/types'

const CAL_API_BASE = 'https://api.cal.com/v2'
const CAL_API_KEY = process.env.CAL_API_KEY

// ─── Mock data (used when CAL_API_KEY is not set) ─────────────────────────────

/**
 * Generates deterministic fake availability for a given month.
 * Weekdays only, 9am–4pm, with some slots pseudo-randomly excluded
 * so the calendar looks realistic during development.
 */
function generateMockSlots(year: number, month: number): AvailabilityByDate {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const daysInMonth = new Date(year, month, 0).getDate()
  const slots: AvailabilityByDate = {}

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    const dayOfWeek = date.getDay()

    // Skip weekends and past dates
    if (dayOfWeek === 0 || dayOfWeek === 6 || date < today) continue

    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    // Candidate hours (skip noon — Tara-Maria takes lunch)
    const hours = [9, 10, 11, 13, 14, 15, 16]
    const daySlots: string[] = []

    for (const hour of hours) {
      // Deterministic pseudo-random exclusion so the calendar looks natural
      const seed = (day * 7 + hour * 13) % 10
      if (seed > 2) {
        // Return as UTC noon + offset so displayed local times land in business hours
        // for most US timezones. Production Cal.com slots will be proper UTC.
        daySlots.push(`${dateStr}T${String(hour).padStart(2, '0')}:00:00.000Z`)
      }
    }

    if (daySlots.length > 0) {
      slots[dateStr] = daySlots
    }
  }

  return slots
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const month = searchParams.get('month')         // YYYY-MM
  const eventTypeId = searchParams.get('eventTypeId') // optional

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return Response.json({ error: 'month is required (format: YYYY-MM)' }, { status: 400 })
  }

  const [year, monthNum] = month.split('-').map(Number)

  // ── Stub mode ──────────────────────────────────────────────────────────────
  if (!CAL_API_KEY) {
    const slots = generateMockSlots(year, monthNum)
    return Response.json({ slots })
  }

  // ── Live Cal.com API ───────────────────────────────────────────────────────
  try {
    const startTime = new Date(year, monthNum - 1, 1).toISOString()
    const endTime = new Date(year, monthNum, 0, 23, 59, 59).toISOString()

    const url = new URL(`${CAL_API_BASE}/slots/available`)
    url.searchParams.set('startTime', startTime)
    url.searchParams.set('endTime', endTime)
    if (eventTypeId) url.searchParams.set('eventTypeId', eventTypeId)

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${CAL_API_KEY}`,
        'cal-api-version': '2024-08-13',
      },
      next: { revalidate: 60 }, // cache availability for 60 s
    })

    if (!res.ok) {
      throw new Error(`Cal.com API responded ${res.status}`)
    }

    const data = await res.json()

    // Cal.com v2 shape: { data: { slots: { "YYYY-MM-DD": [{ time: "..." }] } } }
    const rawSlots = data?.data?.slots ?? {}

    const slots: AvailabilityByDate = {}
    for (const [date, slotArr] of Object.entries(rawSlots)) {
      slots[date] = (slotArr as Array<{ time: string }>).map((s) => s.time)
    }

    return Response.json({ slots })
  } catch (err) {
    console.error('[/api/cal/availability]', err)
    return Response.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}
