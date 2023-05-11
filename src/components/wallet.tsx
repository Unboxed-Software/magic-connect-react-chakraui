import {
  Box,
  Button,
  Text,
  Flex,
  Divider,
  useClipboard,
  Spinner,
} from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { useMagicContext } from "../context/magic-context"

interface Props {
  account: string | null
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

const Wallet = ({ account, setAccount }: Props) => {
  const { magic, web3 } = useMagicContext()

  const [balance, setBalance] = useState("...")
  const { hasCopied, onCopy } = useClipboard(account || "")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const tokenSymbol = "ETH"

  useEffect(() => {
    refresh()
  }, [web3])

  useEffect(() => {
    setBalance("...")
  }, [magic])

  const disconnect = useCallback(async () => {
    if (magic) {
      await magic.wallet.disconnect()
      setAccount(null)
    }
  }, [magic, setAccount])

  const getBalance = useCallback(async () => {
    if (account && web3) {
      const balance = await web3.eth.getBalance(account)
      setBalance(web3.utils.fromWei(balance))
      console.log("BALANCE: ", balance)
    }
  }, [account, web3])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    await getBalance()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 500)
  }, [getBalance])

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} shadow="md">
      <Flex justify="space-between">
        <Text fontWeight="bold" fontSize="lg">
          Wallet
        </Text>
        <Button variant="link" onClick={disconnect}>
          Disconnect
        </Button>
      </Flex>
      <Flex mt={2} align="center">
        <Box h="8px" w="8px" borderRadius="full" bg="green.500" mr={2} />
        <Text>Connected</Text>
      </Flex>
      <Divider my={2} />
      <Flex justify="space-between">
        <Text fontWeight="bold">Address</Text>
        <Button variant="link" onClick={onCopy}>
          {hasCopied ? "Copied!" : "Copy"}
        </Button>
      </Flex>
      <Text fontFamily="monospace" my={2}>
        {account}
      </Text>
      <Divider />
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold">Balance</Text>
        {isRefreshing ? (
          <Spinner />
        ) : (
          <Button variant="link" onClick={refresh}>
            Refresh
          </Button>
        )}
      </Flex>
      <Text fontFamily="monospace">
        {balance.substring(0, 7)} {tokenSymbol}
      </Text>
    </Box>
  )
}

export default Wallet
