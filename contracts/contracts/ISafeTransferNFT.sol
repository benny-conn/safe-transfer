// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface ISafeTransferNFT is IERC721Receiver {
    event SafeTransferNFTComplete(
        address indexed _from,
        address indexed _to,
        uint256 indexed _id,
        address _contract
    );

    function pullTransfer(address _to) external;

    function completeTransfer(address _from, bytes memory _secret) external;
}
