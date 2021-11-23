import {DeployUtil, Signer} from "casper-js-sdk";
import {AbstractSigner} from "./abstractSigner";
import {SignError} from "../errors";

/**
 * CasperSigner class
 * Used to sign a deployment with the Casper Signer extension
 */
export class CasperSigner extends AbstractSigner {
    /**
     * Sign a given Deploy Object with the corresponding public key.
     * You must pass the active public key from the user and the public key where the deploy is going to be used.
     *
     * @param {DeployUtil.Deploy} deploy - Deploy object
     * @param {Object} options - Options object
     * @param {string} options.activeKey - Public key of the user.
     * @param {string} options.to - Public key of the targeted wallet.
     * @returns {Promise<DeployUtil.Deploy>} - Signed deploy object
     */
    static async sign(deploy, options = {}) {
        try {
            const signedJsonDeploy = await Signer.sign(DeployUtil.deployToJson(deploy), options.activeKey, options.to);
            const signedDeploy = await DeployUtil.deployFromJson(signedJsonDeploy);
            if (signedDeploy.ok) {
                return signedDeploy.val;
            } else {
                throw signedDeploy.val;
            }
        } catch (e) {
            console.log(e);
            throw new SignError();
        }
    }
}
