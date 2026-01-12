import {
  CTALink,
  type CTALinkProps,
} from '@filecoin-foundation/ui-filecoin/CTALink'
import {
  CardContent,
  type CardContentProps,
} from '@filecoin-foundation/ui-filecoin/SimpleCard'
import Image, { type StaticImageData } from 'next/image'

export type SimpleCardWithImageProps = {
  image: {
    data: StaticImageData
    alt: string
  }
  title: CardContentProps['title']
  description: CardContentProps['description']
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
      <div className="p-8">
        <CardContent title={title} description={description} border="all" headingTag="h3" />
        <CTALink inset href={cta.href} textClassName="bottom-8 left-8">
          {cta.text}
        </CTALink>
      </div>
    </li>
  )
}
