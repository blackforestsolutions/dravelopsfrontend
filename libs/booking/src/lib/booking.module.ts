import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureBookingModule } from './feature-booking/feature-booking.module';

@NgModule({
  imports: [
    CommonModule,
    FeatureBookingModule
  ]
})
export class BookingModule {
}
