import { ArrowUpRight, MapPin } from 'lucide-react'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { WeddingImage } from './WeddingImage'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { GlimmerField } from './GlimmerField'

export function VenueSection() {
  const venue = wedding.venue
  const revealRef = useScrollReveal<HTMLElement>()
  return <section ref={revealRef} data-scroll-reveal className="venue" id="venue" aria-labelledby="venue-title">
    <GlimmerField variant="venue" />
    <div className="venue-image"><WeddingImage className="venue-photo" src={wedding.images.hero} alt="" aria-hidden="true" fallbackLabel="Kerala wedding photograph" loading="lazy" decoding="async" /></div>
    <div className="venue-copy">
      <p className="eyebrow">{venue.eyebrow}</p><FloralDivider /><MapPin size={18} strokeWidth={1.3} aria-hidden="true" />
      <h2 id="venue-title">{venue.name}</h2>
      {venue.address && <p>{venue.address}</p>}
      {venue.directionsUrl && <a href={venue.directionsUrl} target="_blank" rel="noreferrer">{venue.directionsLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>}
    </div>
  </section>
}
