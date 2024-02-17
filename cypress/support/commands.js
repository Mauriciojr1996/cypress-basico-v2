Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {

        cy.get('input[id="firstName"]').type('Adolfo')
        cy.get('input[id="lastName"]').type('Santos') 
        cy.get('input[id="email"]').type('adolfo.santos@test.com.br')
        cy.get('input[id="phone"]').type('11 958476365')
        cy.get('select[id="product"]').select('blog')
        cy.get('input[value="elogio"]').click()
        cy.get('input[id="email-checkbox"]').click() 
        cy.get('textarea[id="open-text-area"]').type('teste teste')
        cy.contains('button' , 'Enviar').click()
})