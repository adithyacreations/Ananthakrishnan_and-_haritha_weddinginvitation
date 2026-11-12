import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { wedding } from '../config/wedding'

export function OpeningGate({ onOpen }: { onOpen: () => void }) {
  const reduced = useReducedMotion()
  const [opening, setOpening] = useState(false)
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [])
  return <motion.section className="opening-gate" aria-labelledby="gate-title" exit="opened" initial="closed" animate="closed">
    <motion.div aria-hidden="true" className="opening-leaf opening-leaf-left" variants={{ closed: { rotateY: 0 }, opened: { rotateY: -105, opacity: 0 } }} transition={{ duration: reduced ? 0 : 1.1, ease: [.22, .65, .25, 1] }} />
    <motion.div aria-hidden="true" className="opening-leaf opening-leaf-right" variants={{ closed: { rotateY: 0 }, opened: { rotateY: 105, opacity: 0 } }} transition={{ duration: reduced ? 0 : 1.1, ease: [.22, .65, .25, 1] }} />
    <motion.div className="opening-gate-copy" variants={{ closed: { opacity: 1 }, opened: { opacity: 0 } }} transition={{ duration: reduced ? 0 : .2 }}>
      <p className="opening-gate-kicker">{wedding.opening.kicker}</p>
      <div className="opening-gate-seal" aria-hidden="true">{wedding.monogram.groomInitial}<i>&amp;</i>{wedding.monogram.brideInitial}</div>
      <h1 id="gate-title">{wedding.couple.groom} <i>&amp;</i> {wedding.couple.bride}</h1>
      <p className="opening-gate-date">{wedding.date.display}</p>
      <button type="button" disabled={opening} onClick={() => { setOpening(true); onOpen() }}>
        {wedding.opening.openButton}<ArrowRight size={18} aria-hidden="true" />
      </button>
    </motion.div>
  </motion.section>
}
