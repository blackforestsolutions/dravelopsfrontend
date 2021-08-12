import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeatureShellComponent } from './feature-shell.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { MockComponent } from 'ng-mocks';
import { Component, DebugElement } from '@angular/core';
import { JourneySearchComponent } from '../feature-journey-search/journey-search/journey-search.component';
import {
  getApiTokenWithIsRoundTripAsFalse,
  getApiTokenWithIsRoundTripAsTrue
} from '../domain/objectmothers/api-token-object-mother';
import { describe } from '@jest/globals';
import { FabButtonComponent } from '@dravelopsfrontend/shared';
import { ApiToken } from '../domain/model/api-token';

@Component({ template: '' })
// for testing purpose
// eslint-disable-next-line @angular-eslint/component-class-suffix
class JourneyListComponentStub {
}

describe('FeatureShellContainerComponent', () => {
  let componentUnderTest: FeatureShellComponent;
  let location: Location;
  let fixture: ComponentFixture<FeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {
          // necessary for having a correct url in WebBrowserTest
          // eslint-disable-next-line max-len
          path: ':isRoundTrip/:departureLatitude/:departureLongitude/:arrivalLatitude/:arrivalLongitude/:outwardJourneyDateTime/:outwardJourneyIsArrivalDateTime',
          component: JourneyListComponentStub
        },
        {
          // necessary for having a correct url in WebBrowserTest
          // eslint-disable-next-line max-len
          path: ':isRoundTrip/:departureLatitude/:departureLongitude/:arrivalLatitude/:arrivalLongitude/:outwardJourneyDateTime/:outwardJourneyIsArrivalDateTime/:backwardJourneyDateTime/:backwardJourneyIsArrivalDateTime',
          component: JourneyListComponentStub
        }
      ])],
      declarations: [
        FeatureShellComponent,
        JourneyListComponentStub,
        MockComponent(JourneySearchComponent),
        MockComponent(FabButtonComponent)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(FeatureShellComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should have the right initial components', () => {
    const journeyListStubComponent: DebugElement = fixture.debugElement.query(By.directive(JourneyListComponentStub));
    const journeySearchComponent: DebugElement = fixture.debugElement.query(By.directive(JourneySearchComponent));

    expect(journeyListStubComponent).toBeNull();
    expect(journeySearchComponent).not.toBeNull();
  });

  it('should be called "handleApiTokenEvent" on "submitApiTokenEvent"', () => {
    const handleApiTokenEventSpy = spyOn(componentUnderTest, 'handleApiTokenEvent');
    const journeySearchComponent: JourneySearchComponent = fixture.debugElement
      .query(By.directive(JourneySearchComponent)).componentInstance;

    journeySearchComponent.submitApiTokenEvent.emit(getApiTokenWithIsRoundTripAsTrue());

    expect(handleApiTokenEventSpy).toHaveBeenCalledTimes(1);
    expect(handleApiTokenEventSpy).toHaveBeenCalledWith(getApiTokenWithIsRoundTripAsTrue());
  });

  it('should navigate with correct params when "handleApiTokenEvent" is called and isRoundTrip = true', waitForAsync(() => {
    const testToken: ApiToken = getApiTokenWithIsRoundTripAsTrue();

    componentUnderTest.handleApiTokenEvent(testToken);

    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/true/48.04832/8.209972/48.088204/7.950507/1601463600000/true/1601550000000/true');
      const journeyListStubComponent: DebugElement = fixture.debugElement.query(By.directive(JourneyListComponentStub));
      const journeySearchComponent: DebugElement = fixture.debugElement.query(By.directive(JourneySearchComponent));
      expect(journeySearchComponent).not.toBeNull();
      expect(journeyListStubComponent).not.toBeNull();
    });
  }));

  it('should navigate with correct params when "handleApiTokenEvent" is called and isRoundTrip = false', waitForAsync(() => {
    const testToken: ApiToken = getApiTokenWithIsRoundTripAsFalse();

    componentUnderTest.handleApiTokenEvent(testToken);

    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/false/48.04832/8.209972/48.088204/7.950507/1601463600000/true');
      const journeyListStubComponent: DebugElement = fixture.debugElement.query(By.directive(JourneyListComponentStub));
      const journeySearchComponent: DebugElement = fixture.debugElement.query(By.directive(JourneySearchComponent));
      expect(journeySearchComponent).not.toBeNull();
      expect(journeyListStubComponent).not.toBeNull();
    });
  }));
});
