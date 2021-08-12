import { Polygon } from '../model/generated';
import { LatLngExpression, polygon, Polygon as LeafletPolygon } from 'leaflet';
import {
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE
} from '@dravelopsfrontend/shared';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getHvvOperatingArea = (): Polygon => {
  return {
    points: [
      {
        x: 9.926078590563,
        y: 51.536818622395
      },
      {
        x: 8.813833958308,
        y: 53.083480669832
      },
      {
        x: 8.611938439764,
        y: 53.508599382033
      },
      {
        x: 8.599557252481,
        y: 53.534911948266
      },
      {
        x: 8.310921044198,
        y: 54.906843172932
      },
      {
        x: 9.574676912757,
        y: 54.765199831029
      },
      {
        x: 11.226714204701,
        y: 54.500369899949
      },
      {
        x: 12.131073730255,
        y: 54.078243408456
      },
      {
        x: 12.117897716415,
        y: 53.939184400482
      },
      {
        x: 11.854733497487,
        y: 52.518175065533
      },
      {
        x: 11.788821628861,
        y: 52.393725712042
      },
      {
        x: 11.759540025387,
        y: 52.338463219795
      },
      {
        x: 11.657974729319,
        y: 52.166444610416
      },
      {
        x: 11.626887739718,
        y: 52.130347715987
      },
      {
        x: 9.926078590563,
        y: 51.536818622395
      }
    ]
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getHvvLeafletPolygon = (): LeafletPolygon => {
  return polygon(
    [
      {
        lng: 9.926078590563,
        lat: 51.536818622395
      },
      {
        lng: 8.813833958308,
        lat: 53.083480669832
      },
      {
        lng: 8.611938439764,
        lat: 53.508599382033
      },
      {
        lng: 8.599557252481,
        lat: 53.534911948266
      },
      {
        lng: 8.310921044198,
        lat: 54.906843172932
      },
      {
        lng: 9.574676912757,
        lat: 54.765199831029
      },
      {
        lng: 11.226714204701,
        lat: 54.500369899949
      },
      {
        lng: 12.131073730255,
        lat: 54.078243408456
      },
      {
        lng: 12.117897716415,
        lat: 53.939184400482
      },
      {
        lng: 11.854733497487,
        lat: 52.518175065533
      },
      {
        lng: 11.788821628861,
        lat: 52.393725712042
      },
      {
        lng: 11.759540025387,
        lat: 52.338463219795
      },
      {
        lng: 11.657974729319,
        lat: 52.166444610416
      },
      {
        lng: 11.626887739718,
        lat: 52.130347715987
      },
      {
        lng: 9.926078590563,
        lat: 51.536818622395
      }
    ]
  );
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getHvvLeafletPolygonWithInnerHole = (): LeafletPolygon => {
  return polygon([
    // outer ring
    [
      [MAX_WGS_84_LATITUDE, MIN_WGS_84_LONGITUDE],
      [MAX_WGS_84_LATITUDE, MAX_WGS_84_LONGITUDE],
      [MIN_WGS_84_LATITUDE, MAX_WGS_84_LONGITUDE],
      [MIN_WGS_84_LATITUDE, MIN_WGS_84_LONGITUDE]
    ],
    // inner hole
    [
      ...getHvvLeafletPolygon().getLatLngs() as LatLngExpression[]
    ]
  ]);
};
