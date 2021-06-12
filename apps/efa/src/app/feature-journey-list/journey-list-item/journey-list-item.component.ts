import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JourneyFragment } from '@dravelopsfrontend/generated-content';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';

const FOOTPATH_PRICE = 0;
const DEFAULT_MOCK_PRICE = 10;

@Component({
  selector: 'dravelopsefafrontend-journey-list-item',
  templateUrl: './journey-list-item.component.html',
  styleUrls: ['./journey-list-item.component.scss']
})
export class JourneyListItemComponent {

  @Input() isJourneyBuyable: boolean;
  @Input() buttonSelectText: string;
  @Input() journey: JourneyFragment;
  @Output() journeySelectedEvent = new EventEmitter<JourneyFragment>();

  constructor(
    private isOnlyFootpath: IsOnlyFootpathPipe
  ) {
  }

  getPrice(): number {
    if (this.isOnlyFootpath.transform(this.journey)) {
      return FOOTPATH_PRICE;
    }
    return DEFAULT_MOCK_PRICE;
  }

  emitJourneySelectedEvent(): void {
    this.journeySelectedEvent.emit(this.journey);
  }
}
