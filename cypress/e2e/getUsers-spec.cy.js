describe('API Test - List Users', () => {

  const userId = 2;
  const firstName = 'Janet';
  const lastName = 'Weaver';
  const userEmail = 'janet.weaver@reqres.in';
  const nonExistingUserId = 4300;

  it('should validate the API response for a list of users', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('web1')}/api/users?page=2`
    }).then((response) => {
        // Assertions on the response
        expect(response.status).to.equal(200); // verifies 200 is the successful status code

        // Validate the 'page', 'total', and 'total_pages' properties
        expect(response.body.page).to.be.a('number');
        expect(response.body.page).to.be.greaterThan(0); // verifies 'page' is a positive number
        expect(response.body.total).to.be.a('number');
        expect(response.body.total).to.be.greaterThan(0); // verifies 'total' is a positive number
        expect(response.body.total_pages).to.be.a('number');
        expect(response.body.total_pages).to.be.greaterThan(0); // verifies 'total_pages' is a positive number

        // Validate the 'data' array
        expect(response.body.data).to.exist; // Ensure 'data' array exists
        expect(response.body.data).to.be.an('array');
        expect(response.body.data).to.not.be.empty; // Ensure 'data' array is not empty

        // Validate each object in the 'data' array for each user
        response.body.data.forEach((user) => {
          expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
          expect(user.id).to.be.a('number');
          expect(user.email).to.be.a('string');
          expect(user.first_name).to.be.a('string');
          expect(user.last_name).to.be.a('string');
          expect(user.avatar).to.be.a('string');
        });
      });
  });
  it('should return the correct user information', () => {
    // Check the user response data
    cy.request({
      method: 'GET',
      url: `${Cypress.env('web1')}/api/users/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.email).to.eq(userEmail);
      expect(response.body.data.avatar).to.eq(
        'https://reqres.in/img/faces/2-image.jpg'
      );

      // Check the user ID, first name, and last name
      expect(response.body.data.id).to.eq(userId);
      expect(response.body.data.first_name).to.eq(firstName);
      expect(response.body.data.last_name).to.eq(lastName);
    });
  });

  it('should return a 404 error for a non-existing user', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('web1')}/api/users/${nonExistingUserId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
})
