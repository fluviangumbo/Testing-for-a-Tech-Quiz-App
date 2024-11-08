import React from 'react';
import Quiz from '../../client/src/components/Quiz';

import mockQuestions from '../fixtures/questions.json';

describe('<Quiz />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />)
  });

  it ('should render a start button', () => {
    cy.mount(<Quiz />)
    cy.get('button').should('have.text', 'Start Quiz')
  });

  it('should give a quiz when prompted', () => {
    cy.mount(<Quiz />)
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json', status: 200 }).as('fixtureQuestions');
  });
})