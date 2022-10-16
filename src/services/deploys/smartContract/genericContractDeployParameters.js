import { RuntimeArgs } from 'casper-js-sdk';
import CurrencyUtils from '../../helpers/currencyUtils';
import SmartContractResult from '../../results/smartContractResult';
import AbstractSmartContractStoredByHashDeployParameters from '../abstractSmartContractStoredByHashDeployParameters';

/**
 * GenericContractDeployParameters class
 * Class used to define the parameters of a generic deployment to send on the network
 */
export default class GenericContractDeployParameters extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} network - Current network to execute the deployment
   * @param {string} contractHash - SmartContract hash
   * @param {string} entrypoint - SmartContract entrypoint
   * @param {string} fee - Runtime fee for the given SmartContract operation
   * @param {object} args
   * @param {number} ttl - Deploy time to live  in hours
   */
  constructor(activeKey, network, contractHash, entrypoint, fee, args = {}, ttl = 1) {
    super(
      activeKey,
      network,
      contractHash,
      entrypoint,
      RuntimeArgs.fromMap(args),
      CurrencyUtils.convertCasperToMotes(fee),
      ttl,
    );
  }

  /**
   * Get a DeployResult constructor
   *
   * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
   */
  // eslint-disable-next-line class-methods-use-this
  get deployResult() {
    return SmartContractResult;
  }
}
