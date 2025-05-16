describe('Test Case 7: Verify Test Cases Page', () => {
  it('should navigate to Test Cases page successfully', () => {
    // Step 1-3: Launch browser and visit homepage
    cy.visit('http://automationexercise.com');
    cy.get('body').should('contain', 'Home');

    // Step 4: Click on 'Test Cases' button
    cy.contains('Test Cases').click();

    // Step 5: Verify user is navigated to test cases page successfully
    cy.url().should('include', '/test_cases');
    cy.contains('Test Cases').should('be.visible');
  });
});
