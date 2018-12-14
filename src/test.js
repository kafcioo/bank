import contract from './blockchain/localInstanceOfContract.js'
import web3 from './blockchain/web3.js'

const assert = require ('assert');
let accounts
let suplay
beforeEach(async()=>{

    accounts = await web3.eth.getAccounts(); 
    console.log(accounts)
})
describe('bank test', () => {

it('returns suplay' , async() =>{
     suplay = await contract.methods.totalSupply().call();
    assert.notEqual(suplay, null);
  });

  it('mints new token' , async() =>{
    await contract.methods.mintToken(accounts[1],10).send({from: accounts[0]} );
    assert.Equal(suplay, suplay+10);
  });
  it('destroys tokens' , async() =>{
    await contract.methods.dectroyToken(accounts[1],10).send({from: accounts[0]} );
    assert.Equal(suplay, suplay-10);
  });

})