import {DeployResult} from "./deployResult";

/**
 * WithdrawBidResult class
 */
export class WithdrawBidResult extends DeployResult {
    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     */
    constructor(hash) {
        super(hash, WithdrawBidResult.getName())
    }

    /**
     * Retrieve the name of the operation behind the deployment
     *
     * @return {string} - the name of the operation behind the deployment
     */
    static getName() {
        return 'Withdraw bid Operation'
    }
}