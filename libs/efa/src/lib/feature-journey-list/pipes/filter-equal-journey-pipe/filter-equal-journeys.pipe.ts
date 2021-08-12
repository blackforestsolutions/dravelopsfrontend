import { Pipe, PipeTransform } from '@angular/core';
import { GetAllJourneysQuery, GetJourneysSubscription, JourneyFragment } from '../../../domain/model/generated';

@Pipe({
  name: 'filterEqualJourneys'
})
export class FilterEqualJourneysPipe implements PipeTransform {

  transform(journeys: JourneyFragment[]): JourneyFragment[] {
    if (!journeys) {
      return null;
    }
    let uniqueJourneys: JourneyFragment[] = [];
    for (const journey of journeys) {
      const hasJourneyAlready: boolean = uniqueJourneys.some(j => this.removeJourneyIdAndCompareWith(j, journey));
      if (!hasJourneyAlready) {
        uniqueJourneys = [...uniqueJourneys, journey];
      }
    }
    return uniqueJourneys;
  }

  private removeJourneyIdAndCompareWith(firstJourney: JourneyFragment, secondJourney: JourneyFragment): boolean {
    const firstJourneyCopy: GetJourneysSubscription['getJourneysBy'] | GetAllJourneysQuery['getJourneysBy'][0] = { ...firstJourney };
    delete firstJourneyCopy.id;
    const secondJourneyCopy: GetJourneysSubscription['getJourneysBy'] | GetAllJourneysQuery['getJourneysBy'][0] = { ...secondJourney };
    delete secondJourneyCopy.id;

    return JSON.stringify(firstJourneyCopy) === JSON.stringify(secondJourneyCopy);
  }

}
