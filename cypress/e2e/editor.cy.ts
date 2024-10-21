describe('Editor E2E Testing', () => {

  it('Check editor UI', () => {

    cy.visit('http://localhost:3000')
    cy.get('a > .inline-flex').should('have.text', 'Create meme')
    cy.get('a > .inline-flex').click()
    cy.get('.flex-none > :nth-child(1) > .gap-1 > .w-12')
    cy.get('.flex-none > :nth-child(1) > .gap-1 > [data-state="on"]')
    cy.get('.flex-none > :nth-child(1) > .gap-1 > :nth-child(3)')
    cy.get('.flex-none > :nth-child(1) > .gap-1 > :nth-child(4)')
    cy.get('.flex-none > :nth-child(1) > .gap-1 > :nth-child(5)')

    cy.get('.flex-none > :nth-child(1) > button > .lucide-trash2')
    cy.get('.flex-none > :nth-child(1) > .hover\\:bg-primary\\/90').should('be.visible')

    cy.get('.md\\:flex > .fit-auto').should('be.visible')
    cy.get('.md\\:flex > :nth-child(7)').should('be.visible')
    cy.get('.md\\:flex > :nth-child(8)').should('be.visible')
    cy.get('.space-x-4 > .rounded-full').should('be.visible')
    cy.get('.text-4xl').should('have.text', 'Memes Editor')
    cy.get('.grid > :nth-child(1) > .text-sm').should('have.text', 'Width (px)')
    cy.get('.grid > :nth-child(2) > .text-sm').should('have.text', 'Height (px)')
    cy.get('#width').should('have.value', '1920')
    cy.get('#height').should('have.value', '1080')
    cy.get('.col-span-2 > .text-sm').should('have.text', 'Background Color')
    cy.get('#bg-color').should('have.value', '#FFFFFF')
    cy.get('.inline-flex > .font-black').should('have.text', 'Edit from blank canvas')

  })

  it('Make a meme', () => {
    cy.visit('http://localhost:3000')
    cy.get('a > .inline-flex').click()
    cy.get('.inline-flex > .font-black').click()

    cy.get('[d="m6 6 12 12"]').click()

    cy.get(':nth-child(8) > .lucide').click()
    cy.get('.flex-none > :nth-child(1) > .gap-1 > :nth-child(3)').click()
    cy.get('.upper-canvas').trigger('mousedown')
    cy.get('.upper-canvas').trigger('mousemove', 100, 100)
    cy.get('.upper-canvas').trigger('mouseup')

    cy.compareSnapshot('rect', 0.1)

    const arrows = '{rightarrow}'.repeat(30)

    cy.get('[style="transform: var(--radix-slider-thumb-transform); position: absolute; left: calc(2% + 9.6px);"] > .block').click().type(arrows)

    cy.compareSnapshot('rect+slider', 0.1)

    cy.get('[aria-controls="radix-:r10:"] > #rectcolor').click()
    cy.get('#rect-\\#ff0000').click()
    cy.get('.md\\:flex > [aria-expanded="false"] > #rectstrokecolor').click()
    cy.get('#rectstroke-\\#FFEA00').click()
    cy.get('[aria-controls="radix-:r10:"] > #rectcolor').click()

    cy.get('.upper-canvas').click()

    cy.compareSnapshot('rect+slider+color', 0.1)

    cy.get('.flex-none > :nth-child(1) > .gap-1 > :nth-child(4) > .lucide').click()
    cy.get('[style="transform: var(--radix-slider-thumb-transform); position: absolute; left: calc(5% + 9px);"] > .block').click().wait(1000)

    cy.get('[style="transform: var(--radix-slider-thumb-transform); position: absolute; left: calc(5% + 9px);"] > .block').click().type(arrows)
    cy.get('.md\\:flex > [type="button"] > #freedrawcolor').click()
    cy.get('#freedraw-\\#0000ff').click()

    cy.get('.upper-canvas').trigger('mousedown', 500, 400)
    cy.get('.upper-canvas').trigger('mousemove', 550, 600, { force: true })
    cy.get('.upper-canvas').trigger('mouseup')

    cy.compareSnapshot('rect+slider+color+freedraw', 0.1)

    cy.get('.flex-none > :nth-child(1) > .gap-1 > :nth-child(5) > .lucide').click()
    cy.get('.upper-canvas').click(600, 600)
    cy.get('.md\\:flex > .gap-1 > [aria-label="Toggle bold"] > .lucide').click()
    cy.get('.md\\:flex > .gap-1 > [aria-label="Toggle italic"] > .lucide').click()
    cy.get('.md\\:flex > .gap-1 > [aria-pressed="false"] > .lucide').click()
    cy.get('.md\\:flex > [aria-haspopup="dialog"] > .lucide > [cx="17.5"]').click()
    cy.get('[style="background: rgb(0, 0, 255);"]').click()
    cy.get('.flex-none > :nth-child(1) > .gap-1 > :nth-child(2)').click()

    cy.get('.flex-none > :nth-child(1) > .gap-1 > :nth-child(3) > .lucide').click()
    cy.get('.upper-canvas').trigger('mousedown', 600, 650)
    cy.get('.upper-canvas').trigger('mousemove', 650, 700, { force: true })
    cy.get('.upper-canvas').trigger('mouseup')

    cy.get('.upper-canvas').trigger('mousedown', 700, 600)
    cy.get('.upper-canvas').trigger('mousemove', 750, 700, { force: true })
    cy.get('.upper-canvas').trigger('mouseup')

    cy.compareSnapshot('rect+slider+color+freedraw+beforeundo', 0.1)
    cy.get('.md\\:flex > :nth-child(1) > .lucide').click() // UNDO

    cy.compareSnapshot('rect+slider+color+freedraw+aftereundo', 0.1)
    cy.get('.md\\:flex > :nth-child(2) > .lucide').click() // REDO

    cy.compareSnapshot('finish', 0.1)

    cy.get('.flex-none > :nth-child(1) > .hover\\:bg-primary\\/90 > .lucide').click()
    cy.get('#\\:r1u\\:-form-item').type('prueba')
    cy.get('.sm\\:flex-row > .bg-primary').click()
    cy.get('.grid > .text-sm').should('have.text', 'Your meme has been downloaded locally')

    const path = require("path")
    const downloadsFolder = Cypress.config("downloadsFolder")
    cy.readFile(path.join(downloadsFolder, "prueba.png")).should("exist")

    cy.get('.flex-none > :nth-child(1) > .hover\\:bg-primary\\/90 > .lucide').click()
    cy.get('#meme_extension').click()
    cy.get('[data-test="jpeg_meme_extension"]').click()
    cy.get('.sm\\:flex-row > .bg-primary').click()
    cy.get('.grid > .text-sm').should('have.text', 'Your meme has been downloaded locally')

    cy.readFile(path.join(downloadsFolder, "prueba.jpeg")).should("exist")

    cy.get('.flex-none > :nth-child(1) > .hover\\:bg-primary\\/90 > .lucide').click()
    cy.get('#radix-\\:rq\\: > .h-full > .border').click()
    cy.get('.sm\\:flex-row > .bg-primary').click()
    cy.get('.grid > .text-sm').should('have.text', 'Your meme has been saved in Catálogo de prueba').wait(7000)

    cy.get('.flex-row.justify-center > .text-xl').should('have.text', '  Catálogo de prueba')
    cy.get('.sm\\:justify-center > .text-xl').should('have.text', 'Memes')
    cy.get(':nth-child(2) > .text-primary').should('have.text', 'prueba')
  })

  it('Edit the meme recently created', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.visit('http://localhost:3000')
    cy.get('.block > .text-xl').click()
    cy.get('a > .inline-flex > .lucide').click().wait(2000)

    cy.compareSnapshot('edit', 0.1)
    //cy.screenshot('edit')

    cy.get('.upper-canvas').click()
    cy.get('[aria-controls="radix-:r10:"] > #rectcolor').click()
    cy.get('#rect-\\#008000').click()
    cy.get('[aria-expanded="true"] > #rectcolor').click()
    cy.get('.md\\:flex > :nth-child(4) > .lucide').click().wait(1000)
    cy.get('.grid > .text-sm').should('have.text', "Meme manually saved!Just in case, it happens every minute 😉")

    cy.visit('http://localhost:3000')
    cy.get('.block > .text-xl').click().wait(2000)
    cy.compareSnapshot('manuallysaved', 0.1)

  })

})