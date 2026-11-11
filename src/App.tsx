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
import { VenueSection } from './components/VenueSection'
import { GlimmerField } from './components/GlimmerField'
import { PetalDrift } from './components/PetalDrift'
import { useScrollReveal } from './hooks/useScrollReveal'
import { KeralaHeritage } from './components/KeralaHeritage'
import { BackwaterPassage } from './components/BackwaterPassage'
import { InvitationCover } from './components/InvitationCover'

function App() {
  const footerRevealRef = useScrollReveal<HTMLElement>()
  return <main>
    <MusicToggle />
    <InvitationCover />

    <FamilyInvitation />
    <WeddingCountdown />
    <KeralaHeritage />
    <CoupleStory />
    {wedding.artwork.enabled && <BackwaterPassage />}
    <NilavilakkuExperience />
    <WeddingEvents />
    <VenueSection />
    <GuestGuidance />
    <RsvpSection />
    <InvitationSharing />

    <footer ref={footerRevealRef} data-scroll-reveal>
      <GlimmerField variant="closing" />
      <PetalDrift variant="closing" />
      <a className="monogram" href="#home"><span className="monogram-initial">{wedding.monogram.groomInitial}</span><span className="monogram-separator">{wedding.monogram.separator}</span><span className="monogram-initial">{wedding.monogram.brideInitial}</span></a>
      <p className="footer-signoff"><span>{wedding.couple.groom} <i>✳</i> {wedding.couple.bride}</span><span>{wedding.closingMessage}</span></p>
      <span>{wedding.date.display.toUpperCase()} · {wedding.date.region.toUpperCase()}</span>
    </footer>
  </main>
}

export default App
