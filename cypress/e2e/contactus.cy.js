// ************** FIXTURES ************** 
// (Test data files in cypress/fixtures/)
// - users.json
// - checkoutInfo.json

// ************** CUSTOM COMMANDS ************** 
// (Defined in cypress/support/commands.js)
// - cy.login()
// - cy.addItemToCart()
// - cy.removeItemFromCart()
// - cy.openMenu()
// - cy.logout()

describe('SauceDemo Tests', () => {
    //  GLOBAL HOOK 
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
    })
  
    //  AUTHENTICATION TESTS 
    context('Authentication Tests', () => {
      it('TC1: Successful login with valid credentials', () => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.validUser.username, users.validUser.password)
          cy.url().should('include', '/inventory.html')
          cy.get('.inventory_list').should('have.length', 1)
          cy.get('.shopping_cart_link').should('be.visible')
        })
      })
  
      it('TC2: Failed login with invalid credentials', () => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.invalidUser.username, users.invalidUser.password)
          cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Username and password do not match')
          cy.get('#login-button').should('be.visible')
        })
      })
  
      it('TC3: Locked out user login attempt', () => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.lockedUser.username, users.lockedUser.password)
          cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Sorry, this user has been locked out')
          cy.url().should('not.include', '/inventory.html')
        })
      })
    })
  
    //  INVENTORY TESTS 
    context('Inventory Tests', () => {
      beforeEach(() => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.validUser.username, users.validUser.password)
        })
      })
  
      it('TC4: Add single item to cart', () => {
        cy.addItemToCart()
        cy.get('.shopping_cart_badge').should('contain', '1')
        cy.get('.btn_inventory').first().should('contain', 'Remove')
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_item').should('have.length', 1)
      })
  
      it('TC5: Add multiple items to cart', () => {
        cy.addItemToCart(0)
        cy.addItemToCart(1)
        cy.get('.shopping_cart_badge').should('contain', '2')
        cy.get('.btn_inventory').eq(0).should('contain', 'Remove')
        cy.get('.btn_inventory').eq(1).should('contain', 'Remove')
      })
  
      it('TC6: Remove item from cart', () => {
        cy.addItemToCart()
        cy.get('.shopping_cart_badge').should('contain', '1')
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_item').should('exist')
        
       
        cy.get('[data-test^="remove-"]').first().click()
        
        cy.get('.cart_item').should('not.exist')
        cy.get('.shopping_cart_badge').should('not.exist')
        
        cy.get('#continue-shopping').click()
        cy.get('.btn_inventory').first()
          .should('contain', 'Add to cart')
          .and('have.class', 'btn_primary')
      })
    })
  
    //  CHECKOUT TESTS 
    context('Checkout Tests', () => {
      beforeEach(() => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.validUser.username, users.validUser.password)
          cy.addItemToCart()
          cy.get('.shopping_cart_link').click()
          cy.get('#checkout').click()
        })
      })
  
      it('TC7: Complete checkout with valid information', () => {
        cy.fixture('checkoutInfo.json').then((info) => {
          cy.get('#first-name').type(info.validCheckout.firstName)
          cy.get('#last-name').type(info.validCheckout.lastName)
          cy.get('#postal-code').type(info.validCheckout.zip)
          cy.get('#continue').click()
          cy.url().should('include', '/checkout-step-two.html')
          cy.get('.summary_total_label').should('be.visible')
          cy.get('#finish').click()
          cy.get('.complete-header').should('contain', 'Thank you for your order')
        })
      })
  
      it('TC8: Checkout validation errors', () => {
        cy.fixture('checkoutInfo.json').then((info) => {
          
          cy.get('#continue').click()
          cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'First Name is required')
      
          
          cy.get('#first-name').type(' ') 
          cy.get('#last-name').type(' ')  
          cy.get('#continue').click()
          cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Postal Code is required') 
        })
      })
    })
  
    // PRODUCT SORT TESTS 
    context('Product Sort Tests', () => {
      beforeEach(() => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.validUser.username, users.validUser.password)
        })
      })
  
      it('TC9: Sort products by price (low to high)', () => {
        cy.get('.product_sort_container').select('lohi')
        cy.get('.inventory_item_price').then(($prices) => {
          const prices = $prices.map((_, el) => parseFloat(el.innerText.replace('$', ''))).get()
          const sorted = [...prices].sort((a, b) => a - b)
          expect(prices).to.deep.equal(sorted)
        })
      })
  
      it('TC10: Sort products by price (high to low)', () => {
        cy.get('.product_sort_container').select('hilo')
        cy.get('.inventory_item_price').then(($prices) => {
          const prices = $prices.map((_, el) => parseFloat(el.innerText.replace('$', ''))).get()
          const sorted = [...prices].sort((a, b) => b - a)
          expect(prices).to.deep.equal(sorted)
        })
      })
    })
  
   // MENU & NAVIGATION TESTS 
    context('Menu & Navigation Tests', () => {
      beforeEach(() => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.validUser.username, users.validUser.password)
        })
      })
  
      it('TC11: Logout functionality', () => {
        cy.openMenu()
        cy.get('#logout_sidebar_link').click()
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.get('#login-button').should('be.visible')
      })
  
      it('TC12: Reset app state', () => {
        cy.addItemToCart()
        cy.get('.shopping_cart_badge').should('contain', '1')
        cy.get('.btn_inventory').first().should('contain', 'Remove')
        cy.get('#react-burger-menu-btn').click({ force: true })
        cy.get('#reset_sidebar_link').click({ force: true })
        cy.get('#react-burger-cross-btn').click({ force: true })
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.reload()
        cy.get('.btn_inventory').first().should(($button) => {
          expect($button.text().trim()).to.equal('Add to cart')
          expect($button).to.have.class('btn_primary')
        })
      })
  
      it('TC13: About page navigation', () => {
        // Pure link validation without actual navigation
        cy.openMenu()
        
        // Verify link properties
        cy.get('#about_sidebar_link')
          .should('be.visible')
          .and('have.attr', 'href', 'https://saucelabs.com/')
          .and('have.prop', 'protocol', 'https:')
          .and('have.prop', 'hostname', 'saucelabs.com')
      
        // Verify link works via API check
        cy.request({
          url: 'https://saucelabs.com/',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 301, 302, 304])
        })
      })
    })
  
    // ************** CART FUNCTIONALITY TESTS **************
    context('Cart Functionality Tests', () => {
      beforeEach(() => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.validUser.username, users.validUser.password)
        })
      })
  
      it('TC14: Cart badge updates correctly', () => {
        // Start with empty cart
        cy.get('.shopping_cart_badge').should('not.exist')
        
        cy.addItemToCart(0)
        cy.addItemToCart(1)
        cy.get('.shopping_cart_badge').should('contain', '2')
        
        // Remove first item
        cy.get('.btn_inventory').first().click()
        cy.get('.shopping_cart_badge').should('contain', '1')
        
        // Remove second item
        cy.get('.btn_inventory').eq(1).click()
        cy.get('.shopping_cart_badge').should('not.exist')
      })
    })
  
    // ************** ERROR HANDLING TESTS **************
    context('Error Handling Tests', () => {
      it('TC15: Checkout error message persistence', () => {
        cy.fixture('users.json').then((users) => {
          cy.login(users.validUser.username, users.validUser.password)
          cy.addItemToCart()
          cy.get('.shopping_cart_link').click()
          cy.get('#checkout').click()
          cy.get('#continue').click()
          cy.get('[data-test="error"]').should('be.visible')
          cy.get('#first-name').type('Test')
          cy.get('#continue').click()
          cy.get('[data-test="error"]').should('contain', 'Last Name is required')
        })
      })
    })
  })