import {
  CLKey, CLList, CLPublicKey,
  CLU256, RuntimeArgs,
} from 'casper-js-sdk';
import { NftTransferResult } from '../../../results';
import AbstractSmartContractStoredByHashDeployParameters
  from '../../abstractSmartContractStoredByHashDeployParameters';

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'transfer';

/**
 * @constant
 * @type {number}
 */
const fee = 1000000000;

/**
 * NftTransfer class
 * Class used to create DeployParameters for an NFT Transfer operation
 */
export default class NftTransfer extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {number} tokenId - Token ID of the nft that will be transferred
   * @param {string} recipient - Public key hex of the recipient
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live in hours
   */
  constructor(activeKey, tokenId, recipient, network, hash, ttl = 1) {
    const args = RuntimeArgs.fromMap({
      recipient: new CLKey(CLPublicKey.fromHex(recipient)),
      token_ids: new CLList([new CLU256(tokenId)]),
    });
    super(activeKey, network, hash, entrypoint, args, fee, ttl);
  }

  /**
   * Get a DeployResult constructor
   *
   * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
   */
  // eslint-disable-next-line class-methods-use-this
  get deployResult() {
    return NftTransferResult;
  }
}
