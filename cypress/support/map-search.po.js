export const getSearchMapTab = () => cy.get('#mat-tab-label-0-1');
export const getMap = () => cy.get('[data-cy=map-search]');
export const getNearestTravelPointList = () => cy.get('[data-cy=nearest-travel-point-list]');
export const getNoNearestTravelPointResult = () => cy.get('[data-cy=no-nearest-travel-point-result]');
export const getFirstNearestTravelPointResult = () => cy.get(':nth-child(1) > .mat-list-item-content > .mat-list-text > dravelopsefafrontend-nearest-travel-point-list-item > [data-cy=travel-point-list-item] > .info');
export const getDepartureIcon = () => cy.get('.departure-icon');
export const getDepartureIconPath = () => getDepartureIcon().invoke('attr', 'src');
export const getDepartureIconAsset = () => `assets/departure_icon.svg`;
export const getArrivalIcon = () => cy.get('.arrival-icon');
export const getArrivalIconPath = () => getArrivalIcon().invoke('attr', 'src');
export const getArrivalIconAsset = () => `assets/arrival_icon.svg`;
