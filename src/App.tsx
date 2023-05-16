import { VStack } from "@chakra-ui/react"
import { useUser } from "./context/UserContext"
import ConnectButton from "./components/connect-button"
import WalletDetail from "./components/wallet-detail"
import DisconnectButton from "./components/disconnect-button"
import ShowUIButton from "./components/showui-button"
import SignMessage from "./components/sign-message"

function App() {
  // Use the UserContext to get the current logged-in user
  const { user } = useUser()

  return (
    <VStack justifyContent="center" alignItems="center" minH="100vh">
      {/* If no user is available, display the Connect button.
          Otherwise, display the Wallet details, Sign Message Component, Disconnect button, and ShowUI button. */}
      {!user ? (
        <ConnectButton />
      ) : (
        <>
          <WalletDetail />
          <SignMessage />
          <DisconnectButton />
          <ShowUIButton />
        </>
      )}
    </VStack>
  )
}

export default App
