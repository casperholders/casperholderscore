import {AbstractKeyManager, Balance, ClientCasper} from "../src";

class DummyKeyManager extends AbstractKeyManager {

    key

    constructor(key) {
        super();
        this.key = key
    }

    get activeKey() {
        return this.key
    }
}

const casperClient = new ClientCasper("https://node.testnet.casperholders.com")

test('Test balance', async () => {
    const keyManager = new DummyKeyManager("0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21")
    const balanceService = new Balance(keyManager, casperClient)
    const balance = await balanceService.fetchBalance()
    expect(Number(balance)).toBe(1000);
});

test('Test stake balance', async () => {
    const keyManager = new DummyKeyManager("01C534307e2c7A4839E01ebEfae81517Fb26d928E3a86802C48B9D47454625BF14")
    const balanceService = new Balance(keyManager, casperClient)
    const balance = await balanceService.fetchStakeBalance("0124BFDae2Ed128fa5e4057BC398E4933329570E47240e57fc92F5611A6178EBA5")
    expect(Number(balance)).toBeGreaterThan(1);
});

test('Test all stake balance', async () => {
    const keyManager = new DummyKeyManager("01C534307e2c7A4839E01ebEfae81517Fb26d928E3a86802C48B9D47454625BF14")
    const balanceService = new Balance(keyManager, casperClient)
    const balance = await balanceService.fetchAllStakeBalance()
    expect(balance.length).toBe(1);
    expect(balance[0].validator).toBe('0124BFDae2Ed128fa5e4057BC398E4933329570E47240e57fc92F5611A6178EBA5');
    expect(Number(balance[0].stakedTokens)).toBeGreaterThan(1);
});

test('Test validator balance', async () => {
    const keyManager = new DummyKeyManager("0124BFDae2Ed128fa5e4057BC398E4933329570E47240e57fc92F5611A6178EBA5")
    const balanceService = new Balance(keyManager, casperClient)
    const balance = await balanceService.fetchValidatorBalance()
    expect(Number(balance.balance)).toBeGreaterThan(1);
});

test('Test failed balance', async () => {
    try {
        const keyManager = new DummyKeyManager(null)
        const balanceService = new Balance(keyManager, casperClient)
        await balanceService.fetchBalance()
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("Not connected on Signer.");
    }
});

test('Test failed stake balance', async () => {
    try {
        const keyManager = new DummyKeyManager("0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21")
        const balanceService = new Balance(keyManager, casperClient)
        await balanceService.fetchStakeBalance('0124BFDae2Ed128fa5e4057BC398E4933329570E47240e57fc92F5611A6178EBA5')
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("No staking funds.");
    }
});

test('Test failed all stake balance', async () => {
    try {
        const keyManager = new DummyKeyManager("0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21")
        const balanceService = new Balance(keyManager, casperClient)
        await balanceService.fetchAllStakeBalance()
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("No staking funds.");
    }
});

test('Test failed validator balance', async () => {
    try {
        const keyManager = new DummyKeyManager("0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21")
        const balanceService = new Balance(keyManager, casperClient)
        await balanceService.fetchValidatorBalance()
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("Unable to retrieve your Validator balance. Make sure that you are correctly bonded to the network.");
    }
});

test('Test failed stake balance', async () => {
    try {
        const keyManager = new DummyKeyManager(null)
        const balanceService = new Balance(keyManager, casperClient)
        await balanceService.fetchStakeBalance('0124BFDae2Ed128fa5e4057BC398E4933329570E47240e57fc92F5611A6178EBA5')
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("Not connected on Signer.");
    }
});

test('Test failed all stake balance', async () => {
    try {
        const keyManager = new DummyKeyManager(null)
        const balanceService = new Balance(keyManager, casperClient)
        await balanceService.fetchAllStakeBalance()
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("Not connected on Signer.");
    }
});

test('Test failed validator balance', async () => {
    try {
        const keyManager = new DummyKeyManager(null)
        const balanceService = new Balance(keyManager, casperClient)
        await balanceService.fetchValidatorBalance()
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("Not connected on Signer.");
    }
});
