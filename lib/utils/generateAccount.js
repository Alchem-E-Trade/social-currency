require('dotenv').config();
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(process.env.ROPSTEN_URL);
const web3 = new Web3(provider);

const privateSlackerKey = process.env.PRIVATE_SLACKER_KEY;
// const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911';

const slackerToken = require('../../build/contracts/SlackerToken.json');
const ABI = slackerToken.abi;

const contractAddress = '0xdeEfb2d408207Fea2c9c81b4a356Abc92b65aA99';

const token = new web3.eth.Contract(ABI, contractAddress);
// const SlackerToken = artifacts.require('SlackerToken');
// const NewSlacker = SlackerToken.deployed().then((instance) => {tokenInstance = instance});
//generate account
// Here is the Ethereum code:
// User account creation:
const generateAccount = (user) => {
    const hashedUserId = web3.eth.accounts.hashMessage(user);
    console.log('private key:', hashedUserId);
    const account = web3.eth.accounts.privateKeyToAccount(hashedUserId);
    console.log(account);
    return account;
};

const signedSlackerTransaction = () => {
    web3.eth.accounts.signTransaction({
        to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        value: '1000000000',
        gas: 2000000
    }, privateSlackerKey)
        .then(res => {

          // return token.methods.transfer('0x5Fc6086Db80797DacC68283263554f92523FE249', 99999).send({ from: })
            web3.eth.sendSignedTransaction(res.rawTransaction).then(console.log);
        });
    return;
};

module.exports = {
    generateAccount,
    signedSlackerTransaction  
};
