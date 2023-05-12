import { useEffect, useState } from "react"
import { useMagicContext } from "../context/magic-context"
import { Button } from "@chakra-ui/react"

const ShowUIButton = () => {
  const { magic } = useMagicContext()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    checkWalletType()
  }, [])

  const checkWalletType = async () => {
    const walletInfo = await magic?.wallet.getInfo()
    const isMagicWallet = walletInfo?.walletType === "magic"
    setShowButton(isMagicWallet)
  }

  const showUI = async () => {
    try {
      await magic?.wallet.showUI()
    } catch (error) {
      console.log(error)
    }
  }

  return showButton ? <Button onClick={showUI}>Show UI</Button> : null
}

export default ShowUIButton
