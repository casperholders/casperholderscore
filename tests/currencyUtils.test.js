import {CurrencyUtils} from "../src";
import {BigNumber} from "ethers";

test('Convert casper to motes', () => {
    expect(BigNumber.from(CurrencyUtils.convertCasperToMotes(BigNumber.from(1))).eq(BigNumber.from(1000000000))).toBe(true);
});

test('Convert casper to motes', () => {
    expect(BigNumber.from(CurrencyUtils.convertMotesToCasper(BigNumber.from(1000000000))).eq(BigNumber.from(1))).toBe(true);
});