/**
 * @typedef {import("casper-js-sdk").DeployUtil.Deploy} Deploy
 */

/**
 * AbstractSigner class
 * Abstract class used as a skeleton to implement deployment signing.
 */
export class AbstractSigner {
    /**
     * Abstract method to sign a deployment.
     *
     * @param {Deploy} deploy - Deploy object
     * @param {Object} options - Generic options object used to pass additional arguments needed for the different signing methods
     * @return {Promise<Deploy>} - Signed deploy object
     */
    static async sign(deploy, options = {}) {
        throw new Error('You must implement this function');
    }
}