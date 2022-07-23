<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

<p>Google scraper application made with NestJS and Bull</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# UI tests
$ npm run cypress:run
```

## How it works

<p>The application will provide services to scrape google data. In order to use this service create an account on the application and
upload a csv file of your choosing with keywords</p>

<p>Prefered format is one keyword per line.</p>

<p>The application will then run through a background process made possible with <a href="https://github.com/OptimalBits/bull">Bull</a>
When processing the CSV bull will assign a queue where each keyword will be used to scrape google.

The infomation is then processed and saved into the data with :

  - Total number of links
  - Total number of ads
  - Total search results
  - HTML of the page (which can also be rendered and viewed on the site with a click of a button)
</p>

## All Features
<ul>
  <li> Scrapes data from any csv containing keywords that are given per line </li>
  <li> Views all total links, results, ads </li>
  <li> Scrapes google page and serves it as an HTML that is rendered and viewable </li>
</ul>

