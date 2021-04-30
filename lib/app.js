require('dotenv').config();
const rp = require('request-promise');
const { App } = require('@slack/bolt');
const Web3 = require('web3');
const web3 = new Web3(process.env.ROPSTEN_URL);
const { generateAccount } = require('../lib/utils/generateAccount');
const slackerToken = require('../build/contracts/SlackerToken.json');
const ABI = slackerToken.abi;

const contractAddress = '0xdeEfb2d408207Fea2c9c81b4a356Abc92b65aA99';

const token = new web3.eth.Contract(ABI, contractAddress);
// const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911';
console.log(token);

token.methods.name().call().then(console.log);
// const { privateKeys } = require('@openzeppelin/test-environment');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});


const tokenName = async() => {
    const result = await token.methods.getName().call();
    return result;

};

const getTotalSupply = async() => {
    const result = await token.methods.totalSupply().call();
    return result;
};

// const balance = async(acc) => await web3.eth.getBalance(acc);
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

app.command('/coin', async({ ack, body, say, payload }) => {
    try {
        await ack();
        const requestOptions = {
            method: 'GET',
            uri: `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_API_KEY}&ids=${payload.text.toUpperCase()}&interval=1d,30d&convert=USD&per-page=100&page=1`,

            qs: {
                'start': '1',
                'limit': '10',
                'convert': 'USD'
            },
            headers: {
                // 'X-CMC_PRO_API_KEY': process.env.CURRENCY_API_KEY
            },
            json: true,
            gzip: true
        };
        const response = await rp(requestOptions);
   
        const price = response[0].price.substring();
        const tokenName = response[0].name;
        const tokenSymbol = response[0].symbol;
        console.log(body);
        try {
            await say({
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `Hey there <@${body.user_id}> the price of ${tokenName} is 1 ${tokenSymbol} to $${price}!`,
                        },
                    },
                ],
                text: `Hey there <@${body.user_id}>!`,
            });
        } catch (error) {
            console.log(error);
        }
        console.log('API call response:', response);
    } catch (err) {
        console.log('API call error:', err.message);
    }

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
        const user = body.user.id;
        const userPackage = generateAccount(user);
       
        const result = await client.chat.postMessage({ channel: body.user.id, text: `Hey there <@${body.user.username}>! 
        Here is your account address: ${JSON.stringify(userPackage.address)}, and keep this private key secret: ${JSON.stringify(userPackage.privateKey)}.\n
        Here is a helpful list of messages you can use to interact with me:\n
        'training': this message will get you a link to a currency trade simulator.\n
        Follow this link and add your account to\n MetaMask: https://metamask.io/` });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
});

// Listen for a slash command invocation
app.command('/hi', async({ ack, payload, context }) => {
  

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
  
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }});

app.command('/totalsupply', async({ ack, payload, context }) => {
  

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
                        text: `The total supply of Slacker Token is ${await getTotalSupply()}`,
                    },
                }
            ],
            bolly: 'gotcha',
      // Text in the notification
            text: 'Message from Test App'
        });
    // console.log(payload)
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }});

app.command('/tokenname', async({ ack, payload, context }) => {
  

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
                        text: `Hey Slaker you need a token-- I got one for you! ${await tokenName()}`,
                    },
                }
            ],
            bolly: 'gotcha',
      // Text in the notification
            text: 'Message from Test App'
        });
    // console.log(payload)
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }});

(async() => {
  // Start your app
    await app.start(process.env.PORT || 3200);

    console.log('⚡️ Bolt app is running!');
})();

