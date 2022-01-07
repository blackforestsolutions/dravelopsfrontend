import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NearestTravelPointFragment } from '../../domain/model/generated';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { LatLng } from 'leaflet';
import { RADIUS_IN_KILOMETERS, TOUCH_BREAKPOINT, USE_NEAREST_ADDRESS } from '@dravelopsfrontend/shared';
import { TravelPointApiService } from '../../domain/api/travel-point-api.service';

const ONE_PIXEL = 1;

@Component({
  selector: 'dravelopsefafrontend-nearest-travel-point-search',
  templateUrl: './nearest-travel-point-search.component.html',
  styleUrls: ['./nearest-travel-point-search.component.scss']
})
export class NearestTravelPointSearchComponent implements OnInit {
  windowWidthBeforeResize: number = window.innerWidth;

  nearestTravelPoints$: Observable<NearestTravelPointFragment[]>;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private readonly latLng: LatLng,
    @Inject(RADIUS_IN_KILOMETERS) private readonly radiusInKilometers: number,
    @Inject(USE_NEAREST_ADDRESS) private readonly useNearestAddress: boolean,
    private readonly travelPointApiService: TravelPointApiService,
    private readonly matBottomSheetRef: MatBottomSheetRef<NearestTravelPointSearchComponent>
  ) {
  }

  ngOnInit(): void {
    this.nearestTravelPoints$ = this.getNearestTravelPoints();
  }

  @HostListener('window:resize')
  onResize(): void {
    const windowWidthAfterResize: number = window.innerWidth;
    const min: number = Math.min(this.windowWidthBeforeResize, windowWidthAfterResize);
    const max: number = Math.max(this.windowWidthBeforeResize, windowWidthAfterResize);
    const length: number = max - min + 1;
    const range: number[] = Array.from({ length }, (number: number, index: number) => min + index);
    if (range.includes(TOUCH_BREAKPOINT) && range.includes(TOUCH_BREAKPOINT - ONE_PIXEL)) {
      this.matBottomSheetRef.dismiss();
    }
    this.windowWidthBeforeResize = windowWidthAfterResize;
  }

  handleNearestTravelPointSelectEvent(nearestTravelPoint: NearestTravelPointFragment): void {
    this.matBottomSheetRef.dismiss(nearestTravelPoint);
  }

  private getNearestTravelPoints(): Observable<NearestTravelPointFragment[]> {
    const { lat, lng } = this.latLng;
    if (this.useNearestAddress) {
      return this.travelPointApiService.getNearestAddressesBy(lng, lat, this.radiusInKilometers);
    }
    return this.travelPointApiService.getNearestStationsBy(lng, lat, this.radiusInKilometers);
    // working with mock data
    // return of([
    //   getFurtwangenSupermarketTravelPoint(),
    //   getFurtwangenKindergardenTravelPoint(),
    //   getFurtwangenFriedrichStreetOneTravelPoint(),
    //   getFurtwangenFriedrichStreetTwoTravelPoint(),
    //   getFurtwangenFriedrichStreetThreeTravelPoint()
    // ]);
  }
}
