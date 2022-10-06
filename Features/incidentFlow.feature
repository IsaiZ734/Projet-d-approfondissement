Feature: Create an incident page

    User decides to submit a new accident to our site

    Scenario: User writes a description about the incident
    Given the user is logged in with a proper account
    When he clicks on the description box
    And he writes the foretold description

    Scenario: User writes the address of the incident
    Given the user is logged in with a proper account
    When the user clicks on the address textbook
    And the user writes the foretold address

    Scenario: User clicks on submit
    Given the user is logged in with a proper account
    Given the user wrote a description of the incident
    Given the user wrote an address of the incident
    When the user clicks on the submit button
    Then the description and the address of the incident are stored to the database
    And they appear on the index page
    And the user is taken back to the index page