import { CLPublicKey, DeployUtil } from 'casper-js-sdk';
import {AbstractSigner} from "./abstractSigner";
import {SignError} from "../errors";

/**
 * LedgerSigner class
 * Used to sign a deployment with Ledger
 */
export class LedgerSigner extends AbstractSigner {
    /**
     * Sign a given Deploy Object with the corresponding public key.
     * You must pass the active public key from the user and the public key where the deploy is going to be used.
     *
     * @param {DeployUtil.Deploy} deploy - Deploy object
     * @param {Object} options - Options object
     * @param {CasperApp} options.app - CasperApp instance.
     * @param {string} options.publicKey - Public key that sign the deploy.
     * @returns {Promise<DeployUtil.Deploy>} - Signed deploy object
     */
    static async sign(deploy, options = {}) {
        try {
            const responseDeploy = await options.app.sign('m/44\'/506\'/0\'/0/0', DeployUtil.deployToBytes(deploy));
            let signedDeploy = DeployUtil.setSignature(
              deploy,
              responseDeploy.signatureRS,
              CLPublicKey.fromHex(options.publicKey),
            );
            signedDeploy = DeployUtil.validateDeploy(signedDeploy);
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
