describe('Catalogues E2e Testing', () => {

  it('Verify no catalogues', () => {
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('.flex-col > img').should('be.visible')
    cy.get('.flex-col > :nth-child(2)').should('have.text', 'What? No memes?')
    cy.get('.flex-col > :nth-child(3)').should('have.text', 'Go and create a new one')
    cy.get('.flex-col > .flex > #create_catalogue_button > .lucide > [d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"]').should('be.visible')
  })

  it('Creates and check new catalogue #1', () => {
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('#create_catalogue_button').click()
    cy.get('#catalogue_title_input').type('Catálogo de prueba')
    cy.get('#catalogue_description_textarea').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged')
    cy.get('#submit_button').click().wait(1000)
    cy.get('.fixed > .group').should('be.visible')
    cy.get('.font-semibold').should('have.text', 'Successful catalogue creation')
    cy.get('.opacity-90').should('have.text', 'The catalogue was created successfully.')

    cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Catálogo de prueba')
    cy.get(':nth-child(1) > .block > .text-xl').click()
    cy.get('.flex-row.justify-center > .text-xl').should('have.text', '  Catálogo de prueba')
    cy.get('.text-center').should('have.text', 'What? No memes?')
    cy.get('.flex-col > .flex > a > .inline-flex').should('be.visible')
    cy.get('.sm\\:justify-center > .text-xl').should('have.text', 'Memes')
    cy.get('a > .lucide').click().wait(1000)
  })

  it('Creates and check new catalogue #2', () => {
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('#create_catalogue_button').click()
    cy.get('#catalogue_title_input').type('Testing catalogue')
    cy.get('#catalogue_description_textarea').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged')
    cy.get('#submit_button').click().wait(1000)
    cy.get('.fixed > .group').should('be.visible')
    cy.get('.font-semibold').should('have.text', 'Successful catalogue creation')
    cy.get('.opacity-90').should('have.text', 'The catalogue was created successfully.')

    cy.get(':nth-child(2) > .block > .text-xl').should('have.text', 'Testing catalogue')
    cy.get(':nth-child(2) > .block > .text-xl').click()
    cy.get('.flex-row.justify-center > .text-xl').should('have.text', '  Testing catalogue')
    cy.get('.text-center').should('have.text', 'What? No memes?')
    cy.get('.flex-col > .flex > a > .inline-flex').should('be.visible')
    cy.get('.sm\\:justify-center > .text-xl').should('have.text', 'Memes')
    cy.get('a > .lucide').click().wait(1000)
  })

  it('Searches catalogues', () => {
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('.peer').type('Catálogo{enter}').wait(1000)
    cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Catálogo de prueba')
    cy.get('.peer').clear().wait(1000)
    cy.get('.peer').type('Testing{enter}').wait(1000)
    cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Testing catalogue')

  })
})