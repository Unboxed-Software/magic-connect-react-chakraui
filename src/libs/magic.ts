import { Magic } from "magic-sdk"

// Initialize the Magic instance
export const magic = new Magic("pk_live_51FA35CBAD23D818", {
  network: {
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/demo",
    chainId: 11155111,
  },
})
