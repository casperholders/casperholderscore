import { CLPublicKey, DeployUtil } from 'casper-js-sdk';
import AbstractSmartContractDeployParameters from './abstractSmartContractDeployParameters';

/**
 * AbstractSmartContractStoredByHashDeployParameters class
 * Abstract class used to defined specific DeployParameters for SmartContracts stored by hash on the network
 */
export default class AbstractSmartContractStoredByHashDeployParameters extends AbstractSmartContractDeployParameters {
  /** @type {string} */
  activeKey;

  /** @type {string} */
  network;

  /** @type {string} */
  hash;

  /** @type {string} */
  entrypoint;

  /** @type {DeployUtil.RuntimeArgs} */
  args;

  /** @type {number} */
  fee;

  /** @type {number} */
  ttl;

  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored SmartContract
   * @param {string} entrypoint - Entrypoint of the SmartContract
   * @param {DeployUtil.RuntimeArgs} args - Arguments of the SmartContract
   * @param {number} fee - Runtime fee for the given SmartContract operation
   * @param {number} ttl - Deploy time to live  in hours
   */
  constructor(activeKey, network, hash, entrypoint, args, fee, ttl = 1) {
    super();
    this.activeKey = activeKey;
    this.network = network;
    this.hash = hash;
    this.entrypoint = entrypoint;
    this.args = args;
    this.fee = fee;
    this.ttl = ttl * 3600000;
  }

  /**
   * Get the deployParams deploy argument
   *
   * @return {DeployUtil.DeployParams} - Return a DeployParams
   */
  get deployParams() {
    return new DeployUtil.DeployParams(
      CLPublicKey.fromHex(this.activeKey),
      this.network,
      1,
      this.ttl,
    );
  }

  /**
   * Get the session deploy argument
   *
   * @return {DeployUtil.ExecutableDeployItem} - Return a session with a SmartContract stored by hash on the network
   */
  get session() {
    return DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      Uint8Array.from(Buffer.from(this.hash, 'hex')),
      this.entrypoint,
      this.args,
    );
  }

  /**
   * Get the payment deploy argument
   *
   * @return {DeployUtil.ExecutableDeployItem} - Return a standard payment
   */
  get payment() {
    return DeployUtil.standardPayment(this.fee);
  }
}
