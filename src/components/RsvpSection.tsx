import { useEffect } from 'react'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { useScrollReveal } from '../hooks/useScrollReveal'

type TallyWindow = Window & { Tally?: { loadEmbeds: () => void } }

export function RsvpSection() {
  const rsvp = wedding.rsvp
  const revealRef = useScrollReveal<HTMLElement>()

  useEffect(() => {
    if (!rsvp.enabled) return
    const loadEmbeds = () => (window as TallyWindow).Tally?.loadEmbeds()
    if ((window as TallyWindow).Tally) {
      loadEmbeds()
      return
    }

    // Share one official loader across React Strict Mode mounts.
    const existing = document.getElementById('tally-embed-script')
    const script = existing ?? document.createElement('script')
    script.addEventListener('load', loadEmbeds)
    if (!existing) {
      const loader = script as HTMLScriptElement
      loader.id = 'tally-embed-script'
      loader.src = 'https://tally.so/widgets/embed.js'
      loader.async = true
      document.body.appendChild(loader)
    }
    return () => script.removeEventListener('load', loadEmbeds)
  }, [rsvp.enabled])

  if (!rsvp.enabled) return null

  return <section ref={revealRef} data-scroll-reveal className="rsvp-section" id="rsvp" aria-labelledby="rsvp-title">
    <p className="eyebrow">{rsvp.eyebrow}</p><FloralDivider />
    <h2 id="rsvp-title">{rsvp.title}</h2>
    <p className="rsvp-introduction">{rsvp.introduction}</p>
    <div className="rsvp-embed-card">
      <iframe
        id="wedding-rsvp-embed"
        className="rsvp-embed"
        src={rsvp.embedUrl}
        width="100%"
        height="460"
        loading="lazy"
        title={rsvp.frameTitle}
      />
    </div>
    <p className="rsvp-fallback">{rsvp.fallbackText}{' '}<a href={rsvp.formUrl} target="_blank" rel="noopener noreferrer">{rsvp.fallbackLinkLabel}</a></p>
  </section>
}
