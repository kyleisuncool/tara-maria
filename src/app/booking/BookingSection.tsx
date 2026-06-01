'use client'

import { useState, useCallback } from 'react'
import { BookingWidget } from '@/modules/booking/components/BookingWidget'
import { SESSION_TYPES } from '@/modules/booking/config'

/**
 * Client component that renders the session list and manages
 * the BookingWidget modal state.
 *
 * Lives alongside the (server) booking page so the page itself
 * stays a Server Component.
 */
export function BookingSection() {
  const [openSessionId, setOpenSessionId] = useState<string | null>(null)

  const handleClose = useCallback(() => setOpenSessionId(null), [])

  return (
    <>
      {/* ── Session list ── */}
      <section className="px-8 md:px-16 pb-20 md:pb-28">
        <div className="max-w-5xl divide-y divide-earth/10">
          {SESSION_TYPES.map(({ id, num, name, duration, formatLabel, desc, price }) => (
            <div
              key={id}
              className="py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-5 md:gap-16"
            >
              <span className="font-display text-teal/40 text-sm tracking-[0.12em] shrink-0 md:w-8 pt-1">
                {num}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-4">
                  <h2 className="font-display text-forest text-xl md:text-2xl tracking-tight">
                    {name}
                  </h2>
                  <span className="text-earth/35 text-xs tracking-[0.12em] uppercase">
                    {duration} min &middot; {formatLabel}
                    {price !== null ? ` · $${Math.floor(price / 100)}` : null}
                  </span>
                </div>
                <p className="text-earth/65 text-sm md:text-base leading-relaxed max-w-xl">
                  {desc}
                </p>
              </div>
              <div className="shrink-0">
                <button
                  onClick={() => setOpenSessionId(id)}
                  className="inline-block border border-earth/20 text-earth/80 text-xs tracking-[0.12em] uppercase px-5 py-2.5 rounded hover:bg-earth hover:border-earth hover:text-parchment transition-all duration-200 cursor-pointer"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking widget modal ── */}
      {openSessionId && (
        <BookingWidget
          initialSessionId={openSessionId}
          onClose={handleClose}
        />
      )}
    </>
  )
}
