import Balance from '../src/services/balance/balance';
import ClientCasper from '../src/services/clients/clientCasper';
import AbstractKeyManager from '../src/services/keys/abstractKeyManager';

class DummyKeyManager extends AbstractKeyManager {
  key;

  constructor(key) {
    super();
    this.key = key;
  }

  get activeKey() {
    return this.key;
  }
}

const casperClient = new ClientCasper('https://node.testnet.casperholders.com');
let keyManager = new DummyKeyManager(null);
const balanceService = new Balance(keyManager, casperClient);

test('Test balance', async () => {
  keyManager = new DummyKeyManager('0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21');
  balanceService.keyManager = keyManager;
  const balance = await balanceService.fetchBalance();
  expect(Number(balance))
    .toBe(1000);
});

test('Test erc20 balance casper', async () => {
  keyManager = new DummyKeyManager('01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c');
  balanceService.keyManager = keyManager;
  // Casper implementation
  try {
    const balance = await balanceService.fetchBalanceOfErc20(
      '9af628fe541a8ad58e020a79f7260228dc58745e295f5dfa2dedd497064e31df',
    );
    expect(parseFloat(balance))
      .toBeGreaterThan(0.0);
  } catch (e) {
    console.log(e);
    expect(true)
      .toBe(false);
  }
});

test('Test erc20 balance rengolabs', async () => {
  keyManager = new DummyKeyManager('01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c');
  balanceService.keyManager = keyManager;
  // Rengolabs uniswap implementation
  try {
    const balance = await balanceService.fetchBalanceOfErc20(
      '9aef66efbac45daf71f92f3446422a00fd3adaaf206a1c29d80f26bc513c105d',
    );
    expect(parseFloat(balance))
      .toBeGreaterThan(0.0);
  } catch (e) {
    console.log(e);
    expect(true)
      .toBe(false);
  }
});

test('Test erc20 no balance', async () => {
  keyManager = new DummyKeyManager('0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21');
  balanceService.keyManager = keyManager;
  try {
    const balance = await balanceService.fetchBalanceOfErc20(
      '9af628fe541a8ad58e020a79f7260228dc58745e295f5dfa2dedd497064e31df',
    );
    expect(balance)
      .toBe('0');
  } catch (e) {
    expect(true)
      .toBe(false);
  }
});

test('Test erc20 allowance', async () => {
  keyManager = new DummyKeyManager('01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c');
  balanceService.keyManager = keyManager;
  try {
    const balance = await balanceService.fetchAllowanceOfErc20(
      '9af628fe541a8ad58e020a79f7260228dc58745e295f5dfa2dedd497064e31df',
      '23cd4354304f4eb1dd6739cba66d41579936e2cec1553096d97aa4efb6b661e6',
    );
    expect(balance)
      .toBe('115792089237316195423570985008687907853269984665640564039457584007911129639935');
  } catch (e) {
    console.log(e);
    expect(true)
      .toBe(false);
  }
});

test('Test erc20 no allowance', async () => {
  keyManager = new DummyKeyManager('0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21');
  balanceService.keyManager = keyManager;
  try {
    const balance = await balanceService.fetchAllowanceOfErc20(
      '9af628fe541a8ad58e020a79f7260228dc58745e295f5dfa2dedd497064e31df',
      '0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21',
    );
    expect(balance)
      .toBe('0');
  } catch (e) {
    expect(true)
      .toBe(false);
  }
});

test('Test stake balance', async () => {
  keyManager = new DummyKeyManager('01c534307e2c7a4839e01ebefae81517fb26d928e3a86802c48b9d47454625bf14');
  balanceService.keyManager = keyManager;
  const balance = await balanceService.fetchStakeBalance(
    '0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5',
  );
  expect(Number(balance))
    .toBeGreaterThan(1);
});

test('Test all stake balance', async () => {
  keyManager = new DummyKeyManager('01c534307e2c7a4839e01ebefae81517fb26d928e3a86802c48b9d47454625bf14');
  balanceService.keyManager = keyManager;
  const balance = await balanceService.fetchAllStakeBalance();
  expect(balance.length)
    .toBe(1);
  expect(balance[0].validator)
    .toBe('0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5');
  expect(Number(balance[0].stakedTokens))
    .toBeGreaterThan(1);
});

test('Test validator balance', async () => {
  keyManager = new DummyKeyManager('0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5');
  balanceService.keyManager = keyManager;
  const balance = await balanceService.fetchValidatorBalance();
  expect(Number(balance.balance))
    .toBeGreaterThan(1);
});

test('Test failed balance', async () => {
  try {
    keyManager = new DummyKeyManager(null);
    balanceService.keyManager = keyManager;
    await balanceService.fetchBalance();
    expect(true)
      .toBe(false);
  } catch (e) {
    expect(e.message)
      .toBe('Not connected.');
  }
});

test('Test failed stake balance', async () => {
  try {
    keyManager = new DummyKeyManager('0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21');
    balanceService.keyManager = keyManager;
    await balanceService.fetchStakeBalance('0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5');
    expect(true)
      .toBe(false);
  } catch (e) {
    expect(e.message)
      .toBe('No staking funds.');
  }
});

test('Test failed all stake balance', async () => {
  try {
    keyManager = new DummyKeyManager('0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21');
    balanceService.keyManager = keyManager;
    await balanceService.fetchAllStakeBalance();
    expect(true)
      .toBe(false);
  } catch (e) {
    expect(e.message)
      .toBe('No staking funds.');
  }
});

test('Test failed validator balance', async () => {
  try {
    keyManager = new DummyKeyManager('0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21');
    balanceService.keyManager = keyManager;
    await balanceService.fetchValidatorBalance();
    expect(true)
      .toBe(false);
  } catch (e) {
    expect(e.message)
      .toBe('Unable to retrieve your Validator balance. Make sure that you are correctly bonded to the network.');
  }
});

test('Test failed stake balance', async () => {
  try {
    keyManager = new DummyKeyManager(null);
    balanceService.keyManager = keyManager;
    await balanceService.fetchStakeBalance('0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5');
    expect(true)
      .toBe(false);
  } catch (e) {
    expect(e.message)
      .toBe('Not connected.');
  }
});

test('Test failed all stake balance', async () => {
  try {
    keyManager = new DummyKeyManager(null);
    balanceService.keyManager = keyManager;
    await balanceService.fetchAllStakeBalance();
    expect(true)
      .toBe(false);
  } catch (e) {
    expect(e.message)
      .toBe('Not connected.');
  }
});

test('Test failed validator balance', async () => {
  try {
    keyManager = new DummyKeyManager(null);
    balanceService.keyManager = keyManager;
    await balanceService.fetchValidatorBalance();
    expect(true)
      .toBe(false);
  } catch (e) {
    expect(e.message)
      .toBe('Not connected.');
  }
});
