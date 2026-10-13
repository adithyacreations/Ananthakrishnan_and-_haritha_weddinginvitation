import { useEffect, useRef } from 'react'

type PetalDriftProps = { variant: 'opening' | 'lamp' | 'closing' }

/** Tiny decorative petals; CSS keeps the count bounded and motion transform-only. */
export function PetalDrift({ variant }: PetalDriftProps) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      element.classList.toggle('is-visible', entry.isIntersecting)
    }, { rootMargin: '80px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <span ref={ref} className={`petal-drift petal-drift-${variant}`} aria-hidden="true">
    <i /><i /><i /><i /><i />
  </span>
}
