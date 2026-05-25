import Nav from '../components/Nav'
import Footer from '../components/Footer'
import BotanicalSprig from '../components/BotanicalSprig'
import Link from 'next/link'

export const metadata = {
  title: 'About — Tara-Maria',
  description: 'A Reiki practitioner, Akashic Records reader, sound healer, and hypnotherapist working at the intersection of the somatic and the spiritual.',
}

export default function About() {
  return (
    <div className="bg-parchment font-body">
      <Nav />

      {/* ── Hero ── */}
      <section className="px-8 md:px-16 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-5xl flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          <div className="flex-1 order-2 md:order-1">
            <p className="text-teal text-xs tracking-[0.22em] uppercase mb-7">About</p>
            <h1 className="font-display text-forest text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.04] tracking-tight mb-8">
              I meet you<br />where you are.
            </h1>
            <p className="text-earth/65 text-base md:text-lg leading-relaxed max-w-md">
              My name is Tara-Maria. I am a healer, and I have been practicing long enough to know that healing is not linear, not performative, and not one-size-fits-all.
            </p>
          </div>
          <div
            className="order-1 md:order-2 shrink-0 w-full md:w-72 lg:w-96 aspect-[3/4] bg-sand rounded-sm"
            role="img"
            aria-label="Portrait of Tara-Maria"
          />
        </div>
      </section>

      {/* ── Story ── */}
      <section className="bg-cream px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-teal text-xs tracking-[0.22em] uppercase mb-8">My story</p>
          <div className="space-y-6 text-earth/70 text-base md:text-lg leading-relaxed">
            <p>
              I came to healing through my own unraveling. Burnout has a way of stripping away pretense — the performed competence, the relentless doing — and leaving something quieter in its place. In that quiet, I found Reiki. And then the Akashic Records. And then sound.
            </p>
            <p>
              Later came the piece I hadn&apos;t expected: learning I was AuDHD. That understanding didn&apos;t change who I was — it explained a great deal about how I had always moved through the world. It also became central to my practice, because the women who find me are often navigating something similar: a nervous system that is neither broken nor wrong, just different.
            </p>
            <p>
              I work at the intersection of the somatic and the spiritual. The body holds what the mind has not yet processed. Energy moves in response to presence, not performance. My sessions are built on that understanding.
            </p>
            <p>
              This is not a practice about fixing you. It is about returning to what was always there.
            </p>
          </div>
        </div>
      </section>

      {/* ── Modalities ── */}
      <section className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-5xl">
          <p className="text-teal text-xs tracking-[0.22em] uppercase mb-6">What I practice</p>
          <h2 className="font-display text-forest text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight mb-16">
            Four modalities. One practice.
          </h2>

          <div className="divide-y divide-earth/10">
            {[
              {
                num: '01',
                name: 'Reiki',
                body: 'Energy work that works with the body\'s innate intelligence. Sessions are quiet, intuitive, and held in stillness. I am trained in Traditional Usui Reiki and offer both hands-on and distance sessions.',
              },
              {
                num: '02',
                name: 'Akashic Readings',
                body: 'A reading of the soul\'s energetic record — where patterns live, where they were formed, and how they are moving. Practical, grounded, and conversational. You may arrive with questions or arrive open.',
              },
              {
                num: '03',
                name: 'Sound Healing',
                body: 'Instruments that resonate through the body at a cellular level. A reset for the nervous system that requires nothing but receiving. Offered individually and in group circles throughout the month.',
              },
              {
                num: '04',
                name: 'Hypnotherapy',
                body: 'Guided sessions working with the subconscious to shift patterns, release stored stress, and reconnect with innate knowing. Sessions include a custom audio recording for continued support between sessions.',
              },
            ].map(({ num, name, body }) => (
              <div key={num} className="py-9 md:py-11 flex flex-col md:flex-row md:items-start gap-4 md:gap-14">
                <span className="font-display text-teal/40 text-sm tracking-[0.12em] shrink-0 md:w-8 pt-1">{num}</span>
                <div className="flex-1">
                  <h3 className="font-display text-forest text-xl md:text-2xl tracking-tight mb-3">{name}</h3>
                  <p className="text-earth/65 text-sm md:text-base leading-relaxed max-w-2xl">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Session photo placeholder ── */}
      <section className="bg-sand/25 px-8 md:px-16 py-16 md:py-20">
        <div className="max-w-5xl">
          <div
            className="w-full aspect-[16/9] md:aspect-[21/9] bg-sand rounded-sm"
            role="img"
            aria-label="Tara-Maria in session"
          />
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-5xl flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="flex-1">
            <p className="text-teal text-xs tracking-[0.22em] uppercase mb-7">How I work</p>
            <div className="space-y-5 text-earth/65 text-base leading-relaxed">
              <p>
                Sessions are unhurried. I will not rush you to insight or resolution. Some sessions are deeply quiet. Some are conversational. I follow what the session calls for rather than a fixed formula.
              </p>
              <p>
                I work remotely via Zoom and in person. Remote sessions are equally full — energy does not require proximity.
              </p>
              <p>
                I am not your therapist, your doctor, or your guru. I am a practitioner who shows up, pays attention, and holds the space for what wants to move.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-teal text-xs tracking-[0.22em] uppercase mb-7">Who I work with</p>
            <div className="space-y-5 text-earth/65 text-base leading-relaxed">
              <p>
                Primarily women in their 30s. Many are navigating burnout, AuDHD discovery, or a quiet but persistent sense that something needs to shift.
              </p>
              <p>
                Some arrive having tried many things. Some arrive new to energy work entirely. Both are welcome. The only requirement is willingness.
              </p>
              <p>
                I see 6–10 consistent clients each month, and offer group sound healings several times a month for those drawn to the collective field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-earth px-8 md:px-16 py-20 md:py-24">
        <div className="max-w-lg">
          <BotanicalSprig className="w-10 text-parchment/15 mb-8" />
          <h2 className="font-display text-parchment text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] tracking-tight mb-6">
            Ready to begin?
          </h2>
          <p className="text-parchment/50 text-base leading-relaxed mb-9">
            Sessions are available remotely via Zoom and in person. If you are unsure where to start, book a session and we will find the right fit together.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <Link
              href="/booking"
              className="inline-block bg-salmon text-earth text-sm tracking-wide px-6 py-3 rounded hover:bg-[oklch(68%_0.11_42)] transition-colors duration-200"
            >
              Book a session
            </Link>
            <Link
              href="/#events"
              className="text-parchment/50 text-sm tracking-wide hover:text-parchment transition-colors duration-200 self-center"
            >
              See upcoming events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
