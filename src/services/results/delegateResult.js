import {DeployResult} from "./deployResult";

/**
 * DelegateResult class
 */
export class DelegateResult extends DeployResult {
    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     */
    constructor(hash) {
        super(hash, DelegateResult.getName())
    }

    /**
     * Retrieve the name of the operation behind the deployment
     *
     * @return {string} - the name of the operation behind the deployment
     */
    static getName() {
        return 'Staking Operation'
    }
}