 import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {NearestAddressFragment} from "@dravelopsfrontend/generated-content";
import {Observable} from "rxjs";
import {LatLng} from "leaflet";
import {TravelPointApiService} from "../../shared/api/travel-point-api.service";
import {RADIUS_IN_KILOMETERS} from "../../../environments/config-tokens";

@Component({
  selector: 'dravelopsefafrontend-nearest-addresses-list',
  templateUrl: './nearest-addresses-list.component.html',
  styleUrls: ['./nearest-addresses-list.component.scss']
})
export class NearestAddressesListComponent implements OnInit {

  nearestAddresses$: Observable<NearestAddressFragment[]>

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private readonly latLng: LatLng,
    @Inject(RADIUS_IN_KILOMETERS) public readonly radiusInKilometers: number,
    private readonly travelPointApiService: TravelPointApiService,
    private readonly matBottomSheetRef: MatBottomSheetRef<NearestAddressesListComponent>
  ) {
  }

  handleNearestAddressSelectEvent(nearestAddress: NearestAddressFragment) {
    this.matBottomSheetRef.dismiss(nearestAddress);
  }

  ngOnInit(): void {
    const {lat, lng} = this.latLng;
    this.nearestAddresses$ = this.travelPointApiService.getNearestAddressesBy(lng, lat);
  }

}
