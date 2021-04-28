require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(process.env.ROPSTEN_URL);
// const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911';

const slackerToken = require("../../build/contracts/SlackerToken");
const ABI = slackerToken.abi;

const contractAddress = "0x53cf6121D1F597c45D381c19213066be354224Dc";

const token = new web3.eth.Contract(ABI, contractAddress);
// const SlackerToken = artifacts.require('SlackerToken');
// const NewSlacker = SlackerToken.deployed().then((instance) => {tokenInstance = instance});
//generate account
// Here is the Ethereum code:
// User account creation:
const privateKey = async (user) => {
  const hashedUserId = await web3.eth.accounts.hashMessage(user);
  console.log("private key:", hashedUserId);
  const account = await web3.eth.accounts.privateKeyToAccount(hashedUserId);
  // const transaction = web3.eth.sendSignedTransaction({
  //     from: bankroll,
  //     to: account.address,
  //     value: '10000'
  // }).then(receipt => {
  //     console.log(receipt);
  // });

  //console.log(await token.methods.name());
  const Bal = await web3.eth.getBalance(
    "0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911"
  );
  //console.log("Acct Balance", Bal);
  //const accountBal = await web3.eth.getBalance(account.address);
  //console.log(accountBal);
  //console.log("Acct Address", account.address);
  return account.address;
};

//     // Initial deposit of tokens:

//     // Account balance retrieval:
//     const userBalance = await token.methods.balanceOf(newAddress);
// console.log(userBalance);

module.exports = {
  privateKey,
};
