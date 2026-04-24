import { useEffect } from 'react'
import { trackPixel } from '@/lib/meta-pixel'

type Props = {
  name: string
  category?: string
}

/**
 * Fires a single Meta Pixel "ViewContent" event on mount.
 * Use on high-intent pages (pricing, feature deep-dives, service pages)
 * to build warm-audience custom audiences and track content engagement.
 */
export function PixelViewContent({ name, category }: Props) {
  useEffect(() => {
    trackPixel('ViewContent', {
      content_name: name,
      content_category: category,
    })
  }, [name, category])
  return null
}
