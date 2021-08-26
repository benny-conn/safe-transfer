// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ISafeTransferNFT.sol";
import "./Bytes.sol";

contract SafeTransferNFT is
    ISafeTransferNFT,
    Pausable,
    Ownable,
    ReentrancyGuard
{
    using Bytes for bytes;

    struct SafeTransferTokenData {
        address contractAddress;
        uint256 tokenID;
        bytes32 secret;
    }

    mapping(address => mapping(address => SafeTransferTokenData))
        private _safeTransfers;

    function pullTransfer(address _to) external override nonReentrant {
        SafeTransferTokenData memory data = _safeTransfers[_to][msg.sender];
        require(
            data.contractAddress != address(0),
            "SafeTransferNFT: No transfer in progress"
        );
        _safeTransfers[_to][msg.sender] = SafeTransferTokenData(
            address(0),
            0,
            0
        );
        IERC721(data.contractAddress).safeTransferFrom(
            address(this),
            msg.sender,
            data.tokenID
        );
    }

    function completeTransfer(address _from, bytes memory secret)
        external
        override
        whenNotPaused
        nonReentrant
    {
        SafeTransferTokenData memory data = _safeTransfers[_from][msg.sender];
        require(
            data.contractAddress != address(0),
            "SafeTransferNFT: No transfer in progress"
        );
        require(
            data.secret == keccak256(secret),
            "SafeTransferNFT: Invalid secret"
        );

        _safeTransfers[_from][msg.sender] = SafeTransferTokenData(
            address(0),
            0,
            0
        );
        IERC721(data.contractAddress).safeTransferFrom(
            address(this),
            msg.sender,
            data.tokenID
        );
        emit SafeTransferNFTComplete(
            _from,
            msg.sender,
            data.tokenID,
            data.contractAddress
        );
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override whenNotPaused returns (bytes4) {
        require(
            data.length >= 20,
            "SafeTransferNFT: data must contain address and secret value"
        );
        bytes memory addrBS = data[:20];
        bytes memory secretBS = data[20:];
        require(
            secretBS.length == 32,
            "SafeTransferNFT: Invalid secret length"
        );
        bytes32 secret = secretBS.toBytes32();
        SafeTransferTokenData memory trans = SafeTransferTokenData(
            msg.sender,
            tokenId,
            secret
        );
        address asAddr = addrBS.toAddress();
        _safeTransfers[from][asAddr] = trans;
        return this.onERC721Received.selector;
    }

    function pause() external onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() external onlyOwner whenPaused {
        _unpause();
    }
}
