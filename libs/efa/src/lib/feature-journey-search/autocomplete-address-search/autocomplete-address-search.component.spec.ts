import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AutocompleteAddressSearchComponent } from './autocomplete-address-search.component';
import { MatInputModule } from '@angular/material/input';
import { MockComponent, MockDirective, MockProvider } from 'ng-mocks';
import { TravelPointListComponent } from '../travel-point-list/travel-point-list.component';
import { AutofocusDirective, DEBOUNCE_TIME } from '@dravelopsfrontend/shared';
import { TravelPointApiService } from '../../domain/api/travel-point-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import {
  getAutocompleteTravelPoints,
  getFurtwangenUniversityTravelPoint
} from '../../domain/objectmothers/travel-point-object-mother';
import { of } from 'rxjs';
import { expect } from '@jest/globals';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { AutocompleteAddressFragment } from '../../domain/model/generated';

const TEST_LABEL = 'test';
const TEST_INPUT = 'H';

describe('AutocompleteSearchComponent', () => {
  let travelPointApiService: TravelPointApiService;

  let componentUnderTest: AutocompleteAddressSearchComponent;
  let fixture: ComponentFixture<AutocompleteAddressSearchComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AutocompleteAddressSearchComponent,
        MockComponent(TravelPointListComponent),
        MockDirective(AutofocusDirective)
      ],
      providers: [
        MockProvider(TravelPointApiService)
      ],
      imports: [
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteAddressSearchComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    travelPointApiService = TestBed.inject(TravelPointApiService);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should init component with correct params', async () => {
    componentUnderTest.inputLabel = TEST_LABEL;

    fixture.detectChanges();

    const autocompleteFormField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
    expect(await autocompleteFormField.getLabel()).toBe(TEST_LABEL);
    expect(fixture.debugElement.query(By.directive(TravelPointListComponent))).toBeNull();
  });

  it('should be called "getAddressesBy" when more than zero characters in search term are triggered', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy').mockReturnValue(of([
      getFurtwangenUniversityTravelPoint()
    ]));

    componentUnderTest.input$.next(TEST_INPUT);
    tick(DEBOUNCE_TIME);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(1);
    expect(travelPointApiServiceSpy).toHaveBeenCalledWith(TEST_INPUT);
  }));

  it('should not be called "getAddressesBy" when zero characters in search term are triggered', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy').mockReturnValue(of([
      getFurtwangenUniversityTravelPoint()
    ]));

    componentUnderTest.input$.next('');
    tick(DEBOUNCE_TIME);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(0);
  }));

  it('should be called "getAddressesBy" only when search term has changed', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy').mockReturnValue(of([
      getFurtwangenUniversityTravelPoint()
    ]));

    componentUnderTest.input$.next(TEST_INPUT);
    componentUnderTest.input$.next(TEST_INPUT);
    tick(DEBOUNCE_TIME * 3);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(1);
  }));

  it('should create a new string element in "input$" variable when input element change', async () => {
    let expectedSearchTerm: string;
    componentUnderTest.input$.subscribe((searchTerm: string) => expectedSearchTerm = searchTerm);

    const inputElement = await loader.getHarness(MatInputHarness);
    await inputElement.setValue(TEST_INPUT);

    expect(expectedSearchTerm).toBe(TEST_INPUT);
  });

  it('should pass property bindings correctly to travel-point-list when travel points are found', fakeAsync(() => {
    jest.spyOn(travelPointApiService, 'getAddressesBy').mockReturnValue(of(getAutocompleteTravelPoints()));
    componentUnderTest.input$.next(TEST_INPUT);
    tick(DEBOUNCE_TIME);

    fixture.detectChanges();

    const travelPointList: TravelPointListComponent = fixture.debugElement.query(By.directive(TravelPointListComponent)).componentInstance;
    expect(travelPointList).toBeTruthy();
    expect(travelPointList.travelPoints).toEqual(getAutocompleteTravelPoints());
    expect(travelPointList.travelPointSearchType).toBe('autocomplete');
    expect(travelPointList.noResultMessage).toBe('Keine Adresse gefunden.');
  }));

  it('should be called "handleTravelPointSelectEvent" when "travelPointSelectEvent" is triggered', fakeAsync(() => {
    const handleTravelPointSelectEventSpy = jest.spyOn(componentUnderTest, 'handleTravelPointSelectEvent');
    jest.spyOn(travelPointApiService, 'getAddressesBy').mockReturnValue(of(getAutocompleteTravelPoints()));
    componentUnderTest.input$.next(TEST_INPUT);
    tick(DEBOUNCE_TIME);
    fixture.detectChanges();

    const travelPointList: TravelPointListComponent = fixture.debugElement.query(By.directive(TravelPointListComponent)).componentInstance;
    travelPointList.travelPointSelectEvent.emit(getAutocompleteTravelPoints()[0]);

    expect(handleTravelPointSelectEventSpy).toHaveBeenCalledTimes(1);
    expect(handleTravelPointSelectEventSpy).toHaveBeenCalledWith(getAutocompleteTravelPoints()[0]);
  }));

  it('should be triggered "selectAddressEvent" with correct travelPoint when "handleTravelPointSelectEvent" is called', () => {
    let expectedAddress: AutocompleteAddressFragment;
    componentUnderTest.selectAddressEvent.subscribe((address: AutocompleteAddressFragment) => {
      expectedAddress = address;
    });

    componentUnderTest.handleTravelPointSelectEvent(getFurtwangenUniversityTravelPoint());

    expect(expectedAddress).toEqual(getFurtwangenUniversityTravelPoint());
  });
});
