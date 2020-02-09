/**
 * Provide rounding-accurate toFixed method.
 *
 * @param value Number
 * @param exp Fraction digits
 * @link http://stackoverflow.com/a/21323330/775265
 */
export const customToFixed = (value: number, exp: number): string => {
    const split1: string[] = value.toString().split('e');
    const num1: number = split1[1] ? +split1[1] + exp : exp;
    const num2: number = +(split1[0] + 'e' + num1);
    const num3: number = Math.round(num2);
    const split2 = num3.toString().split('e');
    const num4: number = split2[1] ? +split2[1] - exp : -exp;
    const num5: number = +(split2[0] + 'e' + num4);
    return num5.toFixed(exp);
};
