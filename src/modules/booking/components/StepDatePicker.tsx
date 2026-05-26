'use client'

import type { AvailabilityByDate, SessionType } from '../types'

interface Props {
  session: SessionType
  selectedDate: string | null
  /** Full month availability from the parent-managed hook */
  slots: AvailabilityByDate
  loading: boolean
  error: string | null
  /** Current month being displayed, as "YYYY-MM" */
  month: string
  onMonthChange: (month: string) => void
  onSelect: (date: string) => void
}

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const MONTH_NAMES = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]

function buildCalendarDays(year: number, month: number): Array<string | null> {
  const firstDow = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells: Array<string | null> = []

  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(
      `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    )
  }
  return cells
}

function shiftMonth(monthStr: string, delta: 1 | -1): string {
  const [y, m] = monthStr.split('-').map(Number)
  const d = new Date(y, m - 1 + delta, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function StepDatePicker({
  session,
  selectedDate,
  slots,
  loading,
  error,
  month,
  onMonthChange,
  onSelect,
}: Props) {
  const [year, monthNum] = month.split('-').map(Number)
  const cells = buildCalendarDays(year, monthNum)
  const availableDates = new Set(Object.keys(slots))

  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const canGoPrev = month > currentMonthStr

  return (
    <div>
      <h2 className="font-display text-forest text-2xl tracking-tight mb-2">
        Pick a date.
      </h2>
      <p className="text-earth/55 text-sm leading-relaxed mb-8">
        {session.name} · {session.duration} min · {session.formatLabel}
      </p>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => onMonthChange(shiftMonth(month, -1))}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="p-2 rounded-lg text-earth/40 hover:text-earth hover:bg-earth/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          ←
        </button>
        <span className="font-display text-forest text-base tracking-tight">
          {MONTH_NAMES[monthNum - 1]} {year}
        </span>
        <button
          onClick={() => onMonthChange(shiftMonth(month, 1))}
          aria-label="Next month"
          className="p-2 rounded-lg text-earth/40 hover:text-earth hover:bg-earth/5 transition-colors"
        >
          →
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-earth/30 text-xs tracking-wide py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {loading ? (
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-earth/5 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-earth/50 text-sm py-8">{error}</p>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {cells.map((dateStr, i) => {
            if (!dateStr) return <div key={`empty-${i}`} className="aspect-square" />

            const isPast = dateStr < todayStr
            const isAvailable = availableDates.has(dateStr)
            const isSelected = dateStr === selectedDate
            const isToday = dateStr === todayStr
            const disabled = isPast || !isAvailable

            return (
              <button
                key={dateStr}
                onClick={() => !disabled && onSelect(dateStr)}
                disabled={disabled}
                aria-label={dateStr}
                aria-pressed={isSelected}
                className={[
                  'aspect-square rounded-lg text-sm transition-all duration-100',
                  isSelected
                    ? 'bg-forest text-parchment font-medium'
                    : isAvailable && !isPast
                    ? 'text-earth hover:bg-forest/10 hover:text-forest'
                    : 'text-earth/20 cursor-not-allowed',
                  isToday && !isSelected ? 'ring-1 ring-teal/40' : '',
                ].join(' ')}
              >
                {parseInt(dateStr.split('-')[2], 10)}
              </button>
            )
          })}
        </div>
      )}

      {!loading && !error && availableDates.size === 0 && (
        <p className="text-center text-earth/45 text-sm mt-6">
          No availability this month — try next month.
        </p>
      )}
    </div>
  )
}
