function BotanicalSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M80 475 C76 420 88 390 82 345 C76 300 90 268 83 225 C76 182 90 155 84 112 C78 68 86 40 82 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="110" cy="405" rx="22" ry="9" transform="rotate(-32 110 405)" fill="currentColor" opacity="0.75" />
      <ellipse cx="50" cy="396" rx="22" ry="9" transform="rotate(32 50 396)" fill="currentColor" opacity="0.75" />
      <ellipse cx="112" cy="357" rx="20" ry="8" transform="rotate(-28 112 357)" fill="currentColor" opacity="0.70" />
      <ellipse cx="48" cy="349" rx="20" ry="8" transform="rotate(28 48 349)" fill="currentColor" opacity="0.70" />
      <ellipse cx="110" cy="308" rx="18" ry="7.5" transform="rotate(-24 110 308)" fill="currentColor" opacity="0.65" />
      <ellipse cx="50" cy="302" rx="18" ry="7.5" transform="rotate(24 50 302)" fill="currentColor" opacity="0.65" />
      <ellipse cx="108" cy="262" rx="16" ry="7" transform="rotate(-20 108 262)" fill="currentColor" opacity="0.60" />
      <ellipse cx="52" cy="257" rx="16" ry="7" transform="rotate(20 52 257)" fill="currentColor" opacity="0.60" />
      <ellipse cx="106" cy="218" rx="14" ry="6" transform="rotate(-16 106 218)" fill="currentColor" opacity="0.55" />
      <ellipse cx="54" cy="213" rx="14" ry="6" transform="rotate(16 54 213)" fill="currentColor" opacity="0.55" />
      <ellipse cx="104" cy="175" rx="12" ry="5.5" transform="rotate(-12 104 175)" fill="currentColor" opacity="0.50" />
      <ellipse cx="56" cy="171" rx="12" ry="5.5" transform="rotate(12 56 171)" fill="currentColor" opacity="0.50" />
      <ellipse cx="102" cy="136" rx="10" ry="5" transform="rotate(-8 102 136)" fill="currentColor" opacity="0.45" />
      <ellipse cx="58" cy="132" rx="10" ry="5" transform="rotate(8 58 132)" fill="currentColor" opacity="0.45" />
      <ellipse cx="99" cy="98" rx="8" ry="4" transform="rotate(-5 99 98)" fill="currentColor" opacity="0.40" />
      <ellipse cx="61" cy="95" rx="8" ry="4" transform="rotate(5 61 95)" fill="currentColor" opacity="0.40" />
      <circle cx="82" cy="30" r="4" fill="currentColor" opacity="0.45" />
      <circle cx="74" cy="48" r="3" fill="currentColor" opacity="0.38" />
      <circle cx="90" cy="50" r="3" fill="currentColor" opacity="0.38" />
      <circle cx="77" cy="64" r="2.5" fill="currentColor" opacity="0.32" />
      <circle cx="87" cy="67" r="2.5" fill="currentColor" opacity="0.32" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="bg-parchment min-h-screen font-body">
      <nav className="flex items-center justify-between px-8 md:px-16 py-6">
        <span className="font-display text-earth text-xl tracking-tight animate-fade-up delay-1">
          Tara-Maria
        </span>
        <span className="text-earth/50 text-xs tracking-[0.2em] uppercase animate-fade-up delay-1">
          Healer
        </span>
      </nav>

      <section className="relative px-8 md:px-16 flex flex-col justify-center min-h-[calc(100svh-76px)]">
        <div className="max-w-2xl">
          <p className="text-clay text-xs tracking-[0.22em] uppercase mb-7 animate-fade-up delay-2">
            Healing &middot; Grounding &middot; Presence
          </p>

          <h1 className="font-display text-earth text-[clamp(3rem,7vw,6.5rem)] leading-[1.02] tracking-tight animate-fade-up delay-3">
            Healing<br />
            rooted in<br />
            presence.
          </h1>

          <p className="text-earth/65 text-base md:text-lg leading-relaxed mt-8 max-w-sm animate-fade-up delay-4">
            A practice that listens to the body, honors the energy field, and works with what is.
          </p>

          <div className="flex items-center gap-7 mt-10 animate-fade-up delay-5">
            <a
              href="#"
              className="inline-block bg-clay text-cream text-sm tracking-wide px-6 py-3 rounded hover:bg-[oklch(50%_0.13_42)] transition-colors duration-200"
            >
              Book a session
            </a>
            <a
              href="#"
              className="text-earth/60 text-sm tracking-wide hover:text-earth transition-colors duration-200"
            >
              Services
            </a>
          </div>
        </div>

        <BotanicalSprig className="hidden md:block absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 w-40 lg:w-52 text-clay/20 pointer-events-none select-none" />
      </section>
    </div>
  );
}
