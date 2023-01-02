import { CLU64, RuntimeArgs } from 'casper-js-sdk';
import { NftBurnResult } from '../../../results';
import AbstractSmartContractStoredByHashDeployParameters from '../../abstractSmartContractStoredByHashDeployParameters';

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'burn';

/**
 * @constant
 * @type {number}
 */
const fee = 1000000000;

/**
 * NftCEP78Burn class
 * Class used to create DeployParameters for an NFT Burn operation
 */
export default class NftCEP78Burn extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {number} tokenId - Token ID of the nft that will be burned
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live in hours
   */
  constructor(activeKey, tokenId, network, hash, ttl = 1) {
    const args = RuntimeArgs.fromMap({
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
    return NftBurnResult;
  }
}
