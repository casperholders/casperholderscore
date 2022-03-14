import {DeployResult} from "./deployResult";

/**
 * KeyManagementResult class
 */
export class KeyManagementResult extends DeployResult {
    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     * @param {string} cost - optional cost
     * @param {string} amount - optional amount
     */
    constructor(hash, cost = '0', amount= '0') {
        super(hash, KeyManagementResult.getName(), cost, amount)
    }

    /**
     * Retrieve the name of the operation behind the deployment
     *
     * @return {string} - the name of the operation behind the deployment
     */
    static getName() {
        return 'Key Management Operation'
    }
}