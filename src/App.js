import React, { Component } from 'react';
import contract from './blockchain/localInstanceOfContract.js';
import web3 from './blockchain/web3.js'
import './App.css';
import ProgressButton from 'react-progress-button'

const withdrawAddress ='0xb06029664056f44437F4E82cFB2D6B153513F0B8'
class App extends Component {
  state ={
    createAmount:"",
    destroyAmount:"",
    to:"",
    supplay:"",
    balance:"",
    mintButton:"",
    destroyButton:""
  }
  async componentDidMount(){
  const supplay = await contract.methods.totalSupply().call();
  const balance = await contract.methods.balanceOf(withdrawAddress).call();
  this.setState({supplay,balance})
  }

  mintNewToken = async event =>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.mintToken(this.state.to,this.state.createAmount).send({
      from: accounts[0]
    });
    this.setState({mintButton: 'success'});
    this.componentDidMount();
  };

  destroyTokens = async event =>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.destroyTokens(withdrawAddress,this.state.balance).send({
      from: accounts[0]
    });
    this.setState({destroyButton: 'success'})
    this.componentDidMount();
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>GBP crypto coin supplay is: {this.state.supplay}</h2>
          <p>GBP special withdraw address: {withdrawAddress}</p>
         <form onSubmit ={this.mintNewToken}>
        <label> Mint new GBP crypto coins</label>
        <div>
        <input
        className="nice-textbox"
        value= {this.state.createAmount}
        placeholder ="Amount to mint"
        onChange ={event => this.setState({createAmount: event.target.value})}
        />
         <input
         className="nice-textbox"
        value= {this.state.to}
        placeholder ="To whom mint to"
        onChange ={event => this.setState({to: event.target.value})}
        /> 
        </div>
        <ProgressButton state={this.state.mintButton}> Mint </ProgressButton>
        </form>
        <p>Destroy GBP crypto coins</p>
        <ProgressButton onClick={this.destroyTokens} state={this.state.destroyButton}> Destroy </ProgressButton  >
  



        </header>
      </div>
    );
  }
}

export default App;
