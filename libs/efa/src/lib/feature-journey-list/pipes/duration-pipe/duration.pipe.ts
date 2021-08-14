import { Pipe, PipeTransform } from '@angular/core';

const SECONDS_TO_MINUTES = 60;
const MINUTES_TO_HOURS = 60;
const MILLISECONDS_TO_SECONDS = 1000;

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(departure: Date, arrival: Date): string {
    const departureTime = new Date(departure);
    const arrivalTime = new Date(arrival);
    departureTime.setSeconds(0);
    arrivalTime.setSeconds(0);
    const milliseconds: number = arrivalTime.getTime() - departureTime.getTime();
    let minutes: string | number = Math.floor((milliseconds / (MILLISECONDS_TO_SECONDS * SECONDS_TO_MINUTES)) % SECONDS_TO_MINUTES);
    let hours: string | number = Math.floor(milliseconds / (MILLISECONDS_TO_SECONDS * SECONDS_TO_MINUTES * MINUTES_TO_HOURS));
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return `${hours}:${minutes} h`;
  }

}
