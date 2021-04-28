// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './SafeMath.sol';

contract SlackerToken {
    using SafeMath for uint256;

    string public name = 'Slacker Token';
    string public symbol = 'ST';
    string public standard = 'ST token v1.0.0';
    uint256 public decimal = 0;
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );


    mapping(address => uint256) public balanceOf;

    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => user) users;
    struct user {
		string slackId;
    }

    function addUser(string memory slackId) public pure returns(string memory) {
        return slackId;
    }
    // function getUsers() view public returns (address[] memory) {
    //     return users;
    // }

    constructor(uint256 _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }
    function getName() public pure returns(string memory) {
        return 'Slacker Token';
    }

    function approve(address _spender, uint256 _value) public returns(bool success) {

        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }


    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {

        require(_value <= balanceOf[_from]);

        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] = balanceOf[_from].sub(_value);

        balanceOf[_to] = balanceOf[_to].add(_value);

        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value); 

        emit Transfer(_from, _to, _value);

        return true;
    }

    // function generateAccount(string memory slackId) public returns(bool success) { 
    //     toHash = 
    
    // }
}

