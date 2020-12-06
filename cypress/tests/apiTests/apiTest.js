import people from "../../data/people.json";
import { clientNameIs } from "../../helpers/locateDataInResponse";

describe("API Test", function () {
  it("POST API test 1 - People", () => {
    cy.request({
      url: `https://postman-echo.com/post`,
      method: "POST",
      body: people,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.find((x) => clientNameIs(x, "Mike")).age).to.eq("75");
      const decoded = decodeURIComponent(response.body.headers.cookie);
      const [key, value] = decoded.split("=");
      const jsonCookie = {
        [key]: value,
      };
      cy.writeFile("cypress/data/cookie.json", jsonCookie);
    });
  });

  it("GET API test 2 - Stream", () => {
    cy.request({
      url: `https://postman-echo.com/stream/10`,
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eq(200);
      const normalizedResponse = `[${response.body}]`.replaceAll("}{", "},{");
      const jsonObjects = JSON.parse(normalizedResponse);
      expect(jsonObjects[0].headers.host).to.eq("postman-echo.com");
      const totalCountofObjectsInResponse = jsonObjects.length;
      expect(totalCountofObjectsInResponse).to.eq(10);
    });
  });

  it("GET API test 3 - ID=1", () => {
    cy.request({
      url: `https://postman-echo.com/get?id=1`,
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.args.id).to.eq("1");
    });
  });

  it("POST API test 4 - 401", () => {
    cy.request({
      failOnStatusCode: false,
      url: `https://postman-echo.com/status/401`,
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eq(401);
      cy.log(response.status);
    });
  });

  it("POST API test 5 - Basic auth", () => {
    const basicToken = btoa(
      `${Cypress.env("username")}:${Cypress.env("password")}`
    );
    cy.request({
      url: `https://postman-echo.com/basic-auth`,
      method: "GET",
      headers: {
        Authorization: `Basic ${basicToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
    });
  });
});
