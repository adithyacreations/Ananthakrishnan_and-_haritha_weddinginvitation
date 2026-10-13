import { useCallback, useEffect, useRef, useState } from 'react'
import { LoaderCircle, Music2, Volume2, VolumeX } from 'lucide-react'
import { wedding } from '../config/wedding'

type PlaybackState = 'paused' | 'loading' | 'playing' | 'error' | 'blocked'

export function MusicToggle() {
  const audio = useRef<HTMLAudioElement>(null)
  const requestId = useRef(0)
  const stateRef = useRef<PlaybackState>('paused')
  const [playback, setPlayback] = useState<PlaybackState>('paused')

  const setState = useCallback((state: PlaybackState) => {
    stateRef.current = state
    setPlayback(state)
  }, [])

  const play = useCallback(async () => {
    const player = audio.current
    if (!player || stateRef.current === 'playing' || stateRef.current === 'loading') return

    const currentRequest = ++requestId.current
    setState('loading')
    try {
      await player.play()
      if (requestId.current === currentRequest && !player.paused) setState('playing')
    } catch {
      if (requestId.current === currentRequest) {
        // A rejected play() without a media error is the browser's autoplay policy.
        setState(player.error ? 'error' : 'blocked')
      }
    }
  }, [setState])

  const pause = useCallback(() => {
    requestId.current += 1
    audio.current?.pause()
    setState('paused')
  }, [setState])

  const togglePlayback = useCallback(() => {
    if (stateRef.current === 'playing' || stateRef.current === 'loading') pause()
    else void play()
  }, [pause, play])

  useEffect(() => {
    const player = audio.current
    if (!player || !wedding.musicControl.autoplayOnLoad) return
    void play()
  }, [play])

  useEffect(() => {
    const startFromInvitation = () => {
      if (wedding.musicControl.startOnInvitationOpen) void play()
    }
    window.addEventListener('wedding:open-invitation', startFromInvitation)
    return () => window.removeEventListener('wedding:open-invitation', startFromInvitation)
  }, [play])

  useEffect(() => {
    // Mobile browsers commonly block audible autoplay. Retry directly from the
    // next trusted interaction; retain listeners until playback really starts
    // because some mobile browsers reject touchstart but accept touchend/click.
    const startAfterGesture = (event: Event) => {
      if ((event.target as Element | null)?.closest?.('.music-toggle')) return
      if (stateRef.current !== 'blocked') return
      void play()
    }
    window.addEventListener('pointerdown', startAfterGesture, true)
    window.addEventListener('pointerup', startAfterGesture, true)
    // Keep touchstart as a fallback for mobile browsers without Pointer Events.
    window.addEventListener('touchstart', startAfterGesture, { capture: true, passive: true })
    window.addEventListener('touchend', startAfterGesture, { capture: true, passive: true })
    window.addEventListener('wheel', startAfterGesture, { capture: true, passive: true })
    window.addEventListener('keydown', startAfterGesture, true)
    window.addEventListener('click', startAfterGesture, true)
    return () => {
      window.removeEventListener('pointerdown', startAfterGesture, true)
      window.removeEventListener('pointerup', startAfterGesture, true)
      window.removeEventListener('touchstart', startAfterGesture, true)
      window.removeEventListener('touchend', startAfterGesture, true)
      window.removeEventListener('wheel', startAfterGesture, true)
      window.removeEventListener('keydown', startAfterGesture, true)
      window.removeEventListener('click', startAfterGesture, true)
    }
  }, [play])

  const copy = wedding.musicControl
  const label = playback === 'playing' ? copy.pause : playback === 'loading' ? copy.cancel : playback === 'error' ? copy.retry : copy.play
  const status = playback === 'playing' ? copy.playing : playback === 'loading' ? copy.loading : playback === 'error' ? copy.error : playback === 'blocked' ? copy.autoplayBlocked : copy.paused
  const Icon = playback === 'playing' ? Volume2 : playback === 'loading' ? LoaderCircle : playback === 'error' ? VolumeX : Music2

  return <div className={`music-dock is-${playback}`}>
    <audio
      ref={audio}
      src={wedding.music}
      loop
      preload="auto"
      tabIndex={-1}
      aria-hidden="true"
      onPlaying={() => { if (!audio.current?.paused) setState('playing') }}
      onWaiting={() => { if (!audio.current?.paused) setState('loading') }}
      onPause={() => { if (!audio.current?.error) setState('paused') }}
      onError={() => setState('error')}
    />
    <button
      className="music-toggle"
      type="button"
      onClick={togglePlayback}
      aria-label={label}
      aria-pressed={playback === 'playing'}
      aria-describedby="music-playback-status"
    >
      <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
      <span className="music-button-label">{label}</span>
    </button>
    <span className="music-status" id="music-playback-status" role="status" aria-live="polite">{status}</span>
  </div>
}
