import { CompassDirectionPipe } from './compass-direction.pipe';

describe('CompassDirectionPipe', () => {

  const pipeUnderTest: CompassDirectionPipe = new CompassDirectionPipe();

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return "Norden" when compassDirection is NORTH', () => {
    const testCompassDirection = 'NORTH';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('Norden');
  });

  it('should return "Westen" when compassDirection is WEST', () => {
    const testCompassDirection = 'WEST';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('Westen');
  });

  it('should return "Osten" when compassDirection is EAST', () => {
    const testCompassDirection = 'EAST';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('Osten');
  });

  it('should return "Süden" when compassDirection is SOUTH', () => {
    const testCompassDirection = 'SOUTH';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('Süden');
  });

  it('should return "Nordwesten" when compassDirection is NORTHWEST', () => {
    const testCompassDirection = 'NORTHWEST';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('Nordwesten');
  });

  it('should return "Nordosten" when compassDirection is NORTHEAST', () => {
    const testCompassDirection = 'NORTHEAST';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('Nordosten');
  });

  it('should return "Südwesten" when compassDirection is SOUTHWEST', () => {
    const testCompassDirection = 'SOUTHWEST';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('Südwesten');
  });

  it('should return "Südosten" when compassDirection is SOUTHEAST', () => {
    const testCompassDirection = 'SOUTHEAST';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('Südosten');
  });

  it('should return an empty string when no compassDirection is not found', () => {
    const testCompassDirection = '';

    const result: string = pipeUnderTest.transform(testCompassDirection);

    expect(result).toBe('');
  });
});
