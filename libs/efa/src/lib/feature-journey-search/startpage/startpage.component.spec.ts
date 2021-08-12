import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartpageComponent } from './startpage.component';

describe('StartpageComponent', () => {
  let componentUnderTest: StartpageComponent;
  let fixture: ComponentFixture<StartpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartpageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartpageComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });
});
