import { CLString, RuntimeArgs } from 'casper-js-sdk';
import AccountInfoResult from '../../results/accountInfoResult';
import Validators from '../../validators/validators';
import AbstractSmartContractStoredByHashDeployParameters from '../abstractSmartContractStoredByHashDeployParameters';

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'set_url';

/**
 * AccountInfo class
 * Class used to create DeployParameters for a AccountInfo set_url operation
 */
export default class AccountInfo extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} url - Base url to a website that host the account info file.
   * See https://github.com/make-software/casper-account-info-standard#how-does-it-work
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live  in hours
   */
  constructor(url, activeKey, network, hash, ttl = 1) {
    const args = RuntimeArgs.fromMap({
      url: new CLString(url),
    });
    super(activeKey, network, hash, entrypoint, args, 0, ttl);
  }

  /**
   * Set correct fee
   * @param {ClientCasper} clientCasper
   * @returns {Promise<void>}
   */
  async init(clientCasper) {
    const validatorService = new Validators(clientCasper);
    super.fee = await validatorService.isUrlSet(super.activeKey, super.hash) ? 500000000 : 10000000000;
  }

  /**
   * Get a DeployResult constructor
   *
   * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
   */
  // eslint-disable-next-line class-methods-use-this
  get deployResult() {
    return AccountInfoResult;
  }
}
