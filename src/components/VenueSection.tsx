import { ArrowUpRight, MapPin } from 'lucide-react'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { GlimmerField } from './GlimmerField'

export function VenueSection() {
  const venue = wedding.venue
  const revealRef = useScrollReveal<HTMLElement>()
  return <section ref={revealRef} data-scroll-reveal className="venue venue-without-photo" id="venue" aria-labelledby="venue-title">
    <GlimmerField variant="venue" />
    <div className="venue-copy">
      <p className="eyebrow">{venue.eyebrow}</p><FloralDivider /><MapPin size={18} strokeWidth={1.3} aria-hidden="true" />
      <h2 id="venue-title">{venue.name}</h2>
      {venue.address && <p>{venue.address}</p>}
      {venue.directionsUrl && <a href={venue.directionsUrl} target="_blank" rel="noreferrer">{venue.directionsLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>}
    </div>
  </section>
}
