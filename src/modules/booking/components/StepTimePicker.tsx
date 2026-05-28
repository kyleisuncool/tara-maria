'use client'

import type { SessionType } from '../types'

interface Props {
  session: SessionType
  date: string           // YYYY-MM-DD
  slots: string[]        // ISO datetime strings for this date
  selectedSlot: string | null
  timezone: string
  onSelect: (slot: string) => void
}

function formatSlot(isoString: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(new Date(isoString))
  } catch {
    // Fallback: strip the T and Z, show HH:MM
    return isoString.split('T')[1]?.slice(0, 5) ?? isoString
  }
}

function formatDateLong(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

function groupByPeriod(slots: string[], timezone: string) {
  const morning: string[] = []
  const afternoon: string[] = []
  const evening: string[] = []

  for (const slot of slots) {
    const hour = new Date(slot).toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: timezone })
    const h = parseInt(hour, 10)
    if (h < 12) morning.push(slot)
    else if (h < 17) afternoon.push(slot)
    else evening.push(slot)
  }

  return { morning, afternoon, evening }
}

export function StepTimePicker({ session, date, slots, selectedSlot, timezone, onSelect }: Props) {
  const { morning, afternoon, evening } = groupByPeriod(slots, timezone)

  const groups = [
    { label: 'Morning', slots: morning },
    { label: 'Afternoon', slots: afternoon },
    { label: 'Evening', slots: evening },
  ].filter((g) => g.slots.length > 0)

  return (
    <div>
      <h2 className="font-display text-forest text-2xl tracking-tight mb-2">
        Choose a time.
      </h2>
      <p className="text-earth/55 text-sm leading-relaxed mb-8">
        {formatDateLong(date)} · {session.duration} min
      </p>

      {slots.length === 0 ? (
        <p className="text-earth/45 text-sm py-4">
          No slots available for this date. Please go back and pick a different day.
        </p>
      ) : (
        <div className="space-y-6">
          {groups.map(({ label, slots: groupSlots }) => (
            <div key={label}>
              <p className="text-earth/35 text-xs tracking-[0.15em] uppercase mb-3">{label}</p>
              <div className="flex flex-wrap gap-2">
                {groupSlots.map((slot) => {
                  const isSelected = slot === selectedSlot
                  return (
                    <button
                      key={slot}
                      onClick={() => onSelect(slot)}
                      aria-pressed={isSelected}
                      className={[
                        'px-4 py-2.5 rounded-lg border text-sm transition-all duration-100',
                        isSelected
                          ? 'bg-forest border-forest text-parchment font-medium'
                          : 'border-earth/15 text-earth/70 hover:border-forest/40 hover:text-forest hover:bg-cream',
                      ].join(' ')}
                    >
                      {formatSlot(slot, timezone)}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {timezone && (
        <p className="text-earth/30 text-xs mt-8">
          Times shown in {timezone.replace(/_/g, ' ')}
        </p>
      )}
    </div>
  )
}
