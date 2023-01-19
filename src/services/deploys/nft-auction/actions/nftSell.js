import {
  CLByteArray,
  CLKey,
  CLOption,
  CLPublicKey,
  CLString,
  CLTypeBuilder,
  CLU256,
  CLU32,
  CLU512,
  CLU64,
  CLValueBuilder,
  RuntimeArgs,
} from 'casper-js-sdk';
import { None, Some } from 'ts-results';
import NftSellResult from '../../../results/nft-auction/nftSellResult';
import AbstractSmartContractModuleBytesParameters from '../../abstractSmartContractModuleBytesParameters';

/**
 * @constant
 * @type {number}
 */
const fee = 200000000000;

/**
 * NftSell class
 * Class used to create DeployParameters for creating a NFT auction
 */
export default class NftSell extends AbstractSmartContractModuleBytesParameters {
  /**
   * Constructor
   *
   * @param {string} activeKey - Current active key in the public hex format
   * @param {string} beneficiaryAccount - Account who will receive the account winner bid
   * @param {string} tokenPackage - Contract package hex
   * @param {string} reservePrice - In CSPR
   * @param {string} tokenId
   * @param {string} startTime - Timestamp UTC format
   * @param {string} cancellationTime - Timestamp UTC format
   * @param {string} endTime - Timestamp UTC format
   * @param {string} bidderCountCap
   * @param {string} auctionTimerExtension - In seconds
   * @param {string} minimumBidStep
   * @param {string} marketplaceAccount - Public Key in the public hex format
   * @param {string} marketplaceCommission - In 1000th of the price
   * @param {string} network - Current network to execute the deployment
   * @param {string} hash - Current hash of the stored auction SmartContract
   * @param {Buffer} smartContractBuffer - Current hash of the stored SmartContract
   * @param {number} ttl - Deploy time to live in hours
   */
  constructor(
    activeKey,
    beneficiaryAccount,
    tokenPackage,
    reservePrice,
    tokenId,
    startTime,
    cancellationTime,
    endTime,
    bidderCountCap,
    auctionTimerExtension,
    minimumBidStep,
    marketplaceAccount,
    marketplaceCommission,
    network,
    hash,
    smartContractBuffer,
    ttl = 1,
  ) {
    const args = RuntimeArgs.fromMap({
      beneficiary_account: new CLKey(CLPublicKey.fromHex(beneficiaryAccount)),
      token_contract_hash: CLValueBuilder.key(
        CLValueBuilder.byteArray(
          Buffer.from(tokenPackage, 'hex'),
        ),
      ),
      format: new CLString('ENGLISH'),
      starting_price: new CLOption(
        None,
        CLTypeBuilder.u512(),
      ),
      reserve_price: new CLU512(reservePrice),
      token_id: new CLU256(tokenId),
      start_time: new CLU64(startTime),
      cancellation_time: new CLU64(cancellationTime),
      end_time: new CLU64(endTime),
      name: new CLString('testAuction'),
      bidder_count_cap: new CLOption(
        bidderCountCap !== '' ? Some(new CLU64(bidderCountCap)) : None,
        CLTypeBuilder.u64(),
      ),
      auction_timer_extension: new CLOption(
        auctionTimerExtension !== '' ? Some(new CLU64(auctionTimerExtension)) : None,
        CLTypeBuilder.u64(),
      ),
      minimum_bid_step: new CLOption(
        minimumBidStep !== '' ? Some(new CLU512(minimumBidStep)) : None,
        CLTypeBuilder.u512(),
      ),
      marketplace_account: new CLByteArray(
        Buffer.from(
          CLPublicKey.fromHex(marketplaceAccount)
            .toAccountRawHashStr(),
          'hex',
        ),
      ),
      marketplace_commission: new CLU32(marketplaceCommission),
    });
    super(activeKey, network, smartContractBuffer, args, fee, ttl);
  }

  /**
   * Get a DeployResult constructor
   *
   * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
   */
  // eslint-disable-next-line class-methods-use-this
  get deployResult() {
    return NftSellResult;
  }
}
