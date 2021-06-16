import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestAddressesListComponent } from './nearest-addresses-list.component';
import { MockComponent, MockProvider } from 'ng-mocks';
import { SharedModule } from '../../shared/shared.module';
import { RADIUS_IN_KILOMETERS } from '../../../environments/config-tokens';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TravelPointApiService } from '../../shared/api/travel-point-api.service';
import { of } from 'rxjs';
import {
  getFurtwangenFriedrichStreetOneTravelPoint,
  getFurtwangenFriedrichStreetThreeTravelPoint,
  getFurtwangenFriedrichStreetTwoTravelPoint,
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint
} from '../../shared/objectmothers/travel-point-object-mother';
import { NearestAddressFragment } from '@dravelopsfrontend/generated-content';
import { NearestAddressesListItemComponent } from '../nearest-addresses-list-item/nearest-addresses-list-item.component';
import { expect } from '@jest/globals';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDividerHarness } from '@angular/material/divider/testing';
import { MatListOptionHarness } from '@angular/material/list/testing';

const TEST_LONGITUDE = 5;
const TEST_LATITUDE = 10;
const TEST_RADIUS_IN_KILOMETERS = 5;

describe('NearestAddressesListComponent', () => {
  let travelPointService: TravelPointApiService;
  let componentUnderTest: NearestAddressesListComponent;
  let fixture: ComponentFixture<NearestAddressesListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NearestAddressesListComponent,
        MockComponent(NearestAddressesListItemComponent)
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
    fixture = TestBed.createComponent(NearestAddressesListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    componentUnderTest = fixture.componentInstance;
    travelPointService = TestBed.inject(TravelPointApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should return "nearestAddresses$" when component is initialized', (done) => {
    spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([
      getFurtwangenSupermarketTravelPoint(),
      getFurtwangenKindergardenTravelPoint(),
      getFurtwangenFriedrichStreetOneTravelPoint(),
      getFurtwangenFriedrichStreetTwoTravelPoint(),
      getFurtwangenFriedrichStreetThreeTravelPoint()
    ]));

    componentUnderTest.ngOnInit();

    componentUnderTest.nearestAddresses$.subscribe((nearestAddresses: NearestAddressFragment[]) => {
      expect(nearestAddresses.length).toBe(5);
      expect(nearestAddresses[0]).toEqual(getFurtwangenSupermarketTravelPoint());
      expect(nearestAddresses[1]).toEqual(getFurtwangenKindergardenTravelPoint());
      expect(nearestAddresses[2]).toEqual(getFurtwangenFriedrichStreetOneTravelPoint());
      expect(nearestAddresses[3]).toEqual(getFurtwangenFriedrichStreetTwoTravelPoint());
      expect(nearestAddresses[4]).toEqual(getFurtwangenFriedrichStreetThreeTravelPoint());
      done();
    });
  });

  it('should execute "travelPointApiService" correctly when component is initialized', (done) => {
    spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([
      getFurtwangenSupermarketTravelPoint(),
      getFurtwangenKindergardenTravelPoint(),
      getFurtwangenFriedrichStreetOneTravelPoint(),
      getFurtwangenFriedrichStreetTwoTravelPoint(),
      getFurtwangenFriedrichStreetThreeTravelPoint()
    ]));

    componentUnderTest.ngOnInit();

    componentUnderTest.nearestAddresses$.subscribe(() => {
      expect(travelPointService.getNearestAddressesBy).toHaveBeenCalledTimes(1);
      expect(travelPointService.getNearestAddressesBy).toHaveBeenCalledWith(TEST_LONGITUDE, TEST_LATITUDE);
      done();
    });
  });

  it('should show five nearest-addresses-list-items with correct params and four dividers when component is initialized', async () => {
    spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([
      getFurtwangenSupermarketTravelPoint(),
      getFurtwangenKindergardenTravelPoint(),
      getFurtwangenFriedrichStreetOneTravelPoint(),
      getFurtwangenFriedrichStreetTwoTravelPoint(),
      getFurtwangenFriedrichStreetThreeTravelPoint()
    ]));

    componentUnderTest.ngOnInit();

    const matDividers: MatDividerHarness[] = await loader.getAllHarnesses(MatDividerHarness);
    expect(matDividers.length).toBe(4);
    const nearestAddressListItems: DebugElement[] = fixture.debugElement.queryAll(By.directive(NearestAddressesListItemComponent));
    expect(nearestAddressListItems.length).toBe(5);
    expect(nearestAddressListItems[0].componentInstance.nearestAddress).toEqual(getFurtwangenSupermarketTravelPoint());
    expect(nearestAddressListItems[1].componentInstance.nearestAddress).toEqual(getFurtwangenKindergardenTravelPoint());
    expect(nearestAddressListItems[2].componentInstance.nearestAddress).toEqual(getFurtwangenFriedrichStreetOneTravelPoint());
    expect(nearestAddressListItems[3].componentInstance.nearestAddress).toEqual(getFurtwangenFriedrichStreetTwoTravelPoint());
    expect(nearestAddressListItems[4].componentInstance.nearestAddress).toEqual(getFurtwangenFriedrichStreetThreeTravelPoint());
  });

  it('should show no result text and no nearest-addresses-list-items when no nearestAddresses are found', () => {
    spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([]));

    componentUnderTest.ngOnInit();

    fixture.detectChanges();
    const nearestAddressListItems: DebugElement[] = fixture.debugElement.queryAll(By.directive(NearestAddressesListItemComponent));
    expect(nearestAddressListItems.length).toBe(0);
    const noResultTextElement = fixture.nativeElement.querySelector('.no-result');
    expect(noResultTextElement).not.toBeNull();
    expect(noResultTextElement.innerHTML).toContain(TEST_RADIUS_IN_KILOMETERS);
  });

  it('should be called "handleNearestAddressSelectEvent" when list-option is selected', async () => {
    const handleNearestAddressSpy = spyOn(componentUnderTest, 'handleNearestAddressSelectEvent');
    spyOn(travelPointService, 'getNearestAddressesBy').and.returnValue(of([
      getFurtwangenSupermarketTravelPoint()
    ]));
    componentUnderTest.ngOnInit();
    const matListOptionHarness: MatListOptionHarness = await loader.getHarness(MatListOptionHarness);

    await matListOptionHarness.select();

    expect(handleNearestAddressSpy).toHaveBeenCalledTimes(1);
    expect(handleNearestAddressSpy).toHaveBeenCalledWith(getFurtwangenSupermarketTravelPoint());
  });
});
