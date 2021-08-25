async function main() {
  const Contract = await ethers.getContractFactory("SafeTransfer")

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await Contract.deploy() // Instance of the contract
  console.log("Contract deployed to address:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
