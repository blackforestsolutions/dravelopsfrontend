import {
  getArrivalAutocompleteError,
  getArrivalAutocompleteField,
  getArrivalAutocompleteOption,
  getBackwardJourneyDateBeforeOutwardJourneyDateError,
  getBackwardJourneyDateError,
  getBackwardJourneyDateField,
  getBackwardJourneyIsArrivalDateTimeFalseRadioButton,
  getBackwardJourneyIsArrivalDateTimeRadioGroup,
  getBackwardJourneyIsArrivalDateTimeTrueRadioButton,
  getBackwardJourneyTimeBeforeOutwardJourneyTimeError,
  getBackwardJourneyTimeError,
  getBackwardJourneyTimeField,
  getDepartureAutocompleteError,
  getDepartureAutocompleteField,
  getDepartureAutocompleteOption,
  getOutwardJourneyDateError,
  getOutwardJourneyDateField,
  getOutwardJourneyIsArrivalDateTimeFalseRadioButton,
  getOutwardJourneyIsArrivalDateTimeTrueRadioButton,
  getOutwardJourneyTimeError,
  getOutwardJourneyTimeField,
  getRoundTripRadioButton,
  getSubmitButton
} from '../support/journey-search-form.po';
import { aliasAutocompleteQuery, GET_AUTOCOMPLETE_OPERATION_NAME } from '../support/graphql-test-utils';

const SECOND_AUTOCOMPLETE_OPTION = 2;

describe('JourneySearchForm', () => {
  beforeEach(() => cy.visit('/'));

  describe('with isRoundTrip = false', () => {
    it('should not display all fields for backward journey', () => {
      getBackwardJourneyDateField().should('not.exist');
      getBackwardJourneyTimeField().should('not.exist');
      getBackwardJourneyIsArrivalDateTimeRadioGroup().should('not.exist');
    });

    it('should display more than one travelPoint result when departure is searched', () => {
      getDepartureAutocompleteField().type('a');

      getDepartureAutocompleteOption(SECOND_AUTOCOMPLETE_OPTION).should('exist');
    });

    it('should display more than one travelPoint result when arrival is searched', () => {
      getArrivalAutocompleteField().type('a');

      getArrivalAutocompleteOption(SECOND_AUTOCOMPLETE_OPTION).should('exist');
    });

    it('should display error messages for all fields when nothing is filled out', () => {
      getOutwardJourneyDateField().focus().clear();
      getOutwardJourneyTimeField().focus().clear();

      getSubmitButton().click();

      getDepartureAutocompleteError().should('be.visible');
      getArrivalAutocompleteError().should('be.visible');
      getOutwardJourneyDateError().should('be.visible');
      getOutwardJourneyTimeError().should('be.visible');
    });

    it('should include correct url params for departure point when journey form is submitted correctly for single journey', () => {
      cy.fixture(Cypress.env('travelProvider')).then(travelProvider => cy.intercept('POST', Cypress.env('backendUrl'), req => aliasAutocompleteQuery(
        req,
        GET_AUTOCOMPLETE_OPERATION_NAME,
        travelProvider.departure,
        'departure'
      )));
      cy.searchForm();

      getSubmitButton().click();

      cy.wait('@departure')
        .its('response.body.data.getAutocompleteAddressesBy')
        .then(travelPoints => {
          cy.url().should('include', travelPoints[0].point.x);
          cy.url().should('include', travelPoints[0].point.y);
        });
      cy.url().should('include', false);
      cy.url().should('not.include', true);
    });

  });

  describe('with isRoundTrip = true', () => {

    it('should display all fields for backward journey', () => {
      getRoundTripRadioButton().check({ force: true });

      getBackwardJourneyDateField().should('exist');
      getBackwardJourneyTimeField().should('exist');
      getBackwardJourneyIsArrivalDateTimeRadioGroup().should('exist');
    });

    it('should display error messages for all fields when nothing is filled out', () => {
      getRoundTripRadioButton().check({ force: true });
      getOutwardJourneyDateField().focus().clear();
      getOutwardJourneyTimeField().focus().clear();

      getSubmitButton().click();

      getDepartureAutocompleteError().should('be.visible');
      getArrivalAutocompleteError().should('be.visible');
      getOutwardJourneyDateError().should('be.visible');
      getOutwardJourneyTimeError().should('be.visible');
      getBackwardJourneyDateError().should('be.visible');
      getBackwardJourneyTimeError().should('be.visible');
    });

    it('should display error message for backward journey date when backward journey date is before outward journey date', () => {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const apiToken = {
        isRoundTrip: true,
        outwardJourney: {
          dateTime: tomorrow
        },
        backwardJourney: {
          dateTime: today
        }
      };
      cy.searchForm(apiToken);

      getSubmitButton().click();

      getBackwardJourneyDateBeforeOutwardJourneyDateError().should('be.visible');
    });

    it('should display error message for backward journey time when backward journey time is before outward journey time and date is equal', () => {
      const dateTime = new Date();
      const apiToken = {
        isRoundTrip: true,
        outwardJourney: {
          dateTime
        },
        backwardJourney: {
          dateTime
        }
      };
      cy.searchForm(apiToken);

      getSubmitButton().click();

      getBackwardJourneyTimeBeforeOutwardJourneyTimeError().should('be.visible');
    });

    it('should include correct url params for arrival point when journey form is submitted correctly for single journey', () => {
      cy.fixture(Cypress.env('travelProvider')).then(travelProvider => cy.intercept('POST', Cypress.env('backendUrl'), req => aliasAutocompleteQuery(
        req,
        GET_AUTOCOMPLETE_OPERATION_NAME,
        travelProvider.arrival,
        'arrival'
      )));
      cy.searchForm({
        isRoundTrip: true,
        outwardJourney: {
          isArrivalDateTime: true
        },
        backwardJourney: {
          isArrivalDateTime: true
        }
      });

      getSubmitButton().click();

      cy.wait(['@arrival'])
        .its('response.body.data.getAutocompleteAddressesBy')
        .then(travelPoints => {
          cy.url().should('include', travelPoints[0].point.x);
          cy.url().should('include', travelPoints[0].point.y);
        });
      cy.url().should('include', true);
      cy.url().should('not.include', false);
    });

    it('should show same departure and arrival travel point as well as departure and arrival date when form is submitted correctly and page reloaded', () => {
      const twoDaysForward = new Date();
      twoDaysForward.setDate(twoDaysForward.getDate() + 2);
      const threeDaysForward = new Date();
      threeDaysForward.setDate(threeDaysForward.getDate() + 3);
      const apiToken = {
        isRoundTrip: true,
        outwardJourney: {
          dateTime: twoDaysForward,
          isArrivalDateTime: true
        },
        backwardJourney: {
          dateTime: threeDaysForward,
          isArrivalDateTime: false
        }
      };
      cy.searchForm(apiToken);
      getSubmitButton().click();

      cy.reload();

      cy.fixture(Cypress.env('travelProvider'))
        .then(travelProvider => {
          getDepartureAutocompleteField().should('include.value', travelProvider.departure);
          getArrivalAutocompleteField().should('include.value', travelProvider.arrival);
        });
      getOutwardJourneyDateField().should('include.value', twoDaysForward.toLocaleDateString('de', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }));
      getBackwardJourneyDateField().should('include.value', threeDaysForward.toLocaleDateString('de', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }));
      getOutwardJourneyIsArrivalDateTimeTrueRadioButton().should('be.checked');
      getOutwardJourneyIsArrivalDateTimeFalseRadioButton().should('not.be.checked');
      getBackwardJourneyIsArrivalDateTimeTrueRadioButton().should('not.be.checked');
      getBackwardJourneyIsArrivalDateTimeFalseRadioButton().should('be.checked');
    });
  });
});
