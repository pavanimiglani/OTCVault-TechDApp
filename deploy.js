// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {

    // Get the contract to deploy
    const OTCTrade = await ethers.getContractFactory("OTCTrade");

    // Deploy the contract
    const otcTrade = await OTCTrade.deploy();

    // Wait for the contract to be deployed
    await otcTrade.deployed();

    console.log("OTCTrade deployed to:", otcTrade.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

  //OTCTrade deployed to: 0xbAA13B015BeA94D43Cbbc2781A5FFb4427AE0989