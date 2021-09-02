import {AbstractKeyManager, Balance, ClientCasper} from "../src";
import {BigNumber} from "ethers";

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
    const balanceService = new Balance(keyManager, casperClient, "0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5")
    const balance = await balanceService.fetchBalance()
    expect(balance.toNumber()).toBe(1000);
});

test('Test stake balance', async () => {
    const keyManager = new DummyKeyManager("01c534307e2c7a4839e01ebefae81517fb26d928e3a86802c48b9d47454625bf14")
    const balanceService = new Balance(keyManager, casperClient, "0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5")
    const balance = await balanceService.fetchStakeBalance()
    expect(balance.toNumber()).toBeGreaterThan(1);
});

test('Test validator balance', async () => {
    const keyManager = new DummyKeyManager("0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5")
    const balanceService = new Balance(keyManager, casperClient, "0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5")
    const balance = await balanceService.fetchValidatorBalance()
    expect(balance.balance.toNumber()).toBeGreaterThan(1);
});

test('Test failed stake balance', async () => {
    try {
        const keyManager = new DummyKeyManager("0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21")
        const balanceService = new Balance(keyManager, casperClient, "0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5")
        await balanceService.fetchStakeBalance()
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("No staking funds.");
    }
});

test('Test failed validator balance', async () => {
    try {
        const keyManager = new DummyKeyManager("0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21")
        const balanceService = new Balance(keyManager, casperClient, "0168e3a352e7bab76c85fb77f7c641d77096dae55845c79655522c24e9cc1ffe21")
        await balanceService.fetchValidatorBalance()
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe("Unable to retrieve your Validator balance. Make sure that you are correctly bonded to the network.");
    }
});