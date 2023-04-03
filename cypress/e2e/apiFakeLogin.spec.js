import data from "../fixtures/data.json";

describe("APi testing - Fake Login", () => {
  it("Login", () => {
    // Submitting a POST request with fake Email and Password
    cy.request({
      method: "POST",
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJ5Dn_n_AIAMa3ibhTvuWpQisDEo3_2zU",
      headers: {},
      body: {
        data,
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Making assirtions about expected statusCode and error
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error.message).to.equal("MISSING_EMAIL");
    });
  });
});
