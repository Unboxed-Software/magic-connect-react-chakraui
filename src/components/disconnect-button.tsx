import { useMagicContext } from "../context/magic-context"
import { Button } from "@chakra-ui/react"

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

const DisconnectButton = ({ setAccount }: Props) => {
  const { magic } = useMagicContext()

  const connect = async () => {
    if (!magic) return
    try {
      await magic?.wallet.disconnect()
      setAccount(null)
    } catch (error) {
      console.log(error)
    }
  }

  return <Button onClick={connect}>Disconnect</Button>
}

export default DisconnectButton
