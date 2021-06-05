import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FeatureShellComponent} from "./feature-shell/feature-shell.component";
import {CUSTOMER_DIRECTORY, HEADER_TITLE} from "../environments/app-environmnet";
import {MockComponent} from "ng-mocks";
import {Title} from "@angular/platform-browser";

describe('AppComponent', () => {
  let componentUnderTest: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(FeatureShellComponent)
      ],
      providers: [
        {
          provide: HEADER_TITLE,
          useValue: 'Test-Header-Title'
        },
        {
          provide: CUSTOMER_DIRECTORY,
          useValue: 'bw'
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    componentUnderTest = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should init the app', () => {
    const title: Title = TestBed.inject(Title);

    componentUnderTest.ngOnInit();

    expect(title.getTitle()).toBe('Test-Header-Title');
    expect(componentUnderTest.activeThemeCssClass).toBe('bw-theme');
  });
});
