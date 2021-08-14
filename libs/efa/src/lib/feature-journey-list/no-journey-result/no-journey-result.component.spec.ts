import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoJourneyResultComponent } from './no-journey-result.component';
import { MockDirective, ngMocks } from 'ng-mocks';
import { ScrollTopDirective } from '@dravelopsfrontend/shared';
import { JourneyFragment } from '../../domain/model/generated';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonModule } from '@angular/material/button';

describe('NoJourneyResultComponent', () => {
  let componentUnderTest: NoJourneyResultComponent;
  let fixture: ComponentFixture<NoJourneyResultComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NoJourneyResultComponent,
        MockDirective(ScrollTopDirective)
      ],
      imports: [
        MatButtonModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoJourneyResultComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should emit "buyOutwardJourneyEvent" when "buyOutwardJourney" is executed', (done) => {
    componentUnderTest.buyOutwardJourneyEvent.subscribe((journey: JourneyFragment) => {
      expect(journey).toBeNull();
      done();
    });

    componentUnderTest.buyOutwardJourney();
  });

  it('should show "noResultMessage" when change detection is triggered', () => {
    componentUnderTest.noResultMessage = 'Fahrt';

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.no-result-message').innerHTML).toContain('Fahrt');
  });

  it('should be called "ScrollTopDirective with "hiddenOnStartPage" as false', () => {
    const scrollUpDirective: ScrollTopDirective = ngMocks.get(
      ngMocks.find('button'),
      ScrollTopDirective
    );

    expect(scrollUpDirective.hiddenOnStartPage).toBeFalsy();
  });

  it('should not show outward journey button when "isBackwardJourney" is false', () => {
    componentUnderTest.isBackwardJourney = false;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.outward-journey')).toBeNull();
  });

  it('should show outward journey button when "isBackwardJourney" is true', () => {
    componentUnderTest.isBackwardJourney = true;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.outward-journey')).not.toBeNull();
  });

  it('should call "buyOutwardJourney" when outward journey button is clicked and "isBackwardJourney" is true', async () => {
    const buyOutwardJourneySpy = jest.spyOn(componentUnderTest, 'buyOutwardJourney');
    componentUnderTest.isBackwardJourney = true;
    fixture.detectChanges();
    const outwardJourneyButton: MatButtonHarness = await loader.getHarness(MatButtonHarness.with({
      selector: '.outward-journey'
    }));

    await outwardJourneyButton.click();

    expect(buyOutwardJourneySpy).toHaveBeenCalledTimes(1);
  });
});
