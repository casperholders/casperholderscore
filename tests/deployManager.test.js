import { SmartContractResult } from '../src';
import ClientCasper from '../src/services/clients/clientCasper';
import DeployManager from '../src/services/deploys/deployManager';
import DeployResult from '../src/services/results/deployResult';

test('Test getDeployResult KO', async () => {
  const casperClient = new ClientCasper('http://node.testnet.casperholders.com:7777');
  const deployManager = new DeployManager(casperClient);
  let addBidResult = new SmartContractResult('30896b995ae46255d49f66e56032d0ed62d3ac6d1fc6026cd35ef66101d4e204');
  addBidResult = await deployManager.getDeployResult(addBidResult);
  expect(addBidResult.status)
    .toBe(DeployResult.STATUS_KO);
});

test('Test getDeployResult OK', async () => {
  const casperClient = new ClientCasper('http://node.testnet.casperholders.com:7777');
  const deployManager = new DeployManager(casperClient);
  let addBidResult = new SmartContractResult('d7787c086492f967c384bfe158064e87c0c90fa02c1d002f5e4fadf3c1e8c4f8');
  addBidResult = await deployManager.getDeployResult(addBidResult);
  expect(addBidResult.status)
    .toBe(DeployResult.STATUS_OK);
});
