pragma solidity ^0.4.25;
import "./StandardToken.sol";

contract poundCoin is StandardToken {
        //Global varibles 
        string public name;
        uint8 public decimals;             
        string public symbol;  
        address public owner;
        
        constructor() {
            owner = msg.sender;
             name = "PoundCoin";
             decimals = 0;          
             symbol = "GBP";      
        }
        // @dev set modifier
        modifier onlyOwner {
            require(msg.sender == owner);
            _;
        }
        // @dev transfer contract ownership to another address 
        // @param new owner of the contract 
        function transferOwnership(address newOwner) onlyOwner public {
            owner = newOwner;
        }
         // @dev create new tokens 
        // @param address to whom mint new tokens
        // @param amount of tokens to mint 
        function mintToken(address target, uint256 mintedAmount) onlyOwner public {
         _balances[target] = _balances[target].add(mintedAmount);
        _totalSupply = _totalSupply.add(mintedAmount);
    }
         // @destroy tokens 
        // @param address to whom mint new tokens
        // @param amount of tokens to mint 
      function dectroyToken(address target, uint256 destroyAmount) onlyOwner public {
        _balances[target] = _balances[target].sub(destroyAmount);  
       _totalSupply= _totalSupply.sub(destroyAmount);
    }
    


    

   
}
