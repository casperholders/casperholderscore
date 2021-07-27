import {DeployResult} from "./deployResult";

/**
 * TransferResult class
 */
export class TransferResult extends DeployResult {
    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     */
    constructor(hash) {
        super(hash, TransferResult.getName())
    }

    /**
     * Retrieve the name of the operation behind the deployment
     *
     * @return {string} - the name of the operation behind the deployment
     */
    static getName() {
        return 'Transfer Operation'
    }
}