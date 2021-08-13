import {
  getArrivalIcon,
  getArrivalIconAsset,
  getArrivalIconPath,
  getDepartureIcon,
  getDepartureIconAsset,
  getDepartureIconPath,
  getFirstNearestTravelPointResult,
  getMap,
  getNearestTravelPointList,
  getNoNearestTravelPointResult,
  getSearchMapTab
} from '../support/map-search.po';
import {
  aliasNearestAddressQuery,
  aliasPolygonQuery,
  GET_NEAREST_ADDRESSES_OPERATION_NAME,
  GET_OPERATING_AREA_OPERATION_NAME
} from '../support/graphql-test-utils';
import {
  getArrivalAutocompleteField,
  getArrivalAutocompleteOption,
  getDepartureAutocompleteField,
  getDepartureAutocompleteOption,
  getSubmitButton
} from '../support/journey-search-form.po';

const ZERO_X_COORDINATE = 0;
const ZERO_Y_COORDINATE = 0;

describe('MapSearch', () => {
  beforeEach(() => cy.visit('/'));

  it('should show map with polygon when map search tab is clicked', () => {
    cy.intercept('POST', Cypress.env(`backendUrl`), req => aliasPolygonQuery(req, GET_OPERATING_AREA_OPERATION_NAME));
    getMap().should('not.exist');
    getSearchMapTab().click();

    cy.wait(`@${GET_OPERATING_AREA_OPERATION_NAME}`)
      .its('response.body.data.getOperatingArea.points')
      .then(points => {
        expect(points.length).greaterThan(0);
      });
    getMap().should('exist');
  });

  it('should show no nearest address result when no address is found for a given point', () => {
    getSearchMapTab().click();

    getMap().click(ZERO_X_COORDINATE, ZERO_Y_COORDINATE);

    getNoNearestTravelPointResult().should('exist');
  });

  it('should create departure marker on map click and show departure in departure field when nearest address is selected', () => {
    getSearchMapTab().click();

    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => {
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getFirstNearestTravelPointResult().click();
      getDepartureAutocompleteField().should('include.value', travelProvider.departure);
      getDepartureIconPath().should('equal', getDepartureIconAsset());
    });
  });

  it('should not set departure marker on map click and departure field when no nearest address is selected and new departure search is possible', () => {
    getSearchMapTab().click();

    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => {
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getDepartureIconPath().should('equal', getDepartureIconAsset());
      cy.get('.cdk-overlay-backdrop').click(ZERO_X_COORDINATE, ZERO_Y_COORDINATE, { force: true });
      getDepartureIcon().should('not.exist');
      getDepartureAutocompleteField().should('include.value', '');
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getDepartureIcon().should('exist');
      getNearestTravelPointList().should('be.visible');
    });
  });

  it('should create arrival marker on map click and show arrival in arrival field when nearest address is selected and departureMarker is set', () => {
    getSearchMapTab().click();

    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => {
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getFirstNearestTravelPointResult().click();
      getDepartureAutocompleteField().should('include.value', travelProvider.departure);
      getDepartureIconPath().should('equal', getDepartureIconAsset());
      getMap().click(travelProvider.arrivalMapLongitude, travelProvider.arrivalMapLatitude);
      getFirstNearestTravelPointResult().click();
      getArrivalAutocompleteField().should('include.value', travelProvider.arrival);
      getArrivalIconPath().should('equal', getArrivalIconAsset());
    });
  });

  it('should not set arrival marker on map click and arrival field when no nearest address is selected and new arrival search is possible', () => {
    getSearchMapTab().click();

    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => {
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getFirstNearestTravelPointResult().click();
      getDepartureAutocompleteField().should('include.value', travelProvider.departure);
      getDepartureIconPath().should('equal', getDepartureIconAsset());
      getMap().click(travelProvider.arrivalMapLongitude, travelProvider.arrivalMapLatitude);
      getArrivalIconPath().should('equal', getArrivalIconAsset());
      cy.get('.cdk-overlay-backdrop').click(ZERO_X_COORDINATE, ZERO_Y_COORDINATE, { force: true });
      getArrivalIcon().should('not.exist');
      getArrivalAutocompleteField().should('include.value', '');
      getMap().click(travelProvider.arrivalMapLongitude, travelProvider.arrivalMapLatitude);
      getArrivalIcon().should('exist');
      getNearestTravelPointList().should('be.visible');
    });
  });

  it('should include correct url params for departure point, isRoundTrip and isArrivalDateTime when journey form is submitted correctly for single journey', () => {
    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => cy.intercept('POST', Cypress.env('backendUrl'), req => aliasNearestAddressQuery(
      req,
      GET_NEAREST_ADDRESSES_OPERATION_NAME,
      travelProvider.departureLongitude,
      travelProvider.departureLatitude,
      'departure'
    )));
    getSearchMapTab().click();

    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => {
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getDepartureIconPath().should('equal', getDepartureIconAsset());
      getFirstNearestTravelPointResult().click();
      getDepartureIconPath().should('equal', getDepartureIconAsset());
      getDepartureAutocompleteField().should('include.value', travelProvider.departure);
      getArrivalAutocompleteField().should('include.value', '');
      getMap().click(travelProvider.arrivalMapLongitude, travelProvider.arrivalMapLatitude);
      getDepartureIconPath().should('equal', getDepartureIconAsset());
      getArrivalIconPath().should('equal', getArrivalIconAsset());
      getFirstNearestTravelPointResult().click();
      getDepartureAutocompleteField().should('include.value', travelProvider.departure);
      getArrivalAutocompleteField().should('include.value', travelProvider.arrival);
      getDepartureIconPath().should('equal', getDepartureIconAsset());
      getArrivalIconPath().should('equal', getArrivalIconAsset());
      getSubmitButton().click();
    });

    cy.fixture(Cypress.env('travelProvider'))
      .then(travelProvider => {
        cy.wait('@departure')
          .its('response.body.data.getNearestAddressesBy')
          .then(nearestAddresses => nearestAddresses.filter(nearestAddress => nearestAddress.name.includes(travelProvider.departure)))
          .then(nearestAddresses => {
            cy.url().should('include', nearestAddresses[0].point.x);
            cy.url().should('include', nearestAddresses[0].point.y);
          });
      });
    cy.url().should('include', false);
    cy.url().should('not.include', true);
  });

  it('should include correct url params for arrival point when journey form is submitted correctly for single journey', () => {
    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => cy.intercept('POST', Cypress.env('backendUrl'), req => aliasNearestAddressQuery(
      req,
      GET_NEAREST_ADDRESSES_OPERATION_NAME,
      travelProvider.arrivalLongitude,
      travelProvider.arrivalLatitude,
      'arrival'
    )));
    getSearchMapTab().click();

    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => {
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getFirstNearestTravelPointResult().click();
      getDepartureAutocompleteField().should('include.value', travelProvider.departure);
      getMap().click(travelProvider.arrivalMapLongitude, travelProvider.arrivalMapLatitude);
      getFirstNearestTravelPointResult().click();
      getArrivalAutocompleteField().should('include.value', travelProvider.arrival);
      getSubmitButton().click();

      cy.wait('@arrival')
        .its('response.body.data.getNearestAddressesBy')
        .then(nearestAddresses => nearestAddresses.filter(nearestAddress => nearestAddress.name.includes(travelProvider.arrival)))
        .then(nearestAddresses => {
          cy.url().should('include', nearestAddresses[0].point.x);
          cy.url().should('include', nearestAddresses[0].point.y);
        });
    });
  });

  it('should be possible to search departure point per map and arrival point per text search', () => {
    getSearchMapTab().click();

    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => {
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getFirstNearestTravelPointResult().click();
      getArrivalAutocompleteField().type('a');
      getArrivalAutocompleteOption().click();

      getArrivalAutocompleteField().should('not.include.value', travelProvider.arrival);

      getSubmitButton().click();
      cy.url().should('not.equal', '');
    });
  });

  it('should be possible to search arrival point per map and departure point per text search', () => {
    getSearchMapTab().click();

    cy.fixture(Cypress.env('travelProvider')).then(travelProvider => {
      getMap().click(travelProvider.departureMapLongitude, travelProvider.departureMapLatitude);
      getFirstNearestTravelPointResult().click();
      getDepartureAutocompleteField().focus().clear().type('a');
      getDepartureAutocompleteOption().click();
      getMap().click(travelProvider.arrivalMapLongitude, travelProvider.arrivalMapLatitude);
      getFirstNearestTravelPointResult().click();

      getDepartureAutocompleteField().should('not.include.value', travelProvider.departure);

      getSubmitButton().click();
      cy.url().should('not.equal', '');
    });
  });
});
