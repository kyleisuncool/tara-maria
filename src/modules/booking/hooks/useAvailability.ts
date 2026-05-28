'use client'

import { useState, useEffect, useCallback } from 'react'
import type { AvailabilityByDate, SessionType } from '../types'

interface UseAvailabilityReturn {
  slots: AvailabilityByDate
  loading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Fetches available time slots for a given session type and calendar month.
 *
 * @param session  - The selected session type (used for Cal.com event type ID)
 * @param month    - The month to fetch, formatted as "YYYY-MM"
 */
export function useAvailability(
  session: SessionType | null,
  month: string | null,
): UseAvailabilityReturn {
  const [slots, setSlots] = useState<AvailabilityByDate>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!month) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ month })
      if (session?.calEventTypeId != null) {
        params.set('eventTypeId', String(session.calEventTypeId))
      }

      const res = await fetch(`/api/cal/availability?${params.toString()}`)
      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `Request failed (${res.status})`)
      }

      setSlots(data.slots ?? {})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load availability')
    } finally {
      setLoading(false)
    }
  }, [session, month])

  useEffect(() => {
    load()
  }, [load])

  return { slots, loading, error, refetch: load }
}
