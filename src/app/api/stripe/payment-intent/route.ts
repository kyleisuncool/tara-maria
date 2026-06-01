import type { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { SESSION_TYPES } from '@/modules/booking/config'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export async function POST(request: NextRequest) {
  const { sessionId } = await request.json()

  const sessionType = SESSION_TYPES.find((s) => s.id === sessionId)
  if (!sessionType) {
    return Response.json({ error: 'Unknown session type' }, { status: 400 })
  }

  // Mock mode: no Stripe key, or price not yet configured
  if (!STRIPE_SECRET_KEY || !sessionType.price) {
    await new Promise((r) => setTimeout(r, 400))
    return Response.json({ clientSecret: null, mock: true })
  }

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: sessionType.price,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { sessionId, sessionName: sessionType.name },
    })

    return Response.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('[/api/stripe/payment-intent]', err)
    return Response.json({ error: 'Failed to initialize payment' }, { status: 500 })
  }
}
