import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Pin tall chapters only after their last line can be reached. */
export function useLayeredInvitation() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    const root = ref.current
    if (!root || reduced) return
    const sections = Array.from(root.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el.tagName === 'SECTION')
    const measure = () => sections.forEach((section, index) => {
      section.style.setProperty('--chapter-top', `${Math.min(0, window.innerHeight - section.offsetHeight)}px`)
      section.style.setProperty('--chapter-order', String(index + 1))
    })
    const observer = new ResizeObserver(measure)
    sections.forEach(section => observer.observe(section))
    window.addEventListener('resize', measure)
    measure()
    root.classList.add('layered-invitation')
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      root.classList.remove('layered-invitation')
      sections.forEach(section => { section.style.removeProperty('--chapter-top'); section.style.removeProperty('--chapter-order') })
    }
  }, [reduced])
  return ref
}
