import {DeployResult} from "./deployResult";

/**
 * AccountInfoResult class
 */
export class AccountInfoResult extends DeployResult {
    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     */
    constructor(hash) {
        super(hash, AccountInfoResult.getName())
    }

    /**
     * Retrieve the name of the operation behind the deployment
     *
     * @return {string} - the name of the operation behind the deployment
     */
    static getName() {
        return 'Account Info Operation'
    }
}