// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OTCTrade {
    struct Listing {
        address seller;
        address tokenAddress;
        uint256 amount;
        address desiredToken;
        uint256 desiredAmount;
        bool isActive;
    }

    Listing[] public listings;

    // Event for new listing creation
    event NewListing(uint256 indexed listingId, address indexed seller, address tokenAddress, uint256 amount, address desiredToken, uint256 desiredAmount);
    
    // Event for successful trade
    event TradeExecuted(uint256 indexed listingId, address indexed seller, address indexed buyer, address tokenAddress, uint256 amount, address desiredToken, uint256 desiredAmount);

    function createListing(address _tokenAddress, uint256 _amount, address _desiredToken, uint256 _desiredAmount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

        listings.push(Listing(msg.sender, _tokenAddress, _amount, _desiredToken, _desiredAmount, true));
        emit NewListing(listings.length - 1, msg.sender, _tokenAddress, _amount, _desiredToken, _desiredAmount);
    }

    function executeTrade(uint256 listingId) external {
        Listing storage listing = listings[listingId];

        require(listing.isActive, "Listing is not active");
        require(listing.desiredAmount > 0, "Desired amount must be greater than 0");
        require(IERC20(listing.desiredToken).transferFrom(msg.sender, listing.seller, listing.desiredAmount), "Desired token transfer failed");
        require(IERC20(listing.tokenAddress).transfer(msg.sender, listing.amount), "Token transfer failed");

        listing.isActive = false;

        emit TradeExecuted(listingId, listing.seller, msg.sender, listing.tokenAddress, listing.amount, listing.desiredToken, listing.desiredAmount);
    }

    function getListing(uint256 listingId) public view returns (Listing memory) {
        require(listingId < listings.length, "Listing does not exist");
        return listings[listingId];
    }

    // Additional functions like cancelListing, updateListing, etc., can be added as needed
}
