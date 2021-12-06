import { CasperServiceByJsonRPC } from 'casper-js-sdk';
import {AbstractSigner} from "./abstractSigner";
import {SignError} from "../errors";

/**
 * TorusSigner class
 * Used to sign a deployment with TorusSigner
 */
export class TorusSigner extends AbstractSigner {
    /**
     * Sign a given Deploy Object with the corresponding public key.
     * You must pass the active public key from the user and the public key where the deploy is going to be used.
     *
     * @param {DeployUtil.Deploy} deploy - Deploy object
     * @param {Object} options - Options object
     * @param {string} options.torus - Public key that sign the deploy.
     * @returns {Promise<String>} - Deploy Hash
     */
    static async sign(deploy, options = {}) {
        try {
            const casperService = new CasperServiceByJsonRPC(options.torus?.provider);
            const res = await casperService.deploy(deploy);
            return res.deploy_hash;
        } catch (e) {
            console.log(e);
            throw new SignError();
        }
    }
}
