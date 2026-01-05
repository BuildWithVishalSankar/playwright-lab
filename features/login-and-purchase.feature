Feature: SauceDemo Login and Purchase Flow

    Background:
        Given I am on the SauceDemo login page

    Scenario: Successful login with valid credentials
        When I login with username "standard_user" and password "secret_sauce"
        Then I should be navigated to the inventory page

    Scenario: Login fails with invalid credentials
        When I login with username "invalid_user" and password "wrong_password"
        Then I should see an error message saying "Epic sadface"

    Scenario: Successfully purchase a product after login
        When I login with username "standard_user" and password "secret_sauce"
        And I add a product to the cart
        And I navigate to the shopping cart
        And I checkout the product
        And I enter checkout details:
            | firstName | lastName | postalCode |
            | Vishal    | Sankar   | 600001     |
        And I finish the purchase
        Then I should see a confirmation message saying "Thank you for your order"
