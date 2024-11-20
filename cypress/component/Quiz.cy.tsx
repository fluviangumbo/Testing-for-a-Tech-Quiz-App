import Quiz from '../../client/src/components/Quiz';

describe('Quiz before start', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />)
  });

  it ('should render a start button', () => {
    cy.mount(<Quiz />)
    cy.get('button').should('have.text', 'Start Quiz')
  });
})

describe('Quiz after start', () => {
  beforeEach(() => {
    cy.mount(<Quiz />)
    cy.intercept({
      method: 'GET',
      url: '/api/questions/random'
    },
    {
      fixture: 'questions.json',
      statusCode: 200
    }
    ).as ('fixtureQuestions');
    cy.get('button').click();
  });
  
  it('should have fetched the fixture questions', () => {
    cy.wait('@fixtureQuestions').then((intercept) => {
      assert.isNotNull(intercept.response?.body, 'API call returned data');

      cy.get('h2').should('contain.text', 'Which movie is directed by David Lean?');
      cy.get('[class="mt-3"]').children().eq(2).should('contain.text', 'Bridge on the River Kwai');
    });
  });
})