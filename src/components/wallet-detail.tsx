// Import necessary modules and context
import { useEffect, useState } from "react"
import { Text, Flex, Divider } from "@chakra-ui/react"
import { useMagicContext } from "../context/magic-context"

// Define the interface for the component's props
interface Props {
  account: string | null
}

// Define the WalletDetail component
const WalletDetail = ({ account }: Props) => {
  // Use the Magic context
  const { web3 } = useMagicContext()

  // Initialize state variable for balance
  const [balance, setBalance] = useState("...")

  // Define a useEffect hook to get balance whenever account or web3 changes
  useEffect(() => {
    const getBalance = async () => {
      if (account && web3) {
        // If account and web3 are available, get the balance
        const balance = await web3.eth.getBalance(account)

        // Convert the balance from Wei to Ether and set the state variable
        setBalance(web3.utils.fromWei(balance).substring(0, 7))
      }
    }

    // Call the getBalance function
    getBalance()
  }, [web3, account])

  // Render the account address and balance
  return (
    <Flex direction="column">
      <Text fontWeight="bold">Address</Text>
      <Text fontFamily="monospace" my={2}>
        {account}
      </Text>
      <Divider my={2} />
      <Text fontWeight="bold">Balance</Text>
      <Text fontFamily="monospace">{balance} ETH</Text>
    </Flex>
  )
}

export default WalletDetail
