import { Pipe, PipeTransform } from '@angular/core';
import { JourneyFragment } from '@dravelopsfrontend/generated-content';

const LAST_INDEX = 1;

@Pipe({
  name: 'backwardJourneyFilter'
})
export class BackwardJourneyFilterPipe implements PipeTransform {

  transform(backwardJourneys: JourneyFragment[], selectedOutwardJourney: JourneyFragment): JourneyFragment[] {
    if (!backwardJourneys) {
      return null;
    }
    return backwardJourneys.filter(backwardJourney =>
      new Date(backwardJourney.legs[0].departure.departureTime).getTime()
      >
      new Date(selectedOutwardJourney.legs[selectedOutwardJourney.legs.length - LAST_INDEX].arrival.arrivalTime).getTime()
    );
  }

}
