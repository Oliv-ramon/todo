/// <reference types="cypress" />

import userDataFactory from "../factories/userDataFactory";

describe("Sign-up/Sign-in tests", () => {
  beforeEach(truncateUsers);

  it("should sign-up given valids inputs", () => {
    const userData = userDataFactory();

    const appUrl = "http://localhost:3000";

    cy.visit(appUrl);

    cy.get("input[placeholder=Email]").type(userData.email);
    cy.get("input[placeholder=Senha]").type(userData.password);
    cy.get("input[placeholder='Confirme sua senha']").type(userData.password);

    cy.intercept("POST", "/users").as("createUser");

    cy.contains("Cadastrar").click();

    cy.wait("@createUser").then(() => {});
    cy.contains("Usuário cadastrado com sucesso!");
    cy.url().should("equal", `${appUrl}/login`);
  });
});

function truncateUsers() {
  cy.request("POST", "http://localhost:5000/e2e/truncate", {});
}
