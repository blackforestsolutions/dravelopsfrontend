import { Pipe, PipeTransform } from '@angular/core';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../../domain/model/generated';

const KILOMETERS_TO_METERS = 1000;

@Pipe({
  name: 'distanceInMetres'
})
export class DistanceInMetresPipe implements PipeTransform {

  transform(travelPoint: AutocompleteAddressFragment | NearestTravelPointFragment): string {
    if (!travelPoint) {
      return null;
    }
    if ('distanceInKilometers' in travelPoint) {
      return `${travelPoint.distanceInKilometers * KILOMETERS_TO_METERS} m`;
    }
    return '';
  }

}
