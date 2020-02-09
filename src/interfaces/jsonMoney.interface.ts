import { CurrencyInterface } from './currency.interface';
import { FormatsInterface } from './formats.interface';

export interface JsonMoneyInterface {
    value: number;
    currency: CurrencyInterface;
    format: FormatsInterface;
}
