require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(process.env.ROPSTEN_URL);
const slackerToken = require("../../build/contracts/SlackerToken.json");
const ABI = slackerToken.abi;
console.log(ABI);

const contractAddress = "0x53cf6121D1F597c45D381c19213066be354224Dc";
const bankroll = "0x7Df34f05F8D55f1E4D51BCb1CDBe6eB0c31Fd911";

const token = new web3.eth.Contract(ABI, contractAddress, {
  from: bankroll,
});

const transferTokens = async (fromAddress, toAddress, amount) => {
  console.log("from", fromAddress);
  console.log("to", toAddress);
  const payload = await token.methods
    .transferFrom(fromAddress, toAddress, amount)
    .send({ from: bankroll }, function (error, transactionHash) {
      console.log(error);
      return error, transactionHash;
    });
  console.log("amount", amount);
  console.log("payload:", payload);
  return payload;
};

module.exports = {
  transferTokens,
};
