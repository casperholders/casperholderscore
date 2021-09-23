import { CLString, RuntimeArgs } from 'casper-js-sdk';
import { AccountInfoResult } from '../../results';
import { Validators } from '../../validators';
import { AbstractSmartContractStoredByHashDeployParameters } from '../abstractSmartContractStoredByHashDeployParameters';

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'set_url';

/**
 * AccountInfo class
 * Class used to create DeployParameters for a AccountInfo set_url operation
 */
export class AccountInfo extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} url - Base url to a website that host the account info file. See https://github.com/make-software/casper-account-info-standard#how-does-it-work
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   */
  constructor(url, activeKey, network, hash) {
    const args = RuntimeArgs.fromMap({
      url: new CLString(url),
    });
    super(activeKey, network, hash, entrypoint, args, 0);
  }

  /**
   * Set correct fee
   * @param {ClientCasper} clientCasper
   * @returns {Promise<void>}
   */
  async init(clientCasper){
    const validatorService = new Validators(clientCasper);
    super.fee = await validatorService.isUrlSet(super.activeKey, super.hash, super.network) ? 500000000 : 10000000000
  }

  /**
   * Get a DeployResult constructor
   *
   * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
   */
  get deployResult() {
    return AccountInfoResult;
  }
}