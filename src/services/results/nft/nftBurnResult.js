import DeployResult from '../deployResult';

/**
 * NftBurnResult class
 */
export default class NftBurnResult extends DeployResult {
  /**
   * Constructor
   *
   * @param {string} hash - DeployHash of the deployment
   * @param {string} cost - optional cost
   * @param {string} amount - optional amount
   */
  constructor(hash, cost = '0', amount = '0') {
    super(hash, NftBurnResult.getName(), cost, amount);
  }

  /**
   * Retrieve the name of the operation behind the deployment
   *
   * @return {string} - the name of the operation behind the deployment
   */
  static getName() {
    return 'Nft Burn Operation';
  }
}
