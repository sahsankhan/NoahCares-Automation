@android @login
Feature: Login on Android app
  As a registered user I want to log into the NoahCare mobile app

  Background:
    Given I have launched the NoahCare Android app
    When I see the carousel screen
    And I skip the carousel screen
    Then I should be on the login screen

  Scenario: Successful login with valid credentials and logout
    When I log in with email "newclient@yopmail.com" and password "Tribute2020!"
    Then I should be logged in successfully
    When I open the sidebar
    And I tap the Logout button
    And I confirm the logout
    Then I should be on the login screen

