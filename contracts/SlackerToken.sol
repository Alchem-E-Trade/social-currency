// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import './SafeMath.sol';

contract SlackerToken {
    using SafeMath for uint256;

    string[] public slackers;
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

    constructor(uint256 _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    mapping(address => uint256) public balanceOf;
    mapping(address => string) public _slackId;
    mapping(address => mapping(address => uint256)) public allowance;
    

    
    function userBalance(address userAddress) public view returns(uint){
        return balanceOf[userAddress];
    }
    function addUserFunds(address userAddress, uint _amount) public{
        balanceOf[userAddress] += _amount;
    }

    function getName() public pure returns(string memory) {
        return 'Slacker Token';

    }

    function setSlacker(string memory _slackerId) public returns (bool success) {
        slackers.push(_slackerId);
        return true;
    }

    function getSlackers() public view returns (string[] memory) {
        string[] memory arr = slackers;
        return arr;
    }

    function transfer(address _to, uint256 _value) public returns(bool success) {

    require(balanceOf[msg.sender] >= _value);
    
    balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
    balanceOf[_to] = balanceOf[_to].add(_value);
    
    emit Transfer(msg.sender, _to, _value);
    
    return true;

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
}
