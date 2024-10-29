describe('Memes E2e Testing', () => {

  it('Asserting catalogue', () => {
    cy.visit('http://localhost:3000/').wait(1000)

    // If there is no catalogue, create one

    cy.get('.max-w-4xl').then(($body) => {

      if (!($body.text().includes('Catálogo de prueba'))) {
        cy.get('#create_catalogue_button').click()
        cy.get('#catalogue_title_input').type('Catálogo de prueba')
        cy.get('#catalogue_description_textarea').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged')
        cy.get('#submit_button').click().wait(1000)
        cy.get('.fixed > .group').should('be.visible')
        cy.get('.font-semibold').should('have.text', 'Successful catalogue creation')
        cy.get('.opacity-90').should('have.text', 'The catalogue was created successfully.')

        cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Catálogo de prueba')
      }

    })

  })

  it('Prevent remove and then remove', () => {
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Catálogo de prueba')
    cy.get('.grid > :nth-child(1) > .inline-flex > .lucide').click()
    cy.get('[data-cy="catalogue_count"]').should('have.text', 'You are about to remove this catalogue with 1 meme(s). Are you sure?')

    cy.get('[data-cy="cancel_remove_approve_button"]').click()

    cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Catálogo de prueba')
    cy.get('.grid > :nth-child(1) > .inline-flex > .lucide').click()
    cy.get('[data-cy="catalogue_count"]').should('have.text', 'You are about to remove this catalogue with 1 meme(s). Are you sure?')

    cy.get('[data-cy="submit_remove_approve_button"]').click()

    cy.get(':nth-child(1) > .block > .text-xl').should('have.text', 'Testing catalogue')
  })

})