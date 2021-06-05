import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {SharedModule} from '../../shared/shared.module';
import {CUSTOMER_DIRECTORY, HEADER_TITLE} from "../../../environments/app-environmnet";

describe('HeaderComponent', () => {
  let componentUnderTest: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: HEADER_TITLE,
          useValue: 'Title'
        },
        {
          provide: CUSTOMER_DIRECTORY,
          useValue: 'bw'
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should create title in template', () => {
    const result: string = fixture.nativeElement.querySelector('.title').innerHTML;

    expect(result).toEqual('Title');
  });

  it('should create the path to logo', () => {

    const result: string = componentUnderTest.getLogo();

    expect(result).toBe('assets/bw/logo.svg');
  });

  it('should be called "getLogo" on template', () => {
    const getLogoSpy = spyOn(componentUnderTest, 'getLogo');

    fixture.detectChanges();

    expect(getLogoSpy).toHaveBeenCalled();
  });
});
