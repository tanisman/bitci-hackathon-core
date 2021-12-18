pragma solidity >=0.4.22 <0.9.0;

import "./DonateciListing.sol";
import "./Donateci.sol";

contract DonateciDonate {
    struct Leaderboard {
        uint256 top1Amount;
        //uint256 top2Amount;
        //uint256 top3Amount;
        address top1Address;
        //address top2Address;
        //address top3Address;
    }
    address public immutable _listing;
    mapping(address => mapping(address => uint256)) private _totals;
    mapping(address => Leaderboard) private _leaderboard;

    event Donation(address indexed from, address indexed to, uint256 value, string message);
    event NewLeader(address indexed creator, address indexed leader);
    constructor(address _listingAddress) {
        _listing = _listingAddress;
    }

    function donate(address _to, uint256 _amountInWei, string memory _message) public {
        require(DonateciListing(_listing).isCreator(_to), "DonateciDonate: _to must be a creator");
        require(Donateci(DonateciListing(_listing).DNC()).transferFrom(msg.sender, _to, _amountInWei), "DonateciDonate: transfer failed");
        _totals[_to][msg.sender] += _amountInWei;

        emit Donation(msg.sender, _to, _amountInWei, _message);

        if (_leaderboard[_to].top1Amount < _totals[_to][msg.sender]) {
            _leaderboard[_to].top1Address = msg.sender;
            _leaderboard[_to].top1Amount = _totals[_to][msg.sender];

            emit NewLeader(_to, msg.sender);
        }
    }

    function getLeaderBoardOf(address _creator) public view returns (address top1Address, uint256 top1Amount) {
        Leaderboard storage lb = _leaderboard[_creator];
        return (lb.top1Address, lb.top1Amount);
    }

    function getTotalDonatedTo(address _to, address _from) public view returns (uint256) {
        return _totals[_to][_from];
    }
}