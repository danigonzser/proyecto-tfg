describe('Catalogues E2e Testing', () => {

  it('Verify no catalogues', () => {
    cy.viewport(375, 667)
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('.flex-col > img').should('be.visible')
    cy.get('.flex-col > :nth-child(2)').should('have.text', 'What? No catalogue?')
    cy.get('.flex-col > :nth-child(3)').should('have.text', 'Go and create a new one')
  })

  it('Creates and check new catalogue #1', () => {
    cy.viewport(375, 667)
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('[data-cy="create_catalogue_button_mobile"]').click()
    cy.get('[data-cy="create_catalogue_input_mobile"]').type('Catálogo de prueba')
    cy.get('[data-cy="create_catalogue_textarea_mobile"]').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged')
    cy.get('[data-cy="create_catalogue_submit_mobile"]').click().wait(1000)

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
    cy.viewport(375, 667)
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('[data-cy="create_catalogue_button_mobile"]').click()
    cy.get('[data-cy="create_catalogue_input_mobile"]').type('Testing catalogue')
    cy.get('[data-cy="create_catalogue_textarea_mobile"]').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged')
    cy.get('[data-cy="create_catalogue_submit_mobile"]').click().wait(1000)

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
    cy.viewport(375, 667)
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('.peer').type('Catálogo{enter}').wait(1000)
    cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Catálogo de prueba')
    cy.get('.peer').clear().wait(1000)
    cy.get('.peer').type('Testing{enter}').wait(1000)
    cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Testing catalogue')

  })
})