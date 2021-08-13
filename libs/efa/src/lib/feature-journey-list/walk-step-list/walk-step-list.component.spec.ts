import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkStepListComponent } from './walk-step-list.component';
import { MockPipe } from 'ng-mocks';
import { WalkStepArrowIconPipe } from '../pipes/walk-step-arrow-icon-pipe/walk-step-arrow-icon.pipe';
import { WalkStepDescriptionPipe } from '../pipes/walk-step-description-pipe/walk-step-description.pipe';
import {
  getExampleWalkSteps,
  getFriedrichStreetWalkStep,
  getLuisenStreetWalkStep
} from '../../domain/objectmothers/walk-step-object-mother';
import { MatIconHarness } from '@angular/material/icon/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconModule } from '@angular/material/icon';
import { WalkStepFragment } from '../../domain/model/generated';

const CONVERT_KILOMETERS_TO_METERS = 1000;

describe('WalkStepListComponent', () => {
  let componentUnderTest: WalkStepListComponent;
  let fixture: ComponentFixture<WalkStepListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WalkStepListComponent,
        MockPipe(WalkStepArrowIconPipe, value => `mock:${value}`),
        MockPipe(WalkStepDescriptionPipe, value => `mock:${value}`)
      ],
      imports: [MatIconModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkStepListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should show four icons with two walkSteps when isOriginPoint and isDestinationPoint is always false', async () => {
    componentUnderTest.walkSteps = getExampleWalkSteps();

    fixture.detectChanges();

    const matIcons: MatIconHarness[] = await loader.getAllHarnesses(MatIconHarness);
    expect(matIcons.length).toBe(4);
    expect(await matIcons[1].getName()).toBe('directions_walk');
    expect(await matIcons[3].getName()).toBe('directions_walk');
    expect(fixture.nativeElement.querySelectorAll('.distance').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.distance')[0].innerHTML).toContain(`${getExampleWalkSteps()[0].distanceInKilometers * CONVERT_KILOMETERS_TO_METERS}`);
    expect(fixture.nativeElement.querySelectorAll('.distance')[1].innerHTML).toContain(`${getExampleWalkSteps()[1].distanceInKilometers * CONVERT_KILOMETERS_TO_METERS}`);
  });

  it('should show three rows with two walkSteps when isOriginPoint is true and isDestinationPoint is false', async () => {
    componentUnderTest.walkSteps = [{
      ...getFriedrichStreetWalkStep(),
      isOriginPoint: true
    }, getLuisenStreetWalkStep()];

    fixture.detectChanges();

    const matIcons: MatIconHarness[] = await loader.getAllHarnesses(MatIconHarness);
    expect(matIcons.length).toBe(3);
  });

  it('should show three rows with two walkSteps when isOriginPoint is false and isDestinationPoint is true', async () => {
    componentUnderTest.walkSteps = [getFriedrichStreetWalkStep(), {
      ...getLuisenStreetWalkStep(),
      isDestinationPoint: true
    }];

    fixture.detectChanges();

    const matIcons: MatIconHarness[] = await loader.getAllHarnesses(MatIconHarness);
    expect(matIcons.length).toBe(3);
  });

  it('should emit "walkStepSelectedEvent" when "emitWalkStepSelectedEvent" is called with payload', () => {
    const testWalkStep: WalkStepFragment = getFriedrichStreetWalkStep();
    let walkStepResult: WalkStepFragment;
    componentUnderTest.walkStepSelectedEvent.subscribe((walkStep: WalkStepFragment) => {
      walkStepResult = walkStep;
    });

    componentUnderTest.emitWalkStepSelectedEvent(testWalkStep);

    expect(walkStepResult).toEqual(testWalkStep);
  });

  it('should be called "emitWalkStepSelectedEvent" when distance icon is clicked', () => {
    const emitWalkStepSelectedEventSpy = jest.spyOn(componentUnderTest, 'emitWalkStepSelectedEvent');
    componentUnderTest.walkSteps = getExampleWalkSteps();
    fixture.detectChanges();
    const firstDistanceIcon = fixture.nativeElement.querySelector('.distance-icon');

    firstDistanceIcon.click();

    expect(emitWalkStepSelectedEventSpy).toHaveBeenCalledTimes(1);
    expect(emitWalkStepSelectedEventSpy).toHaveBeenCalledWith(getExampleWalkSteps()[0]);
  });

  it('should be called "emitWalkStepSelectedEvent" when distance text is clicked', () => {
    const emitWalkStepSelectedEventSpy = jest.spyOn(componentUnderTest, 'emitWalkStepSelectedEvent');
    componentUnderTest.walkSteps = getExampleWalkSteps();
    fixture.detectChanges();
    const firstDistanceIcon = fixture.nativeElement.querySelector('.distance-icon');

    firstDistanceIcon.click();

    expect(emitWalkStepSelectedEventSpy).toHaveBeenCalledTimes(1);
    expect(emitWalkStepSelectedEventSpy).toHaveBeenCalledWith(getExampleWalkSteps()[0]);
  });
});
