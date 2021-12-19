pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract DonateciNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  event MintDNFT(address indexed owner, uint256 tokenId);

  constructor() ERC721("DonateciNFT", "DNFT") {

  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
      internal
      override(ERC721, ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
      public
      view
      override(ERC721, ERC721URIStorage)
      returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
      public
      view
      override(ERC721, ERC721Enumerable)
      returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _baseURI() internal pure override returns (string memory) {
    return "";
  }


  function mintDNFT(address owner, string memory tURI) public returns (uint256) {
    _tokenIds.increment();

    uint256 newId = _tokenIds.current();
    _mint(owner, newId); //mint new nft on this ERC721
    _setTokenURI(newId, tURI); //set uri (e.g. ipfs uri)

    emit MintDNFT(owner, newId)

    return newId;
  }
}