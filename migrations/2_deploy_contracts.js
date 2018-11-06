
const Testing = artifacts.require("Testing.sol");


module.exports = function(deployer) {
  deployer.deploy(Testing);
};