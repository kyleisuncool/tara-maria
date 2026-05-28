'use client'

import type { SessionType } from '../types'

interface FormValues {
  name: string
  email: string
  notes: string
}

interface Props {
  session: SessionType
  date: string           // YYYY-MM-DD
  slot: string           // ISO datetime
  timezone: string
  values: FormValues
  onChange: (values: FormValues) => void
  onSubmit: () => void
  loading: boolean
  error: string | null
}

function formatDateTime(slot: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(new Date(slot))
  } catch {
    return slot
  }
}

export function StepInfoForm({
  session,
  slot,
  timezone,
  values,
  onChange,
  onSubmit,
  loading,
  error,
}: Props) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  const inputClass = [
    'w-full rounded-lg border border-earth/15 bg-parchment px-4 py-3',
    'text-sm text-earth placeholder-earth/30',
    'focus:outline-none focus:border-forest/50 focus:ring-1 focus:ring-forest/20',
    'transition-colors duration-150',
  ].join(' ')

  const labelClass = 'block text-earth/60 text-xs tracking-wide uppercase mb-2'

  return (
    <div>
      <h2 className="font-display text-forest text-2xl tracking-tight mb-2">
        Almost there.
      </h2>
      <p className="text-earth/55 text-sm leading-relaxed mb-8">
        {session.name} · {formatDateTime(slot, timezone)}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="booking-name" className={labelClass}>
            Your name
          </label>
          <input
            id="booking-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            value={values.name}
            onChange={(e) => onChange({ ...values, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="booking-email" className={labelClass}>
            Email address
          </label>
          <input
            id="booking-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => onChange({ ...values, email: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="booking-notes" className={labelClass}>
            Anything to share{' '}
            <span className="normal-case text-earth/30 tracking-normal">(optional)</span>
          </label>
          <textarea
            id="booking-notes"
            rows={3}
            placeholder="Intentions, questions, anything you'd like Tara-Maria to know beforehand."
            value={values.notes}
            onChange={(e) => onChange({ ...values, notes: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && (
          <p className="text-sm text-[oklch(50%_0.18_25)] bg-[oklch(50%_0.18_25)]/8 border border-[oklch(50%_0.18_25)]/15 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !values.name || !values.email}
          className={[
            'w-full rounded-lg py-3.5 text-sm tracking-wide font-medium transition-all duration-150',
            loading || !values.name || !values.email
              ? 'bg-earth/10 text-earth/30 cursor-not-allowed'
              : 'bg-forest text-parchment hover:bg-[oklch(33%_0.08_170)]',
          ].join(' ')}
        >
          {loading ? 'Confirming your session…' : 'Confirm booking'}
        </button>
      </form>

      <p className="text-earth/30 text-xs mt-5 text-center">
        A confirmation will be sent to your email address.
      </p>
    </div>
  )
}
