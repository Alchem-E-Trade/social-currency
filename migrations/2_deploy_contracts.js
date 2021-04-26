const SlackerToken = artifacts.require("SlackerToken");
const SafeMath = artifacts.require("SafeMath");

module.exports = function (deployer) {
  deployer.deploy(SafeMath);

  deployer.link(SafeMath, SlackerToken);
  deployer.deploy(SlackerToken, 1000000);
};
