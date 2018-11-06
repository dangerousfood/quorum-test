const util = require("ethereumjs-util");
const ABI = require('ethereumjs-abi');
const sign = require('./util.js');

const Testing = artifacts.require("Testing");

contract('Testing', accounts => {

  let maker = accounts[0]
  let taker = accounts[1]

  it("test checkHash method", async () => {

    const testing = await Testing.deployed();
    //console.log(testing);

    // Order parameters.
    let makerAddress = maker;
    let makerAmount = 10;
    let makerToken = '0xe64678d757ef929a21d330aad580a878af255825';
    let takerAddress = '0xf5a0116774853499f3bb657b999b55428464b6f5';
    let takerAmount = 10;
    let takerToken = '0xfaccd1a56ba693045a219340c655142197eaa8d7';
    let expiration = '4695487161760460328';
    let nonce = 41;

    /*sign.getSignature(makerAddress, makerAmount, makerToken, takerAddress, takerAmount, takerToken, expiration, nonce).then(result => {
          console.log(result);
          done();
    });*/
    
    // Message hash for signing.
    let message = makerAddress + makerAmount + makerToken +
      takerAddress + takerAmount + takerToken + expiration + nonce;

    const args = [makerAddress, makerAmount, makerToken,
      takerAddress, takerAmount, takerToken, expiration, nonce];
    const argTypes = ['address', 'uint', 'address', 'address',
      'uint', 'address', 'uint256', 'uint256'];
    const msg = ABI.soliditySHA3(argTypes, args);

    const sig = web3.eth.sign(makerAddress, util.bufferToHex(msg));
    const { v, r, s } = util.fromRpcSig(sig);
    // console.log('sig', sig);
    // console.log('v', v, 'r', r, 's', s);
    // console.log('rBuffer', util.bufferToHex(r), 'sBuffer', util.bufferToHex(s));
    // console.log('expiration', expiration);

    /*console.log(makerAddress, makerAmount, makerToken,
      takerAddress, takerAmount, takerToken,
      expiration, nonce, v, util.bufferToHex(r), util.bufferToHex(s));*/
    //console.log(testing.checkHash);
    //makerToken = '0x0';
    const result = await testing.checkHash(makerAddress, makerAmount, makerToken,
      takerAddress, takerAmount, takerToken,
      expiration, nonce, v, util.bufferToHex(r), util.bufferToHex(s), {
        from: takerAddress,
        gasLimit: web3.toHex(200000),
        gasPrice: web3.eth.gasPrice
      })
    assert.equal(result, true, `the signature was not validated \nResult: ${result}\n`);
  });
  
});
