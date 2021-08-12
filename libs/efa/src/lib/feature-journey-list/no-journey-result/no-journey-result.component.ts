import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JourneyFragment } from '../../domain/model/generated';

@Component({
  selector: 'dravelopsefafrontend-no-journey-result',
  templateUrl: './no-journey-result.component.html',
  styleUrls: ['./no-journey-result.component.scss']
})
export class NoJourneyResultComponent {
  @Input() isBackwardJourney: boolean;
  @Input() noResultMessage: string;
  @Output() buyOutwardJourneyEvent = new EventEmitter<JourneyFragment>();

  buyOutwardJourney(): void {
    this.buyOutwardJourneyEvent.emit(null);
  }
}
