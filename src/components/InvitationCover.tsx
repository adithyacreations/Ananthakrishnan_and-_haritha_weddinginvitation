import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { wedding } from '../config/wedding'
import { WeddingImage } from './WeddingImage'

export function InvitationCover() {
  const reduceMotion = useReducedMotion()
  const { opening, couple, date, monogram } = wedding

  return <section className="invitation-cover" id="home" aria-labelledby="opening-title">
    <div className="cover-card">
      <header className="cover-topline">
        <span className="cover-monogram" aria-hidden="true">{monogram.groomInitial}<i>&amp;</i>{monogram.brideInitial}</span>
        <span>{date.region}</span>
      </header>

      <div className="cover-layout">
        <motion.div className="cover-copy" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .65, ease: 'easeOut' }}>
          <p className="cover-kicker">{opening.kicker}</p>
          <h1 id="opening-title">
            <span>{couple.groom}</span>
            <span className="cover-join">&amp;</span>
            <span>{couple.bride}</span>
          </h1>
          <p className="cover-invitation-line">{opening.invitationLine}</p>
          <div className="cover-date"><span>{date.weekday}</span><time dateTime={date.iso}>{date.display}</time></div>
          <a className="cover-action" href="#story" onClick={() => window.dispatchEvent(new Event('wedding:open-invitation'))}>
            {opening.openButton}<ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </motion.div>

        <div className="cover-art">
          <WeddingImage className="cover-image" {...opening.illustration} fallbackLabel="Wedding illustration" fetchPriority="high" decoding="async" />
          <div className="cover-art-top-border" aria-hidden="true" style={{ backgroundImage: `url("${opening.illustration.src}")` }} />
        </div>
      </div>

      <a className="cover-scroll" href="#story"><span>{opening.scrollLabel}</span><ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" /></a>
    </div>
  </section>
}
