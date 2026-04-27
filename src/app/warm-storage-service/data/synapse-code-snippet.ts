export const SYNAPSE_CODE_SNIPPET = `import { Synapse } from "@filoz/synapse-sdk"
import { privateKeyToAccount } from "viem/accounts"

const synapse = Synapse.create({
  account: privateKeyToAccount("0xYOUR_PRIVATE_KEY"),
  source: "my-app",
})
const data = new TextEncoder().encode(\`🚀 Welcome to decentralized storage on Filecoin Onchain Cloud! Onchain Proof of Data Possession ensures your data is always verifiable.\`)

const { transaction } = await 
  synapse.storage.prepare({
  dataSize: BigInt(data.length)})
if (transaction) await transaction.execute()

const { pieceCid } = await synapse.storage.upload(data)
await synapse.storage.download({ pieceCid })`

// Twoslash compiler directives are prepended for type verification at build time.
// They are hidden from the rendered output by the twoslash transformer.
const TWOSLASH_DIRECTIVES = `// @module: esnext
// @target: esnext
// @moduleResolution: bundler
`

export const SYNAPSE_CODE_SNIPPET_TWOSLASH =
  TWOSLASH_DIRECTIVES + SYNAPSE_CODE_SNIPPET
