import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CUSTOMER_DIRECTORY, HEADER_TITLE } from '../../../environments/app-environmnet';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  template: ''
})
class EfaFrontendComponent {
}

describe('HeaderComponent', () => {
  let componentUnderTest: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: EfaFrontendComponent
          }
        ]),
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
      ],
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
    location = TestBed.inject(Location);
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

  it('should navigate to start when logo is clicked', waitForAsync(() => {
    const logo = fixture.nativeElement.querySelector('.logo');

    logo.click();

    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/');
    });
  }));
});
