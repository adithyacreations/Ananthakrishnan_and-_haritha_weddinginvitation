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
import { GlimmerField } from './components/GlimmerField'
import { PetalDrift } from './components/PetalDrift'
import { useScrollReveal } from './hooks/useScrollReveal'
import { BackwaterPassage } from './components/BackwaterPassage'
import { InvitationCover } from './components/InvitationCover'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { OpeningGate } from './components/OpeningGate'

function App() {
  const [opened, setOpened] = useState(false)
  return <>
    <AnimatePresence onExitComplete={() => document.getElementById('opening-title')?.focus({ preventScroll: true })}>
      {!opened && <OpeningGate key="opening-gate" onOpen={() => setOpened(true)} />}
    </AnimatePresence>
    {opened && <InvitationContent />}
  </>
}

function InvitationContent() {
  const footerRevealRef = useScrollReveal<HTMLElement>()
  return <main>
    <MusicToggle />
    <InvitationCover />

    <FamilyInvitation />
    <WeddingCountdown />
    <CoupleStory />
    {wedding.artwork.enabled && <BackwaterPassage />}
    <NilavilakkuExperience />
    <WeddingEvents />
    <GuestGuidance />
    <RsvpSection />
    <InvitationSharing />

    <footer ref={footerRevealRef} data-scroll-reveal>
      <GlimmerField variant="closing" />
      <PetalDrift variant="closing" />
      <a className="monogram" href="#home"><span className="monogram-initial">{wedding.monogram.groomInitial}</span><span className="monogram-separator">{wedding.monogram.separator}</span><span className="monogram-initial">{wedding.monogram.brideInitial}</span></a>
      <p className="footer-signoff"><span>{wedding.couple.groom} <i>✳</i> {wedding.couple.bride}</span><span>{wedding.closingMessage}</span></p>
      <span className="footer-date">{wedding.date.display.toUpperCase()} · {wedding.date.region.toUpperCase()}</span>
      <p className="developer-credit">{wedding.developerCredit.label}{' '}<a href={wedding.developerCredit.url} target="_blank" rel="noopener noreferrer" aria-label={`${wedding.developerCredit.name} on LinkedIn`}><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 2.99 0 3.57 1.97 3.57 4.53v5.24Z" /></svg>{wedding.developerCredit.name}</a></p>
    </footer>
  </main>
}

export default App
