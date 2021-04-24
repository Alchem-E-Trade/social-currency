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
[flowchart source:](https://lucid.app/lucidchart/333b6340-6f11-402e-a837-a9f03152e93e/edit?beaconFlowId=3878AF7CDA637A6F&invitationId=inv_99af0389-d745-4b35-b7ab-f161ef2865cc&page=0_0#)  

![UI Wireframe](/assets/wireframe-cropped.png)  
[wireframe source:](https://lucid.app/lucidchart/333b6340-6f11-402e-a837-a9f03152e93e/edit?beaconFlowId=3878AF7CDA637A6F&invitationId=inv_99af0389-d745-4b35-b7ab-f161ef2865cc&page=ffgwUz0NcubW#)  
