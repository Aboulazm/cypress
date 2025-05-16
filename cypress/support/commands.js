// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js
Cypress.Commands.add('signupUser', (name, email) => {
  cy.get('input[data-qa="signup-name"]').type(name);
  cy.get('input[data-qa="signup-email"]').type(email);
  cy.get('button[data-qa="signup-button"]').click();
});

Cypress.Commands.add('loginUser', (email, password) => {
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);
  cy.get('button[data-qa="login-button"]').click();
});


Cypress.Commands.add('deleteAccount', () => {
  cy.get('a').contains('Delete Account').click();
  cy.get('b').contains('Account Deleted!').should('be.visible');
  cy.get('a[data-qa="continue-button"]').click();
});

Cypress.Commands.add('logoutUser', () => {
  cy.get('a').contains('Logout').click();
  cy.url().should('include', '/login');
});

Cypress.Commands.add('navigateToHomePage', () => {
  cy.visit('https://www.automationexercise.com');
});
Cypress.Commands.add('addProductToCart', (index) => {
  cy.get('.product-image-wrapper').eq(index).within(() => {
    cy.contains('Add to cart').click({ force: true });
  });
});

Cypress.Commands.add('verifyCartTotals', () => {
  let total = 0;
  cy.get('#cart_info_table').within(() => {
    cy.get('.cart_price').each(($price) => {
      total += parseFloat($price.text().replace('Rs. ', ''));
    }).then(() => {
      cy.get('.cart_total_price').last().should('contain', total);
    });
  });
});

Cypress.Commands.add('checkoutAndRegister', (email) => {
  cy.get('a[href="/view_cart"]').click();
  cy.contains('Proceed To Checkout').click();
  cy.contains('Register / Login').click();
  cy.registerUser(`User_${Date.now()}`, email);
});

Cypress.Commands.add('checkoutAndPay', () => {
  cy.get('a[href="/view_cart"]').click();
  cy.contains('Proceed To Checkout').click();
  cy.get('#ordermsg').type('Test order comments');
  cy.contains('Place Order').click();
  cy.fillPaymentDetails();
});

Cypress.Commands.add('fillPaymentDetails', () => {
  cy.get('input[name="name_on_card"]').type('Test User');
  cy.get('input[name="card_number"]').type('4111111111111111');
  cy.get('input[name="cvc"]').type('123');
  cy.get('input[name="expiry_month"]').type('12');
  cy.get('input[name="expiry_year"]').type('2030');
  cy.get('#submit').click();
});

Cypress.Commands.add('verifyOrderSuccess', () => {
  cy.contains('Your order has been placed successfully!').should('be.visible');
});
Cypress.Commands.add('addProductToCart', (index) => {
  cy.get('.product-image-wrapper').eq(index)
    .trigger('mouseover')
    .within(() => {
      cy.contains('Add to cart').click({ force: true });
    });
});
Cypress.Commands.add('handleCartModal', (buttonText) => {
  cy.get('#cartModal').should('be.visible').within(() => {
    cy.contains(buttonText).click({ force: true });
  });
});

Cypress.Commands.add('verifyCartTotal', () => {
  let total = 0;
  cy.get('.cart_price').each(($price) => {
    const priceText = $price.text().trim();
    const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    total += priceValue;
  }).then(() => {
    cy.get('.cart_total_price:last').then($total => {
      const totalText = $total.text().trim();
      const totalValue = parseFloat(totalText.replace(/[^0-9.]/g, ''));
      expect(totalValue).to.equal(total);
    });
  });
});
Cypress.Commands.add('addProductToCart', (productId) => {
  cy.get(`[data-product-id="${productId}"]`).trigger('mouseover');
  cy.get(`[data-product-id="${productId}"] .add-to-cart`).click({ force: true });
});

Cypress.Commands.add('verifyCartTotal', (expectedTotal, formatter) => {
  let calculatedTotal = 0;
  
  // Get all product prices
  cy.get('.cart_price').each(($priceEl) => {
    const priceText = $priceEl.text().trim();
    const priceValue = parseFloat(
      priceText
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1') // Handle multiple decimals
    );
    
    Cypress.log({
      name: 'Price debug',
      message: `Raw: ${priceText} | Parsed: ${priceValue}`
    });
    
    calculatedTotal += priceValue;
  }).then(() => {
    // Verify calculated total matches expected
    const formattedExpected = formatter
      ? formatter.format(expectedTotal)
      : expectedTotal.toFixed(2);

    cy.get('.cart_total_price:last').then(($totalEl) => {
      const totalText = $totalEl.text().trim();
      const totalValue = parseFloat(
        totalText
          .replace(/[^0-9.]/g, '')
          .replace(/(\..*)\./g, '$1')
      );

      Cypress.log({
        name: 'Total debug',
        message: `Expected: ${formattedExpected} | Actual: ${totalText}`
      });

      expect(totalValue).to.be.closeTo(expectedTotal, 0.01);
    });
  });
});
Cypress.Commands.add('addProductWithRetry', (productIndex, buttonText) => {
  const options = {
    interval: 1000,
    timeout: 15000,
  };

  cy.retry(() => {
    // Hover and click product
    cy.get('.product-image-wrapper')
      .eq(productIndex)
      .trigger('mouseover')
      .find('a.add-to-cart:visible')
      .first()
      .click({ force: true });

    // Handle modal with enhanced visibility checks
    return cy.get('#cartModal.modal.show')
      .should('be.visible')
      .within(() => {
        cy.contains('button', buttonText, { matchCase: false })
          .should('be.visible')
          .click({ force: true });
      });
  }, options);
});





// support/commands.js
Cypress.Commands.add('launchBrowser', () => {
  cy.visit('https://www.automationexercise.com', {
    failOnStatusCode: false,
    timeout: 15000
  });
});

Cypress.Commands.add('navigateToUrl', (url) => {
  cy.visit(url, { timeout: 15000 });
});

Cypress.Commands.add('clickProductsButton', () => {
  cy.get('a[href="/products"]')
    .should('be.visible', { timeout: 10000 })
    .click({ force: true });
});

Cypress.Commands.add('verifyAllProductsPage', () => {
  cy.url().should('include', '/products');
  cy.contains('.features_items h2', 'All Products', { timeout: 15000 });
});

Cypress.Commands.add('searchForProduct', (searchTerm) => {
  cy.intercept('GET', '**/search_products**').as('searchRequest');
  cy.get('#search_product')
    .should('be.visible', { timeout: 10000 })
    .type(searchTerm);
  cy.get('#submit_search').click();
  
});



Cypress.Commands.add('verifySearchResults', (searchTerm) => {
  cy.get('.product', { timeout: 15000 })
    .should('have.length.gt', 2)
    .each(($product) => {
      cy.wrap($product)
        .find('.productinfo p')
        .invoke('text')
        .then(text => text.toLowerCase())
        .should('contain', searchTerm.toLowerCase());
    });
});

Cypress.Commands.add('addProductsToCart', () => {
  cy.get('.product', { timeout: 15000 }).each(($product) => {
    cy.wrap($product)
      .trigger('mouseover')
      .find('.add-to-cart')
      .should('be.visible')
      .click({ force: true });

    cy.handleCartModal();
  });
});

Cypress.Commands.add('navigateToCart', () => {
  cy.get('a[href="/view_cart"]')
    .first()
    .should('be.visible', { timeout: 10000 })
    .click({ force: true });
  cy.url().should('include', '/view_cart');
});

Cypress.Commands.add('verifyCartProducts', (searchTerm) => {
  cy.get('#cart_info_table', { timeout: 15000 }).should('be.visible');
  cy.get('.cart_description h4 a', { timeout: 15000 })
    .should('have.length.gt', 0)
    .each($item => {
      cy.wrap($item)
        .invoke('text')
        .should('contain', searchTerm);
    });
});

Cypress.Commands.add('loginUser', (user) => {
  cy.get('a[href="/login"]')
    .should('be.visible', { timeout: 10000 })
    .click({ force: true });
  cy.get('[data-qa="login-email"]').type(user.email);
  cy.get('[data-qa="login-password"]').type(user.password);
  cy.get('[data-qa="login-button"]').click();
  cy.contains(`Logged in as ${user.email.split('@')[0]}`, { timeout: 15000 });
});

Cypress.Commands.add('navigateToCartAfterLogin', () => {
  cy.get('a[href="/view_cart"]')
    .first()
    .should('be.visible', { timeout: 10000 })
    .click({ force: true });
  cy.url().should('include', '/view_cart');
});

Cypress.Commands.add('verifyPersistedCart', (initialCount, searchTerm) => {
  cy.getCartItemCount().then(newCount => {
    expect(newCount).to.equal(initialCount);
  });
  cy.verifyCartProducts(searchTerm);
});

// Shared commands
Cypress.Commands.add('registerUser', (user) => {
  cy.visit('/login');
  cy.get('[data-qa="signup-name"]').type('Test User');
  cy.get('[data-qa="signup-email"]').type(user.email);
  cy.get('[data-qa="signup-button"]').click();

  cy.get('#id_gender1').check();
  cy.get('[data-qa="password"]').type(user.password);
  cy.get('[data-qa="days"]').select('10');
  cy.get('[data-qa="months"]').select('March');
  cy.get('[data-qa="years"]').select('1990');
  cy.get('[data-qa="first_name"]').type('Test');
  cy.get('[data-qa="last_name"]').type('User');
  cy.get('[data-qa="address"]').type('123 Test St');
  cy.get('[data-qa="country"]').select('United States');
  cy.get('[data-qa="state"]').type('California');
  cy.get('[data-qa="city"]').type('San Francisco');
  cy.get('[data-qa="zipcode"]').type('94105');
  cy.get('[data-qa="mobile_number"]').type('1234567890');
  cy.get('[data-qa="create-account"]').click();
  cy.contains('Account Created!', { timeout: 15000 }).should('be.visible');
  cy.get('[data-qa="continue-button"]').click();
  cy.contains('Logout', { timeout: 10000 }).should('be.visible').click();
});

Cypress.Commands.add('handleCartModal', () => {
  cy.get('body').then($body => {
    if ($body.find('#cartModal:visible').length) {
      cy.get('#cartModal')
        .should('be.visible')
        .within(() => {
          cy.contains('Continue Shopping')
            .should('be.visible')
            .click({ force: true });
        });
    }
  });
});

Cypress.Commands.add('getCartItemCount', () => {
  return cy.get('#cart_info_table tbody tr', { timeout: 15000 })
    .its('length')
    .then(count => parseInt(count));
});