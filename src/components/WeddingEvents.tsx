import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { GlimmerField } from './GlimmerField'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ScrollArtwork, LotusOrnament } from './KeralaArtwork'

type WeddingEvent = (typeof wedding.events.items)[number]

function WeddingEventCard({ event, index, reduceMotion }: { event: WeddingEvent; index: number; reduceMotion: boolean | null }) {
  return <motion.article className="wedding-event-card" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .08 }}>
    <span className="wedding-event-number">0{index + 1}</span>
    <h3>{event.title}</h3>
    <p className="event-detail-line"><CalendarDays size={15} aria-hidden="true" />{event.date}</p>
    <p className="event-detail-line"><Clock3 size={15} aria-hidden="true" />{event.time}</p>
    <p className="event-detail-line"><MapPin size={15} aria-hidden="true" /><span>{event.location}{'destination' in event && <><br />{event.destination}</>}</span></p>
    <p className="wedding-event-description">{event.description}</p>
    {'directionsUrl' in event && <div className="event-directions">
      <a href={event.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={`${wedding.events.directionsLabel}: ${event.directionsContext}`}>
        <MapPin size={14} aria-hidden="true" />{wedding.events.directionsLabel}
      </a>
    </div>}
  </motion.article>
}

export function WeddingEvents() {
  const reduceMotion = useReducedMotion()
  const revealRef = useScrollReveal<HTMLElement>()
  return <section ref={revealRef} data-scroll-reveal className="wedding-events" id="events" aria-labelledby="wedding-events-title">
    <GlimmerField variant="events" />
    <div className="wedding-events-heading">
      <p className="eyebrow">{wedding.events.eyebrow}</p><FloralDivider />
      <h2 id="wedding-events-title">{wedding.events.title}</h2>
      <p>{wedding.events.introduction}</p>
    </div>
    <div className={`celebrations-layout${wedding.artwork.enabled ? ' has-artwork' : ''}`}>
      {wedding.artwork.enabled && <div className="celebrations-illustration">
        <LotusOrnament />
        <ScrollArtwork image="celebration" distance={24} decorative={false} />
        <span className="celebrations-art-date">{wedding.date.shortDisplay}</span>
      </div>}
      <div className="wedding-event-grid">{wedding.events.items.map((event, index) => <WeddingEventCard key={`${event.title}-${index}`} event={event} index={index} reduceMotion={reduceMotion} />)}</div>
    </div>
  </section>
}
