'use client'

import { useState, useEffect } from 'react'
import type { SessionType } from '../types'

interface PaymentIntentResult {
  clientSecret: string | null
  mock: boolean
  loading: boolean
  error: string | null
}

export function usePaymentIntent(session: SessionType | null): PaymentIntentResult {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [mock, setMock] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) return

    let cancelled = false
    setLoading(true)
    setError(null)
    setClientSecret(null)
    setMock(false)

    fetch('/api/stripe/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data.error) throw new Error(data.error)
        setClientSecret(data.clientSecret)
        setMock(!!data.mock)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to initialize payment')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [session?.id])

  return { clientSecret, mock, loading, error }
}
