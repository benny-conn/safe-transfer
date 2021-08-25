const { expect } = require("chai")
const { ethers } = require("hardhat")
const { utils } = require("ethers")

describe("SafeTransfer", function () {
  describe("SafeTransfer ETH", function () {
    let Contract
    let contract

    beforeEach(async function () {
      Contract = await ethers.getContractFactory("SafeTransfer")
      contract = await Contract.deploy()
    })

    it("Sends 1000 eth from two addresses with a password", async function () {
      const [bill, john] = await ethers.getSigners()
      const secret = utils.keccak256(utils.toUtf8Bytes("baby"))
      await contract.connect(bill).initiateTransfer(john.address, secret, {
        value: ethers.utils.parseUnits("1000.0", "ether"),
      })
      await contract
        .connect(john)
        .completeTransfer(
          bill.address,
          utils.hexlify(utils.toUtf8Bytes("baby"))
        )

      const prov = bill.provider
      const bal1 = await prov.getBalance(bill.address)
      const bal2 = await prov.getBalance(john.address)
      expect(Number(utils.formatEther(bal2.toString()))).to.be.greaterThan(
        Number(utils.formatEther(bal1.toString()))
      )
    })
  })

  describe("SafeTransfer NFT", function () {
    let Contract
    let contract
    let Nft
    let nft
    beforeEach(async function () {
      Contract = await ethers.getContractFactory("SafeTransferNFT")
      contract = await Contract.deploy()
      Nft = await ethers.getContractFactory("TestNFT")
      nft = await Nft.deploy("asdasda", "asd", "asdhaksd")
    })
    it("Sends an NFT between two addresses with a secret", async function () {
      const [bill, john] = await ethers.getSigners()

      const secret = utils.arrayify(utils.keccak256(utils.toUtf8Bytes("baby")))
      const addrAsBytes = utils.arrayify(john.address)
      const together = utils.concat([addrAsBytes, secret])
      await nft.mint(bill.address, 0)
      await nft
        .connect(bill)
        ["safeTransferFrom(address,address,uint256,bytes)"](
          bill.address,
          contract.address,
          0,
          together
        )
      await contract
        .connect(john)
        .completeTransfer(
          bill.address,
          utils.hexlify(utils.toUtf8Bytes("baby"))
        )
      const owner = await nft.ownerOf(0)
      expect(owner).to.equal(john.address)
    })
  })
})
