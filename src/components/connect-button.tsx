import React, { useCallback } from "react"
import { useMagicContext } from "../context/magic-context"
import { Button } from "@chakra-ui/react"

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

const ConnectButton = ({ setAccount }: Props) => {
  const { magic } = useMagicContext()

  const connect = async () => {
    if (!magic) return
    try {
      const accounts = await magic.wallet.connectWithUI()
      console.log(accounts)
      setAccount(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  return <Button onClick={connect}>Connect</Button>
}

export default ConnectButton
