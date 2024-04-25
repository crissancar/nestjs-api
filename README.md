<div align="center">
  <h1>NestJS API example</h1>

  <p>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
    <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
    <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
  </p>
</div>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Technologies and skills](#technologies-and-skills)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Environment](#environment)
    * [Infrastructure](#infrastructure)
    * [Database](#database)
    * [Running the app](#running-the-app)
    * [Running the tests (async)](#running-the-tests-async)
    * [Running the tests (sync)](#running-the-tests-sync)
* [Postman](#postman)
* [Documentation](#documentation)

<!-- Technologies -->
## Technologies and skills
As **technologies and tools**, this skeleton API uses:
- **NestJS** as development framework
- **PostgreSQL** as database
- **Jest** as testing tool
- **Swagger** as API documentation tool
- **Sendgrid** as mailer
- **Sentry** as error manager
- **Grafana** as metrics manager
- **Grafana Loki** as log manager

As **skills and best practices**, this skeleton API uses:
- **Clean Code**
- **SOLID**
- **Design Patterns**
- **Testing strategy** with acceptance, unit and integration tests
- **Modular monolith**

<!-- GETTING STARTED -->
## Getting Started

This is an instructions on setting up the project locally.

### Prerequisites
Have **node** and **nvm** installed. Use version **18**.
```bash
$ nvm use 18.16.0
```

### Installation

1. Clone repository
```bash
$ git clone https://github.com/crissancar/nestjs-skeleton-api.git
```
2. Install dependencies
```bash
$ npm install
```

### Environment
Create an `.env` and `.env.test` files in the root directory *(check `.env.example` and `.env.test.example` files)*

### Infrastructure
```bash
$ npm run docker:env
```

### Database
1. Connect to postgres with `pgAdmin` through the URL `http://localhost:5050` or your `IDE` and create the databases with names `skeleton-api` and `skeleton-api-test`
2. Run migrations
    1. API database migrations
        ```bash
        $ npm run typeorm:migration:run
        ```
    2. Test database migrations
        ```bash
        $ npm run typeorm:migration:test:run
        ```
3. Run seeds
    ```bash
    $ npm run typeorm:seed:run
    ```

### Running the app
```bash
$ npm run start:dev
```

### Running the tests (async)
#### All tests
```bash
$ npm run tests
```
#### Acceptance tests
```bash
$ npm run test:acceptance
```
#### Unit tests
```bash
$ npm run test:unit
```
#### Integration tests
```bash
$ npm run test:integration
```

### Running the tests (sync)
#### All tests
```bash
$ npm run tests:sync
```
#### Acceptance tests
```bash
$ npm run test:acceptance:sync
```
#### Unit tests
```bash
$ npm run test:unit:sync
```
#### Integration tests
```bash
$ npm run test:integration:sync
```

<!-- POSTMAN -->
## Postman
To get the **Postman collection and environment**, download the files *postman_collection.json* and *postman_environment.json* from the root directory.

<!-- DOCUMENTATION -->
## Documentation
When the app is running, the **endpoints documentation** is available on `http://localhost:9977/documentation`
