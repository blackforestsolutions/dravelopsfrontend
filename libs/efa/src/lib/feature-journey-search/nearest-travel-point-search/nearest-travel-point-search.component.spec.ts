import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestTravelPointSearchComponent } from './nearest-travel-point-search.component';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { TravelPointListComponent } from '../travel-point-list/travel-point-list.component';
import { LoadingComponent, RADIUS_IN_KILOMETERS, USE_NEAREST_ADDRESS } from '@dravelopsfrontend/shared';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TravelPointApiService } from '../../domain/api/travel-point-api.service';
import { TravelPointSearchNoResultMessagePipe } from '../pipes/travel-point-search-no-result-message-pipe/travel-point-search-no-result-message.pipe';
import { of } from 'rxjs';
import {
  getFurtwangenKindergardenTravelPoint,
  getNearestTravelPoints
} from '../../domain/objectmothers/travel-point-object-mother';
import { NearestTravelPointFragment } from '../../domain/model/generated';
import { describe, expect } from '@jest/globals';
import { By } from '@angular/platform-browser';

const TEST_LONGITUDE = 5;
const TEST_LATITUDE = 10;
const TEST_RADIUS_IN_KILOMETERS = 5;
const TEST_NO_RESULT_MESSAGE = 'No travel point found!';

describe('NearestTravelPointSearchComponent', () => {
  let travelPointService: TravelPointApiService;
  let matBottomSheetRef: MatBottomSheetRef;

  let componentUnderTest: NearestTravelPointSearchComponent;
  let fixture: ComponentFixture<NearestTravelPointSearchComponent>;

  describe('with useNearestAddress = true', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          NearestTravelPointSearchComponent,
          MockComponent(TravelPointListComponent),
          MockComponent(LoadingComponent),
          MockPipe(TravelPointSearchNoResultMessagePipe, () => TEST_NO_RESULT_MESSAGE)
        ],
        imports: [
          MatBottomSheetModule
        ],
        providers: [
          MockProvider(TravelPointApiService),
          MockProvider(MatBottomSheetRef),
          {
            provide: MAT_BOTTOM_SHEET_DATA,
            useValue: {
              lat: TEST_LATITUDE,
              lng: TEST_LONGITUDE
            }
          },
          {
            provide: USE_NEAREST_ADDRESS,
            useValue: true
          },
          {
            provide: RADIUS_IN_KILOMETERS,
            useValue: TEST_RADIUS_IN_KILOMETERS
          }
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NearestTravelPointSearchComponent);
      componentUnderTest = fixture.componentInstance;
      travelPointService = TestBed.inject(TravelPointApiService);
      matBottomSheetRef = TestBed.inject(MatBottomSheetRef);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(componentUnderTest).toBeTruthy();
    });

    it('should show loading component before component is initialized', () => {
      const loadingComponent: LoadingComponent = fixture.debugElement.query(By.directive(LoadingComponent)).componentInstance;

      expect(loadingComponent).toBeTruthy();
    });

    it('should return "nearestTravelPoints$" when component is initialized', (done) => {
      jest.spyOn(travelPointService, 'getNearestAddressesBy').mockReturnValue(of(getNearestTravelPoints()));

      componentUnderTest.ngOnInit();

      componentUnderTest.nearestTravelPoints$.subscribe((nearestTravelPoints: NearestTravelPointFragment[]) => {
        expect(nearestTravelPoints.length).toBe(6);
        expect(nearestTravelPoints).toEqual(getNearestTravelPoints());
        done();
      });
    });

    it('should be call "getNearestAddressesBy" from travelPointService with correct params when component is initialized', (done) => {
      const travelPointServiceSpy: jest.SpyInstance = jest.spyOn(travelPointService, 'getNearestAddressesBy').mockReturnValue(of(getNearestTravelPoints()));

      componentUnderTest.ngOnInit();

      componentUnderTest.nearestTravelPoints$.subscribe(() => {
        expect(travelPointServiceSpy).toHaveBeenCalledTimes(1);
        expect(travelPointServiceSpy).toBeCalledWith(TEST_LONGITUDE, TEST_LATITUDE, TEST_RADIUS_IN_KILOMETERS);
        done();
      });
    });

    it('should pass "nearestTravelPoints$" and noResultMessage correctly to travel-point-list-component', () => {
      jest.spyOn(travelPointService, 'getNearestAddressesBy').mockReturnValue(of(getNearestTravelPoints()));

      componentUnderTest.ngOnInit();
      fixture.detectChanges();

      const travelPointListComponent: TravelPointListComponent = fixture.debugElement.query(By.directive(TravelPointListComponent)).componentInstance;
      expect(travelPointListComponent.travelPoints).toEqual(getNearestTravelPoints());
      expect(travelPointListComponent.noResultMessage).toBe(TEST_NO_RESULT_MESSAGE);
      expect(travelPointListComponent.travelPointSearchType).toBe('map');
    });

    it('should be called "handleNearestTravelPointSelectEvent" when "travelPointSelectEvent" is triggered by travel-point-list-component', () => {
      const testTravelPoint: NearestTravelPointFragment = getFurtwangenKindergardenTravelPoint();
      const travelPointSelectEventSpy: jest.SpyInstance = jest.spyOn(componentUnderTest, 'handleNearestTravelPointSelectEvent');
      jest.spyOn(travelPointService, 'getNearestAddressesBy').mockReturnValue(of(getNearestTravelPoints()));
      componentUnderTest.ngOnInit();
      fixture.detectChanges();

      fixture.debugElement.query(By.directive(TravelPointListComponent)).componentInstance.travelPointSelectEvent.emit(testTravelPoint);

      expect(travelPointSelectEventSpy).toHaveBeenCalledTimes(1);
      expect(travelPointSelectEventSpy).toHaveBeenCalledWith(testTravelPoint);
    });

    it('should be called "dismiss" from matBottomSheetRef when "handleNearestTravelPointSelectEvent" is called', () => {
      const matBottomSheetRefSpy: jest.SpyInstance = jest.spyOn(matBottomSheetRef, 'dismiss');
      const testTravelPoint: NearestTravelPointFragment = getFurtwangenKindergardenTravelPoint();

      componentUnderTest.handleNearestTravelPointSelectEvent(testTravelPoint);

      expect(matBottomSheetRefSpy).toHaveBeenCalledTimes(1);
      expect(matBottomSheetRefSpy).toHaveBeenCalledWith(testTravelPoint);
    });
  });

  describe('with useNearestAddress = false', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          NearestTravelPointSearchComponent,
          MockComponent(TravelPointListComponent),
          MockComponent(LoadingComponent),
          MockPipe(TravelPointSearchNoResultMessagePipe, () => TEST_NO_RESULT_MESSAGE)
        ],
        imports: [
          MatBottomSheetModule
        ],
        providers: [
          MockProvider(TravelPointApiService),
          MockProvider(MatBottomSheetRef),
          {
            provide: MAT_BOTTOM_SHEET_DATA,
            useValue: {
              lat: TEST_LATITUDE,
              lng: TEST_LONGITUDE
            }
          },
          {
            provide: USE_NEAREST_ADDRESS,
            useValue: false
          },
          {
            provide: RADIUS_IN_KILOMETERS,
            useValue: TEST_RADIUS_IN_KILOMETERS
          }
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NearestTravelPointSearchComponent);
      componentUnderTest = fixture.componentInstance;
      travelPointService = TestBed.inject(TravelPointApiService);
      matBottomSheetRef = TestBed.inject(MatBottomSheetRef);
      fixture.detectChanges();
    });

    it('should be call "getNearestStationsBy" from travelPointService with correct params when component is initialized', (done) => {
      const travelPointServiceSpy: jest.SpyInstance = jest.spyOn(travelPointService, 'getNearestStationsBy').mockReturnValue(of(getNearestTravelPoints()));

      componentUnderTest.ngOnInit();

      componentUnderTest.nearestTravelPoints$.subscribe(() => {
        expect(travelPointServiceSpy).toHaveBeenCalledTimes(1);
        expect(travelPointServiceSpy).toBeCalledWith(TEST_LONGITUDE, TEST_LATITUDE, TEST_RADIUS_IN_KILOMETERS);
        done();
      });
    });
  });
});
