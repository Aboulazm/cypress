describe('Automation Exercise - Register and Login Test Cases', () => {
  const baseUrl = 'https://www.automationexercise.com';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Test Case 1: Register User', () => {
    cy.navigateToHomePage();
    cy.get('a[href="/login"]').click();
    cy.get('h2:contains("New User Signup!")').should('be.visible');

    const email = `testuser_${Date.now()}@example.com`;
    cy.signupUser('Test User', email);

    cy.contains('b', 'Enter Account Information').should('be.visible');
    cy.get('#id_gender1').check();
    cy.get('#password').type('Password123');
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('#first_name').type('Test');
    cy.get('#last_name').type('User');
    cy.get('#company').type('Test Company');
    cy.get('#address1').type('123 Test Street');
    cy.get('#address2').type('Suite 100');
    cy.get('#country').select('Canada');
    cy.get('#state').type('Ontario');
    cy.get('#city').type('Toronto');
    cy.get('#zipcode').type('M1A1A1');
    cy.get('#mobile_number').type('1234567890');
    cy.get('button[data-qa="create-account"]').click();

    cy.contains('b', 'Account Created!').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();

    cy.get('a').contains('Logged in as').should('exist');
    cy.deleteAccount();
  });

it('Test Case 2: Login User with correct email and password', () => {
  const email = `testuser_${Date.now()}@example.com`;
  const password = 'Password123';
  const name = 'Test User';

  // Register a new user
  cy.visit(baseUrl);
  cy.get('a[href="/login"]').click();
  cy.contains('h2', 'New User Signup!').should('be.visible');
  cy.signupUser(name, email);

  // Fill account details
  cy.get('#id_gender1').check();
  cy.get('#password').type(password);
  cy.get('#days').select('10');
  cy.get('#months').select('May');
  cy.get('#years').select('1990');
  cy.get('#newsletter').check();
  cy.get('#optin').check();
  cy.get('#first_name').type('Test');
  cy.get('#last_name').type('User');
  cy.get('#company').type('Test Company');
  cy.get('#address1').type('123 Test Street');
  cy.get('#address2').type('Suite 100');
  cy.get('#country').select('Canada');
  cy.get('#state').type('Ontario');
  cy.get('#city').type('Toronto');
  cy.get('#zipcode').type('M1A1A1');
  cy.get('#mobile_number').type('1234567890');
  cy.get('button[data-qa="create-account"]').click();

  // Continue and logout
  cy.get('a[data-qa="continue-button"]').click();
  cy.contains('a', ' Logout').click();

  // Perform login with registered credentials
  cy.get('a[href="/login"]').click();
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);
  cy.get('button[data-qa="login-button"]').click();

  // Verify successful login
  cy.get('a[href="/logout"]').should('be.visible');
  cy.contains('a', `Logged in as ${name}`).should('exist');
  cy.url().should('eq', `${baseUrl}/`);
});

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.navigateToHomePage();
    cy.get('a[href="/login"]').click();
    cy.contains('h2', 'Login to your account').should('be.visible');

    cy.loginUser('wronguser@example.com', 'WrongPassword');

    cy.get('.login-form p').should('contain.text', 'Your email or password is incorrect!');
  });

describe('Automation Exercise - Logout Test', () => {
  const baseUrl = 'https://www.automationexercise.com';
  const password = 'Password123';
  let email;

  beforeEach(() => {
    // Generate unique email before each test
    email = `testuser_${Date.now()}@example.com`;
    
    // Register new user
    cy.visit(`${baseUrl}/login`);
    cy.get('input[data-qa="signup-name"]').type('Test User');
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();

    // Complete registration form
    cy.get('#id_gender1').check();
    cy.get('#password').type(password);
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('#first_name').type('Test');
    cy.get('#last_name').type('User');
    cy.get('#company').type('Test Company');
    cy.get('#address1').type('123 Test Street');
    cy.get('#address2').type('Suite 100');
    cy.get('#country').select('Canada');
    cy.get('#state').type('Ontario');
    cy.get('#city').type('Toronto');
    cy.get('#zipcode').type('M1A1A1');
    cy.get('#mobile_number').type('1234567890');
    cy.get('button[data-qa="create-account"]').click();
    cy.get('a[data-qa="continue-button"]').click();
  });

  it('Test Case 4: Logout User', () => {
    // Verify initial logged-in state
    cy.get('li').contains('a', 'Logged in as Test User').should('be.visible');

    // First logout after registration
    cy.contains('a', ' Logout').click();
    
    // Navigate to login page again
    cy.get('a[href="/login"]').click();

    // Login with registered credentials
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();

    // Verify successful login
    cy.get('li').contains('a', 'Logged in as Test User')
      .should('be.visible');

    // Perform test logout
    cy.contains('a', ' Logout').click();

    // Verify successful logout
    cy.get('a[href="/login"]').should('be.visible');
    cy.url().should('eq', `${baseUrl}/login`);
    
    // Verify login state is cleared
    cy.get('li').contains('a', 'Logged in as Test User').should('not.exist');
  });

describe('Automation Exercise - Test Case 5', () => {
  const baseUrl = 'https://www.automationexercise.com';
  const password = 'Password123';
  let existingEmail;

  beforeEach(() => {
    existingEmail = `existing_${Date.now()}@example.com`;
    // Clear previous sessions
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(baseUrl);
  });

  it('TC5: Register User with existing email', () => {
    // First registration - create test account
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');

    // Register initial user
    cy.get('input[data-qa="signup-name"]').type('Initial User');
    cy.get('input[data-qa="signup-email"]').type(existingEmail);
    cy.get('button[data-qa="signup-button"]').click();

    // Complete registration form
    cy.get('#id_gender1').check();
    cy.get('#password').type(password);
    cy.get('#days').select('1');
    cy.get('#months').select('January');
    cy.get('#years').select('2000');
    cy.get('#first_name').type('Test');
    cy.get('#last_name').type('User');
    cy.get('#address1').type('123 Main St');
    cy.get('#country').select('United States');
    cy.get('#state').type('California');
    cy.get('#city').type('Los Angeles');
    cy.get('#zipcode').type('90001');
    cy.get('#mobile_number').type('5551234567');
    cy.get('button[data-qa="create-account"]').click();

    // Verify account creation
    cy.contains('Account Created!').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();

    // Logout user
    cy.contains('a', ' Logout').click();

    // Attempt duplicate registration
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');

    // Fill duplicate registration form
    cy.get('.signup-form').within(() => {
      cy.get('input[data-qa="signup-name"]').type('Duplicate User');
      cy.get('input[data-qa="signup-email"]').type(existingEmail);
      cy.get('button[data-qa="signup-button"]').click();
    });

    // Handle URL variations
    cy.url().then((currentUrl) => {
      const allowedPaths = ['/login', '/signup'];
      const isValidPath = allowedPaths.some(path => currentUrl.includes(path));
      expect(isValidPath).to.be.true;
    });

    // Verify error message
    cy.get('.signup-form')
      .should('contain.text', 'Email Address already exist!')
      .and('be.visible');

    // Ensure not on account creation page
    cy.url().should('not.include', '/account-creation');
  });
});
});
it('Test Case 6: Contact Us Form', () => {
  // Create a dummy text file dynamically
  const fileName = 'example.txt';
  const fileContent = 'This is a test file content';
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const testFile = new File([blob], fileName);

  cy.get('a[href="/contact_us"]').click();
  cy.url().should('include', '/contact_us');
  cy.contains('h2', 'Get In Touch').should('be.visible');

  // Fill contact form
  cy.get('input[name="name"]').type('John Doe');
  cy.get('input[name="email"]').type('john@example.com');
  cy.get('input[name="subject"]').type('Test Inquiry');
  cy.get('#message').type('This is a test message');
  
  // File upload solution
  cy.get('input[name="upload_file"]').then(subject => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);
    subject[0].files = dataTransfer.files;
    
    // Trigger change event for Cypress to detect the file
    cy.wrap(subject).trigger('change', { force: true });
  });

  cy.get('input[value="Submit"]').click();
  
  // Handle alert
  cy.on('window:confirm', () => true);
  
  cy.contains('div.status.alert.alert-success', 'Success! Your details have been submitted successfully.')
    .should('be.visible');
  
  cy.get('#form-section a').contains('Home').click();
  cy.url().should('eq', baseUrl + '/');
});
//it('Test Case 7: Verify Test Cases Page', () => {
  cy.get('.navbar-nav')
    .contains('a', 'Test Cases')
    .click();

  // Verify page structure
  cy.url().should('include', '/test_cases');
  cy.contains('h2', 'Test Cases').should('be.visible');

  // Flexible test case verification
  cy.get('.panel-title').each(($el) => {
    cy.wrap($el)
      .invoke('text')
      .then(text => text.trim())
      .should('match', /^Test Case \d+: .+/i);
  });

  // Alternative: Verify minimum test cases exist
  cy.get('.panel-title:contains("Test Case")').should('have.length.at.least', 5);
//})

  it('Test Case 8: Verify All Products and Product Detail Page', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.contains('h2', 'All Products').should('be.visible');
    
    // Verify products list
    cy.get('.features_items .product-image-wrapper').should('have.length.gt', 0);

    // View first product
    cy.get('.product-image-wrapper:first').within(() => {
      cy.contains('View Product').click();
    });

    // Verify product details
    cy.get('.product-information').within(() => {
      cy.get('h2').should('not.be.empty'); // Product name
      cy.contains('Category:').should('be.visible');
      cy.contains('Rs. ').should('be.visible'); // Price
      cy.contains('Availability:').should('be.visible');
      cy.contains('Condition:').should('be.visible');
      cy.contains('Brand:').should('be.visible');
    });
  });

  it('Test Case 9: Search Product', () => {
    const searchTerm = 'Blue Top';
    
    cy.get('a[href="/products"]').click();
    cy.get('#search_product').type(searchTerm);
    cy.get('#submit_search').click();

    cy.contains('h2', 'Searched Products').should('be.visible');
    cy.get('.product-image-wrapper').each($product => {
      cy.wrap($product).find('.productinfo p').should('contain', searchTerm);
    });
  });

  it('Test Case 10: Verify Subscription', () => {
    cy.get('#footer').scrollIntoView();
    cy.contains('h2', 'Subscription').should('be.visible');
    
    cy.get('#susbscribe_email').type('test@example.com');
    cy.get('#subscribe').click();
    
    cy.contains('div.alert-success.alert', 'You have been successfully subscribed!')
      .should('be.visible');
  });


});




