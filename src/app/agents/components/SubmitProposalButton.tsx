import { Button } from '@filecoin-foundation/ui-filecoin/Button'

import { FOC_URLS } from '@/constants/site-metadata'

export function SubmitProposalButton() {
  return (
    <Button href={FOC_URLS.agents.plgenesis} variant="primary">
      Submit a proposal
    </Button>
  )
}
