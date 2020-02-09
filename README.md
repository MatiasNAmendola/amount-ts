# amount-ts

**TypeScript** Amount Formatting

## Summary

**amount-ts** is a formatting library with a dead-simple interface. It has three methods: to, from and toJson.

Based on [wNumb.js](https://refreshless.com/wnumb/) library (author [Leon Gersen](https://github.com/leongersen)).

Check this library in [**BUNDLE**PHOBIA](https://bundlephobia.com/result?p=amount-ts)

## Usage

### Simple

```
const formatter: Amount = new Amount({
    mark: '.',
    thousand: ',',
    prefix: '$ ',
    suffix: ' p.p.',
});

// Format a number:
const result: string = formatter.to(301980.62);
console.log(result); // => '$ 301,980.62 p.p.'

// Get a number back:
const inverse: number = formatter.from('$ 301,980.62 p.p.');
console.log(inverse); // => 301980.62
```

### Appending money-formatting

```
// Appending money-formatting
const formatter: Amount = new Amount({
    prefix: '$ ',
    decimals: 3,
    thousand: ',',
});

// Numbers are always correctly rounded
const result: string = formatter.to(980735.2635);
console.log(result); // => '$ 980,735.264'
```

### Manually edit numbers

```
// Manually edit numbers
const formatter: Amount = new Amount({
    thousand: '.',
    encoder: function( a ){
        return a * 1E7;
    },
    decoder: function( a ){
        return a / 1E7;
    },
});

// Numbers are always correctly rounded
const result: number = formatter.from('-95.060.000.000');
console.log(result); // => -9506
```

### Prefixing negative numbers with a string

```
// Prefixing negative numbers with a string
const formatter: Amount = new Amount({
    prefix: '$',
    negativeBefore: '[NEGATIVE] ',
    decimals: 0,
});

// Format a number:
const result: string = formatter.to(-260);
console.log(result); // => '[NEGATIVE] $260'

// Get a number back:
const inverse: number = formatter.from('[NEGATIVE] $260');
console.log(inverse); // => -260
```

### Parsing miss-matches and typo's

```
// Parsing miss-matches and typo's
const formatter: Amount = new Amount({
    prefix: '$',
    suffix: ',-',
    thousand: ',',
});

// No problem. If there is a sensible number in the entry,
// it'll be extracted, even if pre/post-fixes are missing or off.
const inverse: number = formatter.from('90000 money');
console.log(inverse); // => 90000

// No idea... If the value makes no sense,
// the 'from' method returns false.
console.log(formatter.from('spaaaaacceeee!!!')); // => 0
```

## New features

### Custom currencies

```
// Custom currencies
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
console.log(result); // => '$ 301.980,62'

// And inverse
const inverse: number = formatter.from('$ 301.980,62');
console.log(inverse); // => 301980.62
```

### Known currencies

See [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)

```
// Known currencies. See: https://en.wikipedia.org/wiki/ISO_4217
const formatter: Amount = Amount.fromCurrencyString('ARS');
const result: string = formatter.to(301980.62);
console.log(result); // => '$ 301.980,62'
```

### Millions...

```
// Millions. See: https://en.wikipedia.org/wiki/ISO_4217
const formatter: Amount = Amount.fromCurrencyString('ARS');
const result: string = formatter.to(3019242580.62);
console.log(result); // => '$ 3.019M'
```

### To JSON

```
// To Json. See: https://en.wikipedia.org/wiki/ISO_4217
const formatter: Amount = Amount.fromCurrencyString('ARS');
const result: FormatsInterface = formatter.toJson(301980.62);
console.log(result);

/*
 // =>
{
    decimals: ',62',
    decimalsWithoutMark: '62',
    withCurrency: '$ 301.980,62',
    withoutCurrency: '301.980,62',
    withoutCurrencyAndDecimals: '301.980',
    withoutDecimals: '$ 301.980',
}
*/

```

### To JSON (complete)

```
// To Json (complete). See: https://en.wikipedia.org/wiki/ISO_4217
const result: JsonMoneyInterface = Amount.toJSON('ARS', 301980.62);
console.log(result);

/*
 // =>
{
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
        withoutCurrency: '301.980,62',
        withoutCurrencyAndDecimals: '301.980',
        withoutDecimals: '$ 301.980',
    },
    value: 301980.62,
}
*/

```

## Author

Matias Nahuel Améndola

[Linkedin](https://ar.linkedin.com/in/matias-nahuel-am%C3%A9ndola-933a9711)

[GitHub](https://github.com/matiasnamendola)

[Mail](mailto:soporte.esolutions@gmail.com)

Any suggestion is welcome

## Licence

Licensed [MIT](./LICENSE), so free for personal and commercial use.
