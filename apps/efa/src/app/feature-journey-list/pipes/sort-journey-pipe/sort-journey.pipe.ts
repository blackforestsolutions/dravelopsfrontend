import { Pipe, PipeTransform } from '@angular/core';
import { JourneyFragment } from '../../../shared/model/generated';

@Pipe({
  name: 'sortJourney'
})
export class SortJourneyPipe implements PipeTransform {

  transform(journeys: JourneyFragment[], isArrivalDateTime: boolean): JourneyFragment[] {
    if (!journeys) {
      return null;
    }
    if (isArrivalDateTime) {
      return journeys.sort((firstJourney: JourneyFragment, secondJourney: JourneyFragment) => {
        const firstJourneyArrivalTime: number = new Date(firstJourney.legs[firstJourney.legs.length - 1].arrival.arrivalTime).getTime();
        const secondJourneyArrivalTime: number = new Date(secondJourney.legs[secondJourney.legs.length - 1].arrival.arrivalTime).getTime();

        return firstJourneyArrivalTime - secondJourneyArrivalTime;
      });
    }
    return journeys.sort((firstJourney: JourneyFragment, secondJourney: JourneyFragment) => {
      const firstJourneyDepartureTime: number = new Date(firstJourney.legs[0].departure.departureTime).getTime();
      const secondJourneyDepartureTime: number = new Date(secondJourney.legs[0].departure.departureTime).getTime();

      return firstJourneyDepartureTime - secondJourneyDepartureTime;
    });
  }

}
