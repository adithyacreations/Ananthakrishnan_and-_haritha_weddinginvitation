import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function GuestGuidance() {
  const revealRef = useScrollReveal<HTMLElement>()
  const { dressCode, guestInformation } = wedding
  if (!dressCode.enabled && !guestInformation.enabled) return null

  return <section ref={revealRef} data-scroll-reveal className="guest-guidance" aria-label="Guest information">
    {dressCode.enabled && <article className="guest-card"><p className="eyebrow">{dressCode.eyebrow}</p><FloralDivider /><h2>{dressCode.title}</h2><p>{dressCode.description}</p><p className="guest-note">{dressCode.note}</p></article>}
    {guestInformation.enabled && <article className="guest-card"><p className="eyebrow">{guestInformation.eyebrow}</p><FloralDivider /><h2>{guestInformation.title}</h2>
      <div className="guest-contacts">{wedding.contacts.map((contact) => <address key={contact.name}>
        <strong>{contact.name}</strong>
        <span>{contact.address}</span>
        <div>{contact.phones.map((phone) => <a key={phone} href={`tel:${phone}`}>{phone}</a>)}</div>
      </address>)}</div>
    </article>}
  </section>
}
