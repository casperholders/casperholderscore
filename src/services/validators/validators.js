import { CLPublicKey } from 'casper-js-sdk';
import { NoValidatorInfos } from '../errors/noValidatorInfos';

/**
 * Validators Class
 * Used to retrieve validator metadata
 */
export class Validators {

  /** @type {ClientCasper} */
  client;

  /**
   * Constructor
   *
   * @param {ClientCasper} client - Instance of CasperClient
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Retrieve validator metadata
   * @param {String} publicKey - Public key of the validator
   * @param {String} contractHash - Hash of the Account Info contract
   * @param {String} network - Name of the network to query
   * @throws NoValidatorInfos - If we can't retrieve the Validator infos this error is raised
   */
  async getValidatorInfo(publicKey, contractHash, network) {
    try {
      const url = (await this.getValidatorUrl(publicKey, contractHash, network)) + '/.well-known/casper/account-info.' + network + '.json';
      return await (await fetch(url)).json();
    } catch (e) {
      throw new NoValidatorInfos();
    }
  }

  /**
   * Retrieve validator url
   * @param {String} publicKey - Public key of the validator
   * @param {String} contractHash - Hash of the Account Info contract
   * @param {String} network - Name of the network to query
   * @throws NoValidatorInfos - If we can't retrieve the Validator infos this error is raised
   */
  async getValidatorUrl(publicKey, contractHash, network) {
    try {
      const clpublicKey = CLPublicKey.fromHex(publicKey);
      const accountHash = clpublicKey.toAccountHashStr().replace('account-hash-', '');
      const stateRootHash = await this.client.casperRPC.getStateRootHash((await this.client.casperRPC.getLatestBlockInfo()).block.hash);
      const dictURef = (await this.client.casperRPC.getBlockState(stateRootHash, 'hash-' + contractHash, [])).Contract.namedKeys.filter((item) => item.name === 'account-info-urls')[0].key;
      return (await this.client.casperRPC.getDictionaryItemByURef(stateRootHash, accountHash, dictURef)).CLValue.data;
    } catch (e) {
      throw new NoValidatorInfos();
    }
  }

  /**
   * Test if user have set url of their accounts
   * @param {String} publicKey - Public key of the validator
   * @param {String} contractHash - Hash of the Account Info contract
   * @param {String} network - Name of the network to query
   * @throws NoValidatorInfos - If we can't retrieve the Validator infos this error is raised
   */
  async isUrlSet(publicKey, contractHash, network) {
    try {
      return !!(await this.getValidatorUrl(publicKey, contractHash, network));
    } catch (e) {
      return false;
    }
  }
}