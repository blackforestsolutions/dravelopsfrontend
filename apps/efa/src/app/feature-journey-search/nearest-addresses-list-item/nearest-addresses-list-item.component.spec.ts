import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestAddressesListItemComponent } from './nearest-addresses-list-item.component';
import { SharedModule } from '../../shared/shared.module';
import {
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint
} from '../../shared/objectmothers/travel-point-object-mother';

describe('NearestAddressesListItemComponent', () => {
  let componentUnderTest: NearestAddressesListItemComponent;
  let fixture: ComponentFixture<NearestAddressesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NearestAddressesListItemComponent],
      imports: [SharedModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestAddressesListItemComponent);
    componentUnderTest = fixture.componentInstance;
    componentUnderTest.nearestAddress = getFurtwangenSupermarketTravelPoint();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should show distance in metres', () => {
    componentUnderTest.nearestAddress = getFurtwangenKindergardenTravelPoint();

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.info').innerHTML).toContain('200 m')
  });
});
