// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/access/Ownable.sol";

contract PersonalityNFT is ERC721URIStorage, Ownable {
    uint256 public totalSupply;

    constructor() ERC721("PersonalityNFT", "PNFT") {
        totalSupply = 0;
    }

    function mintNFT(address recipient, string memory metadataURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = totalSupply;
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        totalSupply += 1;
        return newTokenId;
    }

    function getTokenIds(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory ids = new uint256[](balance);
        uint256 count = 0;
        for (uint256 i = 0; i < totalSupply; i++) {
            if (_exists(i) && ownerOf(i) == owner) {
                ids[count] = i;
                count++;
            }
        }
        return ids;
    }
}
