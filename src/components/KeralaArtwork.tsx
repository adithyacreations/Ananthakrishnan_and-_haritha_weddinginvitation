import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { wedding } from '../config/wedding'

export type ArtworkName = keyof typeof wedding.artwork.images

/** Only the illustration moves; its container always reserves layout space. */
export function ScrollArtwork({ image, className = '', distance = 24, decorative = true }: {
  image: ArtworkName
  className?: string
  distance?: number
  decorative?: boolean
}) {
  const container = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const art = wedding.artwork.images[image]

  if (!wedding.artwork.enabled) return null
  return <div ref={container} className={`scroll-artwork ${className}`} aria-hidden={decorative || undefined}>
    <motion.img src={art.src} width={art.width} height={art.height}
      alt={decorative ? '' : art.alt} loading="lazy" decoding="async"
      style={{ y: reducedMotion ? 0 : y }} />
  </div>
}

/** Small, original SVG details complement the supplied watercolor illustrations. */
export function GarlandCanopy({ className = '' }: { className?: string }) {
  if (!wedding.artwork.enabled) return null
  return <div className={`garland-canopy ${className}`} aria-hidden="true">
    <svg viewBox="0 0 960 140" fill="none">
      <path d="M0 16Q160 126 320 16Q480 126 640 16Q800 126 960 16" stroke="#987a42" strokeWidth="2" />
      {Array.from({ length: 49 }, (_, i) => {
        const x = i * 20
        const phase = (x % 320) / 320
        const y = 16 + 220 * phase * (1 - phase)
        return <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0C-14 6-12 25 0 34C12 22 13 7 0 0Z" fill={i % 2 ? 'var(--maroon)' : '#ab3038'} />
          <path d="M0 4V29" stroke="#d6af5c" strokeWidth=".7" />
          <g fill={i % 4 === 0 ? '#b58a40' : '#fbf2d7'}>
            <circle cy="-1" r="4" /><circle cx="-5" cy="3" r="4" />
            <circle cx="5" cy="3" r="4" /><circle cy="7" r="4" />
          </g>
          <circle cy="3" r="2" fill="#d6af5c" />
        </g>
      })}
      {[0, 320, 640, 960].map((x) => <g key={x} transform={`translate(${x} 16)`} className="garland-tassel">
        <path d="M0 5V85" stroke="#bca06d" strokeWidth="1.5" />
        {[18, 31, 44, 57, 70].map((y, i) => <ellipse key={y} cy={y} rx="5" ry="7" fill={i % 2 ? '#f5ebce' : 'var(--maroon)'} />)}
        <path d="M-8 95Q-4 85-4 80Q0 75 4 80Q4 85 8 95Z" fill="#b58a40" />
        <path d="M-9 95H9M0 96v4" stroke="#b58a40" strokeWidth="2" />
      </g>)}
    </svg>
  </div>
}

export function LotusOrnament({ className = '' }: { className?: string }) {
  return <svg className={`lotus-ornament ${className}`} viewBox="0 0 260 60" fill="none" aria-hidden="true">
    <path d="M0 38H87M173 38H260M99 38l4-4 4 4-4 4ZM153 38l4-4 4 4-4 4Z" stroke="currentColor" strokeWidth=".8" />
    <path d="M130 44C111 34 119 15 130 7C141 15 149 34 130 44ZM130 44C114 46 103 34 106 22C119 20 130 29 130 44ZM130 44C146 46 157 34 154 22C141 20 130 29 130 44ZM130 45C110 52 95 42 94 33C107 30 120 34 130 45ZM130 45C150 52 165 42 166 33C153 30 140 34 130 45Z" stroke="currentColor" strokeWidth="1" />
    <path d="M118 53h24" stroke="currentColor" />
  </svg>
}
