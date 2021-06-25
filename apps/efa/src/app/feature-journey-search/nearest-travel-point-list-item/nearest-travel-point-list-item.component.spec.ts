import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestTravelPointListItemComponent } from './nearest-travel-point-list-item.component';
import {
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint
} from '../../shared/objectmothers/travel-point-object-mother';
import { MatIconModule } from '@angular/material/icon';

describe('NearestAddressesListItemComponent', () => {
  let componentUnderTest: NearestTravelPointListItemComponent;
  let fixture: ComponentFixture<NearestTravelPointListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NearestTravelPointListItemComponent],
      imports: [
        MatIconModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestTravelPointListItemComponent);
    componentUnderTest = fixture.componentInstance;
    componentUnderTest.nearestTravelPoint = getFurtwangenSupermarketTravelPoint();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should show distance in metres', () => {
    componentUnderTest.nearestTravelPoint = getFurtwangenKindergardenTravelPoint();

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.info').innerHTML).toContain('200 m');
  });
});
