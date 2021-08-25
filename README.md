# Safe-Transfer Contracts

_Scripts and base/helper contracts brought to you by openzeppelin_
_Contract interaction with the help of Alchemy_

## Deploy

1. Pull repo locally and copy `.env.sample` into another file called `.env`. Fill out the fields in this file with your alchemy app url and test net public and private keys.
2. Edit the first line in `scripts/deploy.js` to grab the contract factory for which contract you are going to deploy (SafeTransfer/SafeTransferNFT/TestNFT)
3. Run the following script

```bash
npm run deploy-dev
```

4. Repeat steps 2 and 3 for each contract as needed.

Done! The address of your deployed contract will be printed in the console on a successful deploy.

## Safe Transfer ETH Contract

### initiateTransfer(address to, uint256 secret)

A payable function that will store the value of a payment in wei towards _to_ with an optional 256 bit secret number _secret_ that can be used as an extra layer of security for retrieving a payment.

### pullTransfer(address to)

A function that will refund the caller with the amount that is currently enroute to a given _to_ address given that amount was sent by the caller.

### completeTransfer(address from, uint256 secret)

A function that will complete an ETH transfer by paying the caller the amount owed to them as set by _from_ requiring the caller to know the address _from_ and an optional secret 256 bit number _secret_.

## Safe Transfer NFT Contract

Initiating a transfer of NFT requires a user to send their NFT to the address of the **SafeTransferNFT** contract with the data parameter in ERC-721 function `safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data)` containing the byte representation of the address the NFT is meant to be sent to. The caller can also send the byte representation of a 256 bit number secret appended to the previous array of bytes containing the address that will be used as an extra layer of security during the transfer.

### pullTransfer(address to)

A function that will return the NFT that is currently enroute to a given _to_ address given that the NFT was originally owned by the caller.

### completeTransfer(address from, uint256 secret)

A function that will complete a NFT transfer by sending the _from_'s NFT to the caller requiring the caller to know the address _from_ and an optional secret 256 bit number _secret_.

## Interacting

Some example interactions with web3.js can be found [here](https://github.com/bennycio/safe-transfer-ui/blob/main/src/util/interact.js)

_Enjoy safe transfers :)_
