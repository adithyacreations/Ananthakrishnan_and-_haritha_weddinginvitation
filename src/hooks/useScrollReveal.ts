import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (reduceMotion || !('IntersectionObserver' in window)) {
      element.classList.add('is-revealed')
      element.classList.add('is-in-view')
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-revealed')
        element.classList.add('is-in-view')
      } else {
        element.classList.remove('is-in-view')
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [reduceMotion])

  return ref
}
