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

    //fired when an user became creator by calling becomeCreator()
    event NewCreator(address indexed creator);
    //fired when new nft added to sell list
    event NewNFTListing(address indexed seller, uint256 listingId);
    //fired when a nft sold
    event NFTSold(address indexed seller, address indexed buyer, uint256 id, uint256 price);

    constructor(address _dnc, address _dnft) {
        DNC = _dnc;
        DNFT = _dnft;
    }

    //an user calls this to become creator
    function becomeCreator() public returns (bool) {
        require(!_isCreator[msg.sender], "DonateciListing: already creator");
        Donateci dncContract = Donateci(DNC);
        require(dncContract.transferFrom(msg.sender, DNC, _creatorBurnFee * (10 ** dncContract.decimals())), "DonateciListing: not enough fee");
                
        _creatorIds.increment();
        uint256 newId = _creatorIds.current();

        _isCreator[msg.sender] = true;
        _creators[newId] = msg.sender;

        emit NewCreator(msg.sender);

        return true;
    }

    //gets total num of creators
    function getCreatorCount() public view returns (uint256) {
        return _creatorIds.current();
    }

    //gets creator at index
    function getCreatorAt(uint256 _idx) public view returns (address) {
        return _creators[_idx];
    }

    //gets if address is creator
    function isCreator(address _addr) public view returns (bool) {
        return _isCreator[_addr];
    }

    //add nft to marketplace, call approve DNFT first.
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

    //get num of nfts on marketplace
    function getNFTListingCount() public view returns (uint256) {
        return _nftListingIds.current();
    }

    //get nft listing at index
    function getNFTListingAt(uint256 _idx) public view returns (address creator, uint256 tokenId, uint256 priceInWeiDNC) {
        NFTListingInfo storage listing = _nftListings[_idx];
        if (listing.sold) { //if already sold
            return (address(0x0), 0, 0); //return invalid
        } else {
            return (listing.creatorAddress, listing.tokenId, listing.priceInWeiDNC);
        }
    }
    
    //buy nft from marketplace, call approve DNC first.
    function buyNFT(uint256 _idx) public returns (bool) {
        NFTListingInfo storage listing = _nftListings[_idx];
        require(!listing.sold, "DonateciListing: already sold");  //validate if not sold
        require(Donateci(DNC).transferFrom(msg.sender, listing.creatorAddress, listing.priceInWeiDNC), "DonateciListing: not enough funds"); //pay to creator (we can get commission here)
        DonateciNFT(DNFT).transferFrom(address(this), msg.sender, listing.tokenId); //transfer ownership of NFT
        
        listing.sold = true;

        emit NFTSold(listing.creatorAddress, msg.sender, _idx, listing.priceInWeiDNC);

        return true;
    }
}