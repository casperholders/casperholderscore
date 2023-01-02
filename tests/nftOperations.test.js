import { CLKey, CLPublicKey, DeployUtil } from 'casper-js-sdk';
import {
  NftApprove, NftBurn, NftCEP78Approve, NftTransfer,
} from '../src';
import NftCEP78Burn from '../src/services/deploys/nft/actions/nftCEP78Burn';
import NftCEP78Transfer from '../src/services/deploys/nft/actions/nftCEP78Transfer';

test('NFT Approve Operation', async () => {
  const nftApproveDeployParameters = new NftApprove(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    1,
    new CLKey(CLPublicKey.fromHex('015acde48328ae5ae008ecd27a4671f7b967b5c89477d1315265e762c7f07fe52c')),
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftApproveDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('NFT Transfer Operation', async () => {
  const nftTransferDeployParameters = new NftTransfer(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    1,
    '015acde48328ae5ae008ecd27a4671f7b967b5c89477d1315265e762c7f07fe52c',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftTransferDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('NFT Burn Operation', async () => {
  const nftBurnDeployParameters = new NftBurn(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    1,
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftBurnDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('CEP78 NFT Approve Operation', async () => {
  const nftApproveDeployParameters = new NftCEP78Approve(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    1,
    new CLKey(CLPublicKey.fromHex('015acde48328ae5ae008ecd27a4671f7b967b5c89477d1315265e762c7f07fe52c')),
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftApproveDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('CEP78 NFT Transfer Operation', async () => {
  const nftTransferDeployParameters = new NftCEP78Transfer(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    1,
    '015acde48328ae5ae008ecd27a4671f7b967b5c89477d1315265e762c7f07fe52c',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftTransferDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('CEP78 NFT Burn Operation', async () => {
  const nftBurnDeployParameters = new NftCEP78Burn(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    1,
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = nftBurnDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});
