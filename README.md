# social-currency

A crypto currency that promotes social interaction and is utilized over slack

User Stories

1. As a user, I want the ability to set up a new account.
   Feature Tasks:

User can message a bot to set up an account
Bot will establish a new account for a new user and mint them seed funds.
Bot confirms the new account and the funds in it with a message to User.
Acceptance Tests:

Ensure the bot can read messages and respond
Ensure that the bot creates a new account with a unique id tied to the user(slackID)
Ensure correct seed funds are placed in new account
Provide error message and abort transaction if system becomes unavailable

2. As a user, I want the ability to check my personal account balance by asking the bot.
   Feature Tasks:

User may ask the bot for their account balance and receive it in a DM.
Acceptance Tests:

Ensure the bot can read messages and respond with a dm.
Ensure that the bot returns the correct account balance to the user.
Provide error message and abort transaction if system becomes unavailable

3. As a user, I want the ability to send tokens from my account to another user
   Feature Tasks:

User can message a bot to see possible account actions
User may select transfer funds from list of options
User specified amount is sent from the users account to the specified users account
Bot confirms the transaction with a message
Acceptance Tests:

Ensure the bot can read messages and respond with account actions list in a modal
Ensure that the bot takes the correct action from the users selection of the modal
Ensure correct funds are transferred from/to correct accounts
Provide error message and abort transaction if system becomes unavailable

4. As a user, I want the ability to use my tokens to purchase emojis
   Feature Tasks:

User can message a bot to see possible account actions
User may select an emoji/nft assigned a cost value off the bot modal
User specified amount is burned from the users account
Bot confirms the transaction with a message
User is now able to use emoji/have not
Acceptance Tests:

Ensure the bot can read messages and respond with account actions list modal
Ensure that the bot takes the correct action from the users selection of the list.
Ensure correct funds are burned from correct account
Ensure user who burned funds has emoji/nft access.
Provide error message and abort transaction if system becomes unavailable

5. As a User I want to be able to transfer my tokens to my personal Wallet.
   Feature Tasks:

User can message a bot to see possible account actions
User may select transfer to wallet
User specified amount is transferred from the users account to their personal wallet
Bot confirms the transaction with a message
User is now able to send tokens from their personal wallet
Acceptance Tests:

Ensure the bot can read messages and respond with account actions list modal
Ensure that the bot takes the correct action from the users selection of the list
Ensure correct funds are transferred from correct account to users wallet
Provide error message and abort transaction if system becomes unavailable

![Software Flowchart](/assets/overall-app-flowchart.png)  
[wireframe source:](https://lucid.app/lucidchart/333b6340-6f11-402e-a837-a9f03152e93e/edit?beaconFlowId=3878AF7CDA637A6F&invitationId=inv_99af0389-d745-4b35-b7ab-f161ef2865cc&page=ffgwUz0NcubW#)

Software Requirements:

Vision:
We wish to create a fun Slack app that incentivizes in-channel networking and bond-building among the Alchemy community, and to explore the possibilities of Ethereum based tokens as the foundation for said incentives.
Pain:

Social activity, especially when remote, can feel amorphous and difficult to take concrete things away from;
Blockchain-based currencies are difficult to access for the average user, typically requiring specialized software;
Why care:

Our product encourages both more social interaction among employees or stakeholders, and makes blockchains and cryptocurrencies more accessible. It gives the user a more customizable experience of the slack platform.

![UI Wireframe](/assets/wireframe-cropped.png)  
[wireframe source:](https://lucid.app/lucidchart/333b6340-6f11-402e-a837-a9f03152e93e/edit?beaconFlowId=3878AF7CDA637A6F&invitationId=inv_99af0389-d745-4b35-b7ab-f161ef2865cc&page=ffgwUz0NcubW#)

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
