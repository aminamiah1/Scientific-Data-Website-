describe("Chart is correctly displaying", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/half-hourly/oat");
    });

    it("Exists in the DOM", () => {
        cy.get("#chart").should("exist");
    });

    it("Has the correct number of data points in daily resolution", () => {
        let NUM_OF_DATAPOINTS: number;
        cy.wait(2000);

        cy.document()
            .should("exist")
            .find("#chart circle")
            .then((c) => (NUM_OF_DATAPOINTS = c.length));

        cy.request(
            "http://localhost:3000/api/half-hourly/oat?resolution=daily"
        ).should((res) => {
            const NUM_OF_METADATA_ENTRIES = 1;
            expect(res.body).to.have.length(
                NUM_OF_DATAPOINTS + NUM_OF_METADATA_ENTRIES
            );
        });
    });

    it("Has the correct number of data points in half-hourly resolution", () => {
        let NUM_OF_DATAPOINTS: number;
        cy.getByTestId("resolution-switch").click();

        cy.wait(7000);

        cy.document()
            .should("exist")
            .find("#chart circle")
            .then((c) => (NUM_OF_DATAPOINTS = c.length));

        cy.request(
            "http://localhost:3000/api/half-hourly/oat?resolution=half-hourly"
        ).should((res) => {
            const NUM_OF_METADATA_ENTRIES = 1;
            expect(res.body).to.have.length(
                NUM_OF_DATAPOINTS + NUM_OF_METADATA_ENTRIES
            );
        });
    });

    it("Disables the switch after changing resolution", () => {
        cy.document()
            .should("exist")
            .getByTestId("resolution-switch")
            .click()
            .should("be.disabled");
    });
});
