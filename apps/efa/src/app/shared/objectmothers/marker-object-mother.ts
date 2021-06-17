import { icon, marker, Marker } from 'leaflet';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getDepartureMarker = (): Marker => {
  return marker([48.05532, 8.20426], {
    icon: icon({
      iconSize: [25, 41],
      iconUrl: 'assets/footpath/departure_icon.svg'
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
      iconSize: [25, 41],
      iconUrl: 'assets/footpath/arrival_icon.svg'
    })
  });
};
