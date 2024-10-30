import { defineConfig } from 'cypress'
import { configureVisualRegression } from 'cypress-visual-regression'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 966,
  e2e: {
    env: {
      visualRegressionType: 'regression',
      visualRegressionBaseDirectory: 'cypress/snapshot/base',
      visualRegressionDiffDirectory: 'cypress/snapshot/diff',
      visualRegressionGenerateDiff: 'fail',
    },
    screenshotsFolder: './cypress/snapshot/actual',
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      configureVisualRegression(on)
    },
    specPattern: 'cypress/**/*.cy.ts',
    experimentalStudio: true,
  },
  projectId: 'danielgs-tfg',
})
