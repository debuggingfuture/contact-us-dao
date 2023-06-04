// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

import {MarketAPI} from '@zondax/filecoin-solidity/contracts/v0.8/MarketAPI.sol';
import {CommonTypes} from '@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol';
import {MarketTypes} from '@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol';
import {AccountTypes} from '@zondax/filecoin-solidity/contracts/v0.8/types/AccountTypes.sol';
import {CommonTypes} from '@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol';
import {AccountCBOR} from '@zondax/filecoin-solidity/contracts/v0.8/cbor/AccountCbor.sol';
import {MarketCBOR} from '@zondax/filecoin-solidity/contracts/v0.8/cbor/MarketCbor.sol';
import {BytesCBOR} from '@zondax/filecoin-solidity/contracts/v0.8/cbor/BytesCbor.sol';
import {BigNumbers, BigNumber} from '@zondax/solidity-bignumber/src/BigNumbers.sol';
import {BigInts} from '@zondax/filecoin-solidity/contracts/v0.8/utils/BigInts.sol';
import {CBOR} from 'solidity-cborutils/contracts/CBOR.sol';
import {Misc} from '@zondax/filecoin-solidity/contracts/v0.8/utils/Misc.sol';
import {FilAddresses} from '@zondax/filecoin-solidity/contracts/v0.8/utils/FilAddresses.sol';

contract Stamp is Ownable {
    string private content;

    event ContentChanged(string newValue);

    function stampWithContentUri(string memory newValue) public onlyOwner {
        content = newValue;
        emit ContentChanged(newValue);
    }

    // // addBalance funds the builtin storage market actor's escrow
    // // with funds from the contract's own balance
    // // @value - amount to be added in escrow in attoFIL
    // function addBalance(uint256 value) public onlyOwner {
    //     MarketAPI.addBalance(FilAddresses.fromEthAddress(address(this)), value);
    // }

    // // This function attempts to withdraw the specified amount from the contract addr's escrow balance
    // // If less than the given amount is available, the full escrow balance is withdrawn
    // // @client - Eth address where the balance is withdrawn to. This can be the contract address or an external address
    // // @value - amount to be withdrawn in escrow in attoFIL
    // function withdrawBalance(
    //     address client,
    //     uint256 value
    // ) public onlyOwner returns (uint) {
    //     MarketTypes.WithdrawBalanceParams memory params = MarketTypes
    //         .WithdrawBalanceParams(
    //             FilAddresses.fromEthAddress(client),
    //             BigInts.fromUint256(value)
    //         );
    //     CommonTypes.BigInt memory ret = MarketAPI.withdrawBalance(params);

    //     (uint256 withdrawBalanceAmount, bool withdrawBalanceConverted) = BigInts
    //         .toUint256(ret);
    //     require(
    //         withdrawBalanceConverted,
    //         'Problems converting withdraw balance into Big Int, may cause an overflow'
    //     );

    //     return withdrawBalanceAmount;
    // }

    function retrieve() public view returns (string memory) {
        return content;
    }
}
