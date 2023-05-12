// Import necessary modules and context
import { useState, useRef } from "react"
import { HStack, Box, VStack, Input, Button, Text } from "@chakra-ui/react"
import { useMagicContext } from "../context/magic-context"

// Define the prop structure for this component
type Props = {
  account: string | null
}

// Define the SignMessage component which is used for signing a message with the connected wallet
const SignMessage = ({ account }: Props) => {
  // Use the Magic context
  const { web3 } = useMagicContext()

  // Initialize state for message and signature
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")

  // Initialize a ref for the input field
  const inputRef = useRef(null)

  // Define the handler for input change, it updates the message state with input value
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value)

  // Define the signMessage function which is used to sign the message
  const handleSignMessage = async () => {
    if (account && web3) {
      try {
        // Sign the message using the connected wallet
        const signedMessage = await web3.eth.personal.sign(message, account, "")
        // Set the signature state with the signed message
        setSignature(signedMessage)
      } catch (error) {
        // Log any errors that occur during the signing process
        console.error(error)
      }
    }
  }

  // Render the component
  return (
    <HStack justifyContent="flex-start" alignItems="flex-start">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding="10px"
      >
        <VStack>
          {/* Input field for the message to be signed */}
          <Input
            ref={inputRef}
            value={message}
            placeholder="Set Message"
            maxLength={20}
            onChange={handleInput}
            w="140px"
          />
          {/* Button to trigger the signMessage function */}
          <Button onClick={handleSignMessage} isDisabled={!message}>
            Sign Message
          </Button>
        </VStack>
        {/* Display the signature if available */}
        {signature && <Text>{`Signature: ${signature}`}</Text>}
      </Box>
    </HStack>
  )
}

export default SignMessage
