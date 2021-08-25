// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "./ISafeTransfer.sol";

contract SafeTransfer is ISafeTransfer {
    using Address for address payable;

    mapping(address => mapping(address => uint256)) private _safeTransfers;
    mapping(address => mapping(address => bytes32)) private _secrets;

    function initiateTransfer(address _to, bytes32 _secret)
        external
        payable
        override
    {
        require(
            _safeTransfers[msg.sender][_to] == 0,
            "SafeTransfer: Transfer already in progress"
        );
        _safeTransfers[msg.sender][_to] = msg.value;
        _secrets[msg.sender][_to] = _secret;
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
            _secrets[msg.sender][_to] = bytes32(0);
        }
    }

    function completeTransfer(address _from, bytes memory _secret)
        external
        override
    {
        require(
            _safeTransfers[_from][msg.sender] != 0,
            "SafeTransfer: No transfer in progress"
        );
        bytes32 secret = _secrets[_from][msg.sender];
        require(secret == keccak256(_secret), "SafeTransfer: Incorrect secret");
        uint256 amount = _safeTransfers[_from][msg.sender];
        payable(msg.sender).sendValue(amount);
        _safeTransfers[_from][msg.sender] = 0;
        _secrets[_from][msg.sender] = bytes32(0);
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
