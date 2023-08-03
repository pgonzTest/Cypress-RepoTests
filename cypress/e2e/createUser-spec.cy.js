const firstName = 'John';
const lastName = 'Doe';

describe('Create User API Test', () => {
  it('should create a user and validate the response', () => {
    cy.request('POST', `${Cypress.env('web1')}/api/users?name=${firstName}+${lastName}&job=leader`)
      .then((response) => {

        // Log the response body
        Cypress.log({
          name: 'Response Body',
          message: JSON.stringify(response.body),
        });
        // Verify the status code is 201
        expect(response.status).to.equal(201);

        // Verify the response body
        expect(response.body).to.have.property('id').to.be.a('string');
        expect(response.body).to.have.property('createdAt').to.be.a('string');

        // Validate the date format of createdAt field (ISO 8601 format)
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
        expect(response.body.createdAt).to.match(dateRegex);
      });
  });
});









