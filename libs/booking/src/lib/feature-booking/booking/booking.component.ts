import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dravelopsbookingfrontend-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  constructor(
    private route: ActivatedRoute
  ) {
  }

  logIsRoundTrip(): boolean {
    return JSON.parse(this.route.snapshot.paramMap.get('isRoundTrip'));
  }

  logOutwardJourneyId(): string {
    return this.route.snapshot.paramMap.get('outwardJourneyId');
  }

  logBackwardJourneyId(): string {
    const isRoundTrip: boolean = JSON.parse(this.route.snapshot.paramMap.get('isRoundTrip'));

    if (isRoundTrip) {
      return this.route.snapshot.paramMap.get('backwardJourneyId');
    }
    return '';
  }

}
