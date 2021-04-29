
require('dotenv').config();
// const SlackerToken = artifacts.require('SlackerToken');

const Web3 = require("web3");
const web3 = new Web3(process.env.ROPSTEN_URL);
const { privateKey } = require("../lib/utils/generateAccount");
const {
  transferTokens,
  fundsTransfer,
  signedTransfer,
} = require("../lib/utils/transferTokens");
const slackerToken = require("../build/contracts/SlackerToken");
const ABI = slackerToken.abi;


const contractAddress = "0x53cf6121D1F597c45D381c19213066be354224Dc";
const bankroll = "0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911";

const token = new web3.eth.Contract(ABI, contractAddress, {
  from: bankroll,
});

const { App } = require("@slack/bolt");


// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

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
