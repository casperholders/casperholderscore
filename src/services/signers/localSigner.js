import {DeployUtil} from "casper-js-sdk";
import {SignError} from "../errors";
import {AbstractSigner} from "./abstractSigner";

/**
 * LocalSigner class
 * Used to sign a deployment with local keys
 */
export class LocalSigner extends AbstractSigner {
    /**
     * Sign a given Deploy Object with the corresponding key.
     *
     * @param {DeployUtil.Deploy} deploy - Deploy object
     * @param {Object} options - Options object. Must contains the AsymmetricKey object in the key property
     * @returns {Promise<DeployUtil.Deploy>} - Signed deploy object
     */
    static async sign(deploy, options = {}) {
        try {
            return await DeployUtil.signDeploy(deploy, options.key)
        } catch (e) {
            console.log(e);
            throw new SignError();
        }
    }
}