// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library Bytes {
    function toAddress(bytes memory bys) internal pure returns (address addr) {
        assembly {
            addr := mload(add(bys, 20))
        }
    }

    function toUint256(bytes memory b) internal pure returns (uint256) {
        uint256 result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            bytes1 c = b[i];
            uint256 asInt = uint256(uint8(c));
            if (asInt >= 48 && asInt <= 57) {
                result = result * 10 + (asInt - 48);
            }
        }
        return result;
    }

    function toBytes32(bytes memory b) internal pure returns (bytes32 ret) {
        assembly {
            ret := mload(add(b, 32))
        }
    }
}
