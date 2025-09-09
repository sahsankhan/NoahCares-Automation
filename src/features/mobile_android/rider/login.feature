@android @login
Feature: Login on Android app
  As a registered user I want to log into the NoahCare mobile app

  Background:
    Given I have launched the NoahCare Android app
    When I see the carousel screen
    And I skip the carousel screen
    Then I should be on the login screen
    When I log in with email "newclient@yopmail.com" and password "Tribute2020!"
    Then I should be logged in successfully
    
    
@smoke
  Scenario: Successful login with valid credentials
    When I enter the valid rider credentials



