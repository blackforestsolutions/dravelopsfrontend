import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyListHeaderComponent } from './journey-list-header.component';
import { MatCardModule } from '@angular/material/card';

describe('JourneyListHeaderComponent', () => {
  let componentUnderTest: JourneyListHeaderComponent;
  let fixture: ComponentFixture<JourneyListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JourneyListHeaderComponent],
      imports: [
        MatCardModule
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
