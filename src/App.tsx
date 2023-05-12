// Import necessary hooks and components from React, Chakra UI, and our local files
import { useEffect, useState } from "react"
import { VStack } from "@chakra-ui/react"
import { useMagicContext } from "./context/magic-context"
import ConnectButton from "./components/connect-button"
import WalletDetail from "./components/wallet-detail"
import DisconnectButton from "./components/disconnect-button"
import ShowUIButton from "./components/showui-button"

function App() {
  // Retrieve the web3 instance from our Magic context
  const { web3 } = useMagicContext()

  // Define a state variable to store the current user's account
  const [account, setAccount] = useState<string | null>(null)

  // Define useEffect hook to check if the user is already logged in when the component mounts
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      // If no web3 instance is available, return early
      if (!web3) return
      // Retrieve the user's accounts
      const accounts = await web3.eth.getAccounts()
      // Set the user's account in state
      // Note: accounts[0] will be undefined if the user is not logged in
      setAccount(accounts[0])
    }

    // Call the function defined above
    checkLoggedInStatus()
  }, [web3])

  // Render our component
  return (
    <VStack justifyContent="center" alignItems="center" minH="100vh">
      {/* If no account is available, display the Connect button.
          Otherwise, display the Wallet details, Disconnect button, and ShowUI button. */}
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
  )
}

export default App
