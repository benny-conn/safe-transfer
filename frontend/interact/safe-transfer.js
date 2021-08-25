import { ethers } from "ethers"
import safeTransferCompiled from "./abi/SafeTransfer.json"
import { createContainer } from "unstated-next"
import safeTransferNFTCompiled from "./abi/SafeTransferNFT.json"
import { toast } from "react-toastify"
import { ERC721ABI } from "./abi/ERC721"
import { useEthers } from "@usedapp/core"

const { abi: safeTransferAbi } = safeTransferCompiled
const { abi: safeTransferNFTAbi } = safeTransferNFTCompiled

function useSafeTransfer() {
  // Collect provider from eth state

  const { account, library } = useEthers()

  async function getSafeTransferNFTContract() {
    if (library) {
      return new ethers.Contract(
        process.env.NEXT_PUBLIC_NFT_ADDRESS,
        safeTransferNFTAbi,
        library.getSigner()
      )
    }
  }

  async function getSafeTransferContract() {
    if (library) {
      return new ethers.Contract(
        process.env.NEXT_PUBLIC_ETH_ADDRESS,
        safeTransferAbi,
        library.getSigner()
      )
    }
  }

  async function getNFTContract(address) {
    if (library) {
      return new ethers.Contract(address, ERC721ABI, library.getSigner())
    }
  }

  async function transferETH(to, amount, secret) {
    // Collect contract
    const ETHContract = await getSafeTransferContract()

    if (ETHContract) {
      const hashedSecret = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(secret)
      )
      const wei = ethers.utils.hexlify(ethers.utils.parseEther(amount))
      const gas = await ETHContract.estimateGas.initiateTransfer(
        to,
        hashedSecret,
        {
          value: wei,
        }
      )
      const price = await library.getGasPrice()
      try {
        // Send transaction and wait
        const tx = await ETHContract.initiateTransfer(to, hashedSecret, {
          value: wei,
          gasPrice: price,
          gasLimit: gas,
        })
        await tx.wait(1)
        toast.success("Initiated Transfer of ETH.")
      } catch (e) {
        // If error, alert
        console.error(e)
        toast.error(`Unable to initiate ETH transfer.`)
      }
    }
  }

  async function completeTransferETH(from, secret) {
    // Collect contract
    const ETHContract = await getSafeTransferContract()

    if (ETHContract) {
      const gas = await ETHContract.estimateGas.initiateTransfer(
        to,
        hashedSecret,
        {
          value: wei,
        }
      )
      const price = await library.getGasPrice()
      try {
        const tx = await ETHContract.completeTransfer(
          from,
          ethers.utils.toUtf8Bytes(secret),
          {
            gasPrice: price,
            gasLimit: gas,
          }
        )
        await tx.wait(1)
        toast.success("Completed ETH transfer!")
      } catch (e) {
        console.error(e)
        toast.error(`Unable to complete ETH Transfer.`)
      }
    }
  }

  async function pullTransferETH(to) {
    // Collect contract
    const ETHContract = await getSafeTransferContract()

    if (ETHContract) {
      const gas = await ETHContract.estimateGas.initiateTransfer(
        to,
        hashedSecret,
        {
          value: wei,
        }
      )
      const price = await library.getGasPrice()
      try {
        const tx = await ETHContract.pullTransfer(to, {
          gasPrice: price,
          gasLimit: gas,
        })
        await tx.wait(1)
        toast.success("Successfully pulled transfer!")
      } catch (e) {
        console.error(e)
        toast.error(`Unable to pull transfer.`)
      }
    }
  }

  async function transferNFT(nftContractAddress, id, to, secret) {
    const NFTContract = await getNFTContract(nftContractAddress)

    if (NFTContract) {
      const hashedSecret = ethers.utils.arrayify(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(secret))
      )
      const addr = ethers.utils.arrayify(to)

      const addrWithSecret = ethers.utils.concat([addr, hashedSecret])

      const gas = await ETHContract.estimateGas.initiateTransfer(
        to,
        hashedSecret,
        {
          value: wei,
        }
      )
      const price = await library.getGasPrice()

      try {
        const tx = await NFTContract.safeTransferFrom(
          account,
          process.env.NEXT_PUBLIC_NFT_ADDRESS,
          id,
          addrWithSecret,
          {
            gasPrice: price,
            gasLimit: gas,
          }
        )
        await tx.wait(1)
        toast.success("Successfully initiated NFT transfer!")
      } catch (e) {
        console.error(e)
        toast.error(`Unable to initiate NFT transfer.`)
      }
    }
  }
  async function pullTransferNFT(to) {
    // Collect contract
    const NFTContract = await getSafeTransferNFTContract()

    if (NFTContract) {
      const gas = await ETHContract.estimateGas.initiateTransfer(
        to,
        hashedSecret,
        {
          value: wei,
        }
      )
      const price = await library.getGasPrice()
      try {
        const tx = await NFTContract.pullTransfer(to, {
          gasPrice: price,
          gasLimit: gas,
        })
        await tx.wait(1)
        toast.success("Successfully pulled transfer!")
      } catch (e) {
        console.error(e)
        toast.error(`Unable to pull transfer.`)
      }
    }
  }

  async function completeTransferNFT(from, secret) {
    // Collect contract
    const NFTContract = await getSafeTransferNFTContract()

    if (NFTContract) {
      const gas = await ETHContract.estimateGas.initiateTransfer(
        to,
        hashedSecret,
        {
          value: wei,
        }
      )
      const price = await library.getGasPrice()
      try {
        const tx = await NFTContract.completeTransfer(from, secret, {
          gasPrice: price,
          gasLimit: gas,
        })
        await tx.wait(1)
        toast.success("Completed NFT transfer!")
      } catch (e) {
        console.error(e)
        toast.error(`Unable to complete NFT Transfer.`)
      }
    }
  }

  return {
    transferETH,
    completeTransferETH,
    pullTransferETH,
    transferNFT,
    pullTransferNFT,
    completeTransferNFT,
  }
}

// Create unstated-next container
export const safeTransfer = createContainer(useSafeTransfer)
