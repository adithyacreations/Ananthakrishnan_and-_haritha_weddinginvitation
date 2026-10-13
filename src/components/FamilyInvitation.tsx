import { FloralDivider } from './FloralDivider'
import { wedding } from '../config/wedding'
import { GlimmerField } from './GlimmerField'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PetalDrift } from './PetalDrift'

const families = [wedding.families.groom, wedding.families.bride]

export function FamilyInvitation() {
  const copy = wedding.familyInvitation
  const revealRef = useScrollReveal<HTMLElement>()
  return <section ref={revealRef} data-scroll-reveal className="invitation family-invitation" id="story" aria-labelledby="family-invitation-title">
    <GlimmerField variant="invitation" />
    <PetalDrift variant="closing" />
    <div className="invitation-inner">
      <p className="eyebrow">{copy.eyebrow}</p>
      <FloralDivider />
      <h2 id="family-invitation-title">{copy.title}<br /><em>{copy.titleEmphasis}</em></h2>
      <p className="intro invitation-message">{copy.wording}</p>
      <div className="invitation-family-pair">
        {families.map((family) => <div className="invitation-family" key={family.heading}>
          <span className="invitation-family-label">{family.heading}</span>
          {family.relation && <span className="invitation-family-relation">{family.relation}</span>}
          {family.parents.map((parent) => <strong key={parent}>{parent}</strong>)}
          <span className="invitation-family-address">{family.address}</span>
        </div>)}
      </div>
      <div className="date-card"><span className="eyebrow">{copy.saveTheDate}</span><strong>{wedding.date.shortDisplay}</strong><span className="date-card-details">{wedding.date.weekday} · {wedding.date.time} · {wedding.date.region}</span><span className="date-card-venue">{wedding.venue.name}</span></div>
      <div className="invitation-ornament" aria-hidden="true">❧　✳　❧</div>
    </div>
    <div className="side-note">{wedding.date.display.toUpperCase()} <i>✳</i> {wedding.date.region.toUpperCase()}</div>
  </section>
}
