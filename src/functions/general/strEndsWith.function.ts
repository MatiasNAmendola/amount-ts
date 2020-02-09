/**
 * Check is a string ends in a specified suffix.
 *
 * @param input Content
 * @param match Text to match
 */
export const strEndsWith = (input: string, match: string): boolean => {
    return input.slice(-1 * match.length) === match;
};
