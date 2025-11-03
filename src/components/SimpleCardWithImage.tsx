import { CardContent } from '@filecoin-foundation/ui-filecoin/SimpleCard'
import Image, { type StaticImageData } from 'next/image'

import { CTALink, type CTALinkProps } from './CTALink'

export type SimpleCardWithImageProps = {
  image: {
    data: StaticImageData
    alt: string
  }
  title: string
  description: string
  cta: {
    href: CTALinkProps['href']
    text: CTALinkProps['children']
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
      <div className="p-8 ">
        <CardContent title={title} description={description} border="all" />
        <CTALink inset href={cta.href} textClassName="bottom-8 left-8">
          {cta.text}
        </CTALink>
      </div>
    </li>
  )
}
