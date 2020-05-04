import { buildOptions, formatFrom, formatTo, validate } from '../functions';
import {
    AmountInterface,
    CurrencyInterface,
    FormatsInterface,
    JsonMoneyInterface,
    Options,
} from '../interfaces';
import { Currencies } from '../options';

export class Amount implements AmountInterface {
    /**
     * Formatting options
     */
    private readonly options: Options;

    public static toJSON(c: string, input: number): JsonMoneyInterface {
        let candidate: CurrencyInterface = {
            code: 'ARS',
            symbol: '$',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            symbolOnLeft: true,
            spaceBetweenAmountAndSymbol: true,
            decimalDigits: 2,
        };

        if (Currencies.has(c)) {
            candidate = Currencies.get(c) || candidate;
        }

        const formatter: Amount = Amount.fromCurrency(candidate);

        return {
            value: input,
            currency: candidate,
            format: formatter.toJson(input),
        };
    }

    /**
     * New instance from currency string
     *
     * @see https://en.wikipedia.org/wiki/ISO_4217
     * @param c Currency
     */
    public static fromCurrencyString(c: string): Amount {
        let candidate: CurrencyInterface = {
            code: 'ARS',
            symbol: '$',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            symbolOnLeft: true,
            spaceBetweenAmountAndSymbol: true,
            decimalDigits: 2,
        };

        if (Currencies.has(c)) {
            candidate = Currencies.get(c) || candidate;
        }

        return Amount.fromCurrency(candidate);
    }

    /**
     * New instance from currency
     *
     * @param c Currency
     */
    public static fromCurrency(c: CurrencyInterface): Amount {
        return new Amount(buildOptions(c));
    }

    /**
     * Constructor
     *
     * @param o Formatting options
     */
    public constructor(o: Options) {
        this.options = validate(o);
    }

    /**
     * Format to string
     *
     * @param input input to be formatted
     */
    public to(input: number): string {
        return formatTo(this.options, input);
    }

    /**
     *
     */
    /**
     * Get number from formatted string
     *
     * @param input input to be decoded
     */
    public from(input: string): number {
        return formatFrom(this.options, input);
    }

    /**
     * Format to object
     *
     * @param input input to be formatted
     */
    public toJson(input: number): FormatsInterface {
        const o1: Options = Object.assign({}, this.options);

        const o2: Options = Object.assign({}, o1);
        o2.truncateDecimals = true;

        const o3: Options = Object.assign({}, o1);
        o3.suffix = undefined;
        o3.prefix = undefined;

        const o4: Options = Object.assign({}, o3);
        o4.truncateDecimals = true;

        const o5: Options = Object.assign({}, o1);
        o5.prefix = 'ARS ';

        const wc: string = formatTo(o3, input);
        const wcd: string = formatTo(o4, input);
        const d: string = wc.replace(wcd, '');
        const dwm: string = d.replace(o4.mark || '', '');

        return {
            withCurrency: formatTo(o1, input),
            withCode: formatTo(o5, input),
            withoutDecimals: formatTo(o2, input),
            withoutCurrency: wc,
            withoutCurrencyAndDecimals: wcd,
            decimals: d,
            decimalsWithoutMark: dwm,
        };
    }
}
