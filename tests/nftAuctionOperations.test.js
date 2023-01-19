import { DeployUtil } from 'casper-js-sdk';
import {
  NftBid, NftCancelAuction, NftCancelBid, NftFinalize, NftSell,
} from '../src';

test('NFT Bid Operation', async () => {
  const nftBidDeployParameters = new NftBid(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    '1',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
    Buffer.from(''),
  );
  const deploy = nftBidDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('NFT Cancel Auction Operation', async () => {
  const nftCancelAuctionDeployParameters = new NftCancelAuction(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftCancelAuctionDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('NFT Cancel Bid Operation', async () => {
  const nftCancelBidDeployParameters = new NftCancelBid(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftCancelBidDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('NFT Finalize bid Operation', async () => {
  const nftFinalizeDeployParameters = new NftFinalize(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftFinalizeDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('NFT Sell Operation', async () => {
  const nftSellDeployParameters = new NftSell(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    '1',
    '1',
    '1',
    '1',
    '1',
    '1',
    '1',
    '1',
    '1',
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    '1',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
    Buffer.from(''),
  );
  const deploy = nftSellDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});
