import { Price, PriceType } from '../model/generated';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getRegularPrice = (): Price => {
  return {
    priceType: PriceType.REGULAR,
    currencyCode: 'EUR',
    smallestCurrencyValue: 200
  };
};
