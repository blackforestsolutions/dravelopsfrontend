import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { SharedStylesModule } from '../../shared-styles.module';

describe('LoadingComponent', () => {
  let componentUnderTest: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [SharedStylesModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    componentUnderTest = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should show loading spinner in correct mode', async () => {
    const loadingSpinner: MatProgressSpinnerHarness = await loader.getHarness(MatProgressSpinnerHarness);

    expect(await loadingSpinner.getMode()).toBe('indeterminate');
  });
});
