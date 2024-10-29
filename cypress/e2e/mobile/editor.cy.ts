describe('Editor E2E Testing', () => {

  it('Check editor UI', () => {
    cy.viewport(375, 667)
    cy.visit('http://localhost:3000')
    cy.get('a > .inline-flex').should('have.text', 'Create meme').click()

    cy.get('[data-cy="selection_tool_mobile"]')
    cy.get('[data-cy="selection_tool_mobile"]')
    cy.get('[data-cy="rect_tool_mobile"]')
    cy.get('[data-cy="freedraw_tool_mobile"]')
    cy.get('[data-cy="type_tool_mobile"]')
    cy.get('[data-cy="clear_all_button_mobile"]')
    cy.get('[data-cy="insert_image_button_mobile"]')

    cy.get('[data-cy="sync_button_mobile"]')
    cy.get('[data-cy="meme_name_input_mobile"]')
    cy.get('[data-cy="zoom_in_button_mobile"]')
    cy.get('[data-cy="zoom_out_button_mobile"]')
    cy.get('[data-cy="undo_button_mobile"]')
    cy.get('[data-cy="redo_button_mobile"]')

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
    cy.viewport(375, 667)

    cy.visit('http://localhost:3000')
    cy.get('a > .inline-flex').click()
    cy.get('.inline-flex > .font-black').click()

    cy.get('[d="m6 6 12 12"]').click()

    cy.get('[data-cy="zoom_out_button_mobile"]').click()
    cy.get('[data-cy="rect_tool_mobile"]').click()

    cy.get('.upper-canvas').trigger('mousedown')
    cy.get('.upper-canvas').trigger('mousemove', 1, 1)
    cy.get('.upper-canvas').trigger('mouseup')

    cy.compareSnapshot('rect', 0.1)
    //cy.screenshot('rect')

    const arrows = '{rightarrow}'.repeat(30)

    cy.get('[style="transform: var(--radix-slider-thumb-transform); position: absolute; left: calc(2% + 9.6px);"] > .block').click().type(arrows)

    cy.compareSnapshot('rect+slider', 0.1)
    //cy.screenshot('rect+slider')

    cy.get('[data-cy="rectcolor_paint_mobile"]').click()
    cy.get('[data-cy="rectcolor-#ff0000-mobile"]').click()

    cy.get('[data-cy="rectstroke_color_button_mobile"]').click()
    cy.get('[data-cy="rectstroke-#FFEA00-mobile"]').click()
    cy.get('[data-cy="rectstroke_color_button_mobile"]').click()

    cy.compareSnapshot('rect+slider+color', 0.1)
    //cy.screenshot('rect+slider+color')

    cy.get('[data-cy="freedraw_tool_mobile"]').click()

    cy.get('[style="transform: var(--radix-slider-thumb-transform); position: absolute; left: calc(5% + 9px);"] > .block').click().type(arrows)

    cy.get('[data-cy="freedrawcolor_paint_mobile"]').click()
    cy.get('[data-cy="freedraw-#0000ff-mobile"]').click()
    cy.get('[data-cy="freedrawcolor_paint_mobile"]').click()

    cy.get('.upper-canvas').trigger('mousedown')
    cy.get('.upper-canvas').trigger('mousemove', 550, 600, { force: true })
    cy.get('.upper-canvas').trigger('mouseup')

    cy.compareSnapshot('rect+slider+color+freedraw', 0.1)
    //cy.screenshot('rect+slider+color+freedraw')

    cy.get('[data-cy="type_tool_mobile"]').click()
    cy.get('.upper-canvas').click(250, 275)
    cy.get('[data-cy="font_style_bold_button_mobile"]').click()
    cy.get('[data-cy="font_style_italics_button_mobile"]').click()
    cy.get('[data-cy="font_style_underline_button_mobile"]').click()
    cy.get('[data-cy="fontcolor_paint_button_mobile"]').click()

    cy.get('[data-cy="type-#000000-mobile"]').click()
    cy.get('[data-cy="fontcolor_paint_button_mobile"]').click()

    cy.get('[data-cy="redo_button_mobile"]').should('be.disabled')
    cy.get('[data-cy="undo_button_mobile"]').click() // UNDO

    cy.compareSnapshot('rect+slider+color+freedraw+aftereundo', 0.1)
    //cy.screenshot('rect+slider+color+freedraw+aftereundo')

    cy.get('[data-cy="redo_button_mobile"]').click() // REDO

    cy.compareSnapshot('finish', 0.1)
    //cy.screenshot('finish')

    cy.get('.space-x-1 > #save_as_drawer').click()
    cy.get('[data-cy="form_input_meme_name_mobile"]').type('prueba')
    cy.get('[data-cy="form_submit_button_mobile"]').click()
    cy.get('.grid > .text-sm').should('have.text', 'Your meme has been downloaded locally')

    const path = require("path")
    const downloadsFolder = Cypress.config("downloadsFolder")
    cy.readFile(path.join(downloadsFolder, "prueba.png")).should("exist")

    cy.get('.space-x-1 > #save_as_drawer').click()
    cy.get('[data-cy="meme_extension_mobile"]').click()
    cy.get('[data-cy="jpeg_meme_extension_mobile"]').click()
    cy.get('[data-cy="form_submit_button_mobile"]').click()
    cy.get('.grid > .text-sm').should('have.text', 'Your meme has been downloaded locallyYour meme has been downloaded locally')

    cy.readFile(path.join(downloadsFolder, "prueba.jpeg")).should("exist")

    cy.get('.space-x-1 > #save_as_drawer').click()
    cy.get('[data-cy="catalogue_button_tab_mobile"]').click()
    cy.get('[data-cy="form_submit_button_mobile"]').click()
    cy.get('.grid > .text-sm').should('have.text', 'Your meme has been downloaded locallyYour meme has been downloaded locallyYour meme has been saved in Catálogo de prueba')

    cy.get('.flex-row.justify-center > .text-xl').should('have.text', '  Catálogo de prueba')
    cy.get('.sm\\:justify-center > .text-xl').should('have.text', 'Memes')
    cy.get(':nth-child(2) > .text-primary').should('have.text', 'prueba')
  })

  it('Edit the meme recently created', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport(375, 667)

    cy.visit('http://localhost:3000')

    cy.get('.grid > :nth-child(1) > .block').click()
    cy.get('a > .inline-flex > .lucide').click().wait(2000)

    cy.compareSnapshot('edit', 0.1)
    //cy.screenshot('edit')

    cy.get('.upper-canvas').click(200, 200)

    cy.get('[data-cy="rectcolor_paint_mobile"]').click()
    cy.get('[data-cy="rectcolor-#008000-mobile"]').click()
    cy.get('[data-cy="rectcolor_paint_mobile"]').click()

    cy.get('[data-cy="sync_button_mobile"]').click({ force: true }).wait(3000)
    cy.get('.grid > .text-sm').should('have.text', "Meme manually saved!Just in case, it happens every minute 😉")

    cy.visit('http://localhost:3000')
    cy.get('.grid > :nth-child(1) > .block').click()

  })

})