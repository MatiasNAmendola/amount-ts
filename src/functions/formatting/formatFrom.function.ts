import { Options } from '../../interfaces';
import { isValidNumber, strEndsWith, strStartsWith } from '../general';

/**
 * Format from. Accept a sting as input, output decoded number.
 *
 * @param options Formatting options
 * @param input input to be decoded
 */
export const formatFrom = (options: Options, input?: string): number => {
    // Test the input. Can't be empty.
    if (!input) {
        return 0;
    }

    let originalInput: string = input;

    // User defined pre-decoder. Result must be a non empty string.
    if (options.undo) {
        input = options.undo(input);
    }

    let inputIsNegative = false;

    // If the string starts with the negativeBefore value: remove it.
    // Remember is was there, the number is negative.
    if (
        options.negativeBefore &&
        strStartsWith(input, options.negativeBefore)
    ) {
        input = input.replace(options.negativeBefore, '');
        inputIsNegative = true;
    }

    // Repeat the same procedure for the prefix.
    if (options.prefix && strStartsWith(input, options.prefix)) {
        input = input.replace(options.prefix, '');
    }

    // And again for negative.
    if (options.negative && strStartsWith(input, options.negative)) {
        input = input.replace(options.negative, '');
        inputIsNegative = true;
    }

    // Remove the suffix.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
    if (options.suffix && strEndsWith(input, options.suffix)) {
        input = input.slice(0, -1 * options.suffix.length);
    }

    // Remove the thousand grouping.
    if (options.thousand) {
        input = input.split(options.thousand).join('');
    }

    // Set the decimal separator back to period.
    if (options.mark) {
        input = input.replace(options.mark, '.');
    }

    let candidate: string = '';

    // Prepend the negative symbol.
    if (inputIsNegative) {
        candidate += '-';
    }

    // Add the number
    candidate += input;

    // Trim all non-numeric characters (allow '.' and '-');
    candidate = candidate.replace(/[^0-9\.\-.]/g, '');

    // The value contains no parse-able number.
    if (candidate === '') {
        return 0;
    }

    // Covert to number.
    let output: number = Number(candidate);

    // Run the user-specified post-decoder.
    if (options.decoder) {
        output = options.decoder(output, originalInput);
    }

    // Check is the output is valid, otherwise: return false.
    if (!isValidNumber(output)) {
        return 0;
    }

    return options.truncateDecimals ? Math.trunc(output) : output;
};
