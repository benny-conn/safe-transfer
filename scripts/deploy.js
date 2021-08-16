const { ethers, upgrades } = require("hardhat")

async function main() {
  const Contract = await ethers.getContractFactory("TestNFT")
  console.log("Deploying Contract...")
  const contract = await upgrades.deployProxy(
    Contract,
    ["TF", "TFFF", "asdj.com/metadata"],
    {
      initializer: "initialize",
    }
  )
  await contract.deployed()
  console.log("Contract deployed to:", contract.address)
}

main().catch(console.error)
