import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-earth px-8 md:px-16 py-16 md:py-20">
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12">

        <div>
          <p className="font-display text-parchment text-xl tracking-tight mb-2">Tara-Maria</p>
          <p className="text-parchment/40 text-xs tracking-[0.2em] uppercase">Healer</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-parchment/40 text-xs tracking-[0.2em] uppercase mb-1">Navigate</p>
          <Link href="/" className="text-parchment/60 text-sm hover:text-parchment transition-colors duration-200">Home</Link>
          <Link href="/about" className="text-parchment/60 text-sm hover:text-parchment transition-colors duration-200">About</Link>
          <Link href="/#services" className="text-parchment/60 text-sm hover:text-parchment transition-colors duration-200">Services</Link>
          <Link href="/#events" className="text-parchment/60 text-sm hover:text-parchment transition-colors duration-200">Join Me</Link>
          <Link href="/booking" className="text-parchment/60 text-sm hover:text-parchment transition-colors duration-200">Book a session</Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-parchment/40 text-xs tracking-[0.2em] uppercase mb-1">Connect</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-parchment/60 text-sm hover:text-parchment transition-colors duration-200">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-parchment/60 text-sm hover:text-parchment transition-colors duration-200">TikTok</a>
          <a href="mailto:hello@tara-maria.com" className="text-parchment/60 text-sm hover:text-parchment transition-colors duration-200">Email</a>
        </div>

      </div>

      <div className="max-w-5xl mt-14 pt-8 border-t border-parchment/10">
        <p className="text-parchment/25 text-xs">&copy; 2026 Tara-Maria. All rights reserved.</p>
      </div>
    </footer>
  )
}
