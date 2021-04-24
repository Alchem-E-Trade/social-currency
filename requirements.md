Software Requirements:

Vision:
We wish to create a fun Slack app that incentivizes in-channel networking and bond-building among the Alchemy community, and to explore the possibilities of Ethereum based tokens as the foundation for said incentives.
Pain:

Social activity, especially when remote, can feel amorphous and difficult to take concrete things away from;
Blockchain-based currencies are difficult to access for the average user, typically requiring specialized software;
Why care:

Our product encourages both more social interaction among employees or stakeholders, and makes blockchains and cryptocurrencies more accessible. It gives the user a more customizable experience of the slack platform.

Scope:

IN:
User can message the bot to set up an account and receive seed funds.
User can message bot to check account balance.
User can message bot to view possible account actions via a slack modal.
User will have the ability to purchase emojis.
User will be able to transfer funds to their personal wallet.
Message multiplier- users who communicate via DM will receive a token multiplier that correlates to the breath of the message.

OUT:
It will not allow users to mint their own coin- there will be a finite amount initial minted by the contract.
This will never be outside the scope of Slack.

MVP:
A Slack boot that rewards social interaction by facilitating blockchain transactions for our user

Stretch:
A feed channel that post info about all transactions.
The bot will be able to give live prices of a coin ie. /priceCheckBIT
Sending coins to another user
Functional Reqs

User can join the workspace
Users can message bot to create an account for them and mint seed tokens.
/command to access bot
web3.eth.create() -- account creation(address, privateKey)
Users will have all normal abilities available to them through the Slack API.

Non Functional Reqs:  
Accessibility -- everyone in Alchemy Slack workspace can interact with bot;  
 We will ensure that the bot has the correct workspace/channel permissions, so that it is available alongside preexisting Slack features.  
Security -- any sensitive user information is safeguarded in storage and transmission;  
 We will be using Slack to handle user login authorization; additionally we will tailor our Ethereum smart contract to reinforce security, as applicable.  
Privacy -- user interactions with bot are private (except for when bot interacts with everyone in conversation);  
 Messages form the bot will be set to Ephemeral in cases where they are meant to only be seen by the user.  
Response Time -- bot responses occur in timely manner for usability;  
 Slack's API includes a response category for non-immediate items, which can be employed in the event of Ethereum requests.  

Data Flow:  

A new User enters a channel and sends a message to the bot.  

The bot sets up the users account in a wallet associating it to their slack ID.  

The user then receives a message from the bot confirming the new account has been set up and the user has seed funds in their account.  

The user also receives a message of instructions on how the tokens can be sent, earned, or spent  

The user interacts with posts in the channel and is rewarded tokens for their interactions  

The user can message the bot and receive a modal in order to select a transaction (send tokens to other users, purchase emoji nft’s, get account balance)  

The bot will communicate the users selection to the blockchain to get the desired transaction to run and return a confirmation message.  
