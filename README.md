# StarNotary-Dapp

StarNotary is  a decentralized application for Ethereum blockchain that is used to create a Notary of Stars. Stars are non-fungible tokens that conform to ERC721 standard. ERC271 interface has been imported from Open-zeppelin library and inherited by the Contract. A new Star can be named, claimed, exchanged or transfer.
StarNotary DApp consists of  a smart contract deployed on Rinkeby Ethereum testnet  and a front-end  part to interact with the smart contract.

ERC 721 tokens name:  "StarToken",
ERC 721 symbol: "STR",

Front-end: JavaScript and HTML,
Back-end: Solidity
Testing: Mocha and Chai
IDE: Truffle,
Token address on Rinkeby: 0x6A229ca9dF2FB7cC8d1eE43Ff6e36cBa195c59AE

My Versions
Truffle v5.1.24
OpenZeppelin-solidity  v2.1.2
Node v12.16.3
Solidity v0.5.16
webpack v4.28.1
web3 v1.2.1

Deploying Contract to local Ethereum network
Install Truffle .
npm -g install truffle
Cd to the project directory and run:
truffle develop
It will create your development blockchain locally on port 9545
Next compiling the contract, inside the development console, run:
compile
Then migrating the contract to the locally running Ethereum network, inside the development console, run:
migrate --reset
Testing
Mocha and Chai
Mocha is a Testing Framework for Javascript, it can be used for front end applications and back end applications like Ethereum Decentralized Apps. Chai is an Assertion Library. Both are available as NPM packages.Truffle supports and comes preinstalled with Mocha and Chai

Testing cases for  the StarNotary contract are included in TestStarNotary.js .To test the contract run:
truffle develop test

Or if already in the development console
test


Front-end
Open another terminal window and go inside the project directory, and run:
cd app
npm run dev
Project will start at http://127.0.0.1:8080
Interacting with DApps requires MetaMask chrome extension: https://metamask.io .
To connect it with Truffle local network, open  drop-down menu with network list, select Custom RPC,and set url to http://127.0.0.1:9545 .
Follow instructions in Metamask to import account(s) from Truffle generated local network. If done right you should have an account with 100 ETH. Make sure this account is selected.
to view and interact with the DApp in a browser go to:  http://127.0.0.1:8080

Deploying Contract to the Rinkeby public testnet
Make sure your project includes truffle-hdwallet-provider and openzeppelin-solidity dependencies. If they are not already installed, add by running commands:
npm install --save truffle-hdwallet-provider
npm install --save openzeppelin-solidity

Edit the truffle-config.js file to add settings for Rinkeby network.
rinkeby: {
   provider: function() {
     return new HDWalletProvider(<your metamask seed words>,"https://rinkeby.infura.io/v3/< your infuraKey>")
       },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
}

In a project directory and run:
truffle migrate --network rinkeby --reset

Open separate console window and run :
cd app
npm run dev

View the project in a browser:  http://127.0.0.1:8080.
Selected a Rinkeby network in metaMask and make sure you have enough ether in your account. To add ether go to https://faucet.rinkeby.io.
