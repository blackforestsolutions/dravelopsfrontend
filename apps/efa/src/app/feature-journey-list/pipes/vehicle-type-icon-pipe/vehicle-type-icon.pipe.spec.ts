import { VehicleTypeIconPipe } from './vehicle-type-icon.pipe';

describe('VehicleTypeIconPipe', () => {
  let pipeUnderTest: VehicleTypeIconPipe;

  beforeEach(() => {
    pipeUnderTest = new VehicleTypeIconPipe();
  });

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return "directions_walk" when vehicleType is WALK', () => {
    const testVehicleType = 'WALK';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('directions_walk');
  });

  it('should return "directions_walk" when vehicleType is TRANSIT', () => {
    const testVehicleType = 'TRANSIT';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('directions_walk');
  });

  it('should return "directions_bike" when vehicleType is BICYCLE', () => {
    const testVehicleType = 'BICYCLE';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('directions_bike');
  });

  it('should return "directions_car" when vehicleType is CAR', () => {
    const testVehicleType = 'CAR';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('directions_car');
  });

  it('should return "tram" when vehicleType is TRAM', () => {
    const testVehicleType = 'TRAM';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('tram');
  });

  it('should return "tram" when vehicleType is FUNICULAR', () => {
    const testVehicleType = 'FUNICULAR';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('tram');
  });

  it('should return "tram" when vehicleType is CABLE_CAR', () => {
    const testVehicleType = 'CABLE_CAR';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('tram');
  });

  it('should return "subway" when vehicleType is SUBWAY', () => {
    const testVehicleType = 'SUBWAY';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('subway');
  });

  it('should return "directions_railway" when vehicleType is RAIL', () => {
    const testVehicleType = 'RAIL';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('directions_railway');
  });

  it('should return "directions_bus" when vehicleType is BUS', () => {
    const testVehicleType = 'BUS';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('directions_bus');
  });

  it('should return "directions_boat" when vehicleType is FERRY', () => {
    const testVehicleType = 'FERRY';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('directions_boat');
  });

  it('should return "directions_boat" when vehicleType is GONDOLA', () => {
    const testVehicleType = 'GONDOLA';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('directions_boat');
  });

  it('should return "flight" when vehicleType is AIRPLANE', () => {
    const testVehicleType = 'AIRPLANE';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('flight');
  });

  it('should return an "help" when type is not correct', () => {
    const testVehicleType = 'NoVehicleType';

    const result: string = pipeUnderTest.transform(testVehicleType);

    expect(result).toBe('help');
  });
});
