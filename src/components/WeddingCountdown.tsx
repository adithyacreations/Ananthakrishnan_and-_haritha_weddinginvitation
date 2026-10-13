import { useEffect, useState } from 'react'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { GlimmerField } from './GlimmerField'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Remaining = { days: number; hours: number; minutes: number; seconds: number; expired: boolean }

function getRemaining(target: number, now: number): Remaining {
  const total = target - now
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  const seconds = Math.floor(total / 1000)
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    expired: false,
  }
}

export function WeddingCountdown() {
  const revealRef = useScrollReveal<HTMLElement>()
  const reduceMotion = useReducedMotion()
  const target = Date.parse(wedding.date.iso)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const remaining = getRemaining(target, now)
  const localEventTime = new Intl.DateTimeFormat('en', {
    dateStyle: 'long', timeStyle: 'short', timeZone: wedding.date.timeZone,
  }).format(target)
  const units = [
    [remaining.days, wedding.countdown.units.days],
    [remaining.hours, wedding.countdown.units.hours],
    [remaining.minutes, wedding.countdown.units.minutes],
    [remaining.seconds, wedding.countdown.units.seconds],
  ] as const

  return <section ref={revealRef} data-scroll-reveal className="countdown" aria-labelledby="countdown-title">
    <GlimmerField variant="countdown" />
    <p className="eyebrow light">{wedding.countdown.eyebrow}</p>
    <FloralDivider />
    <h2 id="countdown-title">{wedding.countdown.title}</h2>
    {remaining.expired ? <p className="countdown-complete" role="status">{wedding.date.countdownComplete}</p> : <>
      <div className="countdown-units" role="timer" aria-live="off" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds until ${wedding.date.display}`}>
        {units.map(([value, label]) => <div className="countdown-unit" key={label}><strong><AnimatePresence mode="popLayout" initial={false}><motion.span key={value} initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : .16, ease: 'easeOut' }}>{String(value).padStart(2, '0')}</motion.span></AnimatePresence></strong><span>{label}</span></div>)}
      </div>
      <p className="countdown-local-time">{localEventTime} · {wedding.date.timeZone}</p>
    </>}
  </section>
}
