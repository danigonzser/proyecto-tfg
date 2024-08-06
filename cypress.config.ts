/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line n/no-unpublished-import
import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/**/*.cy.ts',
  },
});
