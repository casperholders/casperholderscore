import { ClientCasper } from '../src';
import { NoValidatorInfos } from '../src/services/errors/noValidatorInfos';
import { Validators } from '../src/services/validators/validators';

const casperClient = new ClientCasper('https://node.testnet.casperholders.com');

test('Should throw a noValidatorInfos error', async () => {
  try {
    const validatorsService = new Validators(casperClient);

    await validatorsService.getValidatorInfo('012158b458c095e347653cf4fa625b63e6efa84eae39d08ef8820e9ff7a95b61e0', '2f36a35edcbaabe17aba805e3fae42699a2bb80c2e0c15189756fdc4895356f8', 'casper-test');
    expect(true).toBe(false);
  } catch (e) {
    if (e instanceof NoValidatorInfos) {
      expect(true).toBe(true);
      return;
    }
    expect(true).toBe(false);
  }
});

test('Should not retrieve url', async () => {
  try {
    const validatorsService = new Validators(casperClient);

    const res = await validatorsService.isUrlSet('012158b458c095e347653cf4fa625b63e6efa84eae39d08ef8820e9ff7a95b61e0', '2f36a35edcbaabe17aba805e3fae42699a2bb80c2e0c15189756fdc4895356f8', 'casper-test');
    expect(res).toBe(false);
  } catch (e) {
    expect(true).toBe(false);
  }
});

test('Should retrieve url', async () => {
  try {
    const validatorsService = new Validators(casperClient);

    const res = await validatorsService.isUrlSet('016f6ed70e4a5acec750dc087674e5de2ad7b6d9595945c4059c5ca1a47d4dd3ab', '2f36a35edcbaabe17aba805e3fae42699a2bb80c2e0c15189756fdc4895356f8', 'casper-test');
    expect(res).toBe(true);
  } catch (e) {
    expect(true).toBe(false);
  }
});

test('Should retrieve validator infos', async () => {
  try {
    const validatorsService = new Validators(casperClient);

    const res = await validatorsService.getValidatorInfo('0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5', '2f36a35edcbaabe17aba805e3fae42699a2bb80c2e0c15189756fdc4895356f8', 'casper-test');
    expect(res.owner.name).toBe("CasperHolders");
  } catch (e) {
    expect(true).toBe(false);
  }
});