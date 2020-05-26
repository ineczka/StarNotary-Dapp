import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createStar: async function() {
    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    console.log("this.account");
    console.log(this.account);
    await createStar(name, id).send({from: this.account} );
    App.setStatus("New Star Owner is " + this.account + ".");
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUp: async function (){
    
    let {ownerOf} = this.meta.methods;
    let { lookUptokenIdToStarInfo, symbol, name } = this.meta.methods; 
   
    const id = parseInt(document.getElementById("lookid").value);
   
    let starName = await lookUptokenIdToStarInfo(id).call();
    
    let message = "";
    
    if (!starName){
    
    message = `<p>Star doesn't exist</p>`;
    App.setStatus (message);
    
   }else{
    let contractName = await name().call();
    let starSymbol = await symbol().call();
    let starOwner = await ownerOf(id).call();
    message =`<p id = "starStatus">Star ID: ${id} is owned by address:  ${starOwner}</p>
                  <p id ="starName">Star name: ${starName}</p>
                  <p id = "contractName: ">Token Name: ${contractName}</p>
                  <p id = "symbol">Token Symbol: ${starSymbol}</p>`;
     App.setStatus(message);

     //  App.setStatus("Star owned by: "+ starOwner,"starStatus");
     //  App.setStatus("Star ID: "+id+" is named "+starName,"starName");
     //  App.setStatus("Token Name: "+contractName,"contract");
     //  App.setStatus("Token Symbol: "+starSymbol,"starSymbol");
   }
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts and open metamask
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});