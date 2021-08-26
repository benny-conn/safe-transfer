# Safe-Transfer Contracts

These contracts facilitate secure, bi-confirmational transfers of ETH or ERC721 tokens (NFTs) by requiring the coordination of both parties involved to approve a transaction with a secret key. The advantage of using this contract over the default way of sending ETH or NFT's is that you can remove any possibility of accidentally sending funds to the wrong location. Because funds and NFTs are still retrievable until the intended recipient completes the transfer, you can always back out in the case that you _fat-fingered_ their address.

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

### initiateTransfer(address to, bytes32 secret)

A payable function that will store the value of a payment in wei to be sent to _to_ with the keccak256 hashed string that represents the secret key to complete the transfer. It is the responsibility of the caller to send a keccak256 hashed string.

### pullTransfer(address to)

A function that will refund the caller with the amount that is currently enroute to a given _to_ address given that amount was sent by the caller.

### completeTransfer(address from, bytes secret)

A function that will complete an ETH transfer by paying the caller the amount owed to them as set by _from_ requiring the caller to also send the byte representation of the secret string that was set by _from_. This secret will be compared with the hashed version that was sent by _from_ for validity.

## Safe Transfer NFT Contract

Initiating a transfer of NFT requires a user to send their NFT to the address of the **SafeTransferNFT** contract with the data parameter in ERC-721 function `safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data)` containing the byte representation of the address the NFT is meant to be sent to. The caller can also send the byte representation of a keccak256 hashed secret appended to the previous array of bytes containing the secret that will be used as an extra layer of security during the transfer.

### pullTransfer(address to)

A function that will return the NFT that is currently enroute to a given _to_ address given that the NFT was originally owned by the caller.

### completeTransfer(address from, bytes secret)

A function that will complete a NFT transfer by sending the _from_'s NFT to the caller requiring the caller to also send the byte representation of the secret string that was set by _from_. This secret will be compared with the hashed version that was sent by _from_ for validity.

_Enjoy safe transfers :)_
