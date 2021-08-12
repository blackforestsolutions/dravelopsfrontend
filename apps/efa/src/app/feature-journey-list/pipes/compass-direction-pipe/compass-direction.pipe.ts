import { Pipe, PipeTransform } from '@angular/core';
import { CompassDirection } from '@dravelopsfrontend/generated-content';

@Pipe({
  name: 'compassDirection'
})
export class CompassDirectionPipe implements PipeTransform {

  transform(value: string): string {
    const compassDirection: CompassDirection = CompassDirection[value];

    if (compassDirection === CompassDirection.NORTH) {
      return 'Norden';
    }
    if (compassDirection === CompassDirection.WEST) {
      return 'Westen';
    }
    if (compassDirection === CompassDirection.EAST) {
      return 'Osten';
    }
    if (compassDirection === CompassDirection.SOUTH) {
      return 'Süden';
    }
    if (compassDirection === CompassDirection.NORTHWEST) {
      return 'Nordwesten';
    }
    if (compassDirection === CompassDirection.NORTHEAST) {
      return 'Nordosten';
    }
    if (compassDirection === CompassDirection.SOUTHWEST) {
      return 'Südwesten';
    }
    if (compassDirection === CompassDirection.SOUTHEAST) {
      return 'Südosten';
    }
    return '';
  }

}
