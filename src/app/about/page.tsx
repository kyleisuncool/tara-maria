import Nav from '../components/Nav'
import Footer from '../components/Footer'
import BotanicalSprig from '../components/BotanicalSprig'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About — Tara-Maria',
  description: 'A registered nurse and cancer survivor who found sound healing, hypnotherapy, and Reiki through her own recovery and now brings that experience to her practice.',
}

export default function About() {
  return (
    <div className="bg-parchment font-body">
      <Nav />

      {/* ── Hero ── */}
      <section className="flex flex-col md:flex-row min-h-[90vh]">

        {/* Left — text */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-20 md:py-28">
          <p className="text-teal text-xs tracking-[0.22em] uppercase mb-7">About</p>
          <h1 className="font-display text-forest text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.04] tracking-tight mb-8">
            I meet you<br />where you are.
          </h1>
          <p className="text-earth/65 text-base md:text-lg leading-relaxed max-w-md">
            My name is Tara-Maria. I am a registered nurse, a cancer survivor, and a healer. Those three things are not separate. They are the same story.
          </p>
        </div>

        {/* Right — full-bleed portrait */}
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:w-1/2 overflow-hidden">
          <Image
            src="/images/tara-portrait-tall-2.jpg"
            alt="Portrait of Tara-Maria in a bamboo garden"
            fill
            className="object-cover object-top"
          />
        </div>

      </section>

      {/* ── Story ── */}
      <section className="bg-cream px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-teal text-xs tracking-[0.22em] uppercase mb-8">My story</p>
          <div className="space-y-6 text-earth/70 text-base md:text-lg leading-relaxed">
            <p>
              I have been a registered nurse for thirteen years. I believe in evidence. I believe in protocol. I understand, at a clinical level, how the body responds to stress, illness, and intervention. And then I was diagnosed with cancer, and found myself on the other side of the bed.
            </p>
            <p>
              What I encountered in that experience was not a failure of medicine. Medicine did its job. What I found was a gap between what clinical care addresses and what a person actually needs to heal. The nervous system. The fear that lives in the body long after treatment ends. The sense of self that quietly dissolves in the middle of it all.
            </p>
            <p>
              That gap is where I started looking. I came to sound healing, hypnotherapy, and Reiki not as someone searching for something spiritual, but as a clinician looking for evidence. I found it. And I found that these modalities worked in ways I could not dismiss, in a body I know intimately.
            </p>
            <p>
              I built this practice from that place. It sits at the intersection of what clinical healthcare gets right and what it misses. The body holds what the mind has not yet processed. Healing is not linear, not performative, and rarely what we expect it to be.
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
                name: 'Sound Healing',
                body: 'Instruments that resonate through the body at a cellular level. Research shows measurable effects on nervous system regulation, brainwave states, and pain reduction. Offered individually and in group circles throughout the month.',
              },
              {
                num: '02',
                name: 'Hypnotherapy',
                body: 'Guided sessions working with the subconscious to shift patterns, release stored stress, and reconnect with innate knowing. A clinically recognized modality with a strong body of research behind it. Sessions include a custom audio recording for continued support.',
              },
              {
                num: '03',
                name: 'Reiki',
                body: 'Energy work that supports the body\'s innate healing intelligence. Increasingly studied in clinical settings. Recent meta-analyses show consistent effects on anxiety, pain, and fatigue. Available hands-on or at distance.',
              },
              {
                num: '04',
                name: 'Akashic Readings',
                body: 'A reading of the soul\'s energetic record, tracing where patterns live, where they were formed, and how they are moving. Practical, grounded, and conversational. You may arrive with questions or arrive open.',
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
      <section className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden">
        <Image
          src="/images/tara-in-session-cine-wide-1.jpg"
          alt="Tara-Maria playing a singing bowl during a sound healing session"
          fill
          className="object-cover object-center"
        />
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
                I work remotely via Zoom and in person. Remote sessions are equally full. Energy does not require proximity.
              </p>
              <p>
                I am not your therapist or your guru. My nursing background informs this work. It does not define it. I show up as a practitioner, pay attention, and hold the space for what wants to move.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-teal text-xs tracking-[0.22em] uppercase mb-7">Who I work with</p>
            <div className="space-y-5 text-earth/65 text-base leading-relaxed">
              <p>
                People who have been running hard in demanding careers, caregiving roles, or recovery, and are beginning to feel it in their bodies. Many arrive having tried the conventional routes and found them incomplete.
              </p>
              <p>
                Some are new to energy work entirely. Some are skeptical but curious. Both are welcome. The only requirement is willingness.
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
              className="inline-block bg-plum text-parchment text-sm tracking-wide px-6 py-3 rounded hover:bg-[oklch(34%_0.14_348)] transition-colors duration-200"
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
