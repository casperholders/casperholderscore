import {DeployResult} from "./deployResult";

/**
 * AddBidResult class
 */
export class AddBidResult extends DeployResult {
    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     */
    constructor(hash) {
        super(hash, AddBidResult.getName())
    }

    /**
     * Retrieve the name of the operation behind the deployment
     *
     * @return {string} - the name of the operation behind the deployment
     */
    static getName() {
        return 'Add bid Operation'
    }
}