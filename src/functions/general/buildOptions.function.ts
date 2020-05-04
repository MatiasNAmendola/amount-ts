import { CurrencyInterface } from '../../interfaces';
import { Options } from '../../interfaces';

export const buildOptions = (c: CurrencyInterface): Options => {
    return {
        code: c.code,
        decimals: c.decimalDigits,
        mark: c.decimalSeparator,
        thousand: c.thousandsSeparator,
        negative: '-',
        prefix: c.symbolOnLeft
            ? c.spaceBetweenAmountAndSymbol
                ? `${c.symbol} `
                : c.symbol
            : '',
        suffix: c.symbolOnLeft
            ? ''
            : c.spaceBetweenAmountAndSymbol
            ? ` ${c.symbol} `
            : c.symbol,
    };
};
