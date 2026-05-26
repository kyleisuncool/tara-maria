'use client'

import type { BookingResponse, SessionType } from '../types'

interface Props {
  result: BookingResponse
  session: SessionType
  timezone: string
  onClose: () => void
}

function formatDateTime(isoString: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(new Date(isoString))
  } catch {
    return isoString
  }
}

function googleCalendarUrl(result: BookingResponse, session: SessionType): string {
  const start = new Date(result.startTime)
  const end = new Date(result.endTime)

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: result.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Session type: ${session.name}\nFormat: ${session.formatLabel}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function StepConfirmation({ result, session, timezone, onClose }: Props) {
  return (
    <div className="text-center">
      {/* Check mark */}
      <div className="mx-auto mb-7 flex items-center justify-center w-16 h-16 rounded-full bg-teal/10">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8 text-teal"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="font-display text-forest text-2xl tracking-tight mb-3">
        You&apos;re booked.
      </h2>
      <p className="text-earth/55 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
        A confirmation has been sent to{' '}
        <span className="text-earth/80">{result.attendee.email}</span>.
      </p>

      {/* Booking summary */}
      <div className="rounded-xl border border-earth/10 bg-cream px-5 py-5 text-left mb-8 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <span className="text-earth/40 text-xs uppercase tracking-wide pt-0.5">Session</span>
          <span className="text-earth/80 text-sm text-right">{session.name}</span>
        </div>
        <div className="h-px bg-earth/8" />
        <div className="flex items-start justify-between gap-4">
          <span className="text-earth/40 text-xs uppercase tracking-wide pt-0.5">When</span>
          <span className="text-earth/80 text-sm text-right">
            {formatDateTime(result.startTime, timezone)}
          </span>
        </div>
        <div className="h-px bg-earth/8" />
        <div className="flex items-start justify-between gap-4">
          <span className="text-earth/40 text-xs uppercase tracking-wide pt-0.5">Format</span>
          <span className="text-earth/80 text-sm text-right">{session.formatLabel}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <a
          href={googleCalendarUrl(result, session)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-lg border border-earth/15 px-5 py-3 text-sm text-earth/70 hover:border-forest/30 hover:text-forest hover:bg-cream transition-all duration-150 text-center"
        >
          Add to Google Calendar
        </a>
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-forest text-parchment px-5 py-3 text-sm font-medium hover:bg-[oklch(33%_0.08_170)] transition-colors duration-150"
        >
          Done
        </button>
      </div>
    </div>
  )
}
