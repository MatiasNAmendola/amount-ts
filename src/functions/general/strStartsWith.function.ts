/**
 * Check if a string starts with a specified prefix.
 *
 * @param input Content
 * @param match Text to match
 */
export const strStartsWith = (input: string, match: string): boolean => {
    return input.substring(0, match.length) === match;
};
