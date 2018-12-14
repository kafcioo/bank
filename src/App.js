import React, { Component } from 'react';
import contract from './blockchain/localInstanceOfContract.js';
import web3 from './blockchain/web3.js'
import './App.css';

class App extends Component {
  state ={
    createAmount:"",
    destroyAmount:"",
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
    await contract.methods.mintToken(this.state.to,this.state.createAmount).send({
      from: accounts[0]
    });

  };

  destroyTokens = async event =>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.destroyTokens('0xb06029664056f44437F4E82cFB2D6B153513F0B8',this.state.destroyAmount).send({
      from: accounts[0]
    });

  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>GBP crypto coin supplay is: {this.state.supplay}</h2>
          <p>GBP special withdraw address: 0xb06029664056f44437F4E82cFB2D6B153513F0B8</p>
         <form onSubmit ={this.mintNewToken}>
        <label> Mint new GBP crypto coins</label>
        <div>
        <input
        value= {this.state.createAmount}
        placeholder ="How many GBP tokens to mint"
        onChange ={event => this.setState({createAmount: event.target.value})}
        />
         <input
        value= {this.state.to}
        placeholder ="To whom mint to"
        onChange ={event => this.setState({to: event.target.value})}
        /> 
        </div>
        <button> Mint </button>
         </form>

         <form onSubmit ={this.destroyTokens}>
        <label> Destroy GBP coins</label>
        <div>
        <input
        value= {this.state.destroyAmount}
        placeholder ="How many GBP tokens to destroy"
        onChange ={event => this.setState({destroyAmount: event.target.value})}
        />
        </div>
        <button> Destroy </button>
         </form>



        </header>
      </div>
    );
  }
}

export default App;
