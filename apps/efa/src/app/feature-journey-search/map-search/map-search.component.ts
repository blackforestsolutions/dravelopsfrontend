import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { LatLng, Map, Marker, marker } from 'leaflet';
import { PolygonApiService } from '../../shared/api/polygon-api.service';
import { Observable, Subject } from 'rxjs';
import { NearestTravelPointFragment, PolygonFragment } from '@dravelopsfrontend/generated-content';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NearestTravelPointListComponent } from '../nearest-travel-point-list/nearest-travel-point-list.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dravelopsefafrontend-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit, OnDestroy {
  @Output() departureSelectEvent = new EventEmitter<NearestTravelPointFragment>();
  @Output() arrivalSelectEvent = new EventEmitter<NearestTravelPointFragment>();

  polygon$: Observable<PolygonFragment>;
  private destroy$: Subject<void> = new Subject<void>();
  private leafletMap: Map;
  private departureMarker: Marker = null;
  private arrivalMarker: Marker = null;

  constructor(
    private readonly polygonApiService: PolygonApiService,
    private readonly matBottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit(): void {
    this.polygon$ = this.polygonApiService.getOperatingArea();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onMapReadyEvent(leafletMap: Map): void {
    this.leafletMap = leafletMap;
  }

  onMapClickEvent(latLng: LatLng): void {
    this.setMarker(latLng);
    this.openBottomSheet(latLng);
  }

  private setMarker(latLng: LatLng): void {
    if (!this.departureMarker) {
      this.departureMarker = marker(latLng).addTo(this.leafletMap);
      return;
    }
    if (!this.arrivalMarker) {
      this.arrivalMarker = marker(latLng).addTo(this.leafletMap);
      return;
    }
    this.leafletMap.removeLayer(this.departureMarker);
    this.leafletMap.removeLayer(this.arrivalMarker);
    this.departureMarker = null;
    this.arrivalMarker = null;
    this.setMarker(latLng);
  }

  private openBottomSheet(latLng: LatLng): void {
    const matBottomSheetRef: MatBottomSheetRef = this.matBottomSheet.open(NearestTravelPointListComponent, {
      panelClass: '.custom-bottom-sheet',
      data: latLng
    });
    matBottomSheetRef.afterDismissed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((nearestTravelPoint: NearestTravelPointFragment) => {
        if (nearestTravelPoint && this.departureMarker && this.arrivalMarker) {
          this.arrivalSelectEvent.emit(nearestTravelPoint);
        }
        if (nearestTravelPoint && this.departureMarker && !this.arrivalMarker) {
          this.departureSelectEvent.emit(nearestTravelPoint);
        }
      });
  }

}
