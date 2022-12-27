import { CLKey, CLPublicKey, DeployUtil } from 'casper-js-sdk';
import { UniswapErc20Approve, UniswapErc20Transfer } from '../src';
import Erc20Approve from '../src/services/deploys/erc20/actions/erc20Approve';
import Erc20Transfer from '../src/services/deploys/erc20/actions/erc20Transfer';

test('ERC20 Approve Operation', async () => {
  const erc20ApproveDeployParameters = new Erc20Approve(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    '1',
    new CLKey(CLPublicKey.fromHex('015acde48328ae5ae008ecd27a4671f7b967b5c89477d1315265e762c7f07fe52c')),
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = erc20ApproveDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('Uniswap ERC20 Approve Operation', async () => {
  const erc20ApproveDeployParameters = new UniswapErc20Approve(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    '1',
    new CLKey(CLPublicKey.fromHex('015acde48328ae5ae008ecd27a4671f7b967b5c89477d1315265e762c7f07fe52c')),
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = erc20ApproveDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('ERC20 Transfer Operation', async () => {
  const erc20TransferDeployParameters = new Erc20Transfer(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    '1',
    '015acde48328ae5ae008ecd27a4671f7b967b5c89477d1315265e762c7f07fe52c',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = erc20TransferDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});

test('Uniswap ERC20 Transfer Operation', async () => {
  const erc20TransferDeployParameters = new UniswapErc20Transfer(
    '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    '1',
    '015acde48328ae5ae008ecd27a4671f7b967b5c89477d1315265e762c7f07fe52c',
    'casper-test',
    'aee8a7ff16b770382aedf1a4cc83948613f315dc4f9560165f4feaa80fde5ac1',
  );
  const deploy = erc20TransferDeployParameters.makeDeploy;
  const result = DeployUtil.validateDeploy(deploy);
  expect(result.ok)
    .toBe(true);
});
