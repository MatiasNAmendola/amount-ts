import { Amount } from '../../src/implementation';
import { CurrencyInterface, JsonMoneyInterface } from '../../src/interfaces';

describe('Money format', () => {
    describe('to(input: number): string', () => {
        it('should returns', () => {
            const formatter: Amount = new Amount({
                mark: '.',
                thousand: ',',
                prefix: '$ ',
                suffix: ' p.p.',
            });

            // Format a number:
            const result: string = formatter.to(301980.62);
            expect(result).toEqual('$ 301,980.62 p.p.');
        });

        it('should returns truncated', () => {
            const formatter: Amount = new Amount({
                mark: '.',
                thousand: ',',
                prefix: '$ ',
                suffix: ' p.p.',
                truncateDecimals: true,
            });

            // Format a number:
            const result: string = formatter.to(301980.62);
            expect(result).toEqual('$ 301,980 p.p.');
        });
    });

    describe('from(input: string): number', () => {
        it('should returns', () => {
            const formatter: Amount = new Amount({
                mark: '.',
                thousand: ',',
                prefix: '$ ',
                suffix: ' p.p.',
            });

            const result: number = formatter.from('$ 301,980.62 p.p.');
            expect(result).toEqual(301980.62);
        });

        it('invalid string', () => {
            const formatter: Amount = new Amount({
                prefix: '$',
                suffix: ',-',
                thousand: ',',
            });

            const invalid: number = formatter.from('spaaaaacceeee!!!');
            expect(invalid).toEqual(0);

            const result: number = formatter.from('90000 money');
            expect(result).toEqual(90000);
        });

        it('negative', () => {
            const formatter: Amount = new Amount({
                prefix: '$',
                negativeBefore: '[NEGATIVE] ',
                decimals: 0,
            });

            // Format a number:
            const result: string = formatter.to(-260);
            expect(result).toEqual('[NEGATIVE] $260');

            // Get a number back:
            const inverse: number = formatter.from('[NEGATIVE] $260');
            expect(inverse).toEqual(-260);
        });
    });

    describe('fromCurrency(c: CurrencyInterface): MoneyFormat', () => {
        it('should returns', () => {
            const currency: CurrencyInterface = {
                code: 'ARS',
                symbol: '$',
                thousandsSeparator: '.',
                decimalSeparator: ',',
                symbolOnLeft: true,
                spaceBetweenAmountAndSymbol: true,
                decimalDigits: 2,
            };

            const formatter: Amount = Amount.fromCurrency(currency);
            const result: string = formatter.to(301980.62);
            expect(result).toEqual('$ 301.980,62');

            const inverse: number = formatter.from('$ 301.980,62');
            expect(inverse).toEqual(301980.62);
        });
    });

    describe('fromCurrencyString(c: string): MoneyFormat', () => {
        it('should returns', () => {
            const formatter: Amount = Amount.fromCurrencyString('ARS');
            const result: string = formatter.to(301980.62);
            expect(result).toEqual('$ 301.980,62');
        });

        it('should returns million', () => {
            const formatter: Amount = Amount.fromCurrencyString('ARS');
            const result: string = formatter.to(3019242580.62);
            expect(result).toEqual('$ 3.019M');
        });
    });

    describe('toJSON(c: string, input: number): JsonMoneyInterface', () => {
        it('should returns JsonMoneyInterface', () => {
            const expected: JsonMoneyInterface = {
                currency: {
                    code: 'ARS',
                    decimalDigits: 2,
                    decimalSeparator: ',',
                    spaceBetweenAmountAndSymbol: true,
                    symbol: '$',
                    symbolOnLeft: true,
                    thousandsSeparator: '.',
                },
                format: {
                    decimals: ',62',
                    decimalsWithoutMark: '62',
                    withCurrency: '$ 301.980,62',
                    withCode: 'ARS 301.980,62',
                    withoutCurrency: '301.980,62',
                    withoutCurrencyAndDecimals: '301.980',
                    withoutDecimals: '$ 301.980',
                },
                value: 301980.62,
            };

            const result: JsonMoneyInterface = Amount.toJSON('ARS', 301980.62);
            expect(result).toEqual(expected);
        });

        it('should returns JsonMoneyInterface with millions', () => {
            const expected: JsonMoneyInterface = {
                currency: {
                    code: 'ARS',
                    decimalDigits: 2,
                    decimalSeparator: ',',
                    spaceBetweenAmountAndSymbol: true,
                    symbol: '$',
                    symbolOnLeft: true,
                    thousandsSeparator: '.',
                },
                format: {
                    decimals: '',
                    decimalsWithoutMark: '',
                    withCurrency: '$ 301M',
                    withCode: 'ARS 301M',
                    withoutCurrency: '301M',
                    withoutCurrencyAndDecimals: '301M',
                    withoutDecimals: '$ 301M',
                },
                value: 301000980.62,
            };

            const result: JsonMoneyInterface = Amount.toJSON(
                'ARS',
                301000980.62
            );
            expect(result).toEqual(expected);
        });
    });
});
