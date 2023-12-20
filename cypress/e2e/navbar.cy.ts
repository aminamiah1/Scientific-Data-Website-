describe("Navbar", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    const links = [
        { href: "/", text: "Home", dataCy: "nav-home" },
        {
            href: "/heat-demand",
            text: "Heat Demand",
            dataCy: "nav-heat-demand",
        },
        { href: "/breakdown/heat", text: "Heat", dataCy: "nav-breakdown-heat" },
        {
            href: "/breakdown/energy",
            text: "Energy",
            dataCy: "nav-breakdown-energy",
        },
        {
            href: "/half-hourly/gas-boilers",
            text: "Gas boilers",
            dataCy: "nav-half-hourly-gas-boilers",
        },
        {
            href: "/half-hourly/resistance-heaters",
            text: "Resistance heaters",
            dataCy: "nav-half-hourly-resistance-heaters",
        },
        {
            href: "/half-hourly/oat",
            text: "Outside air temperature",
            dataCy: "nav-half-hourly-oat",
        },
    ];

    links.forEach((link) => {
        it(`has a navigation link to ${link.text} that navigates to ${link.href}`, () => {
            switch (true) {
                case link.href.match(/\/breakdown/) !== null:
                    cy.getByTestId("nav-breakdown").click();
                    break;
                case link.href.match(/\/half-hourly/) !== null:
                    cy.getByTestId("nav-half-hourly").click();
                    break;
            }

            cy.get(`a[data-cy="${link.dataCy}"]`)
                .should("have.attr", "href", link.href)
                .and("contain", link.text);
        });
    });
});
