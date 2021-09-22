import {
    AddBid,
    Delegate,
    LocalSigner,
    SignError,
    SmartContractDeployParameters,
    TransferDeployParameters,
    Undelegate,
    WithdrawBid,
} from "../src";
import {DeployUtil, Keys} from "casper-js-sdk";
import { AccountInfo } from '../src/services/deploys/account-info/AccountInfo';

test('Add bid operation', async () => {
    const addBid = new AddBid("1", "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21", 1, "casper-test", "3c0c3884a1f853de3cc3b77ce2f1146f8e6e2ec83583a8f17c98710b20cadc8a")
    const deploy = addBid.makeDeploy
    const result = DeployUtil.validateDeploy(deploy)
    expect(result.ok).toBe(true);
});

test('Withdraw bid operation', async () => {
    const withdrawBid = new WithdrawBid("1", "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21", "casper-test", "3c0c3884a1f853de3cc3b77ce2f1146f8e6e2ec83583a8f17c98710b20cadc8a")
    const deploy = withdrawBid.makeDeploy
    const result = DeployUtil.validateDeploy(deploy)
    expect(result.ok).toBe(true);
});

test('Delegate operation', async () => {
    const delegate = new Delegate("1", "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21", "017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e","casper-test", "3c0c3884a1f853de3cc3b77ce2f1146f8e6e2ec83583a8f17c98710b20cadc8a")
    const deploy = delegate.makeDeploy
    const result = DeployUtil.validateDeploy(deploy)
    expect(result.ok).toBe(true);
});

test('Undelegate operation', async () => {
    const undelegate = new Undelegate("1", "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21", "017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e", "casper-test", "3c0c3884a1f853de3cc3b77ce2f1146f8e6e2ec83583a8f17c98710b20cadc8a")
    const deploy = undelegate.makeDeploy
    const result = DeployUtil.validateDeploy(deploy)
    expect(result.ok).toBe(true);
});

test('Smart Contract operation', async () => {
    const smartContractDeployParameters = new SmartContractDeployParameters( "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21","casper-test", new Buffer(""), "1")
    const deploy = smartContractDeployParameters.makeDeploy
    const result = DeployUtil.validateDeploy(deploy)
    expect(result.ok).toBe(true);
});

test('Transfer operation', async () => {
    const transferDeployParameters = new TransferDeployParameters( "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21", "casper-test", "1", "017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e", "0")
    const deploy = transferDeployParameters.makeDeploy
    const result = DeployUtil.validateDeploy(deploy)
    expect(result.ok).toBe(true);
});

test('Account Info operation', async () => {
    const accountInfoDeployParameters = new AccountInfo( "test", "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21", "casper-test", "2f36a35edcbaabe17aba805e3fae42699a2bb80c2e0c15189756fdc4895356f8")
    const deploy = accountInfoDeployParameters.makeDeploy
    const result = DeployUtil.validateDeploy(deploy)
    expect(result.ok).toBe(true);
});

test('Sign transfer operation', async () => {
    const key = Keys.Ed25519.new()
    const transferDeployParameters = new TransferDeployParameters( "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21", "casper-test", "1", "017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e", "0")
    const deploy = transferDeployParameters.makeDeploy
    const deploySigned = await LocalSigner.sign(deploy, {
        key: key
    })
    const result = DeployUtil.validateDeploy(deploySigned)
    expect(result.ok).toBe(true);
});

test('Failed to sign transfer operation', async () => {
    try {
        const transferDeployParameters = new TransferDeployParameters("0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21", "casper-test", "1", "017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e", "0")
        const deploy = transferDeployParameters.makeDeploy
        await LocalSigner.sign(deploy, {
            key: ""
        })
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("Failed to sign the contract. Please retry if you canceled the operation.");
    }
});

