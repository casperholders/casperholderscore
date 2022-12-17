import { BigNumber } from '@ethersproject/bignumber';
import CurrencyUtils from '../helpers/currencyUtils';
import DeployResult from '../results/deployResult';

/**
 * DeployManager class
 * Used to handle the deploy process
 */
export default class DeployManager {
  /** @type {ClientCasper} */
  client;

  /**
   * Constructor
   *
   * @param {ClientCasper} client - ClientCasper object
   */
  constructor(client) {
    this.client = client;
  }

  /** *
   * Send a deployment to the network
   *
   * @param {Deploy} deploy - Signed Deploy object
   * @param deployResult - A DeployResult class
   * @returns {Promise<DeployResult>} - Return a DeployResult object
   */
  async sendDeploy(deploy, deployResult) {
    if (typeof deploy === 'string' || deploy instanceof String) {
      // eslint-disable-next-line new-cap
      return new deployResult(deploy);
    }
    const hash = await this.client.casperClient.putDeploy(deploy);
    let amount = '0';
    if (deploy.session.getArgByName('amount')) {
      amount = BigNumber.from(deploy.session.getArgByName('amount')
        .value()
        .toString());
    }
    let cost = '0';
    if (deploy.payment.getArgByName('amount')) {
      cost = CurrencyUtils.convertMotesToCasper(
        BigNumber.from(deploy.payment.getArgByName('amount')
          .value()
          .toString()),
      );
    }
    // eslint-disable-next-line new-cap
    return new deployResult(hash, cost, amount);
  }

  /**
   * Prepare, sign and send a deployment
   *
   * @param {AbstractSmartContractDeployParameters} deployParameter - Instance of a DeployParameters object
   * @param {AbstractSigner} signer - Instance of a Signer object
   * @param {Object} options - Generic object for additional parameters
   * @return {Promise<DeployResult>} - Return a DeployResult object
   */
  async prepareSignAndSendDeploy(deployParameter, signer, options) {
    const signedDeploy = await signer.sign(deployParameter.makeDeploy, options);
    return this.sendDeploy(signedDeploy, deployParameter.deployResult);
  }

  /**
   * Update a DeployResult object
   *
   * @param {DeployResult} deployResult - DeployResult object
   * @returns {Promise<DeployResult>} - Return an updated DeployResult object
   */
  async getDeployResult(deployResult) {
    const result = await this.client.casperClient.getDeploy(deployResult.hash);
    const deploy = result[0];
    let execResult = result[1].execution_results;
    if (execResult.length > 0) {
      execResult = execResult[0].result;
    }
    /* eslint-disable no-param-reassign */
    if (deploy.session.getArgByName('amount')) {
      deployResult.amount = CurrencyUtils.convertMotesToCasper(BigNumber.from(deploy.session.getArgByName('amount')
        .value()
        .toString()));
    }
    if (DeployResult.STATUS_OK in execResult) {
      deployResult.cost = CurrencyUtils.convertMotesToCasper(BigNumber.from(execResult[DeployResult.STATUS_OK].cost));
      deployResult.status = DeployResult.STATUS_OK;
      return deployResult;
    }
    if (DeployResult.STATUS_KO in execResult) {
      deployResult.cost = CurrencyUtils.convertMotesToCasper(BigNumber.from(execResult[DeployResult.STATUS_KO].cost));
      deployResult.status = DeployResult.STATUS_KO;
      deployResult.message = execResult[DeployResult.STATUS_KO].error_message;
    }
    /* eslint-enable no-param-reassign */
    return deployResult;
  }
}
