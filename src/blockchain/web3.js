import Web3 from 'web3';

let web3;

if(typeof window!=='undefined' && typeof window.web3 !=='undefined'){
  //We are in the browwser and meta mask is runing
  web3 = new Web3(window.web3.currentProvider);
}else {
// We are on the server or the user is not runing metamask
const provider = new Web3.providers.HttpProvider(
  'https://rinkeby.infura.io/QqWsfQ60KqF4HCDRrP6I'
);
web3 = new Web3(provider);
}

export default web3;

// 
