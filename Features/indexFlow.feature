Feature: Index Flow 

    We are going to explain the home page of our web site.
    

    Scenario: Searching bar data display
        Given Data exists in the Database
        When I click on "Search bar"
        And I search "Accident de voitures"
        And I press Enter
        Then The table below will show all the data related to the search bar.
    
    Scenario: Searching bar data display
        Given Data does not exists in the Database
        When I click on "Search bar"
        And I search a specific date,adresse,user, description or anything.
        And I press Enter
        Then The table below will show the last 10 added incidents and a message saying "No relative data found" will be shown next to the search bar.


    Scenario: Redirecting Login
        When I click on "Login"
        Then I would be redirected to the login page, from where I could connect to my account.
        (The login Features can be found in the LoginFlow.feature)

    Scenario: Redirecting to add an incident
        When I click on "Lien pour ajouter un incident"
        Then I would be redirected to the "Lien pour ajouter un incident" page, so I could report the new incident, to alarm other people.
        (The login Features can be found in the LoginFlow.feature)
