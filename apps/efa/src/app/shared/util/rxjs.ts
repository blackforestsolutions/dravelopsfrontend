import { JourneyFragment } from '../model/generated';
import { Observable } from 'rxjs';
import { defaultIfEmpty, scan } from 'rxjs/operators';

export const scanJourneys = (isNewSearch: () => boolean) => {
  return (source: Observable<JourneyFragment | JourneyFragment[]>): Observable<JourneyFragment[]> => source.pipe(
    scan((journeys: JourneyFragment[], journey: JourneyFragment | JourneyFragment[]) => mergeJourneys(isNewSearch, journeys, journey), []),
    defaultIfEmpty([])
  );
};

const mergeJourneys = (isNewSearch: () => boolean, journeys: JourneyFragment[], journey: JourneyFragment | JourneyFragment[]) => {
  if (isNewSearch()) {
    return mergeJourneysFromNewSearch(journey);
  }
  return mergeJourneysFromOldSearch(journeys, journey);
};

const mergeJourneysFromNewSearch = (journey: JourneyFragment | JourneyFragment[]) => {
  if (Array.isArray(journey)) {
    return [...journey];
  }
  return [journey];
};

const mergeJourneysFromOldSearch = (journeys: JourneyFragment[], journey: JourneyFragment | JourneyFragment[]) => {
  if (Array.isArray(journey)) {
    return [...journeys, ...journey];
  }
  return [...journeys, journey];
};
