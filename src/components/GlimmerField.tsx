type GlimmerFieldProps = { variant: 'opening' | 'invitation' | 'countdown' | 'sharing' | 'story' | 'gallery' | 'events' | 'venue' | 'closing' }

export function GlimmerField({ variant }: GlimmerFieldProps) {
  return <span className={`glimmer-field glimmer-field-${variant}`} aria-hidden="true">
    <i>✦</i><i>✧</i><i>✦</i><i>✧</i>
    <b /><b /><b /><b /><b /><b /><b /><b />
  </span>
}
