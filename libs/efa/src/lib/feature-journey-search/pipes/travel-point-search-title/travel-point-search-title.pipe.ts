import { Pipe, PipeTransform } from '@angular/core';
import { TravelPointSearchParams } from '../../travel-point-search/travel-point-search.component';

@Pipe({
  name: 'travelPointSearchTitle'
})
export class TravelPointSearchTitlePipe implements PipeTransform {

  transform(travelPointSearchParams: TravelPointSearchParams): string {
    if (!travelPointSearchParams) {
      return null;
    }
    if (travelPointSearchParams.searchType === 'map') {
      return 'Start und Ziel';
    }
    if (travelPointSearchParams.locationType === 'departure') {
      return 'Start';
    }
    return 'Ziel';
  }
}
