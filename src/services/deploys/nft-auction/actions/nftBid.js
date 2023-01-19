import {
  CLByteArray, CLString, CLU512, RuntimeArgs,
} from 'casper-js-sdk';
import NftBidResult from '../../../results/nft-auction/nftBidResult';
import AbstractSmartContractModuleBytesParameters from '../../abstractSmartContractModuleBytesParameters';

/**
 * @constant
 * @type {number}
 */
const fee = 27000000000;

/**
 * NftBid class
 * Class used to create DeployParameters for a Bid on a NFT auction
 */
export default class NftBid extends AbstractSmartContractModuleBytesParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {number} amount - Amount of the bid
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored auction SmartContract
   * @param {Buffer} smartContractBuffer - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live in hours
   */
  constructor(activeKey, amount, network, hash, smartContractBuffer, ttl = 1) {
    const args = RuntimeArgs.fromMap({
      amount: new CLU512(amount),
      auction_contract: new CLByteArray(
        Uint8Array.from(
          Buffer.from(hash, 'hex'),
        ),
      ),
      purse_name: new CLString('casperholders_auctions'),
    });
    super(activeKey, network, smartContractBuffer, args, fee, ttl);
  }

  /**
   * Get a DeployResult constructor
   *
   * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
   */
  // eslint-disable-next-line class-methods-use-this
  get deployResult() {
    return NftBidResult;
  }
}
