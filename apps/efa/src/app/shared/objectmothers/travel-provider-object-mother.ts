import { TravelProvider } from '../model/generated';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSuedbadenTravelProvider = (): TravelProvider => {
  return {
    name: 'Sonstige',
    url: 'https://www.v-s-b.de'
  };
};
