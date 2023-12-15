require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const ALCHEMY_API_KEY = "Xvel1_orEEzWuAJPm2XeIh6fBbbh-t0e";
const SEPOLIA_PRIVATE_KEY = "64d66fc927c75aff55deb3875ac4c94fd21a9a7c97a9a0757ed7642cd038bf24";

module.exports = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: "SAHD4MM7R3TXPKHWVHQFUNNHU4IAEIA44M",
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`]
    }
  }
};
