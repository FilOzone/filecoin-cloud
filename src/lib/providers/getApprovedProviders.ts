import { ethers } from 'ethers'

type GetApprovedProviderIdsParams = {
  provider: ethers.Provider
  stateViewAddress: string
  stateViewABI: Array<string>
  useNewDecoding: boolean
}

// Step 3: Get list of approved provider IDs from State View contract
export async function getApprovedProviderIds({
  provider,
  stateViewAddress,
  stateViewABI,
  useNewDecoding,
}: GetApprovedProviderIdsParams) {
  console.log('📋 Fetching approved provider IDs...')

  const stateViewContract = new ethers.Contract(
    stateViewAddress,
    stateViewABI,
    provider,
  )

  let approvedProviderIds: bigint[] = []

  if (useNewDecoding) {
    // v0.3.1+: Use pagination
    const totalCount = await stateViewContract.getApprovedProvidersLength()
    console.log(`📊 Total approved providers: ${totalCount}`)

    if (Number(totalCount) === 0) {
      return []
    }

    // Fetch in batches of 100
    const batchSize = 100
    let offset = 0

    while (offset < Number(totalCount)) {
      console.log(`Fetching batch: offset ${offset}, size ${batchSize}`)
      const batch = await stateViewContract.getApprovedProviders(
        offset,
        batchSize,
      )
      approvedProviderIds = approvedProviderIds.concat(batch)
      offset += batchSize
    }
  } else {
    // v0.1.0: No pagination - get all at once
    approvedProviderIds = await stateViewContract.getApprovedProviders()
    console.log(`📊 Total approved providers: ${approvedProviderIds.length}`)
  }

  console.log(
    '✅ Provider IDs fetched:',
    approvedProviderIds.map((id) => Number(id)),
  )

  return approvedProviderIds
}
