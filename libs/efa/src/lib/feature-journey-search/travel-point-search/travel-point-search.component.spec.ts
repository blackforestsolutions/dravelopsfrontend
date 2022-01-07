import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  TravelPointSearchComponent,
  TravelPointSearchParams,
  TravelPointSearchResult
} from './travel-point-search.component';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { HeaderComponent } from '@dravelopsfrontend/shared';
import { MapSearchComponent } from '../map-search/map-search.component';
import { AutocompleteAddressSearchComponent } from '../autocomplete-address-search/autocomplete-address-search.component';
import { TravelPointSearchTitlePipe } from '../pipes/travel-point-search-title/travel-point-search-title.pipe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { By } from '@angular/platform-browser';
import {
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint
} from '../../domain/objectmothers/travel-point-object-mother';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../domain/model/generated';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { of } from 'rxjs';

const TEST_TITLE = 'Start und Ziel';
const TEST_MAP_DIALOG_PARAMS: TravelPointSearchParams = {
  searchType: 'map',
  locationType: 'departure'
};
const TEST_DEPARTURE_AUTOCOMPLETE_PARAMS: TravelPointSearchParams = {
  searchType: 'autocomplete',
  locationType: 'departure'
};
const TEST_ARRIVAL_AUTOCOMPLETE_PARAMS: TravelPointSearchParams = {
  searchType: 'autocomplete',
  locationType: 'arrival'
};
const TEST_DESKTOP_VIEW: BreakpointState = {
  matches: true,
  breakpoints: {
    '850px': true
  }
};
const TEST_TOUCH_VIEW: BreakpointState = {
  matches: false,
  breakpoints: {
    '850px': false
  }
};

describe('TravelPointSearchComponent', () => {
  let dialogRef: MatDialogRef<TravelPointSearchComponent, TravelPointSearchResult>;
  let breakpointObserver: BreakpointObserver;

  let componentUnderTest: TravelPointSearchComponent;
  let fixture: ComponentFixture<TravelPointSearchComponent>;

  describe('with map search', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TravelPointSearchComponent,
          MockComponent(HeaderComponent),
          MockComponent(MapSearchComponent),
          MockComponent(AutocompleteAddressSearchComponent),
          MockPipe(TravelPointSearchTitlePipe, () => TEST_TITLE)
        ],
        providers: [
          MockProvider(MatDialogRef),
          {
            provide: MAT_DIALOG_DATA,
            useValue: TEST_MAP_DIALOG_PARAMS
          }
        ],
        imports: [
          MatToolbarModule,
          MatIconModule
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TravelPointSearchComponent);
      dialogRef = TestBed.inject(MatDialogRef);
      breakpointObserver = TestBed.inject(BreakpointObserver);
      componentUnderTest = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create and initialize components with right params and sub components', () => {
      expect(componentUnderTest).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.menu-title').innerHTML).toBe(TEST_TITLE);
      expect(fixture.debugElement.query(By.directive(MapSearchComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(AutocompleteAddressSearchComponent))).toBeNull();
    });

    it('should close dialog with correct params when "departureSelectEvent$" and "arrivalSelectEvent$" are triggered', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.departure$.next(getFurtwangenSupermarketTravelPoint());
      componentUnderTest.arrival$.next(getFurtwangenKindergardenTravelPoint());

      expect(dialogRefSpy).toHaveBeenCalledTimes(1);
      expect(dialogRefSpy).toHaveBeenCalledWith({
        departureTravelPoint: getFurtwangenSupermarketTravelPoint(),
        arrivalTravelPoint: getFurtwangenKindergardenTravelPoint()
      });
    });

    it('should not close dialog when only "departureSelectEvent$" and not "arrivalSelectEvent$" is triggered', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.departure$.next(getFurtwangenSupermarketTravelPoint());

      expect(dialogRefSpy).toHaveBeenCalledTimes(0);
    });

    it('should not close dialog when only "arrivalSelectEvent$" and not "departureSelectEvent$" is triggered', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.arrival$.next(getFurtwangenKindergardenTravelPoint());

      expect(dialogRefSpy).toHaveBeenCalledTimes(0);
    });

    it('should not close dialog when emitted departure is null', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.departure$.next(null);
      componentUnderTest.arrival$.next(getFurtwangenKindergardenTravelPoint());

      expect(dialogRefSpy).toHaveBeenCalledTimes(0);
    });

    it('should not close dialog when emitted arrival is null', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.departure$.next(getFurtwangenSupermarketTravelPoint());
      componentUnderTest.arrival$.next(null);

      expect(dialogRefSpy).toHaveBeenCalledTimes(0);
    });

    it('should trigger "departure$" when "departureSelectEvent" is triggered by map-search-component', () => {
      let expectedDeparture: NearestTravelPointFragment;
      componentUnderTest.departure$.subscribe((departure: NearestTravelPointFragment) => expectedDeparture = departure);

      const mapSearchComponent: MapSearchComponent = fixture.debugElement.query(By.directive(MapSearchComponent)).componentInstance;
      mapSearchComponent.departureSelectEvent.emit(getFurtwangenSupermarketTravelPoint());

      expect(expectedDeparture).toEqual(getFurtwangenSupermarketTravelPoint());
    });

    it('should trigger "arrival$" when "arrivalSelectEvent" is triggered by map-search-component', () => {
      let expectedArrival: NearestTravelPointFragment;
      componentUnderTest.arrival$.subscribe((arrival: NearestTravelPointFragment) => {
        expectedArrival = arrival;
      });

      const mapSearchComponent: MapSearchComponent = fixture.debugElement.query(By.directive(MapSearchComponent)).componentInstance;
      mapSearchComponent.arrivalSelectEvent.emit(getFurtwangenSupermarketTravelPoint());

      expect(expectedArrival).toEqual(getFurtwangenSupermarketTravelPoint());
    });

    it('should close dialog when window width is bigger than 850px', () => {
      const breakpointObserverSpy = jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(TEST_DESKTOP_VIEW));
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.ngOnInit();

      expect(breakpointObserverSpy).toHaveBeenCalledTimes(1);
      expect(breakpointObserverSpy).toHaveBeenCalledWith('(min-width: 850px)');
      expect(dialogRefSpy).toHaveBeenCalledTimes(1);
    });

    it('should not close dialog when window is smaller than 850px', () => {
      const breakpointObserverSpy = jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(TEST_TOUCH_VIEW));
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.ngOnInit();

      expect(breakpointObserverSpy).toHaveBeenCalledTimes(1);
      expect(breakpointObserverSpy).toHaveBeenCalledWith('(min-width: 850px)');
      expect(dialogRefSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('with autocomplete search for departure', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TravelPointSearchComponent,
          MockComponent(HeaderComponent),
          MockComponent(MapSearchComponent),
          MockComponent(AutocompleteAddressSearchComponent),
          MockPipe(TravelPointSearchTitlePipe, () => TEST_TITLE)
        ],
        providers: [
          MockProvider(MatDialogRef),
          {
            provide: MAT_DIALOG_DATA,
            useValue: TEST_DEPARTURE_AUTOCOMPLETE_PARAMS
          }
        ],
        imports: [
          MatToolbarModule,
          MatIconModule
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TravelPointSearchComponent);
      dialogRef = TestBed.inject(MatDialogRef);
      breakpointObserver = TestBed.inject(BreakpointObserver);
      componentUnderTest = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create and initialize components with right params and sub components', () => {
      expect(fixture.nativeElement.querySelector('.menu-title').innerHTML).toBe(TEST_TITLE);
      expect(fixture.debugElement.query(By.directive(MapSearchComponent))).toBeNull();
      expect(fixture.debugElement.query(By.directive(AutocompleteAddressSearchComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(AutocompleteAddressSearchComponent)).componentInstance.inputLabel).toBe(TEST_TITLE);
    });

    it('should close dialog with correct params when "departureSelectEvent$" is triggered', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.departure$.next(getFurtwangenSupermarketTravelPoint());

      expect(dialogRefSpy).toHaveBeenCalledTimes(1);
      expect(dialogRefSpy).toHaveBeenCalledWith({
        departureTravelPoint: getFurtwangenSupermarketTravelPoint()
      });
    });

    it('should not close dialog when emitted departure is null', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.departure$.next(null);

      expect(dialogRefSpy).toHaveBeenCalledTimes(0);
    });

    it('should trigger "departure$" when "selectAddressEvent" is triggered by autocomplete-search-component', () => {
      let expectedDeparture: AutocompleteAddressFragment;
      componentUnderTest.departure$.subscribe((departure: AutocompleteAddressFragment) => expectedDeparture = departure);

      const autocompleteSearchComponent: AutocompleteAddressSearchComponent = fixture.debugElement.query(By.directive(AutocompleteAddressSearchComponent)).componentInstance;
      autocompleteSearchComponent.selectAddressEvent.emit(getFurtwangenSupermarketTravelPoint());

      expect(expectedDeparture).toEqual(getFurtwangenSupermarketTravelPoint());
    });

    it('should close dialog when window width is bigger than 850px', () => {
      const breakpointObserverSpy = jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(TEST_DESKTOP_VIEW));
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.ngOnInit();

      expect(breakpointObserverSpy).toHaveBeenCalledTimes(1);
      expect(breakpointObserverSpy).toHaveBeenCalledWith('(min-width: 850px)');
      expect(dialogRefSpy).toHaveBeenCalledTimes(1);
    });

    it('should not close dialog when window is smaller than 850px', () => {
      const breakpointObserverSpy = jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(TEST_TOUCH_VIEW));
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.ngOnInit();

      expect(breakpointObserverSpy).toHaveBeenCalledTimes(1);
      expect(breakpointObserverSpy).toHaveBeenCalledWith('(min-width: 850px)');
      expect(dialogRefSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('with autocomplete search for arrival', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TravelPointSearchComponent,
          MockComponent(HeaderComponent),
          MockComponent(MapSearchComponent),
          MockComponent(AutocompleteAddressSearchComponent),
          MockPipe(TravelPointSearchTitlePipe, () => TEST_TITLE)
        ],
        providers: [
          MockProvider(MatDialogRef),
          {
            provide: MAT_DIALOG_DATA,
            useValue: TEST_ARRIVAL_AUTOCOMPLETE_PARAMS
          }
        ],
        imports: [
          MatToolbarModule,
          MatIconModule
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TravelPointSearchComponent);
      dialogRef = TestBed.inject(MatDialogRef);
      componentUnderTest = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create and initialize components with right params and sub components', () => {
      expect(fixture.nativeElement.querySelector('.menu-title').innerHTML).toBe(TEST_TITLE);
      expect(fixture.debugElement.query(By.directive(MapSearchComponent))).toBeNull();
      expect(fixture.debugElement.query(By.directive(AutocompleteAddressSearchComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(AutocompleteAddressSearchComponent)).componentInstance.inputLabel).toBe(TEST_TITLE);
    });

    it('should close dialog with correct params when "arrivalSelectEvent$" is triggered', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.arrival$.next(getFurtwangenKindergardenTravelPoint());

      expect(dialogRefSpy).toHaveBeenCalledTimes(1);
      expect(dialogRefSpy).toHaveBeenCalledWith({
        arrivalTravelPoint: getFurtwangenKindergardenTravelPoint()
      });
    });

    it('should not close dialog when emitted arrival is null', () => {
      const dialogRefSpy = jest.spyOn(dialogRef, 'close');

      componentUnderTest.arrival$.next(null);

      expect(dialogRefSpy).toHaveBeenCalledTimes(0);
    });

    it('should trigger "arrival$" when "selectAddressEvent" is triggered by autocomplete-search-component', () => {
      let expectedArrival: AutocompleteAddressFragment;
      componentUnderTest.arrival$.subscribe((arrival: AutocompleteAddressFragment) => expectedArrival = arrival);

      const autocompleteSearchComponent: AutocompleteAddressSearchComponent = fixture.debugElement.query(By.directive(AutocompleteAddressSearchComponent)).componentInstance;
      autocompleteSearchComponent.selectAddressEvent.emit(getFurtwangenKindergardenTravelPoint());

      expect(expectedArrival).toEqual(getFurtwangenKindergardenTravelPoint());
    });
  });
});
