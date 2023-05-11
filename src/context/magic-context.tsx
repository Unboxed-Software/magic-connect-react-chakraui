import React, { createContext, useContext, useEffect, useState } from "react"
import { Magic } from "magic-sdk"
import Web3 from "web3"

export type MagicContextType = {
  magic: Magic | null
  web3: Web3 | null
}

const MagicContext = createContext<MagicContextType>({
  magic: null,
  web3: null,
})

export const useMagicContext = () => useContext(MagicContext)

const MagicProvider = ({ children }: { children: React.ReactNode }) => {
  const [magicInstance, setMagicInstance] = useState<Magic | null>(null)
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null)

  const initialize = async () => {
    const magic = new Magic("pk_live_51FA35CBAD23D818", {
      network: {
        rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/demo",
        chainId: 11155111,
      },
    })
    const provider = await magic.wallet.getProvider()
    const web3 = new Web3(provider)
    setMagicInstance(magic)
    setWeb3Instance(web3)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialize()
    }
  }, [])

  return (
    <MagicContext.Provider
      value={{
        magic: magicInstance,
        web3: web3Instance,
      }}
    >
      {children}
    </MagicContext.Provider>
  )
}

export default MagicProvider
