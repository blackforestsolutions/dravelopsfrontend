import { VehicleTypePipe } from './vehicle-type.pipe';

describe('VehicleTypePipe', () => {
  let pipeUnderTest: VehicleTypePipe;

  beforeEach(() => {
    pipeUnderTest = new VehicleTypePipe();
  });

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return "Fußweg" when vehicleType is WALK', () => {
    const testVehicleType = 'WALK';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Fußweg');
  });

  it('should return "Transit" when vehicleType is TRANSIT', () => {
    const testVehicleType = 'TRANSIT';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Transit');
  });

  it('should return "Fahrrad" when vehicleType is BICYCLE', () => {
    const testVehicleType = 'BICYCLE';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Fahrrad');
  });

  it('should return "Auto" when vehicleType is CAR', () => {
    const testVehicleType = 'CAR';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Auto');
  });

  it('should return "Straßenbahn" when vehicleType is TRAM', () => {
    const testVehicleType = 'TRAM';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Straßenbahn');
  });

  it('should return "Seilbahn" when vehicleType is FUNICULAR', () => {
    const testVehicleType = 'FUNICULAR';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Seilbahn');
  });

  it('should return "Straßenbahn" when vehicleType is CABLE_CAR', () => {
    const testVehicleType = 'CABLE_CAR';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Straßenbahn');
  });

  it('should return "U-Bahn" when vehicleType is SUBWAY', () => {
    const testVehicleType = 'SUBWAY';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('U-Bahn');
  });

  it('should return "Zug" when vehicleType is RAIL', () => {
    const testVehicleType = 'RAIL';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Zug');
  });

  it('should return "Bus" when vehicleType is BUS', () => {
    const testVehicleType = 'BUS';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Bus');
  });

  it('should return "Fähre" when vehicleType is FERRY', () => {
    const testVehicleType = 'FERRY';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Fähre');
  });

  it('should return "Gondelboot" when vehicleType is GONDOLA', () => {
    const testVehicleType = 'GONDOLA';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Gondelboot');
  });

  it('should return "Flug" when vehicleType is AIRPLANE', () => {
    const testVehicleType = 'AIRPLANE';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('Flug');
  });

  it('should return an "" when vehcicle type is not available', () => {
    const testVehicleType = 'NoVehicleType';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('');
  });

});
