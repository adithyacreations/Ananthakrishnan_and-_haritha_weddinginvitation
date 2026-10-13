import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { GlimmerField } from './GlimmerField'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function WeddingGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [unavailable, setUnavailable] = useState<string[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const revealRef = useScrollReveal<HTMLElement>()
  const photos = wedding.gallery.items.filter((photo) => !unavailable.includes(photo.src))
  const isOpen = activeIndex !== null
  const activePhoto = activeIndex === null ? null : photos[activeIndex]

  function openPhoto(index: number, opener: HTMLElement) {
    returnFocusRef.current = opener
    setActiveIndex(index)
  }

  function close() { setActiveIndex(null) }

  function move(direction: number) {
    setActiveIndex((current) => current === null || photos.length < 2
      ? current
      : (current + direction + photos.length) % photos.length)
  }

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      returnFocusRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); close() }
      else if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
      else if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)')
        if (!controls?.length) return
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (document.activeElement === dialogRef.current) { event.preventDefault(); (event.shiftKey ? last : first).focus() }
        else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, photos.length])

  if (!photos.length) return null

  return <section ref={revealRef} data-scroll-reveal className="wedding-gallery" id="gallery" aria-labelledby="gallery-title">
    <GlimmerField variant="gallery" />
    <motion.div className="gallery-heading" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .5 }}>
      <p className="eyebrow">{wedding.gallery.eyebrow}</p><FloralDivider />
      <h2 id="gallery-title">{wedding.gallery.title}</h2>
      <p>{wedding.gallery.introduction}</p>
    </motion.div>
    <div className="gallery-grid">
      {photos.map((photo, index) => <motion.figure className={`gallery-card gallery-card-${photo.orientation}`} key={photo.src} initial={reduceMotion ? false : { opacity: 0, y: 14, scale: .98, clipPath: 'inset(0 0 14% 0)' }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: .15 }} transition={{ duration: .65, delay: index * .11, ease: 'easeOut' }}>
        <button className={`gallery-open gallery-open-${photo.orientation}`} type="button" onClick={(event) => openPhoto(index, event.currentTarget)} aria-label={`View photo: ${photo.caption}`}>
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" style={{ objectPosition: photo.objectPosition }} onError={() => setUnavailable((current) => current.includes(photo.src) ? current : [...current, photo.src])} />
          <span className="gallery-card-caption">{photo.caption}</span>
        </button>
      </motion.figure>)}
    </div>
    <AnimatePresence>
      {activePhoto && <motion.div className="gallery-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
        <div className="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-dialog-caption" tabIndex={-1} ref={dialogRef}>
          <button className="gallery-control gallery-close" type="button" onClick={close} aria-label="Close image viewer"><X size={23} aria-hidden="true" /></button>
          {photos.length > 1 && <button className="gallery-control gallery-previous" type="button" onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft size={29} aria-hidden="true" /></button>}
          <img src={activePhoto.src} alt={activePhoto.alt} className="gallery-lightbox-image" onError={() => { setUnavailable((current) => current.includes(activePhoto.src) ? current : [...current, activePhoto.src]); setActiveIndex((current) => current === null ? null : Math.min(current, Math.max(0, photos.length - 2))) }} />
          {photos.length > 1 && <button className="gallery-control gallery-next" type="button" onClick={() => move(1)} aria-label="Next photo"><ChevronRight size={29} aria-hidden="true" /></button>}
          <p id="gallery-dialog-caption" className="gallery-lightbox-caption">{activePhoto.caption}</p>
        </div>
      </motion.div>}
    </AnimatePresence>
  </section>
}
