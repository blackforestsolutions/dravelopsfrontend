import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CUSTOMER_DIRECTORY } from '../environments/config-tokens';
import { MockComponent } from 'ng-mocks';
import { FeatureShellComponent } from './feature-shell/feature-shell.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: CUSTOMER_DIRECTORY,
          useValue: 'bw'
        },
        {
          provide: Title
        },
        {
          provide: OverlayContainer
        }
      ],
      declarations: [AppComponent, MockComponent(FeatureShellComponent)]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
