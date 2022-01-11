import { TravelPointSearchNoResultMessagePipe } from './travel-point-search-no-result-message.pipe';
import { expect } from '@jest/globals';

describe('TravelPointSearchNoResultMessagePipe', () => {
  const radiusInKilometers = 5;

  describe('with useNearestAddress = true', () => {
    const useNearestAddress = true;

    const pipeUnderTest: TravelPointSearchNoResultMessagePipe = new TravelPointSearchNoResultMessagePipe(
      radiusInKilometers,
      useNearestAddress
    );

    it('create an instance', () => {
      expect(pipeUnderTest).toBeTruthy();
    });

    it('should return correct message when input param is null', () => {
      const param = null;

      const result: string = pipeUnderTest.transform(param);

      expect(result).toBe('Keine Adresse innerhalb von 5 Kilometern gefunden.');
    });
  });

  describe('with useNearestAddress = false', () => {
    const useNearestAddress = false;

    const pipeUnderTest: TravelPointSearchNoResultMessagePipe = new TravelPointSearchNoResultMessagePipe(
      radiusInKilometers,
      useNearestAddress
    );

    it('should return correct message when input param is null', () => {
      const param = null;

      const result: string = pipeUnderTest.transform(param);

      expect(result).toBe('Keine Haltestelle innerhalb von 5 Kilometern gefunden.');
    });
  });
});
