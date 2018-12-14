import React, { Component } from 'react';
import contract from './blockchain/localInstanceOfContract.js';
import web3 from './blockchain/web3.js'
import './App.css';

class App extends Component {
  state ={
    amount:"",
    to:"",
    supplay:""
  }
  async componentDidMount(){
  const supplay = await contract.methods.totalSupply().call();
  this.setState({supplay})
  }

  mintNewToken = async event =>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.mintToken(this.state.to,this.state.amount).send({
      from: accounts[0]
    });

  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>hi</h1>
          <h2>GBP crypto coin supplay is: {this.state.supplay}</h2>
         <form onSubmit ={this.mintNewToken}>
        <label> Mint new GBP crypto coins</label>
        <div>
        <input
        value= {this.state.amount}
        placeholder ="How many GBP tokens to mint"
        onChange ={event => this.setState({amount: event.target.value})}
        />
         <input
        value= {this.state.to}
        placeholder ="To whom mint to"
        onChange ={event => this.setState({to: event.target.value})}
        /> 
        </div>
        <button> Mint </button>
         </form>
        </header>
      </div>
    );
  }
}

export default App;
