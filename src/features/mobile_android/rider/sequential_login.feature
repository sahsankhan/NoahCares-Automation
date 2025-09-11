@android @sequential_login
Feature: Sequential Login Testing
  As a test automation engineer I want to test login functionality with all users from the users.json file
  This ensures comprehensive testing of login functionality across different user types

  Background:
    Given I have launched the NoahCare Android app
    When I see the carousel screen
    And I skip the carousel screen
    Then I should be on the login screen

  Scenario: Login with all users sequentially
    When I login with all users from users.json file
    Then all users should be tested successfully
