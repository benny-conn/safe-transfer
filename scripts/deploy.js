const { ethers, upgrades } = require("hardhat")

async function main() {
  const Contract = await ethers.getContractFactory("SafeTransfer")
  console.log("Deploying Contract...")
  const contract = await upgrades.deployProxy(Contract, [], {
    initializer: "initialize",
  })
  await contract.deployed()
  console.log("Contract deployed to:", contract.address)
}

main().catch(console.error)
