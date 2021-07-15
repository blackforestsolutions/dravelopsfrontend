import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LegListItemComponent } from './leg-list-item.component';
import { VehicleTypePipe } from '../pipes/vehicle-type-pipe/vehicle-type.pipe';
import { DurationPipe } from '../pipes/duration-pipe/duration.pipe';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockComponent, MockPipe } from 'ng-mocks';
import { FootpathMapComponent } from '../footpath-map/footpath-map.component';
import {
  getFurtwangenIlbenstreetToBleibachLeg,
  getWaldkirchKastelberghalleToSickLeg
} from '../../shared/objectmothers/leg-object-mother';
import { LegFragment } from '@dravelopsfrontend/generated-content';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VehicleTypeIconPipe } from '../pipes/vehicle-type-icon-pipe/vehicle-type-icon.pipe';

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
          MockComponent(FootpathMapComponent)
        ],
        imports: [
          MatDividerModule,
          MatIconModule,
          MatButtonModule
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

    it('should show one intermediateStops when intermediateStopIconButton is toggled', waitForAsync(() => {
      const expectedLeg: LegFragment = getFurtwangenIlbenstreetToBleibachLeg();
      const intermediateStopsButton = fixture.nativeElement.querySelector('button');

      intermediateStopsButton.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const intermediateStopName = fixture.nativeElement.querySelector('.intermediateStopName');
        const intermediateStopArrivalTime = fixture.nativeElement.querySelector('.intermediateStopArrivalTime');
        expect(intermediateStopName.innerHTML).toBe(expectedLeg.intermediateStops[0].name);
        expect(intermediateStopArrivalTime.innerHTML).not.toBe('');
      });
    }));


    it('should show one intermediateStops when intermediateStopText is toggled', waitForAsync(() => {
      const expectedLeg: LegFragment = getFurtwangenIlbenstreetToBleibachLeg();
      const intermediateStopText = fixture.nativeElement.querySelector('.intermediateStops');

      intermediateStopText.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const intermediateStopName = fixture.nativeElement.querySelector('.intermediateStopName');
        const intermediateStopArrivalTime = fixture.nativeElement.querySelector('.intermediateStopArrivalTime');
        expect(intermediateStopName.innerHTML).toBe(expectedLeg.intermediateStops[0].name);
        expect(intermediateStopArrivalTime.innerHTML).not.toBe('');
      });
    }));

    it('should not show delayInMinutes when value is zero ', () => {
      const delaySpans: DebugElement[] = fixture.debugElement.queryAll(By.css('.delay'));

      expect(delaySpans.length).toBe(0);
    });

    it('should show four delay elements when delayInMinutes is greater than zero and intermediateStops are allowed to show', waitForAsync(() => {
      componentUnderTest.showIntermediateStops = true;
      componentUnderTest.leg.delayInMinutes = 1;

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const delaySpans: DebugElement[] = fixture.debugElement.queryAll(By.css('.delay'));
        expect(delaySpans.length).toBe(4);
        expect(delaySpans[0].nativeElement.innerHTML).toBe(' +1');
        expect(delaySpans[1].nativeElement.innerHTML).toBe(' +1');
        expect(delaySpans[2].nativeElement.innerHTML).toBe(' +1');
        expect(delaySpans[3].nativeElement.innerHTML).toBe(' +1');
      });
    }));

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

    it('should show the intermediateStopButton when intermediateStops are greater than zero', async () => {

      const intermediateStopsButton: MatButtonHarness = await loader.getHarness<MatButtonHarness>(MatButtonHarness);

      const buttonText: string = await intermediateStopsButton.getText();
      expect(buttonText).toBe('chevron_left');
    });

    it('should not show the intermediateStopButton when intermediateStops are zero', waitForAsync(() => {
      componentUnderTest.leg.intermediateStops = [];

      const intermediateStopsButton = fixture.nativeElement.querySelector('button');
      expect(intermediateStopsButton).toBeInstanceOf(HTMLButtonElement);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const intermediateStopsButton = fixture.nativeElement.querySelector('button');
        expect(intermediateStopsButton).toBeNull();
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

      expect(result).toBe('5 / 6');
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
          MockComponent(FootpathMapComponent)
        ],
        imports: [
          MatDividerModule,
          MatIconModule,
          MatButtonModule
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

    it('should show FootpathComponent when footpathMapIconButton is toggled', waitForAsync(() => {
      const footpathMapIconButton = fixture.nativeElement.querySelector('#footpathMapToggleButton');

      footpathMapIconButton.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const footpathMapComponent: FootpathMapComponent = fixture.debugElement.query(By.directive(FootpathMapComponent)).componentInstance;
        expect(footpathMapComponent).toBeDefined();
        expect(footpathMapComponent.waypoints.length).toBe(getWaldkirchKastelberghalleToSickLeg().waypoints.length);
      });
    }));

    it('should show FootpathComponent when footpathMapDistanceInKilometersText is clicked', () => {
      const footpathMapDistanceInKilometersText = fixture.nativeElement.querySelector('.footpath');

      footpathMapDistanceInKilometersText.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const footpathMapComponent: FootpathMapComponent = fixture.debugElement.query(By.directive(FootpathMapComponent)).componentInstance;
        expect(footpathMapComponent).toBeDefined();
        expect(footpathMapComponent.waypoints.length).toBe(getWaldkirchKastelberghalleToSickLeg().waypoints.length);
      });
    });

    it('should show the footpathMapIconButton and footpathMapDistanceInKilometersText when waypoints are greater than zero', async () => {
      const footpathMapIconButton: MatButtonHarness = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
      const footpathMapDistanceInKilometersText = fixture.nativeElement.querySelector('.footpath');

      const buttonText: string = await footpathMapIconButton.getText();
      expect(buttonText).toBe('chevron_left');
      expect(footpathMapDistanceInKilometersText.innerHTML).toBe(' 0.445 km ');
    });

    it('should not show the footpathMapIconButton when waypoints are zero', waitForAsync(() => {
      componentUnderTest.leg.waypoints = [];

      const footpathMapIconButton = fixture.nativeElement.querySelector('#footpathMapToggleButton');
      expect(footpathMapIconButton).toBeInstanceOf(HTMLButtonElement);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const footpathMapIconButton = fixture.nativeElement.querySelector('#footpathMapToggleButton');
        expect(footpathMapIconButton).toBeNull();
      });
    }));

  });
});
