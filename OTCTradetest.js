const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OTCTrade Contract", function () {
    let OTCTrade;
    let otcTrade;
    let owner;
    let addr1;
    let addr2;
    let token;
    let tokenAddress;
    let amount = 1000;
    let desiredToken;
    let desiredAmount = 500;

    beforeEach(async function () {
        
        // Deploy the mock token
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();
        tokenAddress = token.address;

        // Deploy the mock desired token
        desiredToken = await Token.deploy();
        await desiredToken.deployed();

        // Deploy the OTCTrade contract
        OTCTrade = await ethers.getContractFactory("OTCTrade");
        [owner, addr1, addr2] = await ethers.getSigners();
        otcTrade = await OTCTrade.deploy();
        await otcTrade.deployed();

        // Transfer tokens to addr1 and addr2
        await token.transfer(addr1.address, amount);
        await desiredToken.transfer(addr2.address, desiredAmount);
    });

    describe("Listing creation", function () {
        it("Should create a new listing", async function () {
            // Approve the contract to spend tokens
            await token.connect(addr1).approve(otcTrade.address, amount);

            // Create a new listing
            await expect(otcTrade.connect(addr1).createListing(tokenAddress, amount, desiredToken.address, desiredAmount))
                .to.emit(otcTrade, 'NewListing')
                .withArgs(0, addr1.address, tokenAddress, amount, desiredToken.address, desiredAmount);

            // Check the listing details
            const listing = await otcTrade.getListing(0);
            expect(listing.seller).to.equal(addr1.address);
            expect(listing.tokenAddress).to.equal(tokenAddress);
            expect(listing.amount).to.equal(amount);
            expect(listing.desiredToken).to.equal(desiredToken.address);
            expect(listing.desiredAmount).to.equal(desiredAmount);
            expect(listing.isActive).to.be.true;
        });
    });

    describe("Trade execution", function () {
        it("Should execute a trade", async function () {
            // Prepare and create a listing
            await token.connect(addr1).approve(otcTrade.address, amount);
            await otcTrade.connect(addr1).createListing(tokenAddress, amount, desiredToken.address, desiredAmount);

            // Approve and execute trade
            await desiredToken.connect(addr2).approve(otcTrade.address, desiredAmount);
            await expect(otcTrade.connect(addr2).executeTrade(0))
                .to.emit(otcTrade, 'TradeExecuted')
                .withArgs(0, addr1.address, addr2.address, tokenAddress, amount, desiredToken.address, desiredAmount);

            // Check balances after trade
            expect(await token.balanceOf(addr2.address)).to.equal(amount);
            expect(await desiredToken.balanceOf(addr1.address)).to.equal(desiredAmount);
        });
    });

    // Additional tests can be added for edge cases, failure scenarios, etc.
});
