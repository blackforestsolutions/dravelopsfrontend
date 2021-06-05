import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {Component} from "@angular/core";
import {Location} from "@angular/common";

@Component({
  template: ''
})
class BookingStubComponent {
}

describe('AppComponent', () => {
  let componentUnderTest: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, BookingStubComponent],
      imports: [RouterTestingModule.withRoutes([
          { path: 'booking/:isRoundTrip/:outwardJourneyId', component: BookingStubComponent },
          { path: 'booking/:isRoundTrip/:outwardJourneyId/:backwardJourneyId', component: BookingStubComponent }
        ]
      )]
    }).compileComponents();
  });

  beforeEach(() => {
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {

    expect(componentUnderTest).toBeTruthy();
  });

  it('should navigate to the right path for singleJourney', waitForAsync(() => {

    fixture.nativeElement.querySelector('#singleJourney').click();

    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/booking/false/04e11b67-5085-48d1-92a4-c549a673954b');
    });
  }));

  it('should navigate to the right path for outward and backward Journey', waitForAsync(() => {

    fixture.nativeElement.querySelector('#outwardAndBackwardJourney').click();

    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/booking/true/04e11b67-5085-48d1-92a4-c549a673954b/c1094660-ccbd-420a-b344-4569b0ae47e2');
    });
  }));
});
