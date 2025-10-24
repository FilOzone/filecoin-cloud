import { FAQs } from "./data/faqs";

import { FAQ } from "@/components/FAQ";

export default function HiddenHomepage() {
  return <FAQ questions={FAQs} />;
}
