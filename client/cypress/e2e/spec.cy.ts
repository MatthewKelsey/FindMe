import { entries } from "cypress/types/lodash";
import * as L from "leaflet";

// cypress.d.ts
/// <reference types="cypress" />

describe("The Home Page", () => {
  it("successfully loads without address URL", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "FindMe");
    cy.get("button[name=find-me]");
    cy.get("input[name=search]");
    cy.get("input[type=submit]");
  });

  it("does not render uneccessary elements without address URL", () => {
    cy.visit("/");
    cy.get("h2").should("not.exist");
    cy.get("h3").should("not.exist");
    cy.get(".lesflet-container").should("not.exist");
  });
  it("successfully loads with address URL", () => {
    cy.visit("/Statue of liberty");
    cy.get("h1").should("contain", "FindMe");
    cy.get("button[name=find-me]");
    cy.get("input[name=search]");
    cy.get("input[type=submit]");
    cy.get("h2").should("contain", "Statue of Liberty");
    cy.get("h3").should("contain", "Latitude");
    cy.get("h3").should("contain", "Longitude");
  });
});

describe("Map Rendering", () => {
  it("Should render the map correctly", () => {
    cy.visit("/The Louvre");
    cy.get(".leaflet-container").should("be.visible");
  });
});

describe("Search", () => {
  it("Succesfully loads searched address", () => {
    cy.visit("/");
    cy.get("input[name=search]").type(`Buckingham Palace, London{enter}`);
    cy.url().should("include", "/Buckingham");
    cy.get("h2").should("contain", "SW1A 1AA");
    cy.get("h3").should("contain", "Latitude 51.50083045");
    cy.get("h3").should("contain", "Longitude -0.14297476788588553");
    cy.get(".leaflet-container").should("be.visible");
  });

  it("Searches searches current location", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        const latitude = 41.38879;
        const longitude = 2.15899;
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
          (cb) => {
            return cb({ coords: { latitude, longitude } });
          }
        );
      },
    });
    cy.get("button[name=find-me]").click();
    cy.get("h2").should("be.visible");
    cy.get(".leaflet-container").should("be.visible");
  });
});

describe("Error Handling", () => {
  it("displays error message when address is not found", () => {
    cy.visit("/");
    cy.get("input[name=search]").type(`lhoihsksh{enter}`);
    cy.get("h2").should("contain", "Error fetching data");
  });

  it("displays error message when search bar is empty", () => {
    cy.visit("/");
    cy.get("input[name=search]").type(`{enter}`);
    cy.get("h2").should("contain", "Please enter a valid address");
  });
});
