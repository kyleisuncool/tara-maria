'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { usePaymentIntent } from '../hooks/usePaymentIntent'
import type { SessionType } from '../types'

// ─── Module-level constants (never recreated) ─────────────────────────────────

// Stripe's iframe doesn't inherit CSS variables or OKLCH — all values must be
// hex or rgba so Stripe's internal renderer can parse them.
//
// Palette reference (from globals.css OKLCH → sRGB):
//   parchment  oklch(96% 0.018 82)  →  #F5F0E8
//   earth      oklch(20% 0.02  58)  →  #352B1C
//   forest     oklch(38% 0.07  170) →  #32645B  (from DESIGN.md)
//   cream      oklch(94% 0.015 80)  →  #EDE8DB
//   danger     oklch(50% 0.18  25)  →  #BF3E28

const E = '#352B1C'  // earth
const F = '#32645B'  // forest

const STRIPE_APPEARANCE = {
  theme: 'flat' as const,
  variables: {
    colorPrimary:          F,
    colorBackground:       '#F5F0E8',
    colorText:             E,
    colorTextSecondary:    `rgba(53, 43, 28, 0.55)`,
    colorTextPlaceholder:  `rgba(53, 43, 28, 0.30)`,
    colorIcon:             `rgba(53, 43, 28, 0.40)`,
    colorIconHover:        `rgba(53, 43, 28, 0.70)`,
    colorIconSelected:     F,
    colorDanger:           '#BF3E28',
    borderRadius:          '8px',
    fontFamily:            '"Bitter", Georgia, serif',
    fontSizeBase:          '0.875rem',
    fontWeightNormal:      '400',
    fontWeightMedium:      '500',
    spacingUnit:           '4px',
    spacingGridRow:        '20px',
  },
  rules: {
    '.Input': {
      border:          `1px solid rgba(53, 43, 28, 0.15)`,
      backgroundColor: '#F5F0E8',
      color:           E,
      padding:         '12px 16px',
      boxShadow:       'none',
      fontSize:        '0.875rem',
      transition:      'border-color 0.15s ease, box-shadow 0.15s ease',
    },
    '.Input:focus': {
      border:    `1px solid rgba(50, 100, 91, 0.50)`,
      boxShadow: `0 0 0 3px rgba(50, 100, 91, 0.12)`,
      outline:   'none',
    },
    '.Input--invalid': {
      border:    `1px solid rgba(191, 62, 40, 0.50)`,
      boxShadow: 'none',
    },
    '.Label': {
      color:          `rgba(53, 43, 28, 0.60)`,
      fontSize:       '0.6875rem',
      letterSpacing:  '0.1em',
      textTransform:  'uppercase',
      marginBottom:   '8px',
    },
    '.Tab': {
      border:          `1px solid rgba(53, 43, 28, 0.15)`,
      backgroundColor: '#F5F0E8',
      boxShadow:       'none',
      color:           `rgba(53, 43, 28, 0.55)`,
      padding:         '10px 14px',
      transition:      'border-color 0.15s ease, color 0.15s ease',
    },
    '.Tab:hover': {
      border: `1px solid rgba(50, 100, 91, 0.40)`,
      color:  E,
    },
    '.Tab--selected': {
      border:          `1px solid ${F}`,
      backgroundColor: '#F5F0E8',
      color:           F,
      boxShadow:       'none',
    },
    '.Tab--selected:focus': {
      boxShadow: `0 0 0 3px rgba(50, 100, 91, 0.12)`,
    },
    '.TabLabel--selected': {
      color: F,
    },
    '.BlockDivider': {
      backgroundColor: `rgba(53, 43, 28, 0.08)`,
    },
    '.CheckboxInput': {
      border:       `1px solid rgba(53, 43, 28, 0.20)`,
      borderRadius: '4px',
    },
    '.CheckboxInput--checked': {
      backgroundColor: F,
      borderColor:     F,
    },
    '.Error': {
      color:     '#BF3E28',
      fontSize:  '0.75rem',
      marginTop: '6px',
    },
  },
}

// Bitter must be loaded explicitly so it's available inside Stripe's iframe.
// Next.js font optimization only applies to the host document.
const STRIPE_FONTS = [
  { cssSrc: 'https://fonts.googleapis.com/css2?family=Bitter:wght@400;500&display=swap' },
]

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

// ─── Stripe Elements inner form ───────────────────────────────────────────────

interface FormProps {
  session: SessionType
  onSuccess: (paymentIntentId: string) => void
}

function PaymentForm({ session, onSuccess }: FormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.')
      setLoading(false)
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent.id)
    } else {
      setError('Payment could not be completed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: 'tabs' }} />

      {error && (
        <p className="text-sm text-[oklch(50%_0.18_25)] bg-[oklch(50%_0.18_25)]/8 border border-[oklch(50%_0.18_25)]/15 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={[
          'w-full rounded-lg py-3.5 text-sm tracking-wide font-medium transition-all duration-150',
          !stripe || loading
            ? 'bg-earth/10 text-earth/30 cursor-not-allowed'
            : 'bg-forest text-parchment hover:bg-[oklch(33%_0.08_170)]',
        ].join(' ')}
      >
        {loading
          ? 'Processing…'
          : session.price
          ? `Pay ${formatPrice(session.price)}`
          : 'Complete payment'}
      </button>

      <p className="text-earth/30 text-xs text-center">
        Payments processed securely by Stripe. Your card details never touch our server.
      </p>
    </form>
  )
}

// ─── Mock payment form (dev mode: no Stripe key or price not set) ─────────────

function MockPaymentForm({ session, onSuccess }: FormProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-earth/15 bg-cream px-5 py-4 text-sm text-earth/60">
        <p className="font-medium text-earth/80 mb-1">Dev mode — payment not configured</p>
        <p>
          {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            ? 'Add Stripe keys to .env.local to test real payment.'
            : 'Set a price for this session in config.ts to enable real payment.'}
        </p>
      </div>

      <button
        onClick={() => onSuccess('mock_pi_dev')}
        className="w-full rounded-lg py-3.5 text-sm tracking-wide font-medium bg-forest text-parchment hover:bg-[oklch(33%_0.08_170)] transition-all duration-150"
      >
        Continue (skip payment in dev)
      </button>
    </div>
  )
}

// ─── StepPayment ──────────────────────────────────────────────────────────────

interface Props {
  session: SessionType
  onSuccess: (paymentIntentId: string) => void
}

export function StepPayment({ session, onSuccess }: Props) {
  const { clientSecret, mock, loading, error } = usePaymentIntent(session)

  return (
    <div>
      <h2 className="font-display text-forest text-2xl tracking-tight mb-2">
        Payment
      </h2>
      <p className="text-earth/55 text-sm leading-relaxed mb-8">
        {session.name}
        {session.price ? ` · ${formatPrice(session.price)}` : null}
      </p>

      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-10 rounded-lg bg-earth/6" />
          <div className="h-12 rounded-lg bg-earth/6" />
          <div className="h-12 rounded-lg bg-earth/6" />
          <div className="h-12 rounded-lg bg-earth/6" />
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-[oklch(50%_0.18_25)] bg-[oklch(50%_0.18_25)]/8 border border-[oklch(50%_0.18_25)]/15 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {!loading && mock && (
        <MockPaymentForm session={session} onSuccess={onSuccess} />
      )}

      {!loading && !mock && clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: STRIPE_APPEARANCE, fonts: STRIPE_FONTS }}
        >
          <PaymentForm session={session} onSuccess={onSuccess} />
        </Elements>
      )}
    </div>
  )
}
