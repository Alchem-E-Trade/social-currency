require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(process.env.ROPSTEN_URL);
const { privateKey } = require('../lib/utils/generateAccount');
const slackerToken = require('../build/contracts/SlackerToken.json');
const ABI = slackerToken.abi;

const contractAddress = '0xC610DbDC42B3eb6F05E67C8b746097F6Bc0E9bAb';

const token = new web3.eth.Contract(ABI, contractAddress);
const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911';
console.log(token);
const { App } = require('@slack/bolt');
token.methods.name().call().then(console.log)
// const { privateKeys } = require('@openzeppelin/test-environment');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});


const balance = async(acc) => await web3.eth.getBalance(acc);
// Listens to incoming messages that contain "hello"
app.message('hello', async({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
    try {
        await say({
            blocks: [
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': `Hey there <@${message.user}>! This is your ${await balance(bankroll)}! private key is ${await privateKey(message.user)} `
                    },
                    'accessory': {
                        'type': 'button',
                        'text': {
                            'type': 'plain_text',
                            'text': 'Click Me'
                        },
                        'action_id': 'button_click'
                    }
                }
            ],
            text: `Hey there <@${message.user}>!`
        });
    } catch (error) {
        error;
    }
});

app.action('button_click', async({ body, ack, say }) => {
  // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});

// Listen for a slash command invocation
app.command('/hi', async ({ ack, payload, context}) => {
  

  try {
    // Acknowledge the command request
  await ack();
    
    const result = await app.client.chat.postMessage({
      // type: 'shortcut',
      token: context.botToken,
      // Channel to send message to
      channel: payload.channel_id,
      // Include a button in the message (or whatever blocks you want!)
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hello again <@${payload.user_id}>`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click me!'
            },
            action_id: 'button_abc'
          }
        }
      ],
      bolly: 'gotcha',
      // Text in the notification
      text: 'Message from Test App'
    });
    // console.log(payload)
    // console.log(result.message.user);
  }
  catch (error) {
    console.log(error)
  }});

(async() => {
  // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
