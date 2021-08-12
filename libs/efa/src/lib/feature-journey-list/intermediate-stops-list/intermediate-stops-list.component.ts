import { Component, Input } from '@angular/core';
import { LegFragment } from '../../domain/model/generated';

@Component({
  selector: 'dravelopsefafrontend-intermediate-stops-list',
  templateUrl: './intermediate-stops-list.component.html',
  styleUrls: ['./intermediate-stops-list.component.scss']
})
export class IntermediateStopsListComponent {
  @Input() leg: LegFragment;
}
