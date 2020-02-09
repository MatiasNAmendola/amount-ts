import { Options } from './options.interface';

export interface AmountInterface {
    /**
     * format to string
     */
    to(val: number): string;
    /**
     * get number from formatted string
     */
    from(val: string): number;
}

export interface AmountConstructorInterface {
    /**
     * Constructor
     *
     * @param options Format options
     */
    new (options: Options): AmountInterface;
}
