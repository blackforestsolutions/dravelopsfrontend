import { EMPTY, Observable } from 'rxjs';
import { JourneyFragment } from '../model/generated';
import { scanJourneys } from './rxjs';
import { tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

describe('rxjs', () => {
  it('scanJourneys operator should return an empty array when observable is empty', () => {
    let isNewSearch: boolean;
    const testData$: Observable<JourneyFragment | JourneyFragment[]> = EMPTY;

    const result$: Observable<JourneyFragment[]> = testData$.pipe(
      tap(() => isNewSearch = true),
      scanJourneys(() => isNewSearch),
      tap(() => isNewSearch = false)
    );

    const scheduler: TestScheduler = new TestScheduler(((actual, expected) => expect(actual).toEqual(expected)));
    scheduler.run(({ expectObservable }) => {
      const expectedMarble = '(a|)';
      const expectedJourneys = {
        a: []
      };
      expectObservable(result$).toBe(expectedMarble, expectedJourneys);
    });
  });
});
