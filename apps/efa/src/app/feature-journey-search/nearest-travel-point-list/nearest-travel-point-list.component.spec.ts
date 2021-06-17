import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestTravelPointListComponent } from './nearest-travel-point-list.component';
import { MockComponent, MockProvider } from 'ng-mocks';
import { SharedModule } from '../../shared/shared.module';
import { RADIUS_IN_KILOMETERS, USE_NEAREST_ADDRESS } from '../../../environments/config-tokens';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TravelPointApiService } from '../../shared/api/travel-point-api.service';
import { of } from 'rxjs';
import {
  getFurtwangenFriedrichStreetOneTravelPoint,
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint
} from '../../shared/objectmothers/travel-point-object-mother';
import { NearestTravelPointListItemComponent } from '../nearest-travel-point-list-item/nearest-travel-point-list-item.component';
import { expect } from '@jest/globals';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDividerHarness } from '@angular/material/divider/testing';
import { MatListOptionHarness } from '@angular/material/list/testing';
import { LoadingComponent } from '@dravelopsfrontend/shared-styles';
import { NearestTravelPointFragment } from '@dravelopsfrontend/generated-content';

const TEST_LONGITUDE = 5;
const TEST_LATITUDE = 10;
const TEST_RADIUS_IN_KILOMETERS = 5;

describe('NearestTravelPointListComponent', () => {
  let travelPointService: TravelPointApiService;
  let componentUnderTest: NearestTravelPointListComponent;
  let fixture: ComponentFixture<NearestTravelPointListComponent>;
  let loader: HarnessLoader;

  describe('with useNearestAddress = true', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          NearestTravelPointListComponent,
          MockComponent(NearestTravelPointListItemComponent),
          MockComponent(LoadingComponent)
        ],
        imports: [
          SharedModule
        ],
        providers: [
          MockProvider(TravelPointApiService),
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
          },
          {
            provide: MatBottomSheetRef,
            useValue: {}
          }
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NearestTravelPointListComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      componentUnderTest = fixture.componentInstance;
      travelPointService = TestBed.inject(TravelPointApiService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(componentUnderTest).toBeTruthy();
    });

    it('should return "Addresse" when "getNoResultMessage" is called', () => {

      const result: string = componentUnderTest.getNoResultMessage();

      expect(result).toBe('Addresse');
    });

    it('should return "nearestTravelPoint$" when component is initialized', (done) => {
      spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([
        getFurtwangenSupermarketTravelPoint(),
        getFurtwangenKindergardenTravelPoint(),
        getFurtwangenFriedrichStreetOneTravelPoint()
      ]));

      componentUnderTest.ngOnInit();

      componentUnderTest.nearestTravelPoint$.subscribe((nearestTravelPoints: NearestTravelPointFragment[]) => {
        expect(nearestTravelPoints.length).toBe(3);
        expect(nearestTravelPoints[0]).toEqual(getFurtwangenSupermarketTravelPoint());
        expect(nearestTravelPoints[1]).toEqual(getFurtwangenKindergardenTravelPoint());
        expect(nearestTravelPoints[2]).toEqual(getFurtwangenFriedrichStreetOneTravelPoint());
        done();
      });
    });

    it('should execute "travelPointApiService" correctly when component is initialized', (done) => {
      spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([
        getFurtwangenSupermarketTravelPoint(),
        getFurtwangenKindergardenTravelPoint(),
        getFurtwangenFriedrichStreetOneTravelPoint()
      ]));

      componentUnderTest.ngOnInit();

      componentUnderTest.nearestTravelPoint$.subscribe(() => {
        expect(travelPointService.getNearestAddressesBy).toHaveBeenCalledTimes(1);
        expect(travelPointService.getNearestAddressesBy).toHaveBeenCalledWith(TEST_LONGITUDE, TEST_LATITUDE, TEST_RADIUS_IN_KILOMETERS);
        done();
      });
    });

    it('should show three nearest-travel-point-list-items with correct params and two dividers when component is initialized', async () => {
      spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([
        getFurtwangenSupermarketTravelPoint(),
        getFurtwangenKindergardenTravelPoint(),
        getFurtwangenFriedrichStreetOneTravelPoint()
      ]));

      componentUnderTest.ngOnInit();

      const matDividers: MatDividerHarness[] = await loader.getAllHarnesses(MatDividerHarness);
      expect(matDividers.length).toBe(2);
      const nearestTravelPointListItems: DebugElement[] = fixture.debugElement.queryAll(By.directive(NearestTravelPointListItemComponent));
      expect(nearestTravelPointListItems.length).toBe(3);
      expect(nearestTravelPointListItems[0].componentInstance.nearestTravelPoint).toEqual(getFurtwangenSupermarketTravelPoint());
      expect(nearestTravelPointListItems[1].componentInstance.nearestTravelPoint).toEqual(getFurtwangenKindergardenTravelPoint());
      expect(nearestTravelPointListItems[2].componentInstance.nearestTravelPoint).toEqual(getFurtwangenFriedrichStreetOneTravelPoint());
    });

    it('should show no result text and no nearest-travel-point-list-items when no nearestTravelPoints are found', () => {
      spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([]));

      componentUnderTest.ngOnInit();

      fixture.detectChanges();
      const nearestTravelPointListItems: DebugElement[] = fixture.debugElement.queryAll(By.directive(NearestTravelPointListItemComponent));
      expect(nearestTravelPointListItems.length).toBe(0);
      const noResultTextElement = fixture.nativeElement.querySelector('.no-result');
      expect(noResultTextElement).not.toBeNull();
      expect(noResultTextElement.innerHTML).toContain(TEST_RADIUS_IN_KILOMETERS);
    });

    it('should be called "getNoResultMessage" when no nearestTravelPoints are found', () => {
      spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([]));
      const getNoResultMessageSpy = spyOn(componentUnderTest, 'getNoResultMessage');

      componentUnderTest.ngOnInit();

      fixture.detectChanges();
      expect(getNoResultMessageSpy).toHaveBeenCalledTimes(2);
    });

    it('should be called "handleNearestTravelPointSelectEvent" when list-option is selected', async () => {
      const handleNearestTravelPointSpy = spyOn(componentUnderTest, 'handleNearestTravelPointSelectEvent');
      spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([
        getFurtwangenSupermarketTravelPoint()
      ]));
      componentUnderTest.ngOnInit();
      const matListOptionHarness: MatListOptionHarness = await loader.getHarness(MatListOptionHarness);

      await matListOptionHarness.select();

      expect(handleNearestTravelPointSpy).toHaveBeenCalledTimes(1);
      expect(handleNearestTravelPointSpy).toHaveBeenCalledWith(getFurtwangenSupermarketTravelPoint());
    });
  });

  describe('with useNearestAddress = false', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          NearestTravelPointListComponent,
          MockComponent(NearestTravelPointListItemComponent),
          MockComponent(LoadingComponent)
        ],
        imports: [
          SharedModule
        ],
        providers: [
          MockProvider(TravelPointApiService),
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
          },
          {
            provide: MatBottomSheetRef,
            useValue: {}
          }
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NearestTravelPointListComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      componentUnderTest = fixture.componentInstance;
      travelPointService = TestBed.inject(TravelPointApiService);
      fixture.detectChanges();
    });

    it('should return "Haltestelle" when "getNoResultMessage"G is called', () => {

      const result: string = componentUnderTest.getNoResultMessage();

      expect(result).toBe('Haltestelle');
    });

    it('should return "nearestTravelPoint$" when component is initialized', (done) => {
      spyOn(travelPointService, 'getNearestStationsBy').and.returnValue(of([
        getFurtwangenSupermarketTravelPoint(),
        getFurtwangenKindergardenTravelPoint(),
        getFurtwangenFriedrichStreetOneTravelPoint()
      ]));

      componentUnderTest.ngOnInit();

      componentUnderTest.nearestTravelPoint$.subscribe((nearestTravelPoints: NearestTravelPointFragment[]) => {
        expect(nearestTravelPoints.length).toBe(3);
        expect(nearestTravelPoints[0]).toEqual(getFurtwangenSupermarketTravelPoint());
        expect(nearestTravelPoints[1]).toEqual(getFurtwangenKindergardenTravelPoint());
        expect(nearestTravelPoints[2]).toEqual(getFurtwangenFriedrichStreetOneTravelPoint());
        done();
      });
    });

    it('should execute "travelPointApiService" correctly when component is initialized', (done) => {
      spyOn(travelPointService, 'getNearestStationsBy').and.returnValue(of([
        getFurtwangenSupermarketTravelPoint(),
        getFurtwangenKindergardenTravelPoint(),
        getFurtwangenFriedrichStreetOneTravelPoint()
      ]));

      componentUnderTest.ngOnInit();

      componentUnderTest.nearestTravelPoint$.subscribe(() => {
        expect(travelPointService.getNearestStationsBy).toHaveBeenCalledTimes(1);
        expect(travelPointService.getNearestStationsBy).toHaveBeenCalledWith(TEST_LONGITUDE, TEST_LATITUDE, TEST_RADIUS_IN_KILOMETERS);
        done();
      });
    });
  });
});
