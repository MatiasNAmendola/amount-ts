import { Options } from '../../interfaces';
import { customToFixed, isValidNumber, strReverse } from '../general';
import CONSTANTS from '../../constants/constants';

/**
 * Format to. Accept a number as input, output formatted string.
 *
 * @param options Formatting options
 * @param input input to be formatted
 */
export const formatTo = (options: Options, input: number): string => {
    input = options.truncateDecimals ? Math.trunc(input) : input;
    options.decimals = options.truncateDecimals ? 0 : options.decimals;

    let originalInput: number = input;

    // Apply user encoder to the input.
    // Expected outcome: number.
    if (options.encoder) {
        input = options.encoder(input);
    }

    const millions: boolean = input >= CONSTANTS.MILLION_VALUE;

    if (millions) {
        input = Math.trunc(input / CONSTANTS.MILLION_VALUE);
        options.decimals = 0;
    }

    // Stop if no valid number was provided, the number is infinite or NaN.
    if (!isValidNumber(input)) {
        return '';
    }

    // Rounding away decimals might cause a value of -0
    // when using very small ranges. Remove those cases.
    if (
        typeof options.decimals === 'number' &&
        parseFloat(input.toFixed(options.decimals)) === 0
    ) {
        input = 0;
    }

    // Formatting is done on absolute numbers,
    // decorated by an optional negative symbol.
    let inputIsNegative: boolean = false;

    if (input < 0) {
        inputIsNegative = true;
        input = Math.abs(input);
    }

    let candidate: string;

    if (typeof options.decimals === 'number') {
        // Reduce the number of decimals to the specified option.
        candidate = customToFixed(input, options.decimals);
    } else {
        // Transform the number into a string, so it can be split.
        candidate = input.toString();
    }

    let inputBase: string;
    let inputDecimals = '';

    // Break the number on the decimal separator.
    if (candidate.indexOf('.') !== -1) {
        const inputPieces: string[] = candidate.split('.');
        inputBase = inputPieces[0];

        if (options.mark) {
            inputDecimals = options.mark + inputPieces[1];
        }
    } else {
        // If it isn't split, the entire number will do.
        inputBase = candidate;
    }

    // Group numbers in sets of three.
    if (options.thousand) {
        const matches: RegExpMatchArray | null = strReverse(inputBase).match(
            /.{1,3}/g
        );

        if (matches) {
            inputBase = strReverse(matches.join(strReverse(options.thousand)));
        }
    }

    let output: string = '';

    // If the number is negative, prefix with negation symbol.
    if (inputIsNegative && options.negativeBefore) {
        output += options.negativeBefore;
    }

    // Prefix the number
    if (options.prefix) {
        output += options.prefix;
    }

    // Normal negative option comes after the prefix. Defaults to '-'.
    if (inputIsNegative && options.negative) {
        output += options.negative;
    }

    // Append the actual number.
    output += inputBase;
    output += inputDecimals;

    // Apply the suffix.
    if (options.suffix) {
        output += options.suffix;
    }

    // Run the output through a user-specified post-formatter.
    if (options.edit) {
        output = options.edit(output, originalInput);
    }

    if (millions) {
        output += CONSTANTS.MILLION_PREFIX;
    }

    // All done.
    return output;
};
