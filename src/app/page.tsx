import Nav from './components/Nav'
import Footer from './components/Footer'
import BotanicalSprig from './components/BotanicalSprig'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Tara-Maria — Healer',
  description: 'Reiki, Akashic Readings, Sound Healing, and Hypnotherapy for women navigating burnout, recovery, and self-realization.',
}

export default function Home() {
  return (
    <div className="bg-parchment font-body">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative flex items-center min-h-[calc(100svh-76px)] overflow-hidden">

        {/* Full-bleed photo */}
        <Image
          src="/images/tara-portrait-wide-1.jpg"
          alt="Tara-Maria seated in a bamboo garden"
          fill
          priority
          className="object-cover object-[30%_50%] md:object-center"
        />

        {/* Mobile scrim — bottom up, text sits over photo center */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth/85 via-earth/50 to-earth/10 pointer-events-none md:hidden" />
        {/* Desktop scrim — right to left */}
        <div className="absolute inset-0 bg-gradient-to-l from-earth/70 via-earth/25 to-transparent pointer-events-none hidden md:block" />

        {/* Text — right side */}
        <div className="relative z-10 w-full px-8 md:px-16 flex justify-end">
          <div className="max-w-xs md:max-w-xl">
            <p className="text-parchment/60 text-xs tracking-[0.22em] uppercase mb-7 animate-fade-up delay-2">
              Reiki &middot; Akashic Readings &middot; Sound Healing &middot; Hypnotherapy
            </p>
            <h1 className="font-display text-parchment text-[clamp(3rem,6vw,6rem)] leading-[1.02] tracking-tight animate-fade-up delay-3">
              I am<br />a healer.
            </h1>
            <p className="text-parchment/75 text-base leading-relaxed mt-8 animate-fade-up delay-4">
              Supporting women through burnout, recovery, and self-realization — through the body, the energy field, and what is.
            </p>
            <div className="flex flex-row flex-wrap items-center gap-x-7 gap-y-4 mt-10 animate-fade-up delay-5">
              <Link
                href="/booking"
                className="inline-block bg-plum text-parchment text-sm tracking-wide px-6 py-3 rounded hover:bg-[oklch(34%_0.14_348)] transition-colors duration-200"
              >
                Book a session
              </Link>
              <Link
                href="/#services"
                className="text-parchment/60 text-sm tracking-wide hover:text-parchment transition-colors duration-200"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* ── Who this is for ── */}
      <section className="bg-cream px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-teal text-xs tracking-[0.22em] uppercase mb-7">Who this is for</p>
          <h2 className="font-display text-forest text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-tight mb-8">
            You know yourself, and you&apos;re still learning yourself.
          </h2>
          <div className="space-y-5 text-earth/65 text-base md:text-lg leading-relaxed max-w-2xl">
            <p>
              This work is for women in their 30s navigating the intersection of burnout, neurodivergence, and the quiet call to come home to themselves. You may have been told your sensitivity is too much. It isn&apos;t. It is the doorway.
            </p>
            <p>
              Whether you are recovering from a season that depleted you, beginning to understand your AuDHD, or simply craving a space that meets you exactly where you are — this practice is built for that.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-5xl">
          <p className="text-teal text-xs tracking-[0.22em] uppercase mb-6">What I offer</p>
          <h2 className="font-display text-forest text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight mb-16">
            Each session is its own invitation.
          </h2>

          <div className="divide-y divide-earth/10">
            {[
              {
                num: '01',
                name: 'Reiki',
                desc: 'Hands-on or distance energy work that supports the body\'s innate healing capacity. Sessions are gentle, intuitive, and held in deep stillness. Ideal for nervous system support, energetic clearing, and restoration.',
              },
              {
                num: '02',
                name: 'Akashic Readings',
                desc: 'A guided exploration of your soul\'s record — the energetic archive of who you are, where you\'ve been, and what you are moving toward. Readings are conversational, grounded, and practically illuminating.',
              },
              {
                num: '03',
                name: 'Sound Healing',
                desc: 'Immersive group or individual sessions using instruments that resonate through the body at a cellular level. A reset for the nervous system that asks nothing of you except to receive.',
              },
              {
                num: '04',
                name: 'Hypnotherapy',
                desc: 'Guided sessions working with the subconscious mind to shift patterns, release stored stress, and reconnect with your own knowing. Audio sessions available for ongoing support.',
              },
            ].map(({ num, name, desc }) => (
              <div key={num} className="py-9 md:py-11 flex flex-col md:flex-row md:items-start gap-4 md:gap-14">
                <span className="font-display text-teal/40 text-sm tracking-[0.12em] shrink-0 md:w-8 pt-1">{num}</span>
                <div className="flex-1">
                  <h3 className="font-display text-forest text-xl md:text-2xl tracking-tight mb-3">{name}</h3>
                  <p className="text-earth/65 text-sm md:text-base leading-relaxed max-w-xl">{desc}</p>
                </div>
                <div className="shrink-0">
                  <Link
                    href="/booking"
                    className="text-teal text-xs tracking-[0.12em] uppercase hover:text-forest transition-colors duration-200"
                  >
                    Book &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section id="events" className="bg-forest px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-5xl">
          <p className="text-parchment/40 text-xs tracking-[0.22em] uppercase mb-6">Join me</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <h2 className="font-display text-parchment text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-tight max-w-lg">
              Healing in community.
            </h2>
            <p className="text-parchment/55 text-sm md:text-base leading-relaxed max-w-xs">
              Group sound healings and seasonal gatherings. No experience needed. Just bring yourself.
            </p>
          </div>

          {/* Event list — replace with real data when available */}
          <div className="divide-y divide-parchment/10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-parchment/35 text-xs tracking-[0.15em] uppercase mb-2">Date TBA</p>
                  <p className="font-display text-parchment text-xl tracking-tight">Sound Healing Circle</p>
                  <p className="text-parchment/50 text-sm mt-1.5">A two-hour immersive gathering. Drop in, drop down, receive.</p>
                </div>
                <a
                  href="https://partiful.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-salmon text-xs tracking-[0.12em] uppercase hover:text-parchment transition-colors duration-200 shrink-0"
                >
                  View on Partiful &rarr;
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-parchment/10">
            <p className="text-parchment/35 text-sm">
              Events are listed on Partiful as they are scheduled.&nbsp;
              <a
                href="https://partiful.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-salmon hover:text-parchment transition-colors duration-200"
              >
                Follow along &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-5xl flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          <div className="relative shrink-0 w-full md:w-64 lg:w-80 aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="/images/tara-portrait-tall-2.jpg"
              alt="Portrait of Tara-Maria in a bamboo garden"
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-teal text-xs tracking-[0.22em] uppercase mb-6">About Tara-Maria</p>
            <h2 className="font-display text-forest text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight mb-7">
              Healing is not something I do to you. It is something we move through together.
            </h2>
            <div className="space-y-5 text-earth/65 text-base leading-relaxed mb-9 max-w-lg">
              <p>
                I am a Reiki practitioner, Akashic Records reader, sound healer, and hypnotherapist. My work lives at the intersection of the somatic and the spiritual — and is shaped by my own experience as an AuDHD woman learning to trust the body as guide.
              </p>
              <p>
                I work with women who are done performing wellness and ready to practice it.
              </p>
            </div>
            <Link
              href="/about"
              className="text-earth text-sm tracking-wide underline underline-offset-4 decoration-earth/25 hover:decoration-earth transition-all duration-200"
            >
              Read my full story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-earth px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-lg">
          <BotanicalSprig className="w-10 text-parchment/15 mb-8" />
          <h2 className="font-display text-parchment text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight mb-5">
            Stay close.
          </h2>
          <p className="text-parchment/50 text-base leading-relaxed mb-10">
            Letters on healing, energy, and the practice of coming home to yourself. Sent when something is worth saying.
          </p>
          {/* TODO: wire up Flodesk embed or API endpoint */}
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              className="flex-1 bg-parchment/8 border border-parchment/15 text-parchment placeholder:text-parchment/30 text-sm px-4 py-3 rounded focus:outline-none focus:border-parchment/40 transition-colors duration-200"
            />
            <button
              type="submit"
              className="bg-plum text-parchment text-sm tracking-wide px-6 py-3 rounded hover:bg-[oklch(34%_0.14_348)] transition-colors duration-200 whitespace-nowrap"
            >
              Join the list
            </button>
          </form>
          <p className="text-parchment/20 text-xs mt-4">No frequency promises. Unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
