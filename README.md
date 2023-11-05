<div align="center">
  <p>
    <a href="https://postimg.cc/3W6yhNds">
      <img src="https://i.postimg.cc/Dyf1qbFw/pngimg-com-skeleton-PNG42640.png">
    </a>
  </p>

  <h1>NestJS API skeleton</h1>

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
## 📝 Table of Contents

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
* [Documentation](#documentation)

<!-- Technologies -->
## 💥 Technologies and skills
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
- **Modular monolith**

*All this makes, for example, that the migration to hexagonal architecture has low cost 💪*

<!-- GETTING STARTED -->
## 🚀 Getting Started

This is an instructions on setting up the project locally.

### Prerequisites
Have **node** and **nvm** installed. Use version **18**.
```bash
$ nvm use 18.16.0
```
Install **make** (optional)
```bash
$ apt-get update
```
```bash
$ apt-get install make
```
_or_
```bash
$ apt-get install --reinstall make
```

### Installation

1. Clone repository
```bash
$ git clone https://github.com/crissancar/nestjs-skeleton-api.git
```
2. Install dependencies
```bash
$ make deps
```
_or_
```bash
$ npm install
```

### Environment
Create an `.env` and `.env.test` files in the root directory *(check `.env.example` and `.env.test.example` files)*

### Infrastructure

```bash
$ make start_infrastructure
```
_or_
```bash
$ npm run docker:env
```

### Database

1. Connect to postgres with `pgAdmin` through the URL `http://localhost:5050` or your `IDE` and create the databases with names `skeleton-api` and `skeleton-api-test`
2. Run migrations
    1. API database migrations
        ```bash
        $ make migrations
        ```
        _or_
        ```bash
        $ npm run typeorm:migration:run
        ```
    2. Test database migrations
        ```bash
        $ make migrations_tests
        ```
        _or_
        ```bash
        $ npm run typeorm:migration:test:run
        ```
3. Run seeds
    ```bash
    $ make seeds
    ```
    _or_
    ```bash
    $ npm run typeorm:seed:run
    ```

### Running the app
```bash
$ make start
```
_or_
```bash
$ npm run start:dev
```

### Running the tests (async)
#### All tests
```bash
$ make tests
```
_or_
```bash
$ npm run tests
```
#### Acceptance tests
```bash
$ make tests
```
_or_
```bash
$ npm run test:acceptance
```
#### Unit tests
```bash
$ make tests_unit
```
_or_
```bash
$ npm run test:unit
```
#### Integration tests
```bash
$ make tests_integration
```
_or_
```bash
$ npm run test:integration
```

### Running the tests (sync)
#### All tests
```bash
$ make tests_sync
```
_or_
```bash
$ npm run tests:sync
```
#### Acceptance tests
```bash
$ make tests_acceptance_sync
```
_or_
```bash
$ npm run test:acceptance:sync
```
#### Unit tests
```bash
$ make tests_unit_sync
```
_or_
```bash
$ npm run test:unit:sync
```
#### Integration tests
```bash
$ make tests_integration_sync
```
_or_
```bash
$ npm run test:integration:sync
```

<!-- POSTMAN -->
## 💣 Postman
To use the **API endpoints** with **Postman**, you need to build the [Backoffice](https://github.com/crissancar/nestjs-skeleton-backoffice) and create an **API Key** with *general* or *admin* audience.

To get the **Postman collection and environment**, download the files *postman_collection.json* and *postman_environment.json* from the root directory.

<!-- DOCUMENTATION -->
## 📖 Documentation
-  [NestJS](https://docs.nestjs.com/)
