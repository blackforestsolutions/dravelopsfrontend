import { geoJSON, GeoJSON } from 'leaflet';
import { Point, PointFragment } from '@dravelopsfrontend/generated-content';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getExampleWaypoints = (): Point[] => {
  return [
    {
      x: 8.20426,
      y: 48.05532
    },
    {
      x: 8.20401,
      y: 48.0558
    },
    {
      x: 8.20361,
      y: 48.05661
    },
    {
      x: 8.20352,
      y: 48.05679
    },
    {
      x: 8.20344,
      y: 48.05693
    },
    {
      x: 8.20339,
      y: 48.05701
    },
    {
      x: 8.20331,
      y: 48.05721
    },
    {
      x: 8.20326,
      y: 48.05735
    },
    {
      x: 8.20321,
      y: 48.05748
    },
    {
      x: 8.20318,
      y: 48.05757
    },
    {
      x: 8.20303,
      y: 48.05799
    },
    {
      x: 8.20286,
      y: 48.05811
    },
    {
      x: 8.20275,
      y: 48.05833
    },
    {
      x: 8.20262,
      y: 48.05844
    },
    {
      x: 8.2027,
      y: 48.05858
    },
    {
      x: 8.20268,
      y: 48.05882
    },
    {
      x: 8.20265,
      y: 48.05892
    },
    {
      x: 8.20264,
      y: 48.059
    },
    {
      x: 8.20263,
      y: 48.05911
    },
    {
      x: 8.20276,
      y: 48.05925
    },
    {
      x: 8.20282,
      y: 48.05941
    },
    {
      x: 8.20257,
      y: 48.05939
    }
  ];
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenFriedrichStreetToIlbenStreetWaypoints = (): PointFragment[] => {
  return [...getExampleWaypoints()];
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray = (): number[][] => [
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

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenFriedrichStreetToIlbenStreetGeoJson = (): GeoJSON => {
  return geoJSON(
    {
      type: 'LineString',
      coordinates: getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray()
    } as never
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getJourneyWaypointsGeoJson = (): GeoJSON => {
  return geoJSON(
    {
      type: 'LineString',
      coordinates: [
        ...getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray(),
        ...getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray(),
        ...getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray(),
        ...getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray()
      ]
    } as never
  )
}
