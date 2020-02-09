/**
 * Validate formatting options
 *
 * @param inputOptions Formatting options
 */
import { Options } from '../../interfaces';

/**
 * Validate formatting options
 *
 * @param inputOptions Formatting options
 */
export const validate = (inputOptions: Options): Options => {
    // Only default if negativeBefore isn't set.
    if (!inputOptions.negative && !inputOptions.negativeBefore) {
        inputOptions.negative = '-';
    }

    if (!inputOptions.mark) {
        // Don't set a default for mark when 'thousand' is set.

        if (inputOptions.thousand !== '.') {
            inputOptions.mark = '.';
        }
    }

    if (typeof inputOptions.decimals !== 'number') {
        inputOptions.decimals = 2;
    }

    // Floating points in JS are stable up to 7 decimals.
    if (inputOptions.decimals > 8 && inputOptions.decimals < 0) {
        inputOptions.decimals = 2;
    }

    if (inputOptions.truncateDecimals) {
        inputOptions.decimals = 0;
    }

    // Some values can't be extracted from a
    // string if certain combinations are present.

    if (
        (inputOptions.mark || inputOptions.thousand) &&
        inputOptions.mark === inputOptions.thousand
    ) {
        throw new Error('mark');
    }

    if (
        (inputOptions.prefix || inputOptions.negative) &&
        inputOptions.prefix === inputOptions.negative
    ) {
        throw new Error('prefix');
    }

    if (
        (inputOptions.prefix || inputOptions.negativeBefore) &&
        inputOptions.prefix === inputOptions.negativeBefore
    ) {
        throw new Error('prefix');
    }

    return inputOptions;
};
