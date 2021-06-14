import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureShellComponent } from './feature-shell.component';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from '../feature-header/header/header.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('FeatureShellComponent', () => {
  let component: FeatureShellComponent;
  let fixture: ComponentFixture<FeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FeatureShellComponent,
        MockComponent(HeaderComponent)
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
