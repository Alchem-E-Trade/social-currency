require('dotenv').config();
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(process.env.ROPSTEN_URL);
const web3 = new Web3(provider);

const getTotalSupply = async() => {
    const result = await token.methods.totalSupply().call();
    return result;
};

const tokenName = async() => {
    const result = await token.methods.getName().call();
    return result;

};

const generateAccount = (user) => {
    const hashedUserId = web3.eth.accounts.hashMessage(user);
    const account = web3.eth.accounts.privateKeyToAccount(hashedUserId);
    return {
        address: account.address,
        privateKey: account.privateKey,
    };
};

module.exports = {
    generateAccount, tokenName, getTotalSupply
};
