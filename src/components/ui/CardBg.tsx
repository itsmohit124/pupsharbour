import Image from 'next/image'

import type { Media } from '@/payload-types'

/**
 * Background photo behind a card's content, with a plum gradient so white text stays readable.
 * The card itself must be `relative overflow-hidden`; its content needs `relative` to sit on top.
 */
export function CardBg({ image, sizes = '(min-width: 1024px) 33vw, 100vw' }: { image: Media | null; sizes?: string }) {
  if (!image?.url) return null
  return (
    <>
      <Image src={image.url} alt="" fill sizes={sizes} className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-plum-950/95 via-plum-950/75 to-plum-900/55" />
    </>
  )
}
