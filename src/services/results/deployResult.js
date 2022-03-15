import Big from 'big.js';

/**
 * DeployResult class
 * Object used to keep the track of a deploy result.
 */
export default class DeployResult {
  /**
   * @constant
   * @type {string}
   */
  static STATUS_UNKNOWN = 'Unknown';

  /**
   * @constant
   * @type {string}
   */
  static STATUS_OK = 'Success';

  /**
   * @constant
   * @type {string}
   */
  static STATUS_KO = 'Failure';

  /** @type {string} */
  hash;

  /** @type {string} */
  cost;

  /** @type {string} */
  status;

  /** @type {string} */
  message;

  /** @type {string} */
  amount;

  /** @type {string} */
  name;

  /**
   * Constructor
   *
   * @param {string} hash - DeployHash of the deployment
   * @param {string} name - Name of the operation
   * @param {string} cost - optional cost
   * @param {string} amount - optional amount
   */
  constructor(hash, name, cost = '0', amount = '0') {
    this.hash = hash;
    this.cost = Big(cost)
      .toString();
    this.status = DeployResult.STATUS_UNKNOWN;
    this.message = '';
    this.amount = Big(amount)
      .toString();
    this.name = name;
  }

  /**
   * Retrieve the name of the operation behind the deployment
   * Must return the name of the operation behind the deployment
   */
  static getName() {
    throw new Error('You must implement this method');
  }
}
