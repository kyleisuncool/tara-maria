import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Testimonial from '../components/Testimonial'
import Link from 'next/link'
import { BookingSection } from './BookingSection'

export const metadata = {
  title: 'Book a Session — Tara-Maria',
  description: 'Book a Reiki session, Akashic Reading, Sound Healing, or Hypnotherapy session with Tara-Maria.',
}

export default function Booking() {
  return (
    <div className="bg-parchment font-body">
      <Nav />

      {/* ── Header ── */}
      <section className="px-8 md:px-16 pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="max-w-3xl">
          <p className="text-teal text-xs tracking-[0.22em] uppercase mb-7">Book a session</p>
          <h1 className="font-display text-forest text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.04] tracking-tight mb-8">
            Let&apos;s work<br />together.
          </h1>
          <p className="text-earth/65 text-base md:text-lg leading-relaxed max-w-md">
            Sessions are available remotely via Zoom and in person. All sessions are one hour unless otherwise noted.
          </p>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="px-8 md:px-16 pb-16 md:pb-20">
        <div className="max-w-md">
          <Testimonial
            quote="What a gifted healer! Maria is a talented reiki practitioner and was born to do this work."
            name="Angela"
          />
        </div>
      </section>

      {/* ── Session types + booking widget ── */}
      <BookingSection />

      {/* ── Group events callout ── */}
      <section className="bg-cream px-8 md:px-16 py-16 md:py-20">
        <div className="max-w-5xl flex flex-col md:flex-row md:items-center gap-8 md:gap-20">
          <div className="flex-1">
            <p className="text-teal text-xs tracking-[0.22em] uppercase mb-4">Group sessions</p>
            <h2 className="font-display text-forest text-2xl md:text-3xl tracking-tight mb-4">
              Looking for a sound healing circle?
            </h2>
            <p className="text-earth/65 text-sm md:text-base leading-relaxed max-w-md">
              Group sound healings happen 4–6 times a month. They are listed on Partiful — no account needed to view upcoming events. Bring a friend.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="https://partiful.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-plum text-parchment text-sm tracking-wide px-6 py-3 rounded hover:bg-[oklch(34%_0.14_348)] transition-colors duration-200"
            >
              See upcoming events
            </a>
          </div>
        </div>
      </section>

      {/* ── What to expect ── */}
      <section className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-teal text-xs tracking-[0.22em] uppercase mb-7">What to expect</p>
          <h2 className="font-display text-forest text-2xl md:text-3xl tracking-tight mb-12">A few practical things.</h2>

          <div className="space-y-10 text-earth/65 text-base leading-relaxed">
            <div>
              <h3 className="font-display text-forest text-lg tracking-tight mb-3">Remote sessions</h3>
              <p>All remote sessions are held via Zoom. A link will be sent after booking. You will need a quiet space where you can lie down or sit comfortably for the duration. Headphones are welcome but not required.</p>
            </div>
            <div>
              <h3 className="font-display text-forest text-lg tracking-tight mb-3">In-person sessions</h3>
              <p>In-person sessions are held in [Location TBA]. Location details and any preparation notes will be provided upon booking confirmation.</p>
            </div>
            <div>
              <h3 className="font-display text-forest text-lg tracking-tight mb-3">Cancellations</h3>
              <p>Please cancel or reschedule at least 24 hours in advance. Late cancellations may be subject to a fee. Life happens — just reach out and we will figure it out together.</p>
            </div>
            <div>
              <h3 className="font-display text-forest text-lg tracking-tight mb-3">Not sure where to start?</h3>
              <p>
                Reach out at{' '}
                <a
                  href="mailto:hello@tara-maria.com"
                  className="text-teal underline underline-offset-4 decoration-teal/30 hover:decoration-teal transition-colors duration-200"
                >
                  hello@tara-maria.com
                </a>{' '}
                — I am happy to help you figure out the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Secondary CTA ── */}
      <section className="border-t border-earth/8 px-8 md:px-16 py-14 md:py-16">
        <div className="max-w-5xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-display text-forest text-xl md:text-2xl tracking-tight">
            Curious about the work before booking?
          </p>
          <Link
            href="/about"
            className="text-earth/60 text-sm tracking-wide hover:text-earth transition-colors duration-200 whitespace-nowrap"
          >
            Read about Tara-Maria &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
