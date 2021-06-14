## Description

* this api provides endpoints for customers and merchants

* all the newly created components are inside ```src/api``` folder 

* DB mockup is inside ```src/db``` folder

* all the api endpoints has prefix ```/api```

* Customers are attached to the merchants

* merchants has transanctional data for their customers

* ```backup_db``` folder has backup db mocup files
## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Routes
 * ```{/api/merchants, GET}```  * gives the list of all merchants
 * ```{/api/merchants/:id, GET}```  * specific merchant details
 * ```{/api/merchants/transactions/:id, GET}``` * only the transanctional data of a merchant 

 * ```{/api/customers, GET}```  * returns all the customers
 * ```{/api/customers/:id, GET}```  * specific customer
 * ```{/api/customers/transactions/:id, GET}```  * all the transaction of a customer
 * ```{/api/customers, POST}``` * create a customer
 * ```{/api/customers, PUT}```  * update customer
 * ```{/api/customers, DELETE}```  * delete a customer

** I haven't removed .env from gitignore

# TODO 
* unit tests
* proper error handling
* auth
* sharing types (I was thinking of using Lerna)
