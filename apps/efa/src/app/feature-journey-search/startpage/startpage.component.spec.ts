import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartpageComponent } from './startpage.component';
import { CUSTOMER_DIRECTORY } from '../../../environments/config-tokens';

describe('StartpageComponent', () => {
  let componentUnderTest: StartpageComponent;
  let fixture: ComponentFixture<StartpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartpageComponent],
      providers: [
        {
          provide: CUSTOMER_DIRECTORY,
          useValue: 'bw'
        }
      ]
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

  it('should create the path to startPage', () => {

    const result: string = componentUnderTest.getStartPage();

    expect(result).toBe('assets/bw/startpage.jpg');
  });

  it('should be called "getStartPage" on template', () => {
    const getLogoSpy = spyOn(componentUnderTest, 'getStartPage');

    fixture.detectChanges();

    expect(getLogoSpy).toHaveBeenCalled();
  });
});
