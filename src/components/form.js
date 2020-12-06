export class signupForm {

  submit(name, email, telephone, country, company, message){
    cy.get('.form-name', {timeout:60000}).type(name);
    cy.get('.form-mail').type(email);
    cy.get('.form-telephone').type(telephone);
    cy.get('.form-country > input').type(country);
    cy.get('.form-company > input').type(company);
    cy.get('.form-message').type(message);
  }

  clickSubmitButton(){
    cy.get('.dt-btn').click();
  }

}

export const formSignup = new signupForm();