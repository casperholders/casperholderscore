import {
  CLU256, RuntimeArgs,
} from 'casper-js-sdk';
import Erc20ApproveResult from '../../../results/erc20/erc20ApproveResult';
import AbstractSmartContractStoredByHashDeployParameters
  from '../../abstractSmartContractStoredByHashDeployParameters';

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'approve';

/**
 * @constant
 * @type {number}
 */
const fee = 2000000000;

/**
 * Erc20Approve class
 * Class used to create DeployParameters for an ERC20 Approve operation
 */
export default class Erc20Approve extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} amount - Amount of tokens that will be allowed to transfer
   * @param {CLKey} spender - CLKey of the spender
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live in hours
   */
  constructor(activeKey, amount, spender, network, hash, ttl = 1) {
    const args = RuntimeArgs.fromMap({
      spender,
      amount: new CLU256(amount),
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
    return Erc20ApproveResult;
  }
}
