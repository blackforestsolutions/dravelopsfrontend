import { Pipe, PipeTransform } from '@angular/core';
import { JourneyFragment } from '@dravelopsfrontend/generated-content';

@Pipe({
  name: 'isJourneyInPast'
})
export class IsJourneyInPastPipe implements PipeTransform {

  transform(journey: JourneyFragment): boolean {
    if (!journey) {
      return null;
    }
    const now: Date = new Date();
    const journeyArrivalTime: Date = new Date(journey.legs[journey.legs.length - 1].arrival.arrivalTime);

    return now.getTime() > journeyArrivalTime.getTime();
  }
}
