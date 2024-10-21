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

  it('Goes to editor', () => {
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get(':nth-child(1) > .block > .text-xl').click()
    cy.get('.flex-col > .flex > a > .inline-flex').click()
    cy.get('.space-y-8 > .inline-flex').click()
    cy.get('.flex-none > :nth-child(1) > .hover\\:bg-primary\\/90 > .lucide').click()
    cy.get('#radix-\\:rq\\: > .h-full > .border').click()
    cy.get('#\\:r10\\:-form-item').type('Que chulo me encanta')
    cy.get('#radix-\\:rq\\:').click()
    cy.get('#\\:r15\\:-form-item').click()
    cy.get('#\\:r1c\\:').click()
    cy.get('.sm\\:flex-row > .bg-primary').click()
    cy.get(':nth-child(2) > .text-primary').should('have.text', 'Que chulo me encanta')

  })

  it('Prevent remove and then remove', () => {
    cy.visit('http://localhost:3000/').wait(1000)

    cy.get('.block > .text-xl').should('have.text', 'Catálogo de prueba')
    cy.get('.block > .text-xl').click().wait(2000)
    cy.get(':nth-child(2) > .text-primary').should('have.text', 'Que chulo me encanta')
    cy.get('.bg-destructive > .lucide').click().wait(2000)
    cy.get('.fixed > .group').should('be.visible')
    cy.get('.grid > .text-sm').should('have.text', 'Meme removed!')
    cy.get('.group > .inline-flex').click().wait(2000)
    cy.get(':nth-child(2) > .text-primary').should('have.text', 'Que chulo me encanta')
    cy.get('[x1="10"]').click().wait(2000)
    cy.get('.grid > .text-sm').should('have.text', 'Meme removed!')
    cy.get(':nth-child(2) > .text-primary').should('not.be', 'Que chulo me encanta')
  })

})