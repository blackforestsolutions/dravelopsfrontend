import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LegListItemComponent } from './leg-list-item.component';
import { VehicleTypePipe } from '../pipes/vehicle-type-pipe/vehicle-type.pipe';
import { DurationPipe } from '../pipes/duration-pipe/duration.pipe';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockComponent, MockPipe } from 'ng-mocks';
import { FootpathMapComponent } from '../footpath-map/footpath-map.component';
import {
  getFurtwangenIlbenstreetToBleibachLeg,
  getWaldkirchKastelberghalleToSickLeg
} from '../../domain/objectmothers/leg-object-mother';
import { LegFragment } from '../../domain/model/generated';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { VehicleTypeIconPipe } from '../pipes/vehicle-type-icon-pipe/vehicle-type-icon.pipe';
import { IntermediateStopsListComponent } from '../intermediate-stops-list/intermediate-stops-list.component';
import { MatIconHarness } from '@angular/material/icon/testing';

describe('LegListItemComponent', () => {
  let componentUnderTest: LegListItemComponent;
  let fixture: ComponentFixture<LegListItemComponent>;
  let loader: HarnessLoader;

  describe('with transit data (intermediateStops)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          LegListItemComponent,
          MockPipe(VehicleTypePipe, value => `mock:${value}`),
          MockPipe(DurationPipe, value => `mock:${value}`),
          MockPipe(VehicleTypeIconPipe, value => `mock:${value}`),
          MockComponent(FootpathMapComponent),
          MockComponent(IntermediateStopsListComponent)
        ],
        imports: [
          MatDividerModule,
          MatIconModule
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(LegListItemComponent);
      componentUnderTest = fixture.componentInstance;
      componentUnderTest.leg = { ...getFurtwangenIlbenstreetToBleibachLeg() };
      loader = TestbedHarnessEnvironment.loader(fixture);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(componentUnderTest).toBeTruthy();
    });

    it('should change "showIntermediateStops" from false to true when "toggleIntermediateStops" is called', () => {

      componentUnderTest.toggleIntermediateStops();

      expect(componentUnderTest.showIntermediateStops).toBeTruthy();
    });

    it('should change "showIntermediateStops" from true to false when "toggleIntermediateStops" is called', () => {
      componentUnderTest.showIntermediateStops = true;

      componentUnderTest.toggleIntermediateStops();

      expect(componentUnderTest.showIntermediateStops).toBeFalsy();
    });

    it('should show intermediateStops when intermediateStopIconButton is toggled', waitForAsync(() => {
      const intermediateStopsButton = fixture.nativeElement.querySelector('.expandIcon');

      intermediateStopsButton.click();

      fixture.detectChanges();
      const intermediateStopList: DebugElement = fixture.debugElement.query(By.directive(IntermediateStopsListComponent));
      expect(intermediateStopList).toBeDefined();
      expect(intermediateStopList.componentInstance.leg).toEqual(getFurtwangenIlbenstreetToBleibachLeg());
    }));


    it('should show one intermediateStops when intermediateStopText is toggled', waitForAsync(() => {
      const intermediateStopText = fixture.nativeElement.querySelector('.intermediateStops');

      intermediateStopText.click();

      fixture.detectChanges();
      const intermediateStopList: DebugElement = fixture.debugElement.query(By.directive(IntermediateStopsListComponent));
      expect(intermediateStopList).toBeDefined();
      expect(intermediateStopList.componentInstance.leg).toEqual(getFurtwangenIlbenstreetToBleibachLeg());
    }));

    it('should not show delayInMinutes when value is zero ', () => {
      const delaySpans: DebugElement[] = fixture.debugElement.queryAll(By.css('.delay'));

      expect(delaySpans.length).toBe(0);
    });

    it('should show "vehicleType" and "vehicleName" if intermediate stops and vehicleDescriptions are available', () => {
      const vehicleNumber: string = fixture.nativeElement.querySelector('.vehicleNumber').innerHTML;
      expect(vehicleNumber).toContain('272');
    });

    it('should show intermediateStopText when intermediateStops are greater than zero and whether vehicleNumber nor vehicleName is available', () => {
      const testLeg: LegFragment = getFurtwangenIlbenstreetToBleibachLeg();
      testLeg.vehicleName = '';
      testLeg.vehicleNumber = '';
      componentUnderTest.leg = testLeg;

      fixture.detectChanges();

      const intermediateStopText: string = fixture.nativeElement.querySelector('.intermediateStopsText').innerHTML;
      expect(intermediateStopText).toBe('2 Zwischenhalte');
    });

    it('should show the intermediateStopIcon when intermediateStops are greater than zero', async () => {

      const intermediateStopsIcons: MatIconHarness[] = await loader.getAllHarnesses(MatIconHarness.with({
        selector: '.expandIcon'
      }));

      expect(intermediateStopsIcons.length).toBe(1);
      expect(await intermediateStopsIcons[0].getName()).toBe('chevron_left');
    });

    it('should not show the intermediateStopIcon and intermediateStopText when intermediateStops are zero', waitForAsync(() => {
      componentUnderTest.leg.intermediateStops = [];

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const intermediateStopsIcon = fixture.nativeElement.querySelector('.expandIcon');
        expect(intermediateStopsIcon).toBeNull();
        const intermediateStopsText = fixture.nativeElement.querySelector('.intermediateStops');
        expect(intermediateStopsText).toBeNull();
      });
    }));


    it('should return 4 / 5 grid-row on arrivalTime when footpath map is unfold', () => {
      componentUnderTest.showFootpathMap = true;

      const result: string = componentUnderTest.positionArrivalTime();

      expect(result).toBe('4 / 5');
    });

    it('should return 3 / 4 grid-row when neither footpath map nor intermediate stops are unfold', () => {
      componentUnderTest.showIntermediateStops = false;
      componentUnderTest.showFootpathMap = false;

      const result: string = componentUnderTest.positionArrivalTime();

      expect(result).toBe('3 / 4');
    });

    it('should return 5 / 6 grid row when neither intermediate stops are unfold', () => {
      componentUnderTest.showIntermediateStops = true;
      componentUnderTest.leg = getFurtwangenIlbenstreetToBleibachLeg();

      const result: string = componentUnderTest.positionArrivalTime();

      expect(result).toBe('4 / 5');
    });
  });

  describe('with footpath data (waypoints)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          LegListItemComponent,
          MockPipe(VehicleTypePipe, value => `mock:${value}`),
          MockPipe(DurationPipe, value => `mock:${value}`),
          MockPipe(VehicleTypeIconPipe, value => `mock:${value}`),
          MockComponent(FootpathMapComponent),
          MockComponent(IntermediateStopsListComponent)
        ],
        imports: [
          MatDividerModule,
          MatIconModule
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(LegListItemComponent);
      componentUnderTest = fixture.componentInstance;
      componentUnderTest.leg = { ...getWaldkirchKastelberghalleToSickLeg() };
      loader = TestbedHarnessEnvironment.loader(fixture);
      fixture.detectChanges();
    });

    it('should change "showFootpathMap" from true to false when "toggleFootpathMap" is called', () => {
      componentUnderTest.showFootpathMap = true;

      componentUnderTest.toggleFootpathMap();

      expect(componentUnderTest.showFootpathMap).toBeFalsy();
    });

    it('should change "showFootpathMap" from false to true when "toggleFootpathMap" is called', () => {


      componentUnderTest.toggleFootpathMap();

      expect(componentUnderTest.showFootpathMap).toBeTruthy();
    });

    it('should show FootpathComponent when footpathMapIcon is toggled', waitForAsync(() => {
      const footpathMapIcon = fixture.nativeElement.querySelector('.expandIcon');

      footpathMapIcon.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const footpathMapComponent: FootpathMapComponent = fixture.debugElement.query(By.directive(FootpathMapComponent)).componentInstance;
        expect(footpathMapComponent).toBeDefined();
        expect(footpathMapComponent.waypoints).toEqual(getWaldkirchKastelberghalleToSickLeg().waypoints);
        expect(footpathMapComponent.walkSteps).toEqual(getWaldkirchKastelberghalleToSickLeg().walkSteps);
      });
    }));

    it('should show FootpathComponent when footpathMapDistanceInKilometersText is clicked', () => {
      const footpathMapDistanceInKilometersText = fixture.nativeElement.querySelector('.footpath');

      footpathMapDistanceInKilometersText.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const footpathMapComponent: FootpathMapComponent = fixture.debugElement.query(By.directive(FootpathMapComponent)).componentInstance;
        expect(footpathMapComponent).toBeDefined();
        expect(footpathMapComponent.waypoints).toEqual(getWaldkirchKastelberghalleToSickLeg().waypoints);
        expect(footpathMapComponent.walkSteps).toEqual(getWaldkirchKastelberghalleToSickLeg().walkSteps);
      });
    });

    it('should show the footpathMapIcon and footpathMapDistanceInKilometersText when waypoints are greater than zero', async () => {
      const footpathMapIcons: MatIconHarness[] = await loader.getAllHarnesses(MatIconHarness.with({
        selector: '.expandIcon'
      }));
      const footpathMapDistanceInKilometersText = fixture.nativeElement.querySelector('.footpath');

      expect(footpathMapIcons.length).toBe(1);
      expect(await footpathMapIcons[0].getName()).toBe('chevron_left');
      expect(footpathMapDistanceInKilometersText.innerHTML).toBe(' 0.445 km ');
    });

    it('should not show the footpathMapIcon and footpathMapDistanceInKilometersText when waypoints are zero', waitForAsync(() => {
      componentUnderTest.leg.waypoints = [];

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const footpathMapIcon = fixture.nativeElement.querySelector('.expandIcon');
        expect(footpathMapIcon).toBeNull();
        const footpathMapDistanceInKilometersText = fixture.nativeElement.querySelector('.footpath');
        expect(footpathMapDistanceInKilometersText).toBeNull();
      });
    }));

  });
});
