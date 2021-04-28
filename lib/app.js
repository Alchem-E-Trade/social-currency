require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(process.env.ROPSTEN_URL);
const { privateKey } = require("../lib/utils/generateAccount");
// const slackerToken = require('../build/contracts/SlackerToken');
// const ABI = slackerToken.abi;

// const contractAddress = '0x53cf6121D1F597c45D381c19213066be354224Dc';

// const token = new web3.eth.Contract(ABI, contractAddress);

const token = new web3.eth.Contract(ABI, contractAddress);
const bankroll = "0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911";
const { App } = require("@slack/bolt");
// const { privateKeys } = require('@openzeppelin/test-environment');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const bankroll = "0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911";
const balance = async (acc) => await web3.eth.getBalance(acc);
// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey there <@${
              message.user
            }>! This is your private account key is ${await privateKey(
              message.user
            )} `,
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

app.action("button_click", async ({ body, ack, say }) => {
  try {
    // Acknowledge the action
    await ack();
    try {
      const transaction = {
        from: "0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911",
        to: await privateKey(`${body.user.id}`),
        data: token.methods
          .transfer(await privateKey(`${body.user.id}`), 1000)
          .send({ from: "0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911" }),
      };
      const signedPromise = web3.eth.signTransaction(
        transaction,
        transaction.from
      );
      signedPromise.then((signedTransaction) => {
        const sentTx = web3.eth.sendSignedTransaction(
          signedTx.raw || signedTx.rawTransaction
        );
        sentTx.on("receipt", (receipt) => {
          // do something when receipt comes back
        });
        sentTx.on("error", (err) => {
          // do something on transaction error
        });
      });
    } catch (error) {
      //    let error = JSON.parse("{" + e.message.split("{")[1]);
      //             let data = error.data;
      //             console.log(web3.utils.toAscii("0x" + data.replace("Reverted ", "").substr(138)).replace(/\u0000/g, ""));
    }
    await say(`<@${body.user.id}> recieved 1000 Slack Tokens!`);
  } catch (error) {
    console.log(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3200);

  console.log("⚡️ Bolt app is running!");
})();
