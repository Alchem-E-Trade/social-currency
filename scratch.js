web3.eth.getBalance(address [, defaultBlock] [, callback])

web3.eth.getAccounts([callback])

web3.eth.getGasPrice([callback])

// if no default set on account creation
web3.eth.defaultAccount

web3.eth.getTransaction(transactionHash [, callback])
web3.eth.getTransactionReceipt(hash [, callback])

web3.eth.sendTransaction(transactionObject [, callback])

web3.eth.sendSignedTransaction(signedTransactionData [, callback])

web3.eth.signTransaction(transactionObject, address [, callback])

web3.eth.estimateGas(callObject [, callback])
// Executes a message call or transaction and returns the amount of the gas used.

// Parameters
// Object - A transaction object see web3.eth.sendTransaction, with the difference that for calls the from property is optional as well.
// Function - (optional) Optional callback, returns an error object as first parameter and the result as second.

