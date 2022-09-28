# Github-topic-explorer

- [Getting started](#getting-started)
- [About](#about-this-app)
- [Dev Notes](#dev-notes)
- [Future Improvements](#future-improvements)
- [Running Tests](#running-tests)

## Getting started
```sh
# 1. Install all the dependencies
npm i

# 2. Add your PERSONA_ACCESS_TOKEN TO an .env file
REACT_APP_GITHUB_PAT=<token>

# 3. In one terminal window, start front-end app locally
npm start

## About this app

This repo will allow you to consume GraphQL Github API, so you can query topics

## Dev Notes

Libraries utilized: 
Apollo Client - GraphQL client that allow focusing development time on business logic instead of the logic behind GraphQL
Emotion - Package used for easily gaining access to styled components even thought design was not a priority for this project

## Feature Improvements

# Code Structuring:
I would abuse the usage of custom hooks so functional components preserve more readability only related to UI logic.

# Refactoring
It is a great idea to include ContextAPI for mannaging global state instead of choosing prop-drilling all over (it was decided this way for time purposes)

#Additional Features
It needs a lot of improvements UI related, nesting related topics within the same page might not be the greatest idea, so routing should be helpful for this project nature

I would include fetching related topics on demand, that means go to GrapQL API every time we try to show related topics instead of having them altogether on the first run. This is not the greatest approach performance-wise

## Running Tests

The following will run tests
```sh
# This will generate a text report to the console
npm test
