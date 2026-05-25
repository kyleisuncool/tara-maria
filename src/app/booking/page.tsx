import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Book a Session — Tara-Maria',
  description: 'Book a Reiki session, Akashic Reading, Sound Healing, or Hypnotherapy session with Tara-Maria.',
}

const sessions = [
  {
    num: '01',
    name: 'Reiki Session',
    duration: '60 min',
    format: 'Remote or in person',
    desc: 'A quiet, held session working with your energy field. Arrive however you are — depleted, activated, uncertain. The session meets you there. Available hands-on or at distance.',
  },
  {
    num: '02',
    name: 'Akashic Reading',
    duration: '60 min',
    format: 'Remote via Zoom',
    desc: 'A guided exploration of your soul\'s energetic record. Readings are conversational and practical. You may bring specific questions or arrive open — both work.',
  },
  {
    num: '03',
    name: 'Sound Healing — Individual',
    duration: '60 min',
    format: 'In person',
    desc: 'A private sound healing session tailored to your nervous system and intention. Deep listening, deep rest. No experience with sound healing required.',
  },
  {
    num: '04',
    name: 'Hypnotherapy',
    duration: '90 min',
    format: 'Remote via Zoom',
    desc: 'A guided subconscious session to shift patterns and reconnect with your own knowing. Includes a custom audio recording sent after the session for continued support.',
  },
]

export default function Booking() {
  return (
    <div className="bg-parchment font-body">
      <Nav />

      {/* ── Header ── */}
      <section className="px-8 md:px-16 pt-20 pb-16 md:pt-28 md:pb-20">
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

      {/* ── Session types ── */}
      <section className="px-8 md:px-16 pb-20 md:pb-28">
        <div className="max-w-5xl divide-y divide-earth/10">
          {sessions.map(({ num, name, duration, format, desc }) => (
            <div key={num} className="py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-5 md:gap-16">
              <span className="font-display text-teal/40 text-sm tracking-[0.12em] shrink-0 md:w-8 pt-1">{num}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-4">
                  <h2 className="font-display text-forest text-xl md:text-2xl tracking-tight">{name}</h2>
                  <span className="text-earth/35 text-xs tracking-[0.12em] uppercase">{duration} &middot; {format}</span>
                </div>
                <p className="text-earth/65 text-sm md:text-base leading-relaxed max-w-xl">{desc}</p>
              </div>
              <div className="shrink-0">
                {/* TODO: replace # with booking platform link (Calendly, etc.) */}
                <a
                  href="#"
                  className="inline-block border border-earth/20 text-earth/80 text-xs tracking-[0.12em] uppercase px-5 py-2.5 rounded hover:bg-earth hover:border-earth hover:text-parchment transition-all duration-200"
                >
                  Book
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

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
              className="inline-block bg-salmon text-earth text-sm tracking-wide px-6 py-3 rounded hover:bg-[oklch(68%_0.11_42)] transition-colors duration-200"
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
