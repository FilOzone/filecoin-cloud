import { ethers } from 'ethers'

type ConnectToBlockchainParams = {
  rpcUrl: string
}

// Step 1: Connect to the blockchain RPC endpoint
export async function connectToBlockchain({
  rpcUrl,
}: ConnectToBlockchainParams) {
  console.log('📡 Connecting to RPC:', rpcUrl)

  // Create a JSON RPC provider (read-only, no wallet needed)
  const provider = new ethers.JsonRpcProvider(rpcUrl)

  // Verify connection
  try {
    const network = await provider.getNetwork()
    console.log(
      '✅ Connected to network:',
      network.name,
      'Chain ID:',
      network.chainId,
    )
    return provider
  } catch (error) {
    console.error('❌ Failed to connect to RPC:', error)
    throw error
  }
}
