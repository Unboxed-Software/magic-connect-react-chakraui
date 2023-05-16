import { useState, useRef } from "react"
import { HStack, Box, VStack, Input, Button, Text } from "@chakra-ui/react"
import { useWeb3 } from "../context/Web3Context"
import { useUser } from "../context/UserContext"

const SignMessage = () => {
  // Use the Web3Context to get the current instance of web3
  const { web3 } = useWeb3()
  // Use the UserContext to get the current logged-in user
  const { user } = useUser()

  // Initialize state for message and signature
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")

  // Define the handler for input change, it updates the message state with input value
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value)

  // Define the signMessage function which is used to sign the message
  const handleSignMessage = async () => {
    if (user && web3) {
      try {
        // Sign the message using the connected wallet
        const signedMessage = await web3.eth.personal.sign(message, user, "")
        // Set the signature state with the signed message
        setSignature(signedMessage)
      } catch (error) {
        // Log any errors that occur during the signing process
        console.error("handleSignMessage:", error)
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
            placeholder="Set Message"
            maxLength={20}
            onChange={handleInput}
            w="300px"
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
