import { icon, LatLng, latLng, Marker, marker } from 'leaflet';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getMappedWaypointsToGeoJSONFormatLengthModuloOne = (): Array<Array<number>> => {
  return [
    [
      8.20426,
      48.05532
    ],
    [
      8.20401,
      48.0558
    ],
    [
      8.20361,
      48.05661
    ],
    [
      8.20352,
      48.05679
    ],
    [
      8.20344,
      48.05693
    ],
    [
      8.20339,
      48.05701
    ],
    [
      8.20331,
      48.05721
    ],
    [
      8.20326,
      48.05735
    ],
    [
      8.20321,
      48.05748
    ],
    [
      8.20318,
      48.05757
    ],
    [
      8.20303,
      48.05799
    ],
    [
      8.20286,
      48.05811
    ],
    [
      8.20275,
      48.05833
    ],
    [
      8.20262,
      48.05844
    ],
    [
      8.2027,
      48.05858
    ],
    [
      8.20268,
      48.05882
    ],
    [
      8.20265,
      48.05892
    ],
    [
      8.20264,
      48.059
    ],
    [
      8.20263,
      48.05911
    ],
    [
      8.20276,
      48.05925
    ],
    [
      8.20282,
      48.05941
    ],
    [
      8.20257,
      48.05939
    ]
  ];
};

export const getMappedWaypointsToGeoJSONFormatLengthModuloZero = (): Array<Array<number>> => {
  return [
    [
      8.20426,
      48.05532
    ],
    [
      8.20401,
      48.0558
    ],
    [
      8.20361,
      48.05661
    ],
    [
      8.20352,
      48.05679
    ],
    [
      8.20344,
      48.05693
    ],
    [
      8.20339,
      48.05701
    ],
    [
      8.20331,
      48.05721
    ],
    [
      8.20326,
      48.05735
    ],
    [
      8.20321,
      48.05748
    ],
    [
      8.20318,
      48.05757
    ],
    [
      8.20303,
      48.05799
    ],
    [
      8.20286,
      48.05811
    ],
    [
      8.20275,
      48.05833
    ],
    [
      8.20262,
      48.05844
    ],
    [
      8.2027,
      48.05858
    ],
    [
      8.20268,
      48.05882
    ],
    [
      8.20265,
      48.05892
    ],
    [
      8.20264,
      48.059
    ],
    [
      8.20263,
      48.05911
    ],
    [
      8.20276,
      48.05925
    ],
    [
      8.20282,
      48.05941
    ],
    [
      8.20257,
      48.05939
    ],
    [
      8.20257,
      48.05939
    ],
    [
      8.20257,
      48.05939
    ],
    [
      8.20257,
      48.05939
    ]
  ];
};

export const getCenterLengthIsModuloOne = (): LatLng => {
  return latLng(48.05811, 8.20286);
};

export const getCenterLengthIsModuloZero = (): LatLng => {
  return latLng(48.05833, 8.20275);
};

export const getDepartureMarker = (): Marker => {
  return marker([48.05532, 8.20426], {
    icon: icon({
      iconSize: [25, 41],
      iconUrl: 'assets/footpath/departure_icon.svg'
    })
  });
};

export const getArrivalMarker = (): Marker => {
  return marker([48.05939, 8.20257], {
    icon: icon({
      iconSize: [25, 41],
      iconUrl: 'assets/footpath/arrival_icon.svg'
    })
  });
};
