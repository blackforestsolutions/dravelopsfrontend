import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegListComponent } from './leg-list.component';
import { MockComponent, MockPipe } from 'ng-mocks';
import { LegListItemComponent } from '../leg-list-item/leg-list-item.component';
import { DurationPipe } from '../pipes/duration-pipe/duration.pipe';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconHarness } from '@angular/material/icon/testing';
import {
  getBleibachToWaldkirchKastelberghalleLeg,
  getFurtwangenIlbenstreetToBleibachLeg,
  getGrosshausbergToFurtwangenIlbenstreetLeg,
  getWaldkirchKastelberghalleToSickLeg
} from '../../shared/objectmothers/leg-object-mother';
import { MatIconModule } from '@angular/material/icon';

describe('LegListComponent', () => {
  let component: LegListComponent;
  let fixture: ComponentFixture<LegListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LegListComponent,
        MockComponent(LegListItemComponent),
        MockPipe(DurationPipe, value => `mock:${value}`)
      ],
      imports: [
        MatIconModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegListComponent);
    component = fixture.componentInstance;
    component.legs = [
      { ...getGrosshausbergToFurtwangenIlbenstreetLeg() },
      { ...getFurtwangenIlbenstreetToBleibachLeg() },
      { ...getBleibachToWaldkirchKastelberghalleLeg() },
      { ...getWaldkirchKastelberghalleToSickLeg() }
    ];
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one leg-list-item for each leg', () => {
    const childComponents: LegListItemComponent[] = fixture.debugElement.queryAll(By.directive(LegListItemComponent))
      .map(legListItem => legListItem.componentInstance);

    expect(childComponents.length).toBe(4);
    expect(childComponents[0].leg).toEqual(getGrosshausbergToFurtwangenIlbenstreetLeg());
    expect(childComponents[1].leg).toEqual(getFurtwangenIlbenstreetToBleibachLeg());
    expect(childComponents[2].leg).toEqual(getBleibachToWaldkirchKastelberghalleLeg());
    expect(childComponents[3].leg).toEqual(getWaldkirchKastelberghalleToSickLeg());
  });

  it('should create one access time icon', async () => {
    const accessTimeIcons: MatIconHarness[] = await loader.getAllHarnesses<MatIconHarness>(MatIconHarness);

    const text: string = await accessTimeIcons[0].getName();
    expect(accessTimeIcons.length).toBe(1);
    expect(text).toBe('access_time');
  });
});


