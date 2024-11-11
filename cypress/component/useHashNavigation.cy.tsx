import React from 'react';
import { mount } from '@cypress/react';
import HashNavigationTestComponent from '../../src/components/HashNavigationTestComponent';

describe('useHashNavigation Hook', () => {
  beforeEach(() => {
    mount(<HashNavigationTestComponent />);
  });

  it('should show a text, a button (to navigate back) & #test as url fragment when navigating to the test section', () => {
    cy.get('button').contains('Navigate').click();
    cy.get('#test').should('contain', 'Welcome to the test Section');
    cy.url().should('include', '#test');
  });

  it('should hide the text & remove url fragment from url when clearing the section', () => {
    cy.get('button').contains('Navigate').click();
    cy.get('button').contains('Go back').click();
    cy.get('#drawer').should('contain', '');
    cy.url().should('not.include', '#test');
  });
});
