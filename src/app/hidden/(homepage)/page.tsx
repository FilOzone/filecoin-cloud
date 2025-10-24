import { Faq } from "@/components/Faq";

import { FAQs } from "./data/faqs";

export default function HiddenHomepage() {
  return <Faq questions={FAQs} />;
}
