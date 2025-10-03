@android @signuprider
Feature: Signup as Rider on Android app
  As a new user I want to signup as rider into the NoahCare mobile app

  Background:
    Given I have launched the NoahCare Android app
    When I see the carousel screen
    And I skip the carousel screen
    Then I should be on the login screen

  Scenario Outline: Successful Signup AS Rider with valid credentials
    When I click the signup button
    Then I should see the signup page
    When I sign up with first name "Ahsan", last name "Khan", email "newahspclaut80@yopmail.com", password "Aahs123456!@#1" , phone number 7027064712
    And click the checkbox
    And click the signup as rider button
    Then I successfully be signed in

    Examples:
      | firstName | lastName | email              | password |
      | John      | Doe      | john.doe@email.com | Test@123 | 
    