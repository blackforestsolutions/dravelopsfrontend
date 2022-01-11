import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneySearchFormContainerComponent } from './journey-search-form-container.component';
import { MockComponent, MockPipe } from 'ng-mocks';
import { JourneySearchFormComponent } from '../journey-search-form/journey-search-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint
} from '../../domain/objectmothers/travel-point-object-mother';
import { expect } from '@jest/globals';
import { By } from '@angular/platform-browser';
import { ApiToken } from '../../domain/model/api-token';
import { getApiTokenWithIsRoundTripAsFalse } from '../../domain/objectmothers/api-token-object-mother';
import {
  LocationType,
  TravelPointSearchComponent,
  TravelPointSearchResult,
  TravelPointSearchType
} from '../travel-point-search/travel-point-search.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TravelPointSearchTitlePipe } from '../pipes/travel-point-search-title/travel-point-search-title.pipe';
import { Observable, of } from 'rxjs';

const TEST_LOCATION_TYPE: LocationType = 'departure';
const MAP_TEST_SEARCH_TYPE: TravelPointSearchType = 'map';
const AUTOCOMPLETE_TEST_SEARCH_TYPE: TravelPointSearchType = 'autocomplete';
const NO_DIALOG_RESULT: MatDialogRef<TravelPointSearchComponent, TravelPointSearchResult> = {
  afterClosed(): Observable<TravelPointSearchResult | undefined> {
    return of(undefined);
  }
} as MatDialogRef<TravelPointSearchComponent, TravelPointSearchResult>;
const MAP_SEARCH_DIALOG_RESULT: MatDialogRef<TravelPointSearchComponent, TravelPointSearchResult> = {
  afterClosed(): Observable<TravelPointSearchResult | undefined> {
    return of({
      departureTravelPoint: getFurtwangenSupermarketTravelPoint(),
      arrivalTravelPoint: getFurtwangenKindergardenTravelPoint()
    });
  }
} as MatDialogRef<TravelPointSearchComponent, TravelPointSearchResult>;

describe('JourneySearchFormContainerComponent', () => {
  let breakpointObserver: BreakpointObserver;
  let dialog: MatDialog;

  let componentUnderTest: JourneySearchFormContainerComponent;
  let fixture: ComponentFixture<JourneySearchFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JourneySearchFormContainerComponent,
        MockComponent(JourneySearchFormComponent),
        MockComponent(TravelPointSearchComponent),
        MockPipe(TravelPointSearchTitlePipe, () => 'test')
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => jest.fn()
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneySearchFormContainerComponent);
    breakpointObserver = TestBed.inject(BreakpointObserver);
    dialog = TestBed.inject(MatDialog);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and pass property bindings correctly to sub components', () => {
    componentUnderTest.travelPointSearchType = 'map';
    componentUnderTest.departureTravelPoint = getFurtwangenSupermarketTravelPoint();
    componentUnderTest.arrivalTravelPoint = getFurtwangenKindergardenTravelPoint();

    fixture.detectChanges();

    const journeySearchFormComponent: JourneySearchFormComponent = fixture.debugElement.query(By.directive(JourneySearchFormComponent)).componentInstance;
    expect(componentUnderTest).toBeTruthy();
    expect(journeySearchFormComponent.travelPointSearchType).toBe('map');
    expect(journeySearchFormComponent.departureTravelPoint).toEqual(getFurtwangenSupermarketTravelPoint());
    expect(journeySearchFormComponent.arrivalTravelPoint).toEqual(getFurtwangenKindergardenTravelPoint());
  });

  it('should emit "submitApiTokenEvent" when "handleSubmitApiTokenEvent" is called', () => {
    let expectedApiToken: ApiToken;
    componentUnderTest.submitApiTokenEvent.subscribe((apiToken: ApiToken) => expectedApiToken = apiToken);

    componentUnderTest.handleSubmitApiTokenEvent(getApiTokenWithIsRoundTripAsFalse());

    expect(expectedApiToken).toEqual(getApiTokenWithIsRoundTripAsFalse());
  });

  it('should be called "handleSubmitApiTokenEvent" when "submitApiTokenEvent" is emitted by sub component', () => {
    const handleSubmitApiTokenEventSpy = jest.spyOn(componentUnderTest, 'handleSubmitApiTokenEvent');

    const subComponent: JourneySearchFormComponent = fixture.debugElement.query(By.directive(JourneySearchFormComponent)).componentInstance;
    subComponent.submitApiTokenEvent.emit(getApiTokenWithIsRoundTripAsFalse());

    expect(handleSubmitApiTokenEventSpy).toHaveBeenCalledTimes(1);
    expect(handleSubmitApiTokenEventSpy).toHaveBeenCalledWith(getApiTokenWithIsRoundTripAsFalse());
  });

  it('should be called "handleOpenTravelPointSearchEvent" when "openTravelPointSearchEvent" is emitted by sub component', () => {
    const handleOpenTravelPointSearchEventSpy = jest.spyOn(componentUnderTest, 'handleOpenTravelPointSearchEvent');

    const subComponent: JourneySearchFormComponent = fixture.debugElement.query(By.directive(JourneySearchFormComponent)).componentInstance;
    subComponent.openTravelPointSearchEvent.emit(TEST_LOCATION_TYPE);

    expect(handleOpenTravelPointSearchEventSpy).toHaveBeenCalledTimes(1);
    expect(handleOpenTravelPointSearchEventSpy).toHaveBeenCalledWith(TEST_LOCATION_TYPE);
  });

  it('should open and close dialog without updating component properties when no travelPoint is selected', () => {
    jest.spyOn(breakpointObserver, 'isMatched').mockReturnValue(true);
    const dialogOpenSpy = jest.spyOn(dialog, 'open').mockReturnValue(NO_DIALOG_RESULT);

    componentUnderTest.handleOpenTravelPointSearchEvent(TEST_LOCATION_TYPE);

    expect(dialogOpenSpy).toHaveBeenCalledTimes(1);
    expect(dialogOpenSpy).toHaveBeenCalledWith(TravelPointSearchComponent, expect.objectContaining({
      data: {
        locationType: TEST_LOCATION_TYPE,
        searchType: AUTOCOMPLETE_TEST_SEARCH_TYPE
      }
    }));
    expect(componentUnderTest.departureTravelPoint).toBeUndefined();
    expect(componentUnderTest.arrivalTravelPoint).toBeUndefined();
  });

  it('should open and close dialog with updating component properties when travelPoints are selected', () => {
    componentUnderTest.travelPointSearchType = MAP_TEST_SEARCH_TYPE;
    jest.spyOn(breakpointObserver, 'isMatched').mockReturnValue(true);
    const dialogOpenSpy = jest.spyOn(dialog, 'open').mockReturnValue(MAP_SEARCH_DIALOG_RESULT);

    componentUnderTest.handleOpenTravelPointSearchEvent(TEST_LOCATION_TYPE);
    fixture.detectChanges();

    expect(dialogOpenSpy).toHaveBeenCalledTimes(1);
    expect(dialogOpenSpy).toHaveBeenCalledWith(TravelPointSearchComponent, expect.objectContaining({
      data: {
        locationType: TEST_LOCATION_TYPE,
        searchType: MAP_TEST_SEARCH_TYPE
      }
    }));
    expect(componentUnderTest.departureTravelPoint).toEqual(getFurtwangenSupermarketTravelPoint());
    expect(componentUnderTest.arrivalTravelPoint).toEqual(getFurtwangenKindergardenTravelPoint());
    const journeySearchForm: JourneySearchFormComponent = fixture.debugElement.query(By.directive(JourneySearchFormComponent)).componentInstance;
    expect(journeySearchForm.departureTravelPoint).toEqual(getFurtwangenSupermarketTravelPoint());
    expect(journeySearchForm.arrivalTravelPoint).toEqual(getFurtwangenKindergardenTravelPoint());
  });
});
