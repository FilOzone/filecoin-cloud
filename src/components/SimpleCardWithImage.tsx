import { CardContent } from '@filecoin-foundation/ui-filecoin/SimpleCard'
import Image, { type StaticImageData } from 'next/image'

import { CtaLink, type CtaLinkProps } from './CtaLink'

export type SimpleCardWithImageProps = {
  image: {
    data: StaticImageData
    alt: string
  }
  title: string // TODO: Change to CardContentProps['title']
  description: string // TODO: Change to CardContentProps['description']
  cta: {
    href: CtaLinkProps['href']
    text: CtaLinkProps['children']
  }
}

export function SimpleCardWithImage({
  image,
  title,
  description,
  cta,
}: SimpleCardWithImageProps) {
  return (
    <li className="relative rounded-2xl border border-(--color-border-base) focus-within:bg-(--color-card-background-hover) hover:bg-(--color-card-background-hover)">
      <Image
        src={image.data}
        alt={image.alt}
        className="aspect-13/5 rounded-t-2xl object-cover"
      />
      <div className="p-8">
        <CardContent title={title} description={description} border="all" />
        <CtaLink inset href={cta.href} textClassName="bottom-8 left-8">
          {cta.text}
        </CtaLink>
      </div>
    </li>
  )
}
