import { useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react'

type WeddingImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackLabel: string
}

export function WeddingImage({ fallbackLabel, onError, className = '', alt = '', ...props }: WeddingImageProps) {
  const [failed, setFailed] = useState(false)

  function handleError(event: SyntheticEvent<HTMLImageElement>) {
    setFailed(true)
    onError?.(event)
  }

  if (failed) {
    return <div className={`${className} image-fallback`} role="img" aria-label={fallbackLabel}>
      <span aria-hidden="true">✳</span>
    </div>
  }

  return <img {...props} className={className} alt={alt} onError={handleError} />
}
