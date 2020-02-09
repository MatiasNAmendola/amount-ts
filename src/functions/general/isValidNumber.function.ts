/**
 * Check if a number is finite and not NaN
 *
 * @param input input number
 */
export const isValidNumber = (input?: number): boolean => {
    return typeof input === 'number' && isFinite(input);
};
