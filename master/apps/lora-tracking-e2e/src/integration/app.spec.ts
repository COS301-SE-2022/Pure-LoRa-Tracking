import { getGreeting } from '../support/app.po';

describe('Check for sensors', () => {
  before(() => cy.visit('/'));
  it("It sees sens-11",()=>{
    cy.get('[data-cy="marker"]').contains("sens-11");
  });
  it("It sees sens-12",()=>{
    cy.get('[data-cy="marker"]').contains("sens-12");
  });
  it("It sees sens-13",()=>{
    cy.get('[data-cy="marker"]').contains("sens-13");
  });
});

describe('Check the clicking of the map markers',()=>{
  before(() => cy.visit('/'));

  it("Clicking on sens-11 shows popup",()=>{
    cy.get('[data-cyinfo="info"]').eq(0).should('be.not.visible');
    cy.get('[aria-label="sens-11"]').click()
    cy.get('[data-cyinfo="info"]').eq(0).should('be.visible');
    cy.get('[data-cyinfo="info"]').contains("sens")
  })
  it("Clicking on sens-12 shows popup",()=>{
    cy.get('[data-cyinfo="info"]').eq(1).should('be.not.visible');
    cy.get('[aria-label="sens-12"]').click()
    cy.get('[data-cyinfo="info"]').eq(1).should('be.visible');
    cy.get('[data-cyinfo="info"]').contains("sens")
  })
  it("Clicking on sens-13 shows popup",()=>{
    cy.get('[data-cyinfo="info"]').eq(2).should('be.not.visible');
    cy.get('[aria-label="sens-13"]').click()
    cy.get('[data-cyinfo="info"]').eq(2).should('be.visible');
    cy.get('[data-cyinfo="info"]').contains("sens")
  })

})

