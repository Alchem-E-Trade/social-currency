require('dotenv').config();
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(process.env.ROPSTEN_URL);
const web3 = new Web3(provider);

const privateSlackerKey = process.env.PRIVATE_SLACKER_KEY;

const slackerToken = require('../../build/contracts/SlackerToken.json');
const ABI = slackerToken.abi;

const contractAddress = '0xdeEfb2d408207Fea2c9c81b4a356Abc92b65aA99';

const generateAccount = (user) => {
    const hashedUserId = web3.eth.accounts.hashMessage(user);
    console.log('private key:', hashedUserId);
    const account = web3.eth.accounts.privateKeyToAccount(hashedUserId);
    console.log(account);
    return account;
};

// const signedSlackerTransaction = () => {
//     web3.eth.accounts.signTransaction({
//         to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
//         value: '1000000000',
//         gas: 2000000
//     }, privateSlackerKey)
//         .then(res => {
//             web3.eth.sendSignedTransaction(res.rawTransaction).then(console.log);
//         });
//     return;
// };

module.exports = {
    generateAccount,
    // signedSlackerTransaction  
};
