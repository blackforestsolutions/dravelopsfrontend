import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeEmitterComponent } from './theme-emitter.component';

describe('ThemeEmitterComponent', () => {
  let componentUnderTest: ThemeEmitterComponent;
  let fixture: ComponentFixture<ThemeEmitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeEmitterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeEmitterComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should return the color of the element after initialization', () => {
    const primaryElement = fixture.nativeElement.querySelector('.mat-primary');
    const secondaryElement = fixture.nativeElement.querySelector('.mat-secondary');
    const warnElement = fixture.nativeElement.querySelector('.mat-warn');

    componentUnderTest.ngOnInit();

    expect(componentUnderTest.primaryColor).toBe(primaryElement.style.backgroundColor);
    expect(componentUnderTest.secondaryColor).toBe(secondaryElement.style.backgroundColor);
    expect(componentUnderTest.warnColor).toBe(warnElement.style.backgroundColor);
  });
});
