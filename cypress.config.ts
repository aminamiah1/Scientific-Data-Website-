import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "qnxosg",
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
