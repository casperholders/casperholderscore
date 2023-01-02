import { CLKey, CLPublicKey, DeployUtil } from 'casper-js-sdk';
import { NftApprove, NftBurn, NftTransfer } from '../src';

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
