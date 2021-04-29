
require('dotenv').config();
// const SlackerToken = artifacts.require('SlackerToken');


const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(process.env.ROPSTEN_URL);
const web3 = new Web3(provider);
const { generateAccount } = require('../lib/utils/generateAccount');
const slackerToken = require('../build/contracts/SlackerToken.json');
const ABI = slackerToken.abi;
const { App } = require('@slack/bolt');
const contractAddress = '0xdeEfb2d408207Fea2c9c81b4a356Abc92b65aA99';
const bankroll = '0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911';
const token = new web3.eth.Contract(ABI, contractAddress, {/*data: web3TokenBytecode*/});
const privateSlackerKey = '0x8c0324154913e17fd2b619587ed0eb2a0b3e64c848d336a6720f799beffdccd2';

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

// const createSlacker = (slackerId) => {
//     return token.methods.setSlacker(slackerId);
// };


// const getUserMessageContext = async({ payload, client, context, next }) => {
//     console.log('PAYLOAD', payload);
//     // console.log('CONTEXT', context);
//     // console.log('CLIENT', client);
//     // const user = await client.users.info({ user: payload });
//     // context.userId = user.user;
//     // console.log(context.userId);
//     await next();
// };


const signedSlackerTransaction = () => {
    return web3.eth.accounts.signTransaction({
        to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        value: '99999',
        gas: 2000000
    }, privateSlackerKey)
        .then(res => {
            console.log(res);
            return web3.eth.getTransaction(res.hash).then(res => {
                console.log(res);
            });
            // return token.methods.transfer(res.tx.to, res.tx.value);
            // return web3.eth.sendSignedTransaction(res.rawTransaction).then(console.log);
        });
};
const fetchAllSlackers = () => {
    return token.methods.getSlackers().send({ from: bankroll });
    
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
                        }>! I just transferred ${await generateAccount(message.user)} signed Slacker Transaction  ${signedSlackerTransaction()}
                        `,
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

// {
//     "type": "member_joined_channel",
//     "user": "W06GH7XHN",
//     "channel": "C0698JE0H",
//     "channel_type": "C",
//     "team": "T024BE7LD",
//     "inviter": "U123456789"
// }

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
                        'text': `Welcome to the Alchm-E-Trade channel, <@${event.user}>! 🎉 You can introduce yourself in this channel.`
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
        const result = await client.chat.postMessage({ channel: body.user.id, text: 'SUP BLOCKCHAIN DEV' });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
});

(async() => {
  // Start your app
    await app.start(process.env.PORT || 3200);

    console.log('⚡️ Bolt app is running!');
})();

