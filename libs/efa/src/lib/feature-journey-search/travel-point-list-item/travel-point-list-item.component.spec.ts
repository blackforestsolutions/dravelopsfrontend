import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPointListItemComponent } from './travel-point-list-item.component';
import { MockDirective, MockPipe } from 'ng-mocks';
import { IfTouchViewDirective } from '@dravelopsfrontend/shared';
import { MatIconModule } from '@angular/material/icon';
import {
  getFurtwangenSupermarketTravelPoint,
  getFurtwangenUniversityTravelPoint
} from '../../domain/objectmothers/travel-point-object-mother';
import { DistanceInMetresPipe } from '../pipes/distance-in-metres-pipe/distance-in-metres.pipe';
import { expect } from '@jest/globals';

describe('TravelPointListItemComponent', () => {
  let componentUnderTest: TravelPointListItemComponent;
  let fixture: ComponentFixture<TravelPointListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TravelPointListItemComponent,
        MockDirective(IfTouchViewDirective),
        MockPipe(DistanceInMetresPipe, () => '0m')
      ],
      imports: [
        MatIconModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPointListItemComponent);
    componentUnderTest = fixture.componentInstance;
    componentUnderTest.travelPoint = getFurtwangenSupermarketTravelPoint();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should create component correctly when travelPointSearchType === "map"', () => {
    componentUnderTest.travelPoint = getFurtwangenSupermarketTravelPoint();
    componentUnderTest.travelPointSearchType = 'map';

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#travel-point-name').innerHTML).toBe(getFurtwangenSupermarketTravelPoint().name);
    expect(fixture.nativeElement.querySelector('#distance-in-metres').innerHTML).toBe('&nbsp;(0m)');
  });

  it('should create component correctly when travelPointSearchType === "autocomplete"', () => {
    componentUnderTest.travelPoint = getFurtwangenUniversityTravelPoint();
    componentUnderTest.travelPointSearchType = 'autocomplete';

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#travel-point-name').innerHTML).toBe(getFurtwangenUniversityTravelPoint().name);
    expect(fixture.nativeElement.querySelector('#distance-in-metres')).toBeNull();
  });
});
