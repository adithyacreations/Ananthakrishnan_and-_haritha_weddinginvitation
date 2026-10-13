import { useState } from 'react'
import { Check, Copy, MessageCircle } from 'lucide-react'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { GlimmerField } from './GlimmerField'
import { useScrollReveal } from '../hooks/useScrollReveal'

function getInvitationUrl() {
  if (wedding.sharing.deployedUrl.trim()) return wedding.sharing.deployedUrl.trim()
  const current = new URL(window.location.href)
  current.hash = ''
  return current.toString()
}

export function InvitationSharing() {
  const [status, setStatus] = useState('')
  const revealRef = useScrollReveal<HTMLElement>()

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getInvitationUrl())
      setStatus(wedding.sharing.copiedMessage)
    } catch {
      setStatus(wedding.sharing.copyErrorMessage)
    }
  }

  function shareOnWhatsApp() {
    const text = `${wedding.sharing.message}\n\n${getInvitationUrl()}`
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    const opened = window.open(shareUrl, '_blank')
    if (!opened) {
      setStatus(wedding.sharing.whatsappErrorMessage)
      return
    }
    opened.opener = null
    setStatus(wedding.sharing.whatsappOpenedMessage)
  }

  return <section ref={revealRef} data-scroll-reveal className="invitation-sharing" aria-labelledby="sharing-title">
    <GlimmerField variant="sharing" />
    <p className="eyebrow">{wedding.sharing.eyebrow}</p><FloralDivider />
    <h2 id="sharing-title">{wedding.sharing.title}</h2>
    <p className="sharing-message">{wedding.sharing.message}</p>
    <div className="sharing-actions">
      <button type="button" className="sharing-button sharing-whatsapp" onClick={shareOnWhatsApp}><MessageCircle size={17} aria-hidden="true" />{wedding.sharing.whatsappLabel}</button>
      <button type="button" className="sharing-button sharing-copy" onClick={copyLink}>{status === wedding.sharing.copiedMessage ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}{wedding.sharing.copyLabel}</button>
    </div>
    <p className="sharing-status" role="status" aria-live="polite">{status}</p>
  </section>
}
