import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Gantilah dengan URL tempat aplikasi Next.js Anda berjalan
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
