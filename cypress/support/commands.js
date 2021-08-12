import {
  getArrivalAutocompleteField,
  getArrivalAutocompleteOption,
  getBackwardJourneyDateOverlay,
  getBackwardJourneyIsArrivalDateTimeTrueRadioButton,
  getBackwardJourneyTimeOverlay,
  getDepartureAutocompleteField,
  getDepartureAutocompleteOption,
  getJourneySelectedTime,
  getOutwardJourneyDateOverlay,
  getOutwardJourneyIsArrivalDateTimeTrueRadioButton,
  getRoundTripRadioButton
} from './journey-search-form.po';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

function searchForm(apiToken) {
  if (apiToken && apiToken.isRoundTrip) {
    getRoundTripRadioButton().check({ force: true });
  }
  if (apiToken && apiToken.departure) {
    getDepartureAutocompleteField().type(apiToken.departure);
  } else {
    cy.fixture(Cypress.config('travelProvider')).then(travelProvider => getDepartureAutocompleteField().type(travelProvider.departure));
    getDepartureAutocompleteOption().click();
  }
  if (apiToken && apiToken.arrival) {
    getArrivalAutocompleteField().type(apiToken.arrival);
  } else {
    cy.fixture(Cypress.config('travelProvider')).then(travelProvider => getArrivalAutocompleteField().type(travelProvider.arrival));
    getArrivalAutocompleteOption().click();
  }
  if (apiToken && apiToken.outwardJourney && apiToken.outwardJourney.dateTime) {
    getOutwardJourneyDateOverlay().click();
    cy.get('.mat-calendar-period-button').click();
    cy.get('td').contains(apiToken.outwardJourney.dateTime.getFullYear()).click();
    cy.get('td').contains(apiToken.outwardJourney.dateTime.toLocaleDateString('de', { month: 'long' }).substring(0, 3).toUpperCase()).click();
    cy.get('td').contains(apiToken.outwardJourney.dateTime.getDate()).click();
  }
  if (apiToken && apiToken.outwardJourney && apiToken.outwardJourney.isArrivalDateTime) {
    getOutwardJourneyIsArrivalDateTimeTrueRadioButton().check({ force: true });
  }
  if (apiToken && apiToken.isRoundTrip) {
    getBackwardJourneyDateOverlay().click();
    if (apiToken && apiToken.backwardJourney && apiToken.backwardJourney.dateTime) {
      cy.get('.mat-calendar-period-button').click();
      cy.get('td').contains(apiToken.backwardJourney.dateTime.getFullYear()).click();
      cy.get('td').contains(apiToken.backwardJourney.dateTime.toLocaleDateString('de', { month: 'long' }).substring(0, 3).toUpperCase()).click();
      cy.get('td').contains(apiToken.backwardJourney.dateTime.getDate()).click();
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      cy.get('.mat-calendar-period-button').click();
      cy.get('td').contains(tomorrow.getFullYear()).click();
      cy.get('td').contains(tomorrow.toLocaleDateString('de', { month: 'long' }).substring(0, 3).toUpperCase()).click();
      cy.get('td').contains(tomorrow.getDate()).click();
    }
    getBackwardJourneyTimeOverlay().click();
    getJourneySelectedTime().click();
    if (apiToken && apiToken.backwardJourney && apiToken.backwardJourney.isArrivalDateTime) {
      getBackwardJourneyIsArrivalDateTimeTrueRadioButton().check({ force: true });
    }
  }
}

Cypress.Commands.add('searchForm', searchForm);
