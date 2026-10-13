import { useState, type FormEvent } from 'react'
import { wedding } from '../config/wedding'
import { FloralDivider } from './FloralDivider'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function RsvpSection() {
  const rsvp = wedding.rsvp
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const revealRef = useScrollReveal<HTMLElement>()
  if (!rsvp.enabled) return null

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (!rsvp.submissionUrl.trim()) {
      setStatus('Demo only: your response has not been sent or saved.')
      return
    }

    setSending(true)
    setStatus('')
    try {
      const response = await fetch(rsvp.submissionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('The RSVP service returned an error.')
      setStatus(rsvp.successMessage)
      form.reset()
    } catch {
      setStatus(rsvp.errorMessage)
    } finally {
      setSending(false)
    }
  }

  const demoMode = !rsvp.submissionUrl.trim()
  return <section ref={revealRef} data-scroll-reveal className="rsvp-section" id="rsvp" aria-labelledby="rsvp-title">
    <p className="eyebrow">{rsvp.eyebrow}</p><FloralDivider />
    <h2 id="rsvp-title">{rsvp.title}</h2>
    <p className="rsvp-introduction">{rsvp.introduction}</p>
    {demoMode && <p className="rsvp-demo-notice">{rsvp.demoNotice}</p>}
    <form className="rsvp-form" onSubmit={submit}>
      <label>{rsvp.nameLabel}<input name="name" type="text" autoComplete="name" required /></label>
      <label>{rsvp.attendanceLabel}<select name="attendance" defaultValue="" required><option value="" disabled>{rsvp.attendancePrompt}</option><option value="accepts">{rsvp.attendingOption}</option><option value="declines">{rsvp.decliningOption}</option></select></label>
      <label>{rsvp.guestCountLabel}<input name="guestCount" type="number" min="1" defaultValue="1" required /></label>
      <label className="rsvp-note-field">{rsvp.noteLabel}<textarea name="note" rows={3} /></label>
      <button className="rsvp-submit" type="submit" disabled={sending}>{sending ? 'Sending…' : demoMode ? rsvp.demoSubmitLabel : rsvp.submitLabel}</button>
    </form>
    <p className="rsvp-status" role="status" aria-live="polite">{status}</p>
  </section>
}
