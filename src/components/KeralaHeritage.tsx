import { wedding } from '../config/wedding'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { LotusOrnament, ScrollArtwork } from './KeralaArtwork'

export function KeralaHeritage() {
  const reveal = useScrollReveal<HTMLElement>()
  const copy = wedding.artwork.heritage

  if (!wedding.artwork.enabled) return null
  return <section ref={reveal} data-scroll-reveal className="kerala-heritage" aria-labelledby="heritage-title">
    <div className="heritage-heading">
      <p className="eyebrow">{copy.eyebrow}</p>
      <LotusOrnament />
      <h2 id="heritage-title">{copy.title}<br /><em>{copy.titleEmphasis}</em></h2>
      <p className="heritage-introduction">{copy.introduction}</p>
    </div>
    <div className="heritage-art-track">
      {copy.scenes.map((scene, index) => <figure className={`heritage-scene heritage-scene-${scene.image}`} key={scene.image}>
        <span className="heritage-index" aria-hidden="true">0{index + 1}</span>
        <div className="heritage-illustration">
          <ScrollArtwork image={scene.image} distance={index === 1 ? 18 : 30} decorative={false} />
          {scene.image === 'weddingSteps' && <span className="heritage-art-note" aria-hidden="true">
            <LotusOrnament />
            <span>{wedding.monogram.groomInitial} <i>&</i> {wedding.monogram.brideInitial}</span>
            <small>{wedding.date.shortDisplay}</small>
          </span>}
        </div>
        <figcaption><span className="eyebrow">{scene.label}</span><span>{scene.caption}</span></figcaption>
      </figure>)}
    </div>
    <div className="kasavu-ribbon" aria-hidden="true" />
  </section>
}
