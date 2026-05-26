'use client'

import { useState, useEffect, useCallback } from 'react'
import { SESSION_TYPES } from '../config'
import { useBooking } from '../hooks/useBooking'
import { useAvailability } from '../hooks/useAvailability'
import { StepSessionPicker } from './StepSessionPicker'
import { StepDatePicker } from './StepDatePicker'
import { StepTimePicker } from './StepTimePicker'
import { StepInfoForm } from './StepInfoForm'
import { StepConfirmation } from './StepConfirmation'
import type { BookingStep, SessionType, BookingResponse } from '../types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  /** Pre-select a session and start on the date step. */
  initialSessionId?: string
  /** Called when the user dismisses the widget. */
  onClose: () => void
}

// ─── Step progress config ─────────────────────────────────────────────────────

const WIZARD_STEPS: { key: BookingStep; label: string }[] = [
  { key: 'session', label: 'Session' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'info', label: 'Details' },
  { key: 'confirmed', label: 'Confirmed' },
]

const PREV_STEP: Partial<Record<BookingStep, BookingStep>> = {
  // 'session' has no back
  time: 'date',
  info: 'time',
  // 'date' back depends on whether session was pre-selected (set dynamically below)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toMonthStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function stepIndex(step: BookingStep) {
  return WIZARD_STEPS.findIndex((s) => s.key === step)
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BookingWidget({ initialSessionId, onClose }: Props) {
  const initialSession = initialSessionId
    ? (SESSION_TYPES.find((s) => s.id === initialSessionId) ?? null)
    : null

  // ── Wizard state ────────────────────────────────────────────────────────────
  const [step, setStep] = useState<BookingStep>(initialSession ? 'date' : 'session')
  const [session, setSession] = useState<SessionType | null>(initialSession)
  const [date, setDate] = useState<string | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', notes: '' })
  const [timezone, setTimezone] = useState('UTC')
  const [result, setResult] = useState<BookingResponse | null>(null)

  // ── Calendar month (shared between date + time steps) ──────────────────────
  const [currentMonth, setCurrentMonth] = useState(() => toMonthStr(new Date()))

  // Fetch availability for the current month whenever session or month changes
  const { slots, loading: slotsLoading, error: slotsError } = useAvailability(
    session,
    step === 'date' || step === 'time' ? currentMonth : null,
  )

  // ── Booking submission ──────────────────────────────────────────────────────
  const { submit, loading: submitLoading, error: submitError, reset: resetError } = useBooking()

  // ── Timezone detection ──────────────────────────────────────────────────────
  useEffect(() => {
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    } catch {
      // leave 'UTC'
    }
  }, [])

  // ── Keyboard / scroll lock ───────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // ── Navigation ───────────────────────────────────────────────────────────────

  // Build the back-step map dynamically based on whether session was pre-selected
  const prevStep: Partial<Record<BookingStep, BookingStep>> = {
    ...PREV_STEP,
    date: initialSession ? undefined : 'session',
  }

  const hasPrev = !!prevStep[step]
  const isConfirmed = step === 'confirmed'

  function goBack() {
    const prev = prevStep[step]
    if (prev) {
      setStep(prev)
      resetError()
    }
  }

  // ── Step handlers ────────────────────────────────────────────────────────────

  function handleSelectSession(s: SessionType) {
    setSession(s)
    setDate(null)
    setSlot(null)
    setCurrentMonth(toMonthStr(new Date()))
    setStep('date')
  }

  function handleSelectDate(d: string) {
    setDate(d)
    setSlot(null)
    setStep('time')
  }

  function handleSelectSlot(s: string) {
    setSlot(s)
    setStep('info')
  }

  async function handleSubmit() {
    if (!session || !slot) return
    const booking = await submit({
      eventTypeId: session.calEventTypeId,
      startTime: slot,
      name: form.name,
      email: form.email,
      notes: form.notes,
      timezone,
    })
    if (booking) {
      setResult(booking)
      setStep('confirmed')
    }
  }

  // ── Progress dots ─────────────────────────────────────────────────────────────

  const visibleSteps = WIZARD_STEPS.filter((s) => s.key !== 'confirmed')
  const currentIdx = stepIndex(step)

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-earth/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg bg-parchment sm:rounded-2xl shadow-2xl flex flex-col max-h-[95dvh] sm:max-h-[88dvh] overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 shrink-0 border-b border-earth/6">
          {/* Step progress dots */}
          {!isConfirmed ? (
            <div className="flex items-center gap-1.5" aria-label="Booking progress">
              {visibleSteps.map((s, i) => {
                const done = i < currentIdx
                const active = s.key === step
                return (
                  <div key={s.key} className="flex items-center gap-1.5">
                    <div
                      className={[
                        'rounded-full transition-all duration-200',
                        active
                          ? 'w-2 h-2 bg-forest'
                          : done
                          ? 'w-1.5 h-1.5 bg-teal'
                          : 'w-1.5 h-1.5 bg-earth/15',
                      ].join(' ')}
                    />
                    {i < visibleSteps.length - 1 && (
                      <div
                        className={[
                          'h-px w-3 transition-colors duration-200',
                          done ? 'bg-teal/40' : 'bg-earth/8',
                        ].join(' ')}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div />
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close booking"
            className="p-1.5 rounded-lg text-earth/30 hover:text-earth hover:bg-earth/6 transition-colors ml-auto"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Step content (scrollable) ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 'session' && (
            <StepSessionPicker selected={session} onSelect={handleSelectSession} />
          )}

          {step === 'date' && session && (
            <StepDatePicker
              session={session}
              selectedDate={date}
              slots={slots}
              loading={slotsLoading}
              error={slotsError}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              onSelect={handleSelectDate}
            />
          )}

          {step === 'time' && session && date && (
            <StepTimePicker
              session={session}
              date={date}
              slots={slots[date] ?? []}
              selectedSlot={slot}
              timezone={timezone}
              onSelect={handleSelectSlot}
            />
          )}

          {step === 'info' && session && slot && (
            <StepInfoForm
              session={session}
              date={date!}
              slot={slot}
              timezone={timezone}
              values={form}
              onChange={setForm}
              onSubmit={handleSubmit}
              loading={submitLoading}
              error={submitError}
            />
          )}

          {step === 'confirmed' && result && session && (
            <StepConfirmation
              result={result}
              session={session}
              timezone={timezone}
              onClose={onClose}
            />
          )}
        </div>

        {/* ── Footer: back navigation ── */}
        {hasPrev && !isConfirmed && (
          <div className="shrink-0 px-6 py-4 border-t border-earth/6">
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-earth/40 text-sm hover:text-earth/70 transition-colors duration-150"
            >
              <span aria-hidden="true">←</span> Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
