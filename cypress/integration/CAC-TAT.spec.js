/// <reference types="Cypress" /



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html')
    })

    it.only('verifica o titulo da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });
    
    it.only('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Gostaria de dizer que o curso esta sendo otimo !!!' 
        cy.get('input[id="firstName"]').should('be.visible').type('Adolfo')
        cy.get('input[id="lastName"]').should('be.visible').type('Santos') 
        cy.get('input[id="email"]').should('be.visible').type('adolfo.santos@test.com.br')
        cy.get('input[id="phone"]').should('be.visible').type('11 958476365')
        cy.get('select[id="product"]').select('blog').should('have.value','blog')
        cy.get('input[value="elogio"]').should('be.visible').click()
        cy.get('input[id="email-checkbox"]').should('be.visible').click() 
        cy.get('textarea[id="open-text-area"]').should('be.visible').type(longText, {delay: 0})
        cy.contains('button' , 'Enviar').click()
        cy.get('.success').should('be.visible')

    });

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id="firstName"]').should('be.visible').type('Adolfo')
        cy.get('input[id="lastName"]').should('be.visible').type('Santos') 
        cy.get('input[id="email"]').should('be.visible').type('adolfo.santos@test,com.br')
        cy.get('textarea[id="open-text-area"]').should('be.visible').type('teste')
        cy.contains('button' , 'Enviar').click()
        cy.get('.error').should('be.visible')
      
    });

    it.only('campo de telefone continua vazio quando preenchido com valor não numerico  ', function() {
       cy.get('#phone')
           .type('abcde')
           .should('have.value', '')

      
    });

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('input[id="firstName"]').should('be.visible').type('Adolfo')
        cy.get('input[id="lastName"]').should('be.visible').type('Santos') 
        cy.get('input[id="email"]').should('be.visible').type('adolfo.santos@test.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('textarea[id="open-text-area"]').should('be.visible').type('teste')
        cy.contains('button' , 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
           cy.get('input[id="firstName"]').type('Adolfo').should('have.value','Adolfo').clear().should('have.value','')
           cy.get('input[id="lastName"]').type('Santos').should('have.value','Santos').clear().should('have.value','')
           cy.get('input[id="email"]').type('adolfo.santos@test.com.br').should('have.value','adolfo.santos@test.com.br').clear().should('have.value','')
           cy.get('input[id="phone"]').type('11958476365').should('have.value','11958476365').clear().should('have.value','')
      
    });
      it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button' , 'Enviar').click()

        cy.get('.error').should('be.visible')

        
      });

      it.only('envia o formuário com sucesso usando um comando customizado', function() {
         cy.fillMandatoryFieldsAndSubmit()
         cy.get('.success').should('be.visible')
      });

      it.only('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('youtube')
        .should('have.value', 'youtube')
        
      });
      
      it.only('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('select').select('Mentoria')
        .should('have.value', 'mentoria')
      });

      it.only('seleciona um produto (Blog) por seu índice', function() {
        cy.get('select').select(1)
        .should('have.value', 'blog')
      });

      it.only('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[value="feedback"]').check()
        .should('have.value', 'feedback')
      });

      it.only('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) { 
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')   
        })
      });
      
      it.only('marca ambos checkboxs, depois desmarca o ultimo ', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
      });

      it.only('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
         expect($input[0].files[0].name).to.eql('example.json') 
      })
      });

      it.only('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
         expect($input[0].files[0].name).to.eql('example.json') 
      });
    })
    
    it.only('seleciona um arquivo ultilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.eql('example.json') 
    });
    })

    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('a[target="_blank"]').should('have.attr', 'target' , '_blank')

    });

    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
      cy.get('a[target="_blank"]').invoke('removeAttr', 'target').click()
      cy.contains('Talking About Testing').should('be.visible')

    });
     
 })
