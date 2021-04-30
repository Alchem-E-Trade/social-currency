require('dotenv').config();
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3(process.env.ROPSTEN_URL);
const slackerToken = require('../../build/contracts/SlackerToken.json');
const ABI = slackerToken.abi;


const contractAddress = '0xdeEfb2d408207Fea2c9c81b4a356Abc92b65aA99';

const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911';

const token = new web3.eth.Contract(ABI, contractAddress, {
    from: bankroll,
});

const transferTokens = async(fromAddress, toAddress, amount) => {
    console.log('from', fromAddress);
    console.log('to', toAddress);
    const payload = await token.methods
        .transferFrom(fromAddress, toAddress, amount)
        .send({ from: fromAddress }, function(error, transactionHash) {
            console.log(error);
            console.log('//////////////hash', transactionHash);
            return error, transactionHash;
        });
    console.log('amount', amount);
    console.log('payload:', payload);
    return payload;
};

const signedTransfer = async(toAddress, amount, privateKey) => {
    console.log('amount', amount);
    const rawTx = {
        nonce: '000',
        gasPrice: '2000000000',
        gasLimit: '21000',
        to: toAddress,
        value: amount,
        data: '',
    };

    const tx = new Tx(rawTx, { chain: 'ropsten' });
    const hexKey = Buffer.from(privateKey, 'hex');
    tx.sign(hexKey);
    const serializedTx = tx.serialize();
    console.log(serializedTx);

    const transferVariable = await web3.eth
        .sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log);
    console.log(transferVariable);
};



module.exports = {
    transferTokens,
    signedTransfer,
};
