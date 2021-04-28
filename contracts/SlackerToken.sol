// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import './SafeMath.sol';

contract SlackerToken {
    using SafeMath for uint256;

    string[] slackers;
    mapping(string => uint) balances;

    uint256 public decimal = 0;
    uint256 public totalSupply;

    event Transfer(
        string indexed _from,
        string indexed _to,
        uint256 _value
    );

    // event Approval(
    //     address indexed _owner,
    //     address indexed _spender,
    //     uint256 _value
    // );

  
    // function addUser(string memory slackId) public pure returns(string memory) {
    //     return slackId;
    // }
 
    constructor(uint256 _initialSupply) public{
        // balances[slackers[0]] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function getName() public pure returns(string memory) {
        return 'Slacker Token';
    }
     function getSymbol() public pure returns(string memory) {
        return 'ST';
    }

    function getTotalSupply() public view returns(uint256){
        return  totalSupply;
    }


    // function approve(address _spender, uint256 _value) public returns(bool success) {

    //     allowance[msg.sender][_spender] = _value;

    //     emit Approval(msg.sender, _spender, _value);

    //     return true;
    // }


    function transferFrom(string memory _from, string memory _to, uint256 _value) public returns (bool success) {

        require(_value <= balances[_from]);

        // require(_value <= allowance[_from][msg.sender]);

        balances[_from] = balances[_from].sub(_value);

        balances[_to] = balances[_to].add(_value);

        // allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value); 

        emit Transfer( _from,  _to, _value);

        return true;
    }

    // function generateAccount(string memory slackId) public returns(bool success) { 
    //     toHash = 
    
    // }
}

