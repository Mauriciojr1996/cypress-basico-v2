// função a baixo seria a loadsh que executa o testes ate 3 vezes e pode ser configurado mais vezes
Cypress._.times(3, function() {
      it('testa a página da política de privacidade de forma independente', function() {
            cy.visit('./src/privacy.html')
            cy.contains('Talking About Testing').should('be.visible')
      });
})