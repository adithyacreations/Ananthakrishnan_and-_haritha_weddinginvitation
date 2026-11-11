import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { wedding } from '../config/wedding'
import { useScrollReveal } from '../hooks/useScrollReveal'

/** Original line illustration, without the supplied reference's watermark. */
function KeralaBoat() {
  return <svg viewBox="0 0 680 230" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M72 145Q186 186 458 150Q537 139 574 56Q594 157 474 180Q190 228 72 145Z" fill="var(--wine)" />
      <path d="M76 150Q247 198 476 159Q545 146 574 56M95 161Q232 199 467 169" />
      {[140, 187, 234, 281, 328, 375, 422].map((x, i) => <g key={x}>
        <circle cx={x} cy={126 - i * 2} r="7" fill="#bda16a" stroke="none" />
        <path d={`M${x - 4} ${135 - i * 2}l-8 21 22 7-4-27M${x - 8} ${142 - i * 2}l-18 16-25 4M${x - 10} ${156 - i * 2}l-28 27`} />
        <path d={`M${x - 30} ${174 - i * 2}l-11 17`} strokeWidth="4" />
      </g>)}
      <circle cx="506" cy="91" r="8" fill="#bda16a" stroke="none" />
      <path d="M502 102l-9 32 19-3 2-28M503 131l-9 19m18-19 3 13M514 112l20-9 8-23M544 80V27l35-9-11 18-24 5" />
      <path d="M90 204q95 10 170 1m105-2q88-1 144-20M189 218q115 8 246-7M47 190h36m485-30h34" opacity=".4" />
    </g>
  </svg>
}

export function BackwaterPassage() {
  const scene = useRef<HTMLDivElement>(null)
  const reveal = useScrollReveal<HTMLElement>()
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: scene, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const copy = wedding.artwork.backwaters
  if (!wedding.artwork.enabled) return null
  return <section ref={reveal} data-scroll-reveal className="backwater-passage" aria-labelledby="backwater-title">
    <div className="backwater-copy"><p className="eyebrow light">{copy.eyebrow}</p><h2 id="backwater-title">{copy.title}</h2><p>{copy.caption}</p></div>
    <div ref={scene} className="backwater-scene" aria-hidden="true">
      <div className="backwater-moon" />
      <motion.div className="backwater-boat" style={{ x: reducedMotion ? 0 : x }}><div className="boat-bob"><KeralaBoat /></div></motion.div>
      <svg className="backwater-ripples" viewBox="0 0 1440 130" preserveAspectRatio="none"><g fill="none" stroke="currentColor" strokeWidth=".7"><path d="M-20 45Q160 2 360 45T720 45T1080 45T1460 45M-20 72Q160 28 360 72T720 72T1080 72T1460 72M-20 100Q160 55 360 100T720 100T1080 100T1460 100" /></g></svg>
    </div>
  </section>
}
