// Import necessary modules and context
import { useMagicContext } from "../context/magic-context"
import { Button } from "@chakra-ui/react"

// Define the prop structure for this component
interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

// Define the ConnectButton component
const ConnectButton = ({ setAccount }: Props) => {
  // Use the Magic context
  const { magic } = useMagicContext()

  // Define the event handler for the button click
  const handleConnect = async () => {
    // Return early if Magic is not defined
    if (!magic) return

    try {
      // Try to connect to the wallet using Magic's user interface
      const accounts = await magic.wallet.connectWithUI()

      // If successful, set the first account as the active account
      setAccount(accounts[0])
    } catch (error) {
      // Log any errors that occur during the connection process
      console.log(error)
    }
  }

  // Render the button component with the click event handler
  return <Button onClick={handleConnect}>Connect</Button>
}

export default ConnectButton
