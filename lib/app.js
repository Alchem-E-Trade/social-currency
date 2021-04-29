
require('dotenv').config();
// const SlackerToken = artifacts.require('SlackerToken');


const Web3 = require("web3");
const provider = new Web3.providers.HttpProvider(process.env.ROPSTEN_URL);
const web3 = new Web3(provider);
const { privateKey } = require("../lib/utils/generateAccount");
const {
  transferTokens,
  fundsTransfer,
  signedTransfer,
} = require("../lib/utils/transferTokens");
const slackerToken = require("../build/contracts/SlackerToken.json");
const ABI = slackerToken.abi;


const { App } = require("@slack/bolt");



const contractAddress = "0x53cf6121D1F597c45D381c19213066be354224Dc";

const bankroll = "0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911";

const web3TokenBytecode = '0x608060405234801561001057600080fd5b50600436106100625760003560e01c8063150704011461006757806317d7de7c1461008557806318160ddd146100a35780635d1b1e6d146100c157806376809ce3146100f1578063c4e41b221461010f575b600080fd5b61006f61012d565b60405161007c91906105da565b60405180910390f35b61008d61016a565b60405161009a91906105da565b60405180910390f35b6100ab6101a7565b6040516100b8919061061c565b60405180910390f35b6100db60048036036100d69190810190610461565b6101ad565b6040516100e891906105bf565b60405180910390f35b6100f96102ee565b604051610106919061061c565b60405180910390f35b6101176102f4565b604051610124919061061c565b60405180910390f35b60606040518060400160405280600281526020017f5354000000000000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600d81526020017f536c61636b657220546f6b656e00000000000000000000000000000000000000815250905090565b60035481565b60006001846040516101bf91906105a8565b9081526020016040518091039020548211156101da57600080fd5b61020b826001866040516101ee91906105a8565b9081526020016040518091039020546102fe90919063ffffffff16565b60018560405161021b91906105a8565b90815260200160405180910390208190555061025e8260018560405161024191906105a8565b90815260200160405180910390205461034890919063ffffffff16565b60018460405161026e91906105a8565b9081526020016040518091039020819055508260405161028e91906105a8565b6040518091039020846040516102a491906105a8565b60405180910390207f5358be4df107be4d9b023fc323f41d7109610225c6ef211b9d375b9fbd7ccc4f846040516102db919061061c565b60405180910390a3600190509392505050565b60025481565b6000600354905090565b600061034083836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061039d565b905092915050565b600080828401905083811015610393576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038a906105fc565b60405180910390fd5b8091505092915050565b60008383111582906103e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103dc91906105da565b60405180910390fd5b5060008385039050809150509392505050565b600082601f83011261040957600080fd5b813561041c61041782610664565b610637565b9150808252602083016020830185838301111561043857600080fd5b6104438382846106cd565b50505092915050565b60008135905061045b81610720565b92915050565b60008060006060848603121561047657600080fd5b600084013567ffffffffffffffff81111561049057600080fd5b61049c868287016103f8565b935050602084013567ffffffffffffffff8111156104b957600080fd5b6104c5868287016103f8565b92505060406104d68682870161044c565b9150509250925092565b6104e9816106b7565b82525050565b60006104fa82610690565b610504818561069b565b93506105148185602086016106dc565b61051d8161070f565b840191505092915050565b600061053382610690565b61053d81856106ac565b935061054d8185602086016106dc565b80840191505092915050565b6000610566601b8361069b565b91507f536166654d6174683a206164646974696f6e206f766572666c6f7700000000006000830152602082019050919050565b6105a2816106c3565b82525050565b60006105b48284610528565b915081905092915050565b60006020820190506105d460008301846104e0565b92915050565b600060208201905081810360008301526105f481846104ef565b905092915050565b6000602082019050818103600083015261061581610559565b9050919050565b60006020820190506106316000830184610599565b92915050565b6000604051905081810181811067ffffffffffffffff8211171561065a57600080fd5b8060405250919050565b600067ffffffffffffffff82111561067b57600080fd5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b60008115159050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156106fa5780820151818401526020810190506106df565b83811115610709576000848401525b50505050565b6000601f19601f8301169050919050565b610729816106c3565b811461073457600080fd5b5056fea365627a7a723158208aa8ec5dd307aad2b589870f8f80ad1e3b538f2d3357c817fd5c17c0732264e96c6578706572696d656e74616cf564736f6c63430005100040';
const token = new web3.eth.Contract(ABI, contractAddress, {
  
  data: web3TokenBytecode
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
token.deploy({data: web3TokenBytecode, arguments: [1000]}).send({from: contractAddress,})
  .then((copyContract) =>{
    copyContract.methods.setSlacker('aaa')
    .send({from:contractAddress})
    .on('transactionHash', (hash) => {
      console.log(hash);
    })
  })



// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

//*********works  fuck yeah*/
token.methods.getName().call().then(res => {
  console.log(res);
   token.methods.getAccountList().send().then(console.log);
  // web3.eth.
});

const setSlack = async() =>{
   token.methods.setSlacker('544').send({from: contractAddress}).then(res =>{
    console.log(res);
})};

token.options.from = bankroll;
token.methods.getTotalSupply().call().then(res => {
  try {
    console.log(res);
  } catch (error) {
    console.log(error);
  }
})


const balance = async (acc) => await web3.eth.getBalance(acc);
// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  const userId = message.user;
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            // text: `Hello <@${message.user}>!`,
            text: `Hey there <@${
              message.user
            }>! This is your private account key is ${await privateKey(
              userId
            )}`,
          },
        },
      ],
      text: `Hey there <@${message.user}>!`,
    });
  } catch (error) {
    error;
  }
});

app.message("check", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  const toUser = `${await privateKey(message.user)}`;
  const amount = 750;
  try {
    console.log("message working!");
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            // text: `Hello <@${message.user}>!`,
            text: `Hey there <@${
              message.user
            }>! I just transferred ${await signedTransfer(
              toUser,
              amount,
              "0xddcfc1100aee53dfe8b99ac6fd8040f0a019a03933ca42ca171b6e3cb8972976"
            )} tokens into your new account!`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click Me",
            },
            action_id: "button_click",
          },
        },
      ],
      text: `Hey there <@${message.user}>!`,
    });
  } catch (error) {
    error;
  }
});

app.action("button_click", async ({ ack, say }) => {
  await ack();

  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          // text: `Hello <@${message.user}>!`,
          text: `Hey there <@${message.user}>!`,
        },
      },
    ],
  });
  //try {
  // Acknowledge the action

  // try {
  //   //   const initialDeposit = {
  //   //     from: bankroll,
  //   //     to: await privateKey(`${body.user.id}`),
  //   //     value: 1000,
  //   //   };
  //   //   const sendTokens = async (initialDeposit) => {
  //   //     const sendIt = await web3.eth.sendTransaction(initialDeposit);
  //   //     return `you sent ${initialDeposit.value}!`;
  //   //   };

  // } catch (error) {
  //   //    let error = JSON.parse("{" + e.message.split("{")[1]);
  //   //             let data = error.data;
  //   //             console.log(web3.utils.toAscii("0x" + data.replace("Reverted ", "").substr(138)).replace(/\u0000/g, ""));
  // }
  //await say(`<@${body.user.id}> received 1000 Slack Tokens!`);
  //   } catch (error) {
  //     console.log(error);
  //   }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3200);
  console.log("⚡️ Bolt app is running!");
})();
