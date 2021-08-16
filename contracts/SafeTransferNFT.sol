// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol";
import "./ISafeTransferNFT.sol";
import "./Bytes.sol";

contract SafeTransferNFT is ISafeTransferNFT, Initializable {
    using ERC165CheckerUpgradeable for address;
    using Bytes for bytes;

    struct SafeTransferTokenData {
        address contractAddress;
        uint256 tokenID;
        uint256 secret;
    }

    event LogEvent(
        address indexed to,
        uint256 indexed secret,
        bytes indexed data
    );

    mapping(address => mapping(address => SafeTransferTokenData))
        private _safeTransfers;

    function initialize() public virtual initializer {}

    function pullTransfer(address _to) external override {
        SafeTransferTokenData memory data = _safeTransfers[_to][msg.sender];
        require(
            data.contractAddress != address(0),
            "SafeTransferNFT: No transfer in progress"
        );
        IERC721Upgradeable(data.contractAddress).safeTransferFrom(
            address(this),
            msg.sender,
            data.tokenID
        );
        _safeTransfers[_to][msg.sender] = SafeTransferTokenData(
            address(0),
            0,
            0
        );
    }

    function completeTransfer(address _from, uint256 secret) external override {
        SafeTransferTokenData memory data = _safeTransfers[_from][msg.sender];
        require(
            data.contractAddress != address(0),
            "SafeTransferNFT: No transfer in progress"
        );
        require(data.secret == secret, "SafeTransferNFT: Invalid secret");
        IERC721Upgradeable(data.contractAddress).safeTransferFrom(
            address(this),
            msg.sender,
            data.tokenID
        );
        _safeTransfers[_from][msg.sender] = SafeTransferTokenData(
            address(0),
            0,
            0
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
    ) external override returns (bytes4) {
        require(
            data.length >= 20,
            "SafeTransferNFT: data must contain address and secret value"
        );
        bytes memory addrBS = data[:20];
        bytes memory secretBS = data[20:];
        uint256 asUint256 = secretBS.toUint256();
        SafeTransferTokenData memory trans = SafeTransferTokenData(
            msg.sender,
            tokenId,
            asUint256
        );
        address asAddr = addrBS.toAddress();
        _safeTransfers[from][asAddr] = trans;
        emit LogEvent(asAddr, asUint256, data);
        return this.onERC721Received.selector;
    }
}
