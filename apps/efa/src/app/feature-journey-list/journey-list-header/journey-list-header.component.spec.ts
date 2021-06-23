import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyListHeaderComponent } from './journey-list-header.component';
import { SharedModule } from '../../shared/shared.module';

describe('JourneyListHeaderComponent', () => {
  let componentUnderTest: JourneyListHeaderComponent;
  let fixture: ComponentFixture<JourneyListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JourneyListHeaderComponent],
      imports: [
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyListHeaderComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });
});
