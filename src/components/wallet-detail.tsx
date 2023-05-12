import { Text, Flex, Divider } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useMagicContext } from "../context/magic-context"

interface Props {
  account: string | null
}

const WalletDetail = ({ account }: Props) => {
  const { web3 } = useMagicContext()
  const [balance, setBalance] = useState("...")

  useEffect(() => {
    getBalance()
  }, [web3])

  const getBalance = async () => {
    if (account && web3) {
      const balance = await web3.eth.getBalance(account)
      setBalance(web3.utils.fromWei(balance))
    }
  }

  return (
    <Flex direction="column">
      <Text fontWeight="bold">Address</Text>
      <Text fontFamily="monospace" my={2}>
        {account}
      </Text>
      <Divider my={2} />
      <Text fontWeight="bold">Balance</Text>
      <Text fontFamily="monospace">{balance.substring(0, 7)} ETH</Text>
    </Flex>
  )
}

export default WalletDetail
