import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { latLng, LatLng, Map, Marker } from 'leaflet';
import { PolygonApiService } from '../../domain/api/polygon-api.service';
import { Observable, Subject } from 'rxjs';
import { NearestTravelPointFragment, PointFragment, PolygonFragment } from '../../domain/model/generated';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LeafletService } from '../../domain/util/leaflet.service';
import { NearestTravelPointSearchComponent } from '../nearest-travel-point-search/nearest-travel-point-search.component';

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
    private readonly polygonApiService: PolygonApiService,
    private readonly route: ActivatedRoute,
    private readonly matBottomSheet: MatBottomSheet,
    private readonly leafletService: LeafletService
  ) {
  }

  ngOnInit(): void {
    this.polygon$ = this.polygonApiService.getOperatingArea();
    // working with mock data
    // this.polygon$ = of(getHvvOperatingArea());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onMapReadyEvent(leafletMap: Map): void {
    this.leafletMap = leafletMap;
    // helpful code for identifying a css x and y values for a given latitude and longitude with Cypress
    // const latLng: LatLng = this.leafletMap.layerPointToLatLng(point(242, 242));
    // console.log(latLng);
    // this.setMarker(latLng);
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
    const point: PointFragment[] = this.mapLatLngToPoint(latLng);
    if (!this.departureMarker) {
      this.departureMarker = this.leafletService.createDepartureMarker(point, ICON_WIDTH, ICON_HEIGHT).addTo(this.leafletMap);
      return;
    }
    if (!this.arrivalMarker) {
      this.arrivalMarker = this.leafletService.createArrivalMarker(point, ICON_WIDTH, ICON_HEIGHT).addTo(this.leafletMap);
      return;
    }
    this.leafletMap.removeLayer(this.departureMarker);
    this.leafletMap.removeLayer(this.arrivalMarker);
    this.departureMarker = null;
    this.arrivalMarker = null;
    this.setMarker(latLng);
  }

  private mapLatLngToPoint(latLng: LatLng): PointFragment[] {
    return [{
      x: latLng.lng,
      y: latLng.lat
    }];
  }

  private openBottomSheet(latLng: LatLng): void {
    this.matBottomSheet
      .open<NearestTravelPointSearchComponent, LatLng>(NearestTravelPointSearchComponent, {
        closeOnNavigation: true,
        data: latLng,
        panelClass: 'nearest-travel-point-search-desktop'
      })
      .afterDismissed()
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
