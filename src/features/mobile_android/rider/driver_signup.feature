@android @signuprider
Feature: Signup as Driver on Android app
  As a new user I want to signup as rider into the NoahCare mobile app

  Background:
    Given I have launched the NoahCare Android app
    When I see the carousel screen
    And I skip the carousel screen
    Then I should be on the login screen

  Scenario Outline: Successful Signup AS Rider with valid credentials
    When I click the signup button
    Then I should see the signup page
    When I tap the signup as driver button
    And I sign up with first name "Ahsan", last name "Khan", email "newahspdraut90@yopmail.com", password "Aahs123456!@#1" , phone number 7027064712
    And click the checkbox
    And click the signup as driver button
    Then I should be on the next signup screen
    When I fill the additional details
    
  # Scenario Outline: Successful Signup AS Rider with valid credentials
  #   When I log in with email "newahspdraut8@yopmail.com" and password "Aahs123456!@#1"
  #   Then I should be on the next signup screen
  #   When I fill the additional details
    