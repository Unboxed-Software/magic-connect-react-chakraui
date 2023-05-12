import { useEffect, useState } from "react"
import { ChakraProvider, VStack } from "@chakra-ui/react"
import { useMagicContext } from "./context/magic-context"
import ConnectButton from "./components/connect-button"
import WalletDetail from "./components/wallet-detail"
import ShowUIButton from "./components/showui-button"
import DisconnectButton from "./components/disconnect-button"

function App() {
  const { web3 } = useMagicContext()
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    isLoggedIn()
  }, [web3])

  const isLoggedIn = async () => {
    if (!web3) return
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
  }

  return (
    <ChakraProvider>
      <VStack justifyContent="center" alignItems="center" minH="100vh">
        {!account ? (
          <ConnectButton setAccount={setAccount} />
        ) : (
          <>
            <WalletDetail account={account} />
            <DisconnectButton setAccount={setAccount} />
            <ShowUIButton />
          </>
        )}
      </VStack>
    </ChakraProvider>
  )
}

export default App
