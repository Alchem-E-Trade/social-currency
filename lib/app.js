require('dotenv').config();
const rp = require('request-promise');
const { App } = require('@slack/bolt');
const { generateAccount, tokenName, getTotalSupply } = require('../lib/utils/contract-utils.js');;
const { formatExchangeData } = require('../lib/utils/munge.js');
const botChannel = 'C01ULQAQ1N2';

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event('member_joined_channel', async({ event, client }) => {
    try {
        await client.chat.postMessage({
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
    }
    catch (error) {
        console.error(error);
    }
});

app.action('button-action', async({ ack, body, client }) => {
    await ack();
   try {
        const user = body.user.id;
        const userPackage = generateAccount(user);
        await client.chat.postMessage({ channel: body.user.id, text: `Hey there <@${body.user.username}>! 
        Here is your public address:${JSON.stringify(userPackage.address)},  funds can be sent there. \n 
        Here is your private key:  ${JSON.stringify(userPackage.privateKey)}.\n
        Keep your private key secret! \n
        Here is a helpful list of messages you can use to interact with me:\n
        'game' : this message will get you a link to a currency trade simulator.\n
        'exchange-rates' : I will retrieve a list of exchange rates from currency to BITCOINs.\n
        'hello' : say hello to me!\n
        Here are some helpful slach commands you may send!\n
        '/coin <coin symbol>' : This will return current price information for the coin specified \n
        '/totalsupply' this will show you my total supply of my secret coins!\n
        '/tokenname' ; I will tell you the name of my secret coins!\n

        This link walks you through the process of exporting your account to the metamask cryptocurrency wallet. \n
        https://www.publish0x.com/crypto-wallets-info/how-to-import-private-key-in-metamask-how-to-import-myetherw-xwnmnrn\n
        MetaMask: https://metamask.io/` });
    }catch (error) {
        console.log(error);
    }
});

app.message("hello", async ({ message, say }) => {
  const botQuotes = [
    `Hello <@${message.user}> nice to see you again!`,
    `Oh hey <@${message.user}> what is app'ening?`,
    `Thanks goodness <@${message.user}> I thought everyone forgot a bot me!`,
    `'0000001 000--' Oh! Hey <@${message.user}> I didn't hear you come in!`,
    `Hey <@${message.user}> welcome back!`,
  ];
  function randomBotQuote(botQuotes) {
    const randomIndex = Math.floor(Math.random() * 5);
    return botQuotes[randomIndex];
  }
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${randomBotQuote(botQuotes)}`,
          },
        },
      ],
    });
  } catch (error) {
    error;
  }
});

app.message('exchange-rates', async({ message, say }) => {
    try {
        const requestData = {
            method: 'GET',
            uri: 'https://api.coingecko.com/api/v3/exchange_rates',
            json: true,
            gzip: true,
        };
        const exchangeData = await rp(requestData);
        const exchangeRates = formatExchangeData(exchangeData);
        await say({
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Check these rates out:\n ${exchangeRates}`,
                    },
                },
            ],
            text: `Hey there <@${message.user}>!`,
        });
    } catch (error) {
        error;
    }
});

app.message('game', async({ message, say }) => {
    try {
        await say({
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Here is a fun link to an e-currency simulator to learn how to trade: https://bitcoinflip.app/game/litecoin`,
                    },
                },
            ],
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
        
            },
            json: true,
            gzip: true
        };
        const response = await rp(requestOptions);
   
        const price = response[0].price.substring();
        const tokenName = response[0].name;
        const tokenSymbol = response[0].symbol;
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
    } catch (err) {
        console.log('API call error:', err.message);
    }

});

app.command('/totalsupply', async({ ack, payload, context }) => {
    try {
        await ack();
        await app.client.chat.postMessage({
            token: context.botToken,
            channel: payload.channel_id,
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
            text: 'Message from CurrencyBot'
        });
    }
    catch (error) {
        console.log(error);
    }});

app.command('/tokenname', async({ ack, payload, context }) => {
    try {
        await ack();
        await app.client.chat.postMessage({
            token: context.botToken,
            channel: payload.channel_id,
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
            text: 'Message from CurrencyBot'
        });
  
    }
    catch (error) {
        console.log(error);
    }});

(async() => {
    await app.start(process.env.PORT || 3200);
    console.log('⚡️ Bolt app is running!');
})();

