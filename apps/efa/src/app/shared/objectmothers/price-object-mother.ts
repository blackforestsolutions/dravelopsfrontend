import { Price, PriceType } from '@dravelopsfrontend/generated-content';

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
