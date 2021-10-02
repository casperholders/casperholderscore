import { CLPublicKey } from 'casper-js-sdk';
import { NoValidatorInfos } from '../errors/noValidatorInfos';

/**
 * Validators Class
 * Used to retrieve validator metadata
 */
export class Validators {

  /** @type {ClientCasper} */
  client;

  /** @type {Boolean} */
  fetching = false;

  /** @type {Number} */
  lastFetch = 0;

  /** @type {String} */
  stateRootHash;

  /** @type {string} */
  dictUref;

  /** @type {Number} */
  CACHE_TIMEOUT = 60;

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
      await this.getDictUref(contractHash);
      return (await this.client.casperRPC.getDictionaryItemByURef(this.stateRootHash, accountHash, this.dictUref)).CLValue.data;
    } catch (e) {
      throw new NoValidatorInfos();
    }
  }

  /**
   * Update cached stateroothash & dicturef to optimize call to the blockchain for mass request.
   * @param contractHash
   * @returns {Promise<void>}
   */
  async getDictUref(contractHash) {
    if (!this.fetching && (this.lastFetch === 0 || (Math.floor(Date.now() / 1000)) - this.lastFetch > this.CACHE_TIMEOUT)) {
      this.fetching = true;
      this.stateRootHash = await this.client.casperRPC.getStateRootHash((await this.client.casperRPC.getLatestBlockInfo()).block.hash);
      this.dictUref = (await this.client.casperRPC.getBlockState(this.stateRootHash, 'hash-' + contractHash, [])).Contract.namedKeys.filter((item) => item.name === 'account-info-urls')[0].key;
      this.lastFetch = Math.floor(Date.now() / 1000);
      this.fetching = false;
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