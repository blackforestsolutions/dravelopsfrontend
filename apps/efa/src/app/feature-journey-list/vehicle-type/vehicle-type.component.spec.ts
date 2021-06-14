import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeComponent } from './vehicle-type.component';
import { VehicleType } from '@dravelopsfrontend/generated-content';

describe('VehicleTypeComponent', () => {
  let componentUnderTest: VehicleTypeComponent;
  let fixture: ComponentFixture<VehicleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleTypeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should container "zu Fuss" when key has value VehicleType.WALK', () => {
    componentUnderTest.key = VehicleType.WALK;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('zu Fuß');
  });

  it('should container "Transit" when key has value VehicleType.TRANSIT', () => {
    componentUnderTest.key = VehicleType.TRANSIT;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Transit');
  });

  it('should container "Fahrrad" when key has value VehicleType.BICYCLE', () => {
    componentUnderTest.key = VehicleType.BICYCLE;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Fahrrad');
  });

  it('should container "Auto" when key has value VehicleType.CAR', () => {
    componentUnderTest.key = VehicleType.CAR;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Auto');
  });

  it('should container "Straßenbahn" when key has value VehicleType.TRAM', () => {
    componentUnderTest.key = VehicleType.TRAM;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Straßenbahn');
  });

  it('should container "Seilbahn" when key has value VehicleType.FUNICULAR', () => {
    componentUnderTest.key = VehicleType.FUNICULAR;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Seilbahn');
  });

  it('should container "Straßenbahn" when key has value VehicleType.CABLE_CAR', () => {
    componentUnderTest.key = VehicleType.CABLE_CAR;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Straßenbahn');
  });

  it('should container "U-Bahn" when key has value VehicleType.SUBWAY', () => {
    componentUnderTest.key = VehicleType.SUBWAY;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('U-Bahn');
  });

  it('should container "Zug" when key has value VehicleType.RAIL', () => {
    componentUnderTest.key = VehicleType.RAIL;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Zug');
  });

  it('should container "Bus" when key has value VehicleType.BUS', () => {
    componentUnderTest.key = VehicleType.BUS;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Bus');
  });

  it('should container "Fähre" when key has value VehicleType.FERRY', () => {
    componentUnderTest.key = VehicleType.FERRY;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Fähre');
  });

  it('should container "Gondelboot" when key has value VehicleType.GONDOLA', () => {
    componentUnderTest.key = VehicleType.GONDOLA;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Gondelboot');
  });

  it('should container "Flug" when key has value VehicleType.AIRPLANE', () => {
    componentUnderTest.key = VehicleType.AIRPLANE;
    fixture.detectChanges();

    const text = fixture.nativeElement.innerHTML;
    expect(text).toContain('Flug');
  });
});
