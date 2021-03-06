export const getRoundTripRadioButton = () => cy.get('[data-cy=round-trip-radio-button] > .mat-radio-label > .mat-radio-container > .mat-radio-input');
export const getDepartureAutocompleteField = () => cy.get('[data-cy=departure-input]');
export const getDepartureAutocompleteOption = index => cy.get(`[data-cy=departure-input-option-${index ? index : 0}]`);
export const getDepartureAutocompleteError = () => cy.get('[data-cy=departure-input-error]');
export const getArrivalAutocompleteField = () => cy.get('[data-cy=arrival-input]');
export const getArrivalAutocompleteOption = index => cy.get(`[data-cy=arrival-input-option-${index ? index : 0}]`);
export const getArrivalAutocompleteError = () => cy.get('[data-cy=arrival-input-error]');
export const getOutwardJourneyDateField = () => cy.get('[data-cy=outward-journey-date]');
export const getOutwardJourneyDateOverlay = () => cy.get('[data-cy=outward-date] > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix');
export const getOutwardJourneyDateError = () => cy.get('[data-cy=outward-journey-date-error]');
export const getOutwardJourneyTimeField = () => cy.get('[data-cy=outward-journey-time]');
export const getOutwardJourneyTimeOverlay = () => cy.get('[data-cy=outward-time] > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix');
export const getOutwardJourneyTimeError = () => cy.get('[data-cy=outward-journey-time-error]');
export const getOutwardJourneyIsArrivalDateTimeFalseRadioButton = () => cy.get('[data-cy=outward-journey-is-arrival-date-time-false] > .mat-radio-label > .mat-radio-container > .mat-radio-input');
export const getOutwardJourneyIsArrivalDateTimeTrueRadioButton = () => cy.get('[data-cy=outward-journey-is-arrival-date-time-true] > .mat-radio-label > .mat-radio-container > .mat-radio-input');
export const getBackwardJourneyDateField = () => cy.get('[data-cy=backward-journey-date]');
export const getBackwardJourneyDateOverlay = () => cy.get('[data-cy=backward-date] > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix');
export const getBackwardJourneyDateError = () => cy.get('[data-cy=backward-journey-date-error]');
export const getBackwardJourneyDateBeforeOutwardJourneyDateError = () => cy.get('[data-cy=backward-journey-date-before-outward-journey-date-error]');
export const getBackwardJourneyTimeField = () => cy.get('[data-cy=backward-time]');
export const getBackwardJourneyTimeOverlay = () => cy.get('[data-cy=backward-time] > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix');
export const getBackwardJourneyTimeError = () => cy.get('[data-cy=backward-journey-time-error]');
export const getBackwardJourneyTimeBeforeOutwardJourneyTimeError = () => cy.get('[data-cy=backward-journey-time-before-outward-journey-time-error]');
export const getBackwardJourneyIsArrivalDateTimeRadioGroup = () => cy.get('[data-cy=backward-journey-is-arrival-date-time]');
export const getBackwardJourneyIsArrivalDateTimeFalseRadioButton = () => cy.get('[data-cy=backward-journey-is-arrival-date-time-false] > .mat-radio-label > .mat-radio-container > .mat-radio-input');
export const getBackwardJourneyIsArrivalDateTimeTrueRadioButton = () => cy.get('[data-cy=backward-journey-is-arrival-date-time-true] > .mat-radio-label > .mat-radio-container > .mat-radio-input');
export const getJourneySelectedTime = () => cy.get('.mat-button-wrapper').contains('Ok');
export const getSubmitButton = () => cy.get('[data-cy=submit]');
