import { Faq } from '@/components/Faq'

import { faqs } from './data/faqs'

export default function HiddenHomepage() {
  return <Faq questions={faqs} />
}
