require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3(process.env.ROPSTEN_URL);
const slackerToken = require("../build/contracts/SlackerToken.json");
const ABI = slackerToken.abi;
const contractAddress = '0x53cf6121D1F597c45D381c19213066be354224Dc';
const token = new web3.eth.Contract(ABI, contractAddress);

const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911'
const balance = token.method.balanceOf(bankroll);
// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>! This is your ${balance}!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start(process.env.HEROKU_URL || 3000);

  console.log('⚡️ Bolt app is running!');
})();
