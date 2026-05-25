'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-sm border-b border-earth/5">
      <nav className="flex items-center justify-between px-8 md:px-16 py-6">
        <Link href="/" className="font-display text-forest text-xl tracking-tight">
          Tara-Maria
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-earth/60 text-sm tracking-wide hover:text-earth transition-colors duration-200">
            About
          </Link>
          <Link href="/#services" className="text-earth/60 text-sm tracking-wide hover:text-earth transition-colors duration-200">
            Services
          </Link>
          <Link href="/#events" className="text-earth/60 text-sm tracking-wide hover:text-earth transition-colors duration-200">
            Join Me
          </Link>
          <Link
            href="/booking"
            className="inline-block bg-salmon text-earth text-sm tracking-wide px-5 py-2.5 rounded hover:bg-[oklch(68%_0.11_42)] transition-colors duration-200"
          >
            Book
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/booking"
            className="inline-block bg-salmon text-earth text-xs tracking-wide px-4 py-2 rounded hover:bg-[oklch(68%_0.11_42)] transition-colors duration-200"
          >
            Book
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="text-earth/50 hover:text-earth transition-colors duration-200 p-1"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-parchment border-t border-earth/8 px-8 py-8 flex flex-col gap-6">
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="text-earth/70 text-base hover:text-earth transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/#services"
            onClick={() => setOpen(false)}
            className="text-earth/70 text-base hover:text-earth transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            href="/#events"
            onClick={() => setOpen(false)}
            className="text-earth/70 text-base hover:text-earth transition-colors duration-200"
          >
            Join Me
          </Link>
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="inline-block bg-salmon text-earth text-sm tracking-wide px-5 py-3 rounded hover:bg-[oklch(68%_0.11_42)] transition-colors duration-200 text-center"
          >
            Book a session
          </Link>
        </div>
      )}
    </header>
  )
}
