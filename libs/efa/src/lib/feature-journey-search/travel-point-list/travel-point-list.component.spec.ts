import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPointListComponent } from './travel-point-list.component';
import { MockComponent, MockPipe } from 'ng-mocks';
import { TravelPointListItemComponent } from '../travel-point-list-item/travel-point-list-item.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { TravelPointTouchFilterPipe } from '../pipes/travel-point-touch-filter-pipe/travel-point-touch-filter-.pipe';
import {
  getFurtwangenFriedrichStreetFourTravelPoint,
  getFurtwangenFriedrichStreetOneTravelPoint,
  getFurtwangenFriedrichStreetThreeTravelPoint,
  getFurtwangenFriedrichStreetTwoTravelPoint,
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint,
  getNearestTravelPoints
} from '../../domain/objectmothers/travel-point-object-mother';
import { MatDividerHarness } from '@angular/material/divider/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { expect } from '@jest/globals';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TravelPointSearchType } from '../travel-point-search/travel-point-search.component';
import { MatListOptionHarness } from '@angular/material/list/testing';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../domain/model/generated';


describe('TravelPointListComponent', () => {
  let componentUnderTest: TravelPointListComponent;
  let fixture: ComponentFixture<TravelPointListComponent>;
  let loader: HarnessLoader;

  describe('with travel points', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TravelPointListComponent,
          MockComponent(TravelPointListItemComponent),
          MockPipe(TravelPointTouchFilterPipe, () => getNearestTravelPoints())
        ],
        imports: [
          MatListModule,
          MatDividerModule
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TravelPointListComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      componentUnderTest = fixture.componentInstance;
      componentUnderTest.travelPoints = getNearestTravelPoints();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(componentUnderTest).toBeTruthy();
    });

    it('should show six travel-point-list-item elements with correct params and five item dividers when component is initialized', async () => {
      const testTravelPointSearchType: TravelPointSearchType = 'map';
      componentUnderTest.travelPointSearchType = testTravelPointSearchType;

      fixture.detectChanges();

      const matDividers: MatDividerHarness[] = await loader.getAllHarnesses(MatDividerHarness);
      expect(matDividers.length).toBe(5);
      const travelPointListItems: DebugElement[] = fixture.debugElement.queryAll(By.directive(TravelPointListItemComponent));
      expect(travelPointListItems.length).toBe(6);
      expect(travelPointListItems[0].componentInstance.travelPoint).toEqual(getFurtwangenSupermarketTravelPoint());
      expect(travelPointListItems[0].componentInstance.travelPointSearchType).toBe(testTravelPointSearchType);
      expect(travelPointListItems[1].componentInstance.travelPoint).toEqual(getFurtwangenKindergardenTravelPoint());
      expect(travelPointListItems[1].componentInstance.travelPointSearchType).toBe(testTravelPointSearchType);
      expect(travelPointListItems[2].componentInstance.travelPoint).toEqual(getFurtwangenFriedrichStreetOneTravelPoint());
      expect(travelPointListItems[2].componentInstance.travelPointSearchType).toBe(testTravelPointSearchType);
      expect(travelPointListItems[3].componentInstance.travelPoint).toEqual(getFurtwangenFriedrichStreetTwoTravelPoint());
      expect(travelPointListItems[3].componentInstance.travelPointSearchType).toBe(testTravelPointSearchType);
      expect(travelPointListItems[4].componentInstance.travelPoint).toEqual(getFurtwangenFriedrichStreetThreeTravelPoint());
      expect(travelPointListItems[4].componentInstance.travelPointSearchType).toBe(testTravelPointSearchType);
      expect(travelPointListItems[5].componentInstance.travelPoint).toEqual(getFurtwangenFriedrichStreetFourTravelPoint());
      expect(travelPointListItems[5].componentInstance.travelPointSearchType).toBe(testTravelPointSearchType);
    });

    it('should be called "handleTravelPointSelectEvent" when one travel-point-option is called', async () => {
      const travelPointOptions: MatListOptionHarness[] = await loader.getAllHarnesses(MatListOptionHarness);
      const handleTravelPointSelectEventSpy = jest.spyOn(componentUnderTest, 'handleTravelPointSelectEvent');

      await travelPointOptions[0].select();

      expect(handleTravelPointSelectEventSpy).toHaveBeenCalledTimes(1);
      expect(handleTravelPointSelectEventSpy).toHaveBeenCalledWith(getNearestTravelPoints()[0]);
    });

    it('should trigger a "travelPointSelectEvent" with correct output when "handleTravelPointSelectEvent" is called', () => {
      const testTravelPoint: AutocompleteAddressFragment | NearestTravelPointFragment = getFurtwangenSupermarketTravelPoint();
      let receivedTravelPoint: AutocompleteAddressFragment | NearestTravelPointFragment;
      componentUnderTest.travelPointSelectEvent.subscribe((travelPoint: AutocompleteAddressFragment | NearestTravelPointFragment) => {
        receivedTravelPoint = travelPoint;
      });

      componentUnderTest.handleTravelPointSelectEvent(testTravelPoint);

      expect(receivedTravelPoint).toEqual(testTravelPoint);
    });
  });

  describe('with no travel points', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TravelPointListComponent,
          MockComponent(TravelPointListItemComponent),
          MockPipe(TravelPointTouchFilterPipe, () => [])
        ],
        imports: [
          MatListModule,
          MatDividerModule
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TravelPointListComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      componentUnderTest = fixture.componentInstance;
      componentUnderTest.travelPoints = [];
      fixture.detectChanges();
    });

    it('should show no result message when no travel points are found and isLoading is false', async () => {
      componentUnderTest.travelPoints = [];
      componentUnderTest.isLoading = false;
      componentUnderTest.noResultMessage = 'Test';

      fixture.detectChanges();

      const matListOptions: MatListOptionHarness[] = await loader.getAllHarnesses(MatListOptionHarness);
      expect(matListOptions.length).toBe(1);
      expect(await matListOptions[0].isDisabled()).toBe(true);
      expect(await matListOptions[0].getText()).toBe('Test');
    });
  });
});
