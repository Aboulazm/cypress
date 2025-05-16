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
describe('Automation Exercise Advanced Test Cases', () => {
  const baseUrl = 'https://www.automationexercise.com';
  let userEmail; // Declare variable in describe scope
  const userPassword = 'Password123';

  beforeEach(() => {
    // Initialize fresh email for each test
    userEmail = `user_${Date.now()}@example.com`;
    cy.visit(baseUrl);
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('TC11: Verify Subscription in Cart Page', () => {
  // Use more specific selector to target cart button
  cy.get('header a[href="/view_cart"]')
    .should('be.visible')
    .click();

  cy.get('#footer').scrollIntoView();
  cy.contains('h2', 'Subscription').should('be.visible');
  
  cy.get('#susbscribe_email').type(userEmail);
  cy.get('#subscribe').click();
  cy.contains('You have been successfully subscribed!').should('be.visible');
});


// cypress/e2e/tc12_add_cart.cy.js
it('TC12: Add Products in Cart - Final Working Version', () => {
  // 1. Visit products page
  cy.visit('/products');

  // 2. Wait for products to be visible
  cy.get('.features_items .product-image-wrapper', { timeout: 15000 })
    .should('have.length.at.least', 2);

  // 3. Add first product
  cy.get('.features_items .product-image-wrapper').eq(0).scrollIntoView().trigger('mouseover');
  cy.get('.features_items .product-image-wrapper').eq(0)
    .contains('Add to cart')
    .click({ force: true });

  // 4. Wait for modal and click 'Continue Shopping'
  cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
  cy.get('.modal-content')
    .contains('Continue Shopping')
    .click({ force: true });

  // 5. Add second product
  cy.get('.features_items .product-image-wrapper').eq(1).scrollIntoView().trigger('mouseover');
  cy.get('.features_items .product-image-wrapper').eq(1)
    .contains('Add to cart')
    .click({ force: true });

  // 6. Wait for modal and click 'Continue Shopping'
  cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
  cy.get('.modal-content')
    .contains('Continue Shopping')
    .click({ force: true });

  // 7. Visit cart
  cy.visit('/view_cart');

  // 8. Assert cart items
  cy.get('body').then(($body) => {
    if ($body.find('#cart_info_table').length > 0) {
      cy.get('#cart_info_table').within(() => {
        cy.get('tbody tr').should('have.length.at.least', 2);
      });
    } else {
      cy.get('.cart-items').should('exist');
      cy.get('.cart-item').should('have.length.at.least', 2);
    }
  });
});
describe('Automation Exercise - Full Flow', () => {
  const user = {
    name: 'TestUser',
    email: `testuser_${Date.now()}@mail.com`,
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Cypress Lane',
    country: 'India',
    state: 'TestState',
    city: 'TestCity',
    zip: '12345',
    mobile: '1234567890'
  };

  // Utility function to add first product with specified quantity
  function addProductWithQuantity(quantity) {
    cy.visit('/');
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('View Product').click();
    });

    cy.url().should('include', '/product_details');
    cy.get('input#quantity').clear().type(quantity);
    cy.get('.cart .btn-default').click();
    cy.contains('View Cart').click();
  }

// test_case_13.cy.js
describe('Product Quantity Verification', () => {
  it('Validates 4 items in cart', () => {
    // Access site
    cy.visit('https://www.automationexercise.com')
    
    // Verify homepage
    cy.title().should('include', 'Automation Exercise')

    // Open first available product
    cy.get('[href^="/product_details/"]').first().click()

    // Set quantity to 4 and add to cart
    cy.get('#quantity').clear().type('4')
    cy.contains('button', 'Add to cart').click()

    // Handle cart modal and view cart
    cy.get('.modal-content').should('be.visible')
    cy.contains('View Cart').click()

    // Verify quantity in cart
    cy.get('.cart_quantity button')
      .should('have.text', '4')
      .and('be.visible')
  })
})




it('TC15: Place Order - Register before Checkout', () => {
  // Test Configuration
  const user = {
    name: 'Test User',
    email: `testuser${Date.now()}@mail.com`,
    password: 'Test@1234',
    dob: { day: '10', month: 'May', year: '1990' },
    address: {
      firstName: 'Test',
      lastName: 'User',
      street: '123 Test St',
      country: 'India',
      state: 'TestState',
      city: 'TestCity',
      zipcode: '123456',
      phone: '1234567890'
    },
    payment: {
      nameOnCard: 'Test User',
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2026'
    }
  };

  // 1. Homepage Verification
  cy.visit('https://automationexercise.com/');
  cy.get('[alt="Website for automation practice"]')
    .should('be.visible');

  // 2. Registration Process
  cy.get('a[href="/login"]').click();
  
  // Signup Form
  cy.get('[data-qa="signup-name"]').type(user.name);
  cy.get('[data-qa="signup-email"]').type(user.email);
  cy.get('[data-qa="signup-button"]').click();

  // Account Information
  cy.get('#id_gender1').check();
  cy.get('[data-qa="password"]').type(user.password);
  cy.get('[data-qa="days"]').select(user.dob.day);
  cy.get('[data-qa="months"]').select(user.dob.month);
  cy.get('[data-qa="years"]').select(user.dob.year);
  
  // Address Information
  cy.get('[data-qa="first_name"]').type(user.address.firstName);
  cy.get('[data-qa="last_name"]').type(user.address.lastName);
  cy.get('[data-qa="address"]').type(user.address.street);
  cy.get('[data-qa="country"]').select(user.address.country);
  cy.get('[data-qa="state"]').type(user.address.state);
  cy.get('[data-qa="city"]').type(user.address.city);
  cy.get('[data-qa="zipcode"]').type(user.address.zipcode);
  cy.get('[data-qa="mobile_number"]').type(user.address.phone);
  
  cy.get('[data-qa="create-account"]').click();

  // 3. Account Confirmation
  cy.contains('Account Created!').should('be.visible');
  cy.get('[data-qa="continue-button"]').click();
  cy.contains(`Logged in as ${user.name}`)
    .should('be.visible');

  // 4. Add Product to Cart
  cy.get('.productinfo')
    .first()
    .trigger('mouseover')
    .find('[data-product-id]')
    .first()
    .click({ force: true });

  // Handle Cart Modal
  cy.get('#cartModal')
    .should('be.visible')
    .within(() => {
      cy.contains('a', 'View Cart')
        .should('be.visible')
        .click({ force: true });
    });

  // 5. Checkout Process
  cy.get('#cart_info_table').should('be.visible');
  cy.contains('Proceed To Checkout').click();

  // 6. Payment Process
  cy.get('textarea[name="message"]')
    .type('Deliver ASAP')
    .should('have.value', 'Deliver ASAP');
  
  cy.contains('Place Order').click();

  // Payment Details
  cy.get('[data-qa="name-on-card"]').type(user.payment.nameOnCard);
  cy.get('[data-qa="card-number"]').type(user.payment.cardNumber);
  cy.get('[data-qa="cvc"]').type(user.payment.cvc);
  cy.get('[data-qa="expiry-month"]').type(user.payment.expiryMonth);
  cy.get('[data-qa="expiry-year"]').type(user.payment.expiryYear);
  
  cy.get('[data-qa="pay-button"]').click();

  // 7. Order Confirmation
  cy.contains('Order Placed!', { timeout: 15000 })
    .should('be.visible');
 
    
   

  // 8. Cleanup - Delete Account
  cy.get('a[href="/delete_account"]').click();
  cy.contains('Account Deleted!').should('be.visible');
  cy.get('[data-qa="continue-button"]').click();
});

describe('Complete Purchase and Account Deletion Flow', () => {
  const user = {
    email: 'test@example.com',
    password: 'Password123',
    name: 'Test User'
  }

  const payment = {
    nameOnCard: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2025'
  }

  it('Completes full purchase flow and account deletion', () => {
    // Steps 1-3: Navigate and verify homepage
    cy.visit('https://www.automationexercise.com')
    cy.title().should('eq', 'Automation Exercise')

    // Step 4: Navigate to login
    cy.contains('Signup / Login').click()
    cy.url().should('include', '/login')

    // Step 5: Login with credentials
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(user.password)
    cy.get('[data-qa="login-button"]').click()

    // Step 6: Verify logged in status
    cy.contains(`Logged in as ${user.name}`).should('be.visible')

    // Step 7: Add products to cart
    cy.get('.features_items .add-to-cart').first().click()
    cy.get('.modal-content').should('be.visible')
    cy.contains('Continue Shopping').click()

    // Step 8-9: Navigate to cart
    cy.contains(' Cart').click()
    cy.url().should('include', '/view_cart')

    // Step 10: Initiate checkout
    cy.contains('Proceed To Checkout').click()

    // Step 11: Verify address and order
    cy.get('#address_delivery').should('be.visible')
    cy.get('#cart_info_table').should('be.visible')

    // Step 12: Add comment and place order
    cy.get('textarea[name="message"]').type('Test order comment')
    cy.contains('Place Order').click()

    // Steps 13-14: Payment details
    cy.get('[data-qa="name-on-card"]').type(payment.nameOnCard)
    cy.get('[data-qa="card-number"]').type(payment.cardNumber)
    cy.get('[data-qa="cvc"]').type(payment.cvc)
    cy.get('[data-qa="expiry-month"]').type(payment.expiryMonth)
    cy.get('[data-qa="expiry-year"]').type(payment.expiryYear)
    cy.get('[data-qa="pay-button"]').click()

    // Step 15: Verify success
    cy.contains('Your order has been placed successfully!', { timeout: 30000 })
      .should('be.visible')

    // Step 16-17: Delete account
    cy.contains(' Delete Account').click()
    cy.contains('ACCOUNT DELETED!').should('be.visible')
    cy.contains('Continue').click()
  })
})
});

describe('TC17:Product Removal from Cart', () => {
  it('TC18:Verifies product removal from cart', () => {
    // Step 1-2: Launch browser and navigate
    cy.visit('https://www.automationexercise.com')

    // Step 3: Verify home page
    cy.title().should('eq', 'Automation Exercise')
    cy.get('header').should('be.visible')

    // Step 4: Add product to cart
    cy.get('.features_items')
      .should('be.visible')
      .find('.add-to-cart')
      .first()
      .click()

    // Handle add to cart modal
    cy.get('.modal-content')
      .should('be.visible')
      .contains('Continue Shopping')
      .click()

    // Step 5: Navigate to cart
    cy.get('a[href="/view_cart"]').first().click()

    // Step 6: Verify cart page
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')

    // Step 7: Remove product
    cy.get('.cart_quantity_delete')
      .first()
      .click()

    // Step 8: Verify removal
    cy.get('#empty_cart')
      .should('be.visible')
      .and('contain', 'Cart is empty!')

    // Alternative verification for non-empty cart messages
    cy.get('.cart_item').should('not.exist')
  })
})

describe('TC18:Category Navigation Validation', () => {
  it('TC18:Verifies category navigation flow', () => {
    // 1-2. Launch and navigate
    cy.visit('https://www.automationexercise.com')

    // 3. Verify categories - NEW APPROACH
    cy.get('#accordian').should('be.visible').within(() => {
      cy.contains('Women').should('be.visible')
      cy.contains('Men').should('be.visible')
    })

    // 4-5. Navigate to Women -> Dress
    cy.get('#accordian').contains('.panel-heading', 'Women')
      .click({ force: true })
      .siblings('#Women')
      .contains('a', 'Dress')
      .click({ force: true })

    // 6. Verify category page
    cy.url().should('include', '/category_products/1')
    cy.get('.features_items').should('contain', 'Dress')

    // 7-8. Navigate to Men -> Jeans
    cy.visit('/') // Reset state
    cy.get('#accordian').contains('.panel-heading', 'Men')
      .click({ force: true })
      .siblings('#Men')
      .contains('a', 'Jeans')
      .click({ force: true })

    // Final verification
    cy.url().should('include', '/category_products/6')
    cy.get('.features_items').within(() => {
      cy.get('.productinfo').should('have.length.gt', 0)
      cy.contains('Jeans').should('exist')
    })
  })
})



describe('TC19:Brand Products Verification', () => {
  it('TC19:Validates brand navigation and product display', () => {
    // Step 1-2: Launch and navigate
    cy.visit('https://www.automationexercise.com')

    // Step 3: Navigate to products page
    cy.get('header a[href="/products"]').click()
    cy.url().should('include', '/products')

    // Step 4: Verify brands visibility
    cy.get('.brands_products').should('be.visible').within(() => {
      cy.contains('h2', 'Brands').should('be.visible')
      cy.get('.brands-name a').should('have.length.gt', 1)
    })

    // Store brand links using aliases
    cy.get('.brands-name a').first().as('firstBrand')
    cy.get('.brands-name a').eq(1).as('secondBrand')

    // Step 5: Click first brand
    cy.get('@firstBrand').click()
    
    // Step 6: Verify brand page
    cy.url().should('include', '/brand_products/')
    cy.get('.features_items').should('be.visible').within(() => {
      cy.get('.productinfo').should('have.length.gt', 0)
      cy.get('.productinfo img').should('be.visible')
    })

    // Step 7: Navigate back to brands
    cy.go('back')
    cy.url().should('include', '/products')

    // Step 7-8: Click and verify second brand
    cy.get('.brands_products').within(() => {
      cy.get('@secondBrand').click()
    })

    // Step 8: Verify second brand page
    cy.url().should('include', '/brand_products/')
    cy.get('.features_items').should(($products) => {
      expect($products.find('.productinfo').length).to.be.gt(0)
    })
  })
})
});


describe('Test Case 20: Search Products and Verify Cart After Login', () => {

  const productToSearch = 'dress'; // or any product name that exists on the site

  before(() => {
    cy.visit('http://automationexercise.com');
  });

  it('TC20:Searches for a product and adds to cart, then verifies cart after login', () => {
    // Step 3: Click on 'Products' button
    cy.contains('Products').click();

    // Step 4: Verify navigation to ALL PRODUCTS
    cy.url().should('include', '/products');
    cy.contains('All Products').should('be.visible');

    // Step 5: Search for a product
    cy.get('#search_product').type(productToSearch);
    cy.get('#submit_search').click();

    // Step 6: Verify 'SEARCHED PRODUCTS' is visible
    cy.contains('Searched Products').should('be.visible');

    // Step 7: Verify all products related to search are visible
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);

    // Step 8: Add all searched products to cart
    cy.get('.features_items .product-image-wrapper').each(($el, index) => {
      cy.wrap($el).trigger('mouseover');
      cy.wrap($el).contains('Add to cart').click({force: true});
      cy.contains('Continue Shopping').click();
    });

    // Step 9: Go to Cart and verify products are visible
    cy.contains('Cart').click();
    cy.url().should('include', '/view_cart');
    cy.get('.cart_info tbody tr').should('have.length.greaterThan', 0);

    // Step 10: Click Signup/Login and log in
    cy.contains('Signup / Login').click();
    cy.get('input[data-qa="login-email"]').type('testuser@example.com');
    cy.get('input[data-qa="login-password"]').type('test123');
    cy.get('button[data-qa="login-button"]').click();

    // Step 11: Go to Cart again
    cy.contains('Cart').click();

    // Step 12: Verify products are still visible after login
    cy.url().should('include', '/view_cart');
    cy.get('.cart_info tbody tr').should('have.length.greaterThan', 0);
  });


  describe('Test Case 21: Add review on product', () => {

  it('Adds a review on a product successfully', () => {
    // Step 1 & 2: Launch browser and visit the URL
    cy.visit('http://automationexercise.com');

    // Step 3: Click on 'Products' button
    cy.contains('Products').click();

    // Step 4: Verify user is navigated to ALL PRODUCTS page
    cy.url().should('include', '/products');
    cy.contains('All Products').should('be.visible');

    // Step 5: Click on 'View Product' of the first product
    cy.get('.product-image-wrapper').first().contains('View Product').click();

    // Step 6: Verify 'Write Your Review' is visible
    cy.contains('Write Your Review').should('be.visible');

    // Step 7: Enter name, email and review
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#review').type('This product is amazing! Highly recommended.');

    // Step 8: Click 'Submit' button
    cy.get('#button-review').click();

    // Step 9: Verify success message
    cy.contains('Thank you for your review.').should('be.visible');
  });

});
describe('Test Case 22: Add to cart from Recommended items', () => {

  it('Adds a product to cart from Recommended Items section', () => {
    // Step 1 & 2: Launch browser and visit the URL
    cy.visit('http://automationexercise.com');

    // Step 3: Scroll to bottom of the page
    cy.scrollTo('bottom');

    // Step 4: Verify 'RECOMMENDED ITEMS' are visible (more reliable selector)
    cy.get('.recommended_items', { timeout: 10000 }).should('be.visible');

    // Optional: Check for section title
    cy.get('.recommended_items').contains('recommended items', { matchCase: false }).should('be.visible');

    // Step 5: Click on 'Add To Cart' on the first Recommended product
    cy.get('.recommended_items .productinfo.text-center').first().contains('Add to cart').click({ force: true });

    // Step 6: Click on 'View Cart' button
    cy.contains('View Cart').click();

    // Step 7: Verify that product is displayed in cart page
    cy.url().should('include', '/view_cart');
    cy.get('.cart_info tbody tr').should('have.length.greaterThan', 0);
  });

});
describe('Test Case 23: Verify address details in checkout page', () => {
  const userData = {
    name: 'TestUser',
    email: `testuser_${Date.now()}@example.com`,
    password: 'test1234',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Automation Inc',
    address1: '123 Test St',
    address2: 'Suite 456',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M1A1A1',
    mobile: '1234567890'
  };

  it('should verify address details during checkout', () => {
    // Step 1 & 2: Launch and visit URL
    cy.visit('http://automationexercise.com');

    // Step 3: Verify homepage is visible
    cy.get('body').should('contain.text', 'Home');

    // Step 4: Click on Signup/Login
    cy.contains('Signup / Login').click();

    // Step 5: Fill details and sign up
    cy.get('[data-qa="signup-name"]').type(userData.name);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('[data-qa="signup-button"]').click();

    // Fill Account Info
    cy.get('#id_gender1').check();
    cy.get('#password').type(userData.password);
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1995');
    cy.get('#first_name').type(userData.firstName);
    cy.get('#last_name').type(userData.lastName);
    cy.get('#company').type(userData.company);
    cy.get('#address1').type(userData.address1);
    cy.get('#address2').type(userData.address2);
    cy.get('#country').select(userData.country);
    cy.get('#state').type(userData.state);
    cy.get('#city').type(userData.city);
    cy.get('#zipcode').type(userData.zipcode);
    cy.get('#mobile_number').type(userData.mobile);
    cy.get('[data-qa="create-account"]').click();

    // Step 6: Verify account creation
    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();

    // Step 7: Verify 'Logged in as' at top
    cy.contains(`Logged in as ${userData.name}`).should('be.visible');

    // Step 8: Add products to cart
    cy.contains('Products').click();
    cy.get('.productinfo.text-center').first().trigger('mouseover');
    cy.contains('Add to cart').first().click({ force: true });
    cy.contains('Continue Shopping').click();

    // Step 9: Click Cart
    cy.contains('Cart').click();

    // Step 10: Verify cart page is displayed
    cy.url().should('include', '/view_cart');
    cy.contains('Shopping Cart').should('be.visible');

    // Step 11: Click Proceed To Checkout
    cy.contains('Proceed To Checkout').click();

    // Step 12 & 13: Verify delivery and billing addresses
    cy.get('#address_delivery').should('contain.text', userData.firstName);
    cy.get('#address_delivery').should('contain.text', userData.address1);
    cy.get('#address_delivery').should('contain.text', userData.city);

    cy.get('#address_invoice').should('contain.text', userData.firstName);
    cy.get('#address_invoice').should('contain.text', userData.address1);
    cy.get('#address_invoice').should('contain.text', userData.city);

    // Step 14: Delete Account
    cy.contains('Delete Account').click();

    // Step 15: Verify 'ACCOUNT DELETED!'
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });
});
describe('Test Case 25: Verify Scroll Up and Scroll Down functionality', () => {
  it('should verify scroll down and scroll up using arrow button', () => {
    // Step 1-3: Launch and navigate
    cy.visit('http://automationexercise.com');
    cy.get('body').should('contain', 'Home');

    // Step 4: Scroll down to bottom
    cy.scrollTo('bottom');

    // Step 5: Verify 'SUBSCRIPTION' visible
    cy.contains('Subscription').should('be.visible');

    // Step 6: Click arrow button to scroll up
    cy.get('#scrollUp')  // The arrow button at bottom right usually has id 'scrollUp'
      .should('be.visible')
      .click();

    // Step 7: Verify page scrolled up - check for specific text visible at top
    cy.contains('Full-Fledged practice website for Automation Engineers')
      .should('be.visible');
  });
});
describe('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
  it('should scroll down to bottom and scroll up to top without using arrow button', () => {
    // Step 1-3: Launch and navigate
    cy.visit('http://automationexercise.com');
    cy.get('body').should('contain', 'Home');

    // Step 4: Scroll down to bottom
    cy.scrollTo('bottom');

    // Step 5: Verify 'SUBSCRIPTION' visible
    cy.contains('Subscription').should('be.visible');

    // Step 6: Scroll up to top WITHOUT using arrow button
    cy.scrollTo('top');

    // Step 7: Verify page scrolled up - check specific top text is visible
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');
  });
});

});

});