// Import necessary modules and context
import { useEffect, useState } from "react"
import { useMagicContext } from "../context/magic-context"
import { Button } from "@chakra-ui/react"

// Define the ShowUIButton component
const ShowUIButton = () => {
  // Use the Magic context
  const { magic } = useMagicContext()

  // Initialize state variable to decide whether to show button or not
  const [showButton, setShowButton] = useState(false)

  // Run checkWalletType function once after component mounts
  // and whenever the magic instance changes
  useEffect(() => {
    const checkWalletType = async () => {
      // Get information about the connected wallet
      const walletInfo = await magic?.wallet.getInfo()

      // Check if the wallet type is "magic"
      const isMagicWallet = walletInfo?.walletType === "magic"

      // Update the state variable based on whether the wallet type is "magic"
      setShowButton(isMagicWallet)
    }

    // Call the checkWalletType function
    checkWalletType()
  }, [magic])

  // Define the event handler for the button click
  const handleShowUI = async () => {
    try {
      // Try to show the magic wallet user interface
      await magic?.wallet.showUI()
    } catch (error) {
      // Log any errors that occur during the process
      console.error(error)
    }
  }

  // Render the button component if showButton is true, otherwise render nothing
  return showButton ? <Button onClick={handleShowUI}>Show UI</Button> : null
}

export default ShowUIButton
