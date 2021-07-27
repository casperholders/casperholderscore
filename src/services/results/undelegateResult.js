import {DeployResult} from "./deployResult";

/**
 * UndelegateResult class
 */
export class UndelegateResult extends DeployResult {
    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     */
    constructor(hash) {
        super(hash, UndelegateResult.getName())
    }

    /**
     * Retrieve the name of the operation behind the deployment
     *
     * @return {string} - the name of the operation behind the deployment
     */
    static getName() {
        return 'Unstake Operation'
    }
}