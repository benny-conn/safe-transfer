// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./ISafeTransfer.sol";

contract SafeTransfer is ISafeTransfer, Initializable {
    using AddressUpgradeable for address payable;

    mapping(address => mapping(address => uint256)) private _safeTransfers;
    mapping(address => mapping(address => uint256)) private _secrets;

    function initialize() public virtual initializer {}

    function initiateTransfer(address _to, uint256 _secret)
        external
        payable
        override
    {
        require(
            _safeTransfers[msg.sender][_to] == 0,
            "SafeTransfer: Transfer already in progress"
        );
        _safeTransfers[msg.sender][_to] = msg.value;
        if (_secret != 0) {
            _secrets[msg.sender][_to] = _secret;
        }
    }

    function pullTransfer(address _to) external override {
        require(
            _safeTransfers[msg.sender][_to] > 0,
            "SafeTransfer: No transfer in progress"
        );
        uint256 amount = _safeTransfers[msg.sender][_to];
        payable(msg.sender).sendValue(amount);
        _safeTransfers[msg.sender][_to] = 0;
        if (_secrets[msg.sender][_to] != 0) {
            _secrets[msg.sender][_to] = uint256(0);
        }
    }

    function completeTransfer(address _from, uint256 _secret)
        external
        override
    {
        require(
            _safeTransfers[_from][msg.sender] != 0,
            "SafeTransfer: No transfer in progress"
        );
        uint256 secret = _secrets[_from][msg.sender];
        if (secret != 0) {
            require(_secret == secret, "SafeTransfer: Incorrect secret");
            _secrets[_from][msg.sender] = uint256(0);
        }
        uint256 amount = _safeTransfers[_from][msg.sender];
        payable(msg.sender).sendValue(amount);
        _safeTransfers[_from][msg.sender] = 0;
        emit SafeTransferComplete(_from, msg.sender, amount);
    }

    function getTransfer(address _from)
        external
        view
        override
        returns (uint256)
    {
        return _safeTransfers[_from][msg.sender];
    }
}
