import { DeployUtil } from 'casper-js-sdk';

/**
 * AbstractSmartContractDeployParameters class
 * Abstract class used to define specifics DeployParameters
 */
export default class AbstractSmartContractDeployParameters {
  /**
   * Get the deployParams deploy argument
   *
   * @return {DeployUtil.DeployParams} - Return a DeployParams
   */
  // eslint-disable-next-line class-methods-use-this
  get deployParams() {
    throw new Error('You must implement this method');
  }

  /**
   * Get the session deploy argument
   *
   * @return {DeployUtil.ExecutableDeployItem} - Return a session with a SmartContract stored by hash on the network
   */
  // eslint-disable-next-line class-methods-use-this
  get session() {
    throw new Error('You must implement this method');
  }

  /**
   * Get the payment deploy argument
   *
   * @return {DeployUtil.ExecutableDeployItem} - Return a standard payment
   */
  // eslint-disable-next-line class-methods-use-this
  get payment() {
    throw new Error('You must implement this method');
  }

  /**
   * Get a DeployResult constructor
   *
   * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
   */
  // eslint-disable-next-line class-methods-use-this
  get deployResult() {
    throw new Error('You must implement this method');
  }

  /**
   * Create a unsigned Deploy object
   *
   * @return {Deploy} - Return a deploy object
   */
  get makeDeploy() {
    return DeployUtil.makeDeploy(this.deployParams, this.session, this.payment);
  }
}
