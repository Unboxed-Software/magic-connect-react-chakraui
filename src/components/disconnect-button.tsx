// Import necessary modules and context
import { useMagicContext } from "../context/magic-context"
import { Button } from "@chakra-ui/react"

// Define the prop structure for this component
interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

// Define the DisconnectButton component
const DisconnectButton = ({ setAccount }: Props) => {
  // Use the Magic context
  const { magic } = useMagicContext()

  // Define the event handler for the button click
  const handleDisconnect = async () => {
    // Return early if Magic is not defined
    if (!magic) return

    try {
      // Try to disconnect the wallet using Magic
      await magic?.wallet.disconnect()

      // If successful, reset the account state
      setAccount(null)
    } catch (error) {
      // Log any errors that occur during the disconnection process
      console.log(error)
    }
  }

  // Render the button component with the click event handler
  return <Button onClick={handleDisconnect}>Disconnect</Button>
}

export default DisconnectButton
