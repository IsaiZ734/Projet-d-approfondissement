Feature: Login page

    Users can login or sign up on our website through this page

    Scenario: Registration
    Given nickname is not already being used by another person
    And password is valid
    And Full name is provided
    And email is valid
    When Sign up button is clicked
    Then user will receive an email for verification
    And user will be redirected to another page suggesting him to verify his email
    When user will have verified his email
    Then the account will be created
    And account data will be stored in our database

    Scenario: Login
    Given nickname is provided
    And password is provided
    When Sign in button is clicked
    Then nickname and password will be checked in our database
    And user will be redirected to home page if nickname and password are correct