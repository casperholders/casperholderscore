import {
  CLKey, CLPublicKey, CLU256, RuntimeArgs,
} from 'casper-js-sdk';
import Erc20TransferResult from '../../../results/erc20/erc20TransferResult';
import AbstractSmartContractStoredByHashDeployParameters from '../../abstractSmartContractStoredByHashDeployParameters';

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'transfer';

/**
 * @constant
 * @type {number}
 */
const fee = 2000000000;

/**
 * Erc20Transfer class
 * Class used to create DeployParameters for an ERC20 Transfer operation
 */
export default class Erc20Transfer extends AbstractSmartContractStoredByHashDeployParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} amount - Amount of tokens that will be transferred
   * @param {string} recipient - Public key in the hex format of the recipient
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live in hours
   */
  constructor(activeKey, amount, recipient, network, hash, ttl = 1) {
    const args = RuntimeArgs.fromMap({
      recipient: new CLKey(CLPublicKey.fromHex(recipient)),
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
    return Erc20TransferResult;
  }
}
