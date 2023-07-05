import { signDeploy } from 'casper-manager-helper';
import SignError from '../errors/signError';
import AbstractSigner from './abstractSigner';

export default class MetaMaskSigner extends AbstractSigner {
  /**
   * Sign a given Deploy Object with the corresponding public key.
   * You must pass the active public key from the user and the public key
   * where the deploy is going to be used.
   *
   * @param {Deploy} deploy - Deploy object
   * @param {Object} options - Options object
   * @param {string} options.snapID - ID of the MetaMask Casper Snap.
   * @param {string} options.addressIndex - Index of the address.
   * @param {string} options.publicKey - Public key that sign the deploy.
   * @param {string} options.signingTxnText - Message explanation for the user displayed in MetaMask
   * @returns {Promise<DeployUtil.Deploy>} - Signed deploy object
   */
  static async sign(deploy, options = {}) {
    try {
      return signDeploy(deploy, options);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw new SignError();
    }
  }
}
