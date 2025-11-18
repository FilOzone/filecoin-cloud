export const SYNAPSE_CODE_SNIPPET = `import { Synapse, RPC_URLS, TIME_CONSTANTS } from "@filoz/synapse-sdk";
import { ethers } from "ethers";

const synapse = await Synapse.create({
  privateKey: "YOUR_PRIVATE_KEY",
  rpcURL: RPC_URLS.calibration.http,
});

const tx = await synapse.payments.depositWithPermitAndApproveOperator(
  ethers.parseUnits("10", 18),
  synapse.getWarmStorageAddress(),
  ethers.MaxUint256,
  ethers.MaxUint256,
  30n * TIME_CONSTANTS.EPOCHS_PER_DAY,
);
await tx.wait();

const dataBytes = new TextEncoder().encode(
  ":rocket: Welcome to decentralized storage on Filecoin Onchain Cloud!",
);
const { pieceCid } = await synapse.storage.upload(dataBytes);

await synapse.storage.download(pieceCid);`
