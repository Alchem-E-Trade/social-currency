
require('dotenv').config();
// const SlackerToken = artifacts.require('SlackerToken');


const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(process.env.ROPSTEN_URL);
const web3 = new Web3(provider);
// const { privateKey } = require('../lib/utils/generateAccount');
// const {
//     // transferTokens,
//     // fundsTransfer,
//     signedTransfer,
// } = require('../lib/utils/transferTokens');
const slackerToken = require('../build/contracts/SlackerToken.json');
const ABI = slackerToken.abi;


const token = new web3.eth.Contract(ABI, contractAddress);
const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911';
const { App } = require('@slack/bolt');


const contractAddress = '0xbb93cacae3DA40444a8fd96e615B20f33F8A4f01';
const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911';


const token = new web3.eth.Contract(ABI, contractAddress, {
  
    // data: web3TokenBytecode
});


// web3.eth.getTransactionCount(bankroll, (err, txCount) =>{
//   const rawTx = {
//     nonce: web3.utils.toHex(txCount),
//     gasPrice: "2000000000",
//     gasLimit: "21000",
//     to: bankroll,
//     value: amount,
//     data: "",
//   };
// })

// contract('DappToken', function(accounts){
//   const deployedToken = token.deployed().then((instance) => {
//     const tokenInstance = instance;
//     console.log(tokenInstance.totalSupply());
//     return tokenInstance.totalSupply();
//   })

// })
// console.log(deployedToken, 'deployted token');
// token.deploy({ data: web3TokenBytecode, arguments: [1000] }).send({ from: contractAddress, })
//     .then((copyContract) =>{
//         copyContract.methods.setSlacker('aaa')
//             .send({ from:contractAddress })
//             .on('transactionHash', (hash) => {
//                 console.log(hash);
//             });
//     });



// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

//*********works  fuck yeah*/
token.methods.getName().call().then(res => {
    console.log(res);
  // web3.eth.
});

const createSlacker = async(slackerId) => {
    return await token.methods.setSlacker(slackerId);
};

const fetchAllSlackers = async() => {
    return await token.methods.getSlackers().send({ from: bankroll });
    
};
// const setSlack = async() =>{
//     token.methods.setSlacker('544').send({ from: contractAddress }).then(res =>{
//         console.log(res);
//     });};

// token.options.from = bankroll;
// token.methods.getTotalSupply().call().then(res => {
//     try {
//         console.log(res);
//     } catch (error) {
//         console.log(error);
//     }
// });


// const balance = async(acc) => await web3.eth.getBalance(acc);
// Listens to incoming messages that contain "hello"

app.message('check', async({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
    // const toUser = `${await privateKey(message.user)}`;
    // const amount = 750;
    try {
        console.log('message working!');
        await say({
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
            // text: `Hello <@${message.user}>!`,
                        text: `Hey there <@${
                            message.user
                        }>! I just transferred ${createSlacker(message.user)}`,
                    },
                },
            ],
            text: `Hey there <@${message.user}>!`,
        });
    } catch (error) {
        error;
    }
});
app.message('list', async({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
    // const toUser = `${await privateKey(message.user)}`;
    // const amount = 750;
    try {
        console.log('message working!');
        await say({
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
            // text: `Hello <@${message.user}>!`,
                        text: `Hey there <@${
                            message.user
                        }>! I just transferred ${fetchAllSlackers().then(res => {
                            console.log(res._method.signature);
                        })}`,
                    },
                },
            ],
            text: `Hey there <@${message.user}>!`,
        });
    } catch (error) {
        error;
    }
});


(async() => {
  // Start your app
    await app.start(process.env.PORT || 3200);

    console.log('⚡️ Bolt app is running!');
})();

