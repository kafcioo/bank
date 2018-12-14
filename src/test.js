import contract from './blockchain/localInstanceOfContract.js'
import web3 from './blockchain/web3.js'
const assert = require ('assert');

let accounts
let suplay
beforeEach(async()=>{
 accounts = await web3.eth.getAccounts();
 suplay = await contract.methods.totalSupply().call();  
console.log(suplay)
console.log(accounts)
})
describe('bank test', () => {


  it('mints new token' , async() =>{
   
    await contract.methods.mintToken(accounts[0],10).send({from: accounts[0]} );
    assert.Equal(suplay, suplay+10);
  });
  it('destroys tokens' , async() =>{
    
    await contract.methods.destroyTokens(accounts[0],10).send({from: accounts[0]} );
    assert.Equal(suplay, suplay-10);
  });

  it('cheack if require works' , async() =>{
    try{
    await contract.methods.destroyToe(accounts[0],10).send({from: accounts[1]} );
    assert(false);
    }catch(err){
    assert(err);
    }
  });

  it('test if change owner function works' , async() =>{
     const owner =  await contract.methods.owner().cal()
    await contract.methods.transferOwnership(accounts[1]).send({from: accounts[0]} );
    assert.Equal(owner,accounts[1]);
  });

})