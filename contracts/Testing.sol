pragma solidity ^0.4.0;

contract Testing {
    constructor() public {

    }

    function getTime() public returns (uint) {
        return now;
    }

    function checkHash(
        address makerAddress, uint makerAmount, address makerToken,
        address takerAddress, uint takerAmount, address takerToken,
        uint256 expiration, uint256 nonce, uint8 v, bytes32 r, bytes32 s) external view returns (bool) {

        // Hash arguments to identify the order.
        bytes32 hashV = keccak256(makerAddress, makerAmount, makerToken,
            takerAddress, takerAmount, takerToken,
            expiration, nonce);

        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = sha3(prefix, hashV);

        return ecrecover(prefixedHash, v, r, s) == makerAddress;
    }
}
