import { icon, marker, Marker } from 'leaflet';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getDepartureMarker = (): Marker => {
  return marker([48.05532, 8.20426], {
    icon: icon({
      iconSize: [31.25, 51.25],
      iconUrl: 'assets/departure_icon.svg',
      // className for Cypress testing
      className: 'departure-icon'
    })
  });
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getArrivalMarker = (): Marker => {
  return marker([48.05939, 8.20257], {
    icon: icon({
      iconSize: [31.25, 51.25],
      iconUrl: 'assets/arrival_icon.svg',
      // className for Cypress testing
      className: 'arrival-icon'
    })
  });
};
