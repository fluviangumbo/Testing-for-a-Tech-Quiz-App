describe('User Experience', () => {
beforeEach(() => {
  cy.visit("/")
  cy.intercept({
    method: 'GET',
    url: '/api/questions/random'
  },
  {
    fixture: 'questions.json',
    statusCode: 200
  }
  ).as('fixtureQuestions')
  });


  it('should start the quiz when prompted and properly navigate through the questions as the user answers, displaying result and offering new quiz', () => {
    cy.get('button').click();
    cy.wait('@fixtureQuestions').then((intercept) => {
      assert.isNotNull(intercept.response?.body, 'API call returned data');

      cy.findAllByText('3').click();
      // cy.get('[class="mt-3"]').children().eq(2).children().eq(0).click();

      cy.findAllByText('2').click();

      cy.findAllByText('4').click();

      cy.get('h2').should('contain.text', 'Quiz Completed');
      cy.get('[class="alert alert-success"]').should('contain.text', 'Your score: 3/3'); // 'Your score: ' + '3' + '/' + '3'
      cy.get('button')
        .should('contain.text', 'Take New Quiz')
        .click();
      
      cy.get('h2').should('contain.text', 'Which movie is directed by David Lean?');
    });
  });
})