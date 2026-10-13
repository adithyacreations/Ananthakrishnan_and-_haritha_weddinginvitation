import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { PetalDrift } from './PetalDrift'

function JasmineSprig({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 100 74" aria-hidden="true">
    <path d="M8 65C27 48 42 29 84 10M28 47l-13-5m25-9 2-15m12 8 14-13m-27 21 14 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <g fill="#fff9e9" stroke="#d9c899" strokeWidth=".7"><circle cx="15" cy="42" r="4"/><circle cx="40" cy="23" r="4"/><circle cx="68" cy="15" r="4"/><circle cx="54" cy="45" r="4"/><circle cx="84" cy="10" r="4"/></g>
    <g fill="#d8b96f"><circle cx="15" cy="42" r="1"/><circle cx="40" cy="23" r="1"/><circle cx="68" cy="15" r="1"/><circle cx="54" cy="45" r="1"/><circle cx="84" cy="10" r="1"/></g>
  </svg>
}

function NilavilakkuIllustration({ lit }: { lit: boolean }) {
  return <svg className={`nilavilakku-art${lit ? ' is-lit' : ''}`} viewBox="0 0 280 400" role="img" aria-labelledby="lamp-title lamp-description">
    <title id="lamp-title">Traditional Kerala nilavilakku</title>
    <desc id="lamp-description">A hand-drawn brass oil lamp {lit ? 'with a glowing flame' : 'waiting to be lit'}.</desc>
    <defs>
      <linearGradient id="brass" x1="0" x2="1" y1="0" y2=".2"><stop stopColor="#75502a"/><stop offset=".24" stopColor="#dfbd72"/><stop offset=".48" stopColor="#94652f"/><stop offset=".72" stopColor="#f0d58c"/><stop offset="1" stopColor="#6d4825"/></linearGradient>
      <radialGradient id="flame-halo"><stop stopColor="#ffd984" stopOpacity=".7"/><stop offset=".45" stopColor="#eca74a" stopOpacity=".19"/><stop offset="1" stopColor="#eca74a" stopOpacity="0"/></radialGradient>
      <linearGradient id="flame" x1="0" x2="0" y1="1" y2="0"><stop stopColor="#f18b36"/><stop offset=".55" stopColor="#ffe187"/><stop offset="1" stopColor="#fff9db"/></linearGradient>
      <filter id="soft-glow" x="-150%" y="-100%" width="400%" height="400%"><feGaussianBlur stdDeviation="11"/></filter>
    </defs>
    <ellipse cx="140" cy="363" rx="88" ry="13" fill="#080f0b" opacity=".42" />
    <g fill="none" stroke="url(#brass)" strokeLinecap="round" strokeLinejoin="round">
      <path strokeWidth="13" d="M76 355h128m-112-6h96m-79-5h62" />
      <path strokeWidth="10" d="M140 344V169" />
      <path strokeWidth="5" d="M126 327h28m-25-8h22m-25-30h28m-25-9h22m-25-33h28m-24-8h20m-23-34h26m-22-8h18" />
      <path strokeWidth="8" d="M130 177h20m-17-10h14" />
      <path strokeWidth="11" d="M140 164c0-11-20-14-20-26s20-13 20-26 20-14 20-26" />
      <path strokeWidth="9" d="M139 163c-10 6-42 4-57-7-9-7-12-20-23-27 16 3 24-4 38-4 17 0 29 11 43 11 14 0 27-11 44-11 14 0 22 7 38 4-11 7-14 20-23 27-15 11-47 13-60 7Z" />
      <path strokeWidth="2" d="M72 137c13 12 41 14 68 14m68-14c-13 12-41 14-68 14" />
      <path strokeWidth="5" d="M140 99V78" />
    </g>
    <path d="M140 80c-20-21-12-43 0-62 12 19 20 41 0 62Z" fill="url(#flame-halo)" filter="url(#soft-glow)" className="flame-aura" />
    <path d="M140 80c-17-18-9-37 0-53 10 16 17 35 0 53Z" fill="url(#flame)" className="flame-shape" />
    <path d="M140 77c-7-10-4-19 0-28 5 9 8 18 0 28Z" fill="#fff8d9" className="flame-core" />
    <g fill="#e2c47c" opacity=".8"><circle cx="104" cy="128" r="2"/><circle cx="176" cy="128" r="2"/><circle cx="140" cy="193" r="2"/><circle cx="140" cy="264" r="2"/><circle cx="140" cy="313" r="2"/></g>
  </svg>
}

export function NilavilakkuExperience() {
  const [lit, setLit] = useState(false)
  const reduceMotion = useReducedMotion()
  return <motion.section
    className={`nilavilakku${lit ? ' lit' : ' unlit'}`}
    aria-labelledby="nilavilakku-heading"
    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .16 }}
    transition={{ duration: reduceMotion ? 0 : .65, ease: 'easeOut' }}
  >
    <div className="courtyard-arch" aria-hidden="true"><i /><i /><i /></div>
    <PetalDrift variant="lamp" />
    <JasmineSprig className="lamp-jasmine lamp-jasmine-left" />
    <JasmineSprig className="lamp-jasmine lamp-jasmine-right" />
    <div className="lamp-copy">
      <p className="eyebrow light">{wedding.nilavilakku.eyebrow}</p>
      <FloralDivider />
      <h2 id="nilavilakku-heading">{wedding.nilavilakku.titleLine1}<br /><em>{wedding.nilavilakku.titleLine2}</em></h2>
      <p className="lamp-invitation">{wedding.nilavilakku.invitation}</p>
      <button className="lamp-action" type="button" aria-pressed={lit} onClick={() => setLit(true)}>
        <span className="lamp-action-mark" aria-hidden="true">{lit ? '✦' : '✧'}</span>
        {lit ? wedding.nilavilakku.litAction : wedding.nilavilakku.action}
      </button>
      <p className="lamp-status" aria-live="polite">{lit ? wedding.nilavilakku.blessing : wedding.nilavilakku.prompt}</p>
    </div>
    <div className="lamp-scene" aria-label="Interactive brass lamp illustration">
      <div className="lamp-halo" aria-hidden="true" />
      <span className={`lamp-sparks${lit ? ' is-active' : ''}`} aria-hidden="true"><i /><i /><i /><i /><i /></span>
      <NilavilakkuIllustration lit={lit} />
      <span className="lamp-floor" aria-hidden="true" />
    </div>
    <span className="courtyard-caption">KERALA · A TRADITION OF LIGHT</span>
  </motion.section>
}
