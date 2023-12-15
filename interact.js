//scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
    const contractAddress = " 0xbAA13B015BeA94D43Cbbc2781A5FFb4427AE0989";
    const Contract = await ethers.getContractFactory("OTCTrade");
    const contract = await Contract.attach(contractAddress);

    // Example of interacting with the contract
    const tx = await contract.someFunction();
    await tx.wait();

    console.log("Transaction successful!");
}

main()
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
