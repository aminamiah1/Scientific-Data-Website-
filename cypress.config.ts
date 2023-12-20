import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "qnxosg",
    e2e: {
        baseUrl: "http://localhost:3000",
        specPattern: "cypress/e2e/*.{cy,spec}.{js,jsx,ts,tsx}",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },

    component: {
        specPattern: "cypress/{component,api}/*.{cy,spec}.{js,jsx,ts,tsx}",
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
