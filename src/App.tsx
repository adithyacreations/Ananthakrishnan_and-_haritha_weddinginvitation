import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { wedding } from './config/wedding'
import { CoupleStory } from './components/CoupleStory'
import { FamilyInvitation } from './components/FamilyInvitation'
import { GuestGuidance } from './components/GuestGuidance'
import { InvitationSharing } from './components/InvitationSharing'
import { MusicToggle } from './components/MusicToggle'
import { NilavilakkuExperience } from './components/NilavilakkuExperience'
import { RsvpSection } from './components/RsvpSection'
import { WeddingCountdown } from './components/WeddingCountdown'
import { WeddingEvents } from './components/WeddingEvents'
import { WeddingImage } from './components/WeddingImage'
import { VenueSection } from './components/VenueSection'
import { WeddingGallery } from './components/WeddingGallery'
import { GlimmerField } from './components/GlimmerField'
import { PetalDrift } from './components/PetalDrift'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  const reduceMotion = useReducedMotion()
  const footerRevealRef = useScrollReveal<HTMLElement>()
  return <main>
    <header className="topbar">
      <a className="monogram" href="#home" aria-label="Home"><span className="monogram-initial">{wedding.monogram.brideInitial}</span><span className="monogram-separator">{wedding.monogram.separator}</span><span className="monogram-initial">{wedding.monogram.groomInitial}</span></a>
    </header>
    <MusicToggle />

    <section className="hero" id="home" aria-labelledby="opening-title">
      <WeddingImage className="hero-image" src={wedding.images.hero} alt={wedding.images.alt.hero} fallbackLabel="A Kerala wedding celebration" loading="eager" fetchPriority="high" decoding="async" />
      <div className="hero-shade" /><div className="hero-veil" aria-hidden="true" /><GlimmerField variant="opening" /><div className="hero-frame" />
      <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .9, delay: .25, ease: 'easeOut' }}>
        <p className="eyebrow light hero-kicker">{wedding.opening.kicker}</p>
        <div className="lamp-mark" aria-hidden="true"><span>✺</span></div>
        <h1 id="opening-title"><span className="hero-name">{wedding.couple.groom}</span><em>&</em><span className="hero-name">{wedding.couple.bride}</span></h1>
        <p className="hero-subtitle">{wedding.opening.invitationLine}</p>
        <div className="hero-date"><span>{wedding.date.weekday}</span><i />{wedding.date.display}<i /><span>{wedding.date.region}</span></div>
        <a className="open-invitation" href="#story" onClick={() => window.dispatchEvent(new Event('wedding:open-invitation'))}>{wedding.opening.openButton}<ArrowRight size={15} strokeWidth={1.4} /></a>
      </motion.div>
      <div className="jasmine-corner jasmine-top" aria-hidden="true">✿<span>·</span>✳<span>·</span>✿</div>
      <PetalDrift variant="opening" />
      <a className="scroll-cue" href="#story"><span>{wedding.opening.scrollLabel}</span><ArrowDown size={15} /></a>
      <span className="hero-index">{wedding.date.shortDisplay}</span>
    </section>

    <FamilyInvitation />
    <WeddingCountdown />
    <CoupleStory />
    <WeddingGallery />
    <NilavilakkuExperience />
    <WeddingEvents />
    <VenueSection />
    <GuestGuidance />
    <RsvpSection />
    <InvitationSharing />

    <footer ref={footerRevealRef} data-scroll-reveal>
      <GlimmerField variant="closing" />
      <PetalDrift variant="closing" />
      <a className="monogram" href="#home"><span className="monogram-initial">{wedding.monogram.brideInitial}</span><span className="monogram-separator">{wedding.monogram.separator}</span><span className="monogram-initial">{wedding.monogram.groomInitial}</span></a>
      <p className="footer-signoff"><span>{wedding.couple.groom} <i>✳</i> {wedding.couple.bride}</span><span>{wedding.closingMessage}</span></p>
      <span>{wedding.date.display.toUpperCase()} · {wedding.date.region.toUpperCase()}</span>
    </footer>
  </main>
}

export default App
