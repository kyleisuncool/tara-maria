'use client'

import { useState, useCallback } from 'react'
import type { BookingRequest, BookingResponse } from '../types'

interface UseBookingReturn {
  submit: (req: BookingRequest) => Promise<BookingResponse | null>
  loading: boolean
  error: string | null
  reset: () => void
}

/**
 * Submits a booking request to the Cal.com proxy route.
 * Returns the confirmed booking on success, or null on error.
 */
export function useBooking(): UseBookingReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(async (req: BookingRequest): Promise<BookingResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/cal/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `Request failed (${res.status})`)
      }

      return data as BookingResponse
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => setError(null), [])

  return { submit, loading, error, reset }
}
