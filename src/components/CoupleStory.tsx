import { motion, useReducedMotion } from 'framer-motion'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { WeddingImage } from './WeddingImage'
import { GlimmerField } from './GlimmerField'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function CoupleStory() {
  const reduceMotion = useReducedMotion()
  const revealRef = useScrollReveal<HTMLElement>()
  const story = wedding.coupleStory
  return <section ref={revealRef} data-scroll-reveal className="couple-story" aria-labelledby="couple-story-title">
    <GlimmerField variant="story" />
    <motion.div className="couple-story-copy" initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .65 }}>
      <p className="eyebrow">{story.eyebrow}</p>
      <FloralDivider />
      <h2 id="couple-story-title">{story.title}<br /><em>{story.titleEmphasis}</em></h2>
      <div className="couple-story-names"><span>{wedding.couple.bride}</span><i>✳</i><span>{wedding.couple.groom}</span></div>
      {story.paragraphs.map((paragraph) => <p className="couple-story-paragraph" key={paragraph}>{paragraph}</p>)}
    </motion.div>
    <div className="story-photos" aria-label="Portraits of the couple">
      <motion.figure className="story-photo story-photo-bride" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65, ease: 'easeOut' }}>
        <WeddingImage className="story-portrait" src={wedding.images.bride} alt={wedding.images.alt.bride} fallbackLabel={story.brideCaption} loading="lazy" decoding="async" />
        <figcaption>{story.brideCaption}<span>{wedding.couple.bride}</span></figcaption>
      </motion.figure>
      <motion.figure className="story-photo story-photo-groom" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7, delay: .1, ease: 'easeOut' }}>
        <WeddingImage className="story-portrait" src={wedding.images.groom} alt={wedding.images.alt.groom} fallbackLabel={story.groomCaption} loading="lazy" decoding="async" />
        <figcaption>{story.groomCaption}<span>{wedding.couple.groom}</span></figcaption>
      </motion.figure>
    </div>
  </section>
}
