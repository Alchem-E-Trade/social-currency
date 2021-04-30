require('dotenv').config();
const { App } = require('@slack/bolt');
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
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

//*********works  fuck yeah*/
token.methods.getName().call().then(res => {
    console.log(res);
  // web3.eth.
});

token.methods.totalSupply().call().then(res => {
    console.log(res);
});

const balance = async(acc) => await web3.eth.getBalance(acc);
// Listens to incoming messages that contain "hello"
app.message('hello', async({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
    try {
        console.log('message working!');
        await say({
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Hey there <@${message.user}>! 
                        Here is a fun link to an e-currency simulator to learn how to trade: https://bitcoinflip.app/game/litecoin`,
                    },
                },
            ],
            text: `Hey there <@${message.user}>!`,
        });
    } catch (error) {
        error;
    }
});

app.command('/coin', async({ message, say }) => {
    try {
    const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '10',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': process.env.CURRENCY_API_KEY
  },
  json: true,
  gzip: true
};
const response = await rp(requestOptions);
    try {
        const list =JSON.stringify(response.data[0])
         await say({
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Hey there <@${message.user}>! Here is a list of Crypto currency values: ${list}`,
                    },
                },
            ],
            text: `Hey there <@${message.user}>!`,
        });
    } catch (error) {
        error;
    }
  console.log('API call response:', response);
} catch (err) {
  console.log('API call error:', err.message);
};

});

const botChannel = 'C01ULQAQ1N2';

// When a user joins the team, send a message in a predefined channel asking them to introduce themselves
app.event('member_joined_channel', async({ event, client }) => {
    try {
        console.log(event);
    // Call chat.postMessage with the built-in client
        const result = await client.chat.postMessage({
            channel: botChannel,
            
            'blocks': [
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': `Welcome to the Alchm-E-Trade channel, <@${event.user}>! 🎉 You can introduce yourself in this channel.\n Click the button below to get setup with your own account and learn more about crypto currency!
                        `
                    }
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': 'Get me set-up with my own account:'
                    },
                    'accessory': {
                        'type': 'button',
                        'text': {
                            'type': 'plain_text',
                            'text': 'Set Me UP',
                            'emoji': true
                        },
                        'value': 'click_me_123',
                        'action_id': 'button-action'
                    }
                }
            ]

        });
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
});

app.action('button-action', async({ ack, body, client }) => {
    await ack();
    console.log('BODDDDDDY', body);
    try {
        const user = body.user.id
        const result = await client.chat.postMessage({ channel: body.user.id, text: `Hey there <@${body.user.username}>! 
        Here is your account address: ${JSON.stringify(generateAccount(user))},\n
        Here is a helpful list of messages you can use to interact with me:\n
        'training': this message will get you a link to a currency trade simulator.\n
        Follow this link and add your account to\n MetaMask: https://metamask.io/` });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
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
    await app.start(process.env.PORT || 3200);

    console.log('⚡️ Bolt app is running!');
})();

