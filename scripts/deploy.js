async function main() {
  const SafeTransfer = await ethers.getContractFactory("SafeTransfer")

  // Start deployment, returning a promise that resolves to a contract object
  const safeTransfer = await SafeTransfer.deploy() // Instance of the contract
  console.log("SafeTransfer deployed to address:", safeTransfer.address)
  const SafeTransferNFT = await ethers.getContractFactory("SafeTransferNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const safeTransferNFT = await SafeTransferNFT.deploy() // Instance of the contract
  console.log("SafeTransferNFT deployed to address:", safeTransferNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
