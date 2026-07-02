type TestimonialProps = {
  quote: string
  name: string
  center?: boolean
}

export default function Testimonial({ quote, name, center = false }: TestimonialProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      <p className="text-plum text-4xl leading-none mb-3" aria-hidden="true">&ldquo;</p>
      <p className="font-display text-forest text-xl md:text-2xl leading-snug tracking-tight mb-5">
        {quote}
      </p>
      <p className="text-teal text-xs tracking-[0.22em] uppercase">&mdash; {name}</p>
    </div>
  )
}
