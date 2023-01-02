import { CLU64, RuntimeArgs } from 'casper-js-sdk';
import { NftApproveResult } from '../../../results';
import AbstractSmartContractStoredByHashDeployParameters from '../../abstractSmartContractStoredByHashDeployParameters';

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'approve';

/**
 * @constant
 * @type {number}
 */
const fee = 1000000000;

/**
 * NftCEP78Approve class
 * Class used to create DeployParameters for an NFT Approve operation
 */
export default class NftCEP78Approve extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {number} tokenId - Token ID of the nft that will be approved
   * @param {CLKey} spender - CLKey of the spender
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live in hours
   */
  constructor(activeKey, tokenId, spender, network, hash, ttl = 1) {
    const args = RuntimeArgs.fromMap({
      spender,
      token_id: new CLU64(tokenId),
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
    return NftApproveResult;
  }
}
