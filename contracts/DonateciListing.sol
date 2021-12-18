pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/IWBITCI.sol";
import "./Donateci.sol";
import "./DonateciNFT.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DonateciListing {
    using Counters for Counters.Counter;
    struct NFTListingInfo {
        address creatorAddress;
        uint256 tokenId;
        uint256 priceInWeiDNC;
        bool sold;
    }

    Counters.Counter private _creatorIds;
    Counters.Counter private _nftListingIds;
    mapping(address => bool) private _isCreator; 
    mapping(uint256 => address) private _creators;
    mapping(uint256 => NFTListingInfo) private _nftListings;

    uint256 private _creatorBurnFee = 100; //without decimals
    address public immutable DNC;
    address public immutable DNFT;

    event NewCreator(address indexed creator);
    event NewNFTListing(address indexed seller, uint256 listingId);
    event NFTSold(address indexed seller, address indexed buyer, uint256 id, uint256 price);

    constructor(address _dnc, address _dnft) {
        DNC = _dnc;
        DNFT = _dnft;
    }

    function becomeCreator() public returns (bool) {
        require(!_isCreator[msg.sender], "DonateciListing: already creator");
        Donateci dncContract = Donateci(DNC);
        require(dncContract.transfer(address(0x0), _creatorBurnFee * 10 ** dncContract.decimals()), "DonateciListing: not enough fee");
                
        _creatorIds.increment();
        uint256 newId = _creatorIds.current();

        _isCreator[msg.sender] = true;
        _creators[newId] = msg.sender;

        emit NewCreator(msg.sender);

        return true;
    }

    function getCreatorCount() public view returns (uint256) {
        return _creatorIds.current();
    }

    function getCreatorAt(uint256 _idx) public view returns (address) {
        return _creators[_idx];
    }

    function isCreator(address _addr) public view returns (bool) {
        return _isCreator[_addr];
    }

    function addNFTListing(uint256 _tokenId, uint256 _desiredPriceInWeiDNC) public returns (bool) {
        //change NFT ownership to this contract
        DonateciNFT(DNFT).transferFrom(msg.sender, address(this), _tokenId); //now contract owns the NFT
        
        _nftListingIds.increment();
        uint256 newId = _nftListingIds.current();
        //add new listing
        _nftListings[newId] = NFTListingInfo({
            creatorAddress: msg.sender, tokenId: _tokenId, 
            priceInWeiDNC: _desiredPriceInWeiDNC, sold: false});

        emit NewNFTListing(msg.sender, newId);
        
        return true;
    }

    function getNFTListingCount() public view returns (uint256) {
        return _nftListingIds.current();
    }

    function getNFTListingAt(uint256 _idx) public view returns (address creator, uint256 tokenId, uint256 priceInWeiDNC) {
        NFTListingInfo storage listing = _nftListings[_idx];
        if (listing.sold) { //if already sold
            return (address(0x0), 0, 0); //return invalid
        } else {
            return (listing.creatorAddress, listing.tokenId, listing.priceInWeiDNC);
        }
    }

    function buyNFT(uint256 _idx) public returns (bool) {
        NFTListingInfo storage listing = _nftListings[_idx];
        require(!listing.sold, "DonateciListing: already sold");  //validate if not sold
        require(Donateci(DNC).transfer(listing.creatorAddress, listing.priceInWeiDNC), "DonateciListing: not enough funds"); //pay to creator (we can get commission here)
        DonateciNFT(DNFT).transferFrom(address(this), msg.sender, listing.tokenId); //transfer ownership of NFT

        emit NFTSold(listing.creatorAddress, msg.sender, _idx, listing.priceInWeiDNC);

        return true;
    }
}