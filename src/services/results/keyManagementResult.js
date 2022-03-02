import {DeployResult} from "./deployResult";

/**
 * KeyManagementResult class
 */
export class KeyManagementResult extends DeployResult {
    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     */
    constructor(hash) {
        super(hash, KeyManagementResult.getName())
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