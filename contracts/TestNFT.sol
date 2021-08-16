// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TestNFT is Initializable, ERC721Upgradeable {
    function initialize(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) public virtual initializer {
        __test_nft_init(name, symbol, baseTokenURI);
    }

    string private _baseTokenURI;

    function __test_nft_init(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) internal initializer {
        __ERC165_init_unchained();
        __ERC721_init_unchained(name, symbol);
        __test_nft_init_unchained(baseTokenURI);
    }

    function __test_nft_init_unchained(string memory baseTokenURI)
        internal
        initializer
    {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function mint(address to, uint256 tokenId) public virtual {
        _mint(to, tokenId);
    }
}
