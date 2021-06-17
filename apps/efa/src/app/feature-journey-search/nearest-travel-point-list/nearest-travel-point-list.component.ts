import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NearestTravelPointFragment } from '@dravelopsfrontend/generated-content';
import { Observable } from 'rxjs';
import { LatLng } from 'leaflet';
import { TravelPointApiService } from '../../shared/api/travel-point-api.service';
import { RADIUS_IN_KILOMETERS, USE_NEAREST_ADDRESS } from '../../../environments/config-tokens';

@Component({
  selector: 'dravelopsefafrontend-nearest-travel-point-list',
  templateUrl: './nearest-travel-point-list.component.html',
  styleUrls: ['./nearest-travel-point-list.component.scss']
})
export class NearestTravelPointListComponent implements OnInit {

  nearestTravelPoint$: Observable<NearestTravelPointFragment[]>;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private readonly latLng: LatLng,
    @Inject(RADIUS_IN_KILOMETERS) public readonly radiusInKilometers: number,
    @Inject(USE_NEAREST_ADDRESS) private readonly useNearestAddress: boolean,
    private readonly travelPointApiService: TravelPointApiService,
    private readonly matBottomSheetRef: MatBottomSheetRef<NearestTravelPointListComponent>
  ) {
  }

  ngOnInit(): void {
    this.nearestTravelPoint$ = this.getNearestTravelPoints();
  }

  getNoResultMessage(): string {
    if (this.useNearestAddress) {
      return 'Addresse';
    }
    return 'Haltestelle';
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
  }

}
