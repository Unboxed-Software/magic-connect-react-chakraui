import { useEffect, useState } from "react"
import { ChakraProvider, Flex, Text, VStack } from "@chakra-ui/react"
import { useMagicContext } from "./context/magic-context"
import ConnectButton from "./components/connect-button"
import Wallet from "./components/wallet"

function App() {
  const { magic, web3 } = useMagicContext()
  const [account, setAccount] = useState<string | null>(null)

  const isLoggedIn = async () => {
    if (!magic || !web3) return
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    console.log(accounts)
  }

  useEffect(() => {
    isLoggedIn()
  }, [isLoggedIn])

  return (
    <ChakraProvider>
      <VStack justifyContent="center" alignItems="center" minH="100vh">
        {!account ? (
          <ConnectButton setAccount={setAccount} />
        ) : (
          <Wallet account={account} setAccount={setAccount} />
        )}
      </VStack>
    </ChakraProvider>
  )
}

export default App
