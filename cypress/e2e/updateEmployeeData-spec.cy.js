describe('Update Activity Data', () => {
    it('should update activity data', () => {
        const id = 1;
        const data = {
        id: '1',
        title: 'something',
        dueDate: "2023-11-09T07:46:16.799Z",
        completed: false
      };
  
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('web2')}/v1/Activities/${id}`,
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        // Log the response body
        Cypress.log({
            name: 'Response Body',
            message: JSON.stringify(response.body),
          });
        expect(response.status).to.equal(200);
        // Convert data.id to number for comparison
        const expectedId = Number(data.id);

        // Check the specific values in the response body
        expect(response.body.id).to.equal(expectedId);
        expect(response.body.title).to.equal(data.title);
        expect(response.body.dueDate).to.equal(data.dueDate);
        expect(response.body.completed).to.equal(data.completed);
      });
    });
  });
  
  