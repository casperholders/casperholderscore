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
   * @param {ClientCasper} clientCasper - Used to calculate fee
   * @param {string} url - Base url to a website that host the account info file. See https://github.com/make-software/casper-account-info-standard#how-does-it-work
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   */
  constructor(clientCasper, url, activeKey, network, hash) {
    const validatorService = new Validators(clientCasper);
    const fee = validatorService.isUrlSet(activeKey, hash, network) ? 500000000 : 10000000000
    const args = RuntimeArgs.fromMap({
      url: new CLString(url),
    });
    super(activeKey, network, hash, entrypoint, args, fee);
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