import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { icon, latLng, LatLng, Map, Marker, marker } from 'leaflet';
import { PolygonApiService } from '../../shared/api/polygon-api.service';
import { Observable, Subject } from 'rxjs';
import { NearestTravelPointFragment, PolygonFragment } from '@dravelopsfrontend/generated-content';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NearestTravelPointListComponent } from '../nearest-travel-point-list/nearest-travel-point-list.component';
import { takeUntil } from 'rxjs/operators';
import { CUSTOMER_DIRECTORY } from '../../../environments/config-tokens';
import { ActivatedRoute } from '@angular/router';

const ICON_WIDTH = 45;
const ICON_HEIGHT = 73.8;

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
    @Inject(CUSTOMER_DIRECTORY) private readonly customerDirectory: string,
    private readonly polygonApiService: PolygonApiService,
    private readonly route: ActivatedRoute,
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
    this.setMarkerOnPageReload();
  }

  onMapClickEvent(latLng: LatLng): void {
    this.setMarker(latLng);
    this.openBottomSheet(latLng);
  }

  private setMarkerOnPageReload(): void {
    if (this.route.firstChild) {
      this.setDepartureMarkerOnPageReload();
      this.setArrivalMarkerOnPageReload();
    }
  }

  private setDepartureMarkerOnPageReload(): void {
    const urlDepartureLatitude: string = this.route.firstChild.snapshot.paramMap.get('departureLatitude');
    const urlDepartureLongitude: string = this.route.firstChild.snapshot.paramMap.get('departureLongitude');

    if (urlDepartureLatitude && urlDepartureLongitude) {
      const departureCoordinates: LatLng = latLng(+urlDepartureLatitude, +urlDepartureLongitude);
      this.setMarker(departureCoordinates);
    }
  }

  private setArrivalMarkerOnPageReload(): void {
    const urlArrivalLatitude: string = this.route.firstChild.snapshot.paramMap.get('arrivalLatitude');
    const urlArrivalLongitude: string = this.route.firstChild.snapshot.paramMap.get('arrivalLongitude');

    if (urlArrivalLatitude && urlArrivalLongitude) {
      const arrivalCoordinates: LatLng = latLng(+urlArrivalLatitude, +urlArrivalLongitude);
      this.setMarker(arrivalCoordinates);
    }
  }

  private setMarker(latLng: LatLng): void {
    if (!this.departureMarker) {
      this.departureMarker = this.createDepartureMarker(latLng).addTo(this.leafletMap);
      return;
    }
    if (!this.arrivalMarker) {
      this.arrivalMarker = this.createArrivalMarker(latLng).addTo(this.leafletMap);
      return;
    }
    this.leafletMap.removeLayer(this.departureMarker);
    this.leafletMap.removeLayer(this.arrivalMarker);
    this.departureMarker = null;
    this.arrivalMarker = null;
    this.setMarker(latLng);
  }

  private createDepartureMarker(latLng: LatLng): Marker {
    return marker(latLng, {
      icon: icon({
        iconSize: [ICON_WIDTH, ICON_HEIGHT],
        iconUrl: `assets/${this.customerDirectory}/departure_icon.svg`
      })
    });
  }

  private createArrivalMarker(latLng: LatLng): Marker {
    return marker(latLng, {
      icon: icon({
        iconSize: [ICON_WIDTH, ICON_HEIGHT],
        iconUrl: `assets/${this.customerDirectory}/arrival_icon.svg`
      })
    });
  }

  private openBottomSheet(latLng: LatLng): void {
    const matBottomSheetRef: MatBottomSheetRef = this.matBottomSheet.open(NearestTravelPointListComponent, {
      panelClass: '.custom-bottom-sheet',
      closeOnNavigation: true,
      data: latLng
    });
    matBottomSheetRef.afterDismissed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((nearestTravelPoint: NearestTravelPointFragment) => this.handleBottomSheetCloseEvent(nearestTravelPoint));
  }

  private handleBottomSheetCloseEvent(nearestTravelPoint: NearestTravelPointFragment): void {
    if (nearestTravelPoint && this.arrivalMarker) {
      this.arrivalSelectEvent.emit(nearestTravelPoint);
      return;
    }
    if (nearestTravelPoint && !this.arrivalMarker) {
      this.departureSelectEvent.emit(nearestTravelPoint);
      return;
    }
    if (!nearestTravelPoint && this.arrivalMarker) {
      this.leafletMap.removeLayer(this.arrivalMarker);
      this.arrivalMarker = null;
      return;
    }
    if (!nearestTravelPoint && !this.arrivalMarker) {
      this.leafletMap.removeLayer(this.departureMarker);
      this.departureMarker = null;
      return;
    }
  }

}
