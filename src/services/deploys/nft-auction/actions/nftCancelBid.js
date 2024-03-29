import {
  RuntimeArgs,
} from 'casper-js-sdk';
import { NftCancelBidResult } from '../../../results';
import AbstractSmartContractStoredByHashDeployParameters from '../../abstractSmartContractStoredByHashDeployParameters';

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'cancel_bid';

/**
 * @constant
 * @type {number}
 */
const fee = 15000000000;

/**
 * NftCancelBid class
 * Class used to create DeployParameters for cancelling a bid on an NFT Auction
 */
export default class NftCancelBid extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live in hours
   */
  constructor(activeKey, network, hash, ttl = 1) {
    const args = RuntimeArgs.fromMap({});
    super(activeKey, network, hash, entrypoint, args, fee, ttl);
  }

  /**
   * Get a DeployResult constructor
   *
   * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
   */
  // eslint-disable-next-line class-methods-use-this
  get deployResult() {
    return NftCancelBidResult;
  }
}
