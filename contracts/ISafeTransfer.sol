// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

interface ISafeTransfer {
    event SafeTransferComplete(
        address indexed _from,
        address indexed _to,
        uint256 indexed amount
    );

    function initiateTransfer(address _to, uint256 _secret) external payable;

    function pullTransfer(address _to) external;

    function completeTransfer(address _from, uint256 _secret) external;

    function getTransfer(address _from) external view returns (uint256);
}
