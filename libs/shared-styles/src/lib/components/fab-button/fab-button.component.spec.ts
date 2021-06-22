import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabButtonComponent } from './fab-button.component';
import { MockDirective, ngMocks } from 'ng-mocks';
import { ScrollTopDirective } from '../../directives/scroll-top/scroll-top.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('FabButtonComponent', () => {
  let componentUnderTest: FabButtonComponent;
  let fixture: ComponentFixture<FabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FabButtonComponent,
        MockDirective(ScrollTopDirective)
      ],
      imports: [
        MatIconModule,
        MatButtonModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabButtonComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should be called "ScrollUpDirective with "hiddenOnStartPage" as true', () => {
    const scrollUpDirective: ScrollTopDirective = ngMocks.get(
      ngMocks.find('.fab-button'),
      ScrollTopDirective
    );

    expect(scrollUpDirective.hiddenOnStartPage).toBeTruthy();
  });
});
