describe('Booking', () => {
  beforeEach(() => cy.visit('/'));

  it('should include correct url params when "Einfache Fahrt" was selected', () => {
    cy.get('[data-cy=single-journey]').click();

    // isRoundTrip param
    cy.url().should('include', '/false');
    // outwardJourneyId param
    cy.url().should('include', '/04e11b67-5085-48d1-92a4-c549a673954b');
  });

  it('should display outwardJourneyId and isRoundTrip as false when "Einfache Fahrt" was selected', () => {
    cy.get('[data-cy=single-journey]').click();

    cy.get('[data-cy=is-round-trip]').should('include.text', 'false');
    cy.get('[data-cy=outward-journey-id]').should('have.text', '04e11b67-5085-48d1-92a4-c549a673954b');
    cy.get('[data-cy=backward-journey-id]').should('have.text', '');
  });

  it('should include correct url params when "Hin- und Rückfahrt" was selected', () => {
    cy.get('[data-cy=outward-backward-journey]').click();

    // isRoundTrip param
    cy.url().should('include', '/true');
    // outwardJourneyId param
    cy.url().should('include', '/04e11b67-5085-48d1-92a4-c549a673954b');
    // backwardJourneyId param
    cy.url().should('include', '/c1094660-ccbd-420a-b344-4569b0ae47e2');
  });

  it('should display outwardJourneyId, backwardJourneyId and isRoundTrip as true when "Hin- und Rückfahrt" was selected', () => {
    cy.get('[data-cy=outward-backward-journey]').click();

    cy.get('[data-cy=is-round-trip]').should('include.text', 'true');
    cy.get('[data-cy=outward-journey-id]').should('have.text', '04e11b67-5085-48d1-92a4-c549a673954b');
    cy.get('[data-cy=backward-journey-id]').should('have.text', 'c1094660-ccbd-420a-b344-4569b0ae47e2');
  });
});
