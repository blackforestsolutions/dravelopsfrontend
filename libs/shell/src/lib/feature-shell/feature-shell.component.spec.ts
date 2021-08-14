import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureShellComponent } from './feature-shell.component';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from '../feature-header/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { HEADER_TITLE } from '@dravelopsfrontend/shared';

describe('FeatureShellComponent', () => {
  let componentUnderTest: FeatureShellComponent;
  let fixture: ComponentFixture<FeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FeatureShellComponent,
        MockComponent(HeaderComponent)
      ],
      providers: [
        {
          provide: HEADER_TITLE,
          useValue: 'Test-Header-Title'
        }
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureShellComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should init the title', () => {
    const title: Title = TestBed.inject(Title);

    componentUnderTest.ngOnInit();

    expect(title.getTitle()).toBe('Test-Header-Title');
  });
});
