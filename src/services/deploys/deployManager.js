import {CurrencyUtils} from "../helpers";
import {STATUS_KO, STATUS_OK} from "../results";
import { BigNumber } from '@ethersproject/bignumber';


/**
 * DeployManager class
 * Used to handle the deploy process
 */
export class DeployManager {
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

    /***
     * Send a deployment to the network
     *
     * @param {Deploy} deploy - Signed Deploy object
     * @param deployResult - A DeployResult class
     * @returns {Promise<DeployResult>} - Return a DeployResult object
     */
    async sendDeploy(deploy, deployResult) {
        const hash = await this.client.casperClient.putDeploy(deploy)
        return new deployResult(hash)
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
        return await this.sendDeploy(signedDeploy, deployParameter.deployResult);
    }

    /**
     * Update a DeployResult object
     *
     * @param {DeployResult} deployResult - DeployResult object
     * @returns {Promise<DeployResult>} - Return an updated DeployResult object
     */
    async getDeployResult(deployResult) {
        const result = await this.client.casperClient.getDeploy(deployResult.hash)
        let deploy = result[0]
        let execResult = result[1].execution_results
        if (execResult.length > 0) {
            execResult = execResult[0].result;
        }
        if (deploy.session.getArgByName("amount")) {
            deployResult.amount = CurrencyUtils.convertMotesToCasper(BigNumber.from(deploy.session.getArgByName("amount").value().toString()))
        }
        if (STATUS_OK in execResult) {
            deployResult.cost = CurrencyUtils.convertMotesToCasper(BigNumber.from(execResult[STATUS_OK].cost))
            deployResult.status = STATUS_OK
            return deployResult
        }
        if (STATUS_KO in execResult) {
            deployResult.cost = CurrencyUtils.convertMotesToCasper(BigNumber.from(execResult[STATUS_KO].cost))
            deployResult.status = STATUS_KO
            deployResult.message = execResult[STATUS_KO].error_message
        }
        return deployResult;
    }

}
