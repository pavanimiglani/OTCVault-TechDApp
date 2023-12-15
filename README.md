## VAULT-TECHDApp Backend
This project is the backend part of a decentralized application (DApp) built using Hardhat, which is a development environment to compile, deploy, test, and debug Ethereum software.

Prerequisites
things you need to install the software and how to install them:

Node.js (v12.0 or higher)
NPM, which comes with Node.js
An Ethereum wallet like MetaMask installed in your browser 

1. Clone the repository to your local machine:
git clone [URL to the GitHub repository]

2. Navigate to the project directory:
cd [project-directory]

3. install dependencies:
npm install

4. Compile the smart contracts
npx hardhat compile 

5. Deploying the Contracts
To deploy the contracts to a local network:

npx hardhat run scripts/deploy.js --network sepolia

Built With
Hardhat - Ethereum development environment
Ethers.js - Ethereum wallet implementation
Solidity - Smart contract programming language
