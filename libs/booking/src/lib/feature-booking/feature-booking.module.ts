import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureBookingRoutingModule } from './feature-booking-routing.module';
import { BookingComponent } from './booking/booking.component';


@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    FeatureBookingRoutingModule
  ]
})
export class FeatureBookingModule { }
