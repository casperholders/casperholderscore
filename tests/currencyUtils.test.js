import {CurrencyUtils} from "../src";

test('Convert casper to motes', () => {
    expect(CurrencyUtils.convertCasperToMotes(1)).toBe(1000000000);
});

test('Convert casper to motes', () => {
    expect(CurrencyUtils.convertMotesToCasper(1000000000)).toBe(1);
});