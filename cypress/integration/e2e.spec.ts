/// <reference types="cypress" />

import userDataFactory from "../factories/userDataFactory";

describe("E2E tests", () => {
  beforeEach(truncateUsers);

  const appUrl = "http://localhost:3000";

  it("should sign-up given valids inputs", () => {
    const userData = userDataFactory();

    cy.visit(appUrl);

    cy.get("input[placeholder=Nome]").type(userData.name);
    cy.get("input[placeholder=Email]").type(userData.email);
    cy.get("input[placeholder=Senha]").type(userData.password);
    cy.get("input[placeholder='Confirme sua senha']").type(userData.password);

    cy.intercept("POST", "/users").as("createUser");

    cy.contains("Cadastrar").click();

    cy.wait("@createUser").then(() => {});
    cy.contains("Usuário cadastrado com sucesso!");
    cy.url().should("equal", `${appUrl}/login`);
  });

  it("should sign-in given valid credentials", () => {
    const userData = userDataFactory();
    cy.request("POST", "http://localhost:5000/users", userData);

    cy.visit(`${appUrl}/login`);

    cy.get("input[placeholder=Email]").type(userData.email);
    cy.get("input[placeholder=Senha]").type(userData.password);

    cy.intercept("POST", "/users/login").as("login");

    cy.get("button[type=submit]").click();

    cy.wait("@login").then(() => {});
    cy.url().should("equal", `${appUrl}/app/today`);
  });
});

it("should create a category", () => {
  const userData = userDataFactory();
  const response = cy.request("POST", "http://localhost:5000/users", userData);
  console.log(response);
});

function truncateUsers() {
  cy.request("POST", "http://localhost:5000/e2e/truncate", {});
}
