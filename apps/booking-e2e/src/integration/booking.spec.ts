import {
  getBackwardJourneyIdField,
  getIsRoundTripField,
  getOutwardAndBackwardJourney,
  getOutwardJourneyIdField,
  getSingleJourney
} from '../support/booking.po';

describe('Booking', () => {
  beforeEach(() => cy.visit('/'));

  it('should include correct url params when "Einfache Fahrt" was selected', () => {
    getSingleJourney().click();

    // isRoundTrip param
    cy.url().should('include', '/false');
    // outwardJourneyId param
    cy.url().should('include', '/04e11b67-5085-48d1-92a4-c549a673954b');
  });

  it('should display outwardJourneyId and isRoundTrip as false when "Einfache Fahrt" was selected', () => {
    getSingleJourney().click();

    getIsRoundTripField().should('include.text', 'false');
    getOutwardJourneyIdField().should('have.text', '04e11b67-5085-48d1-92a4-c549a673954b');
    getBackwardJourneyIdField().should('have.text', '');
  });

  it('should include correct url params when "Hin- und Rückfahrt" was selected', () => {
    getOutwardAndBackwardJourney().click();

    // isRoundTrip param
    cy.url().should('include', '/true');
    // outwardJourneyId param
    cy.url().should('include', '/04e11b67-5085-48d1-92a4-c549a673954b');
    // backwardJourneyId param
    cy.url().should('include', '/c1094660-ccbd-420a-b344-4569b0ae47e2');
  });

  it('should display outwardJourneyId, backwardJourneyId and isRoundTrip as true when "Hin- und Rückfahrt" was selected', () => {
    getOutwardAndBackwardJourney().click();

    getIsRoundTripField().should('include.text', 'true');
    getOutwardJourneyIdField().should('have.text', '04e11b67-5085-48d1-92a4-c549a673954b');
    getBackwardJourneyIdField().should('have.text', 'c1094660-ccbd-420a-b344-4569b0ae47e2');
  });
});
