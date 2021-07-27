import {DeployResult} from "./deployResult";

/**
 * SmartContractResult class
 */
export class SmartContractResult extends DeployResult {
    /**
     * Constructor
     * @param {string} hash - DeployHash of the deployment
     */
    constructor(hash) {
        super(hash, SmartContractResult.getName())
    }

    /**
     * Retrieve the name of the operation behind the deployment
     *
     * @return {string} - the name of the operation behind the deployment
     */
    static getName() {
        return 'Smart Contract Operation'
    }
}