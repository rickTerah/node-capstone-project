# node-capstone-project
[![Build Status](https://travis-ci.org/Terahpatrick/node-capstone-project.svg?branch=master)](https://travis-ci.org/Terahpatrick/node-capstone-project) [![Coverage Status](https://coveralls.io/repos/github/Terahpatrick/node-capstone-project/badge.svg?branch=master)](https://coveralls.io/github/Terahpatrick/node-capstone-project?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/b02806a5bae97ca7e939/maintainability)](https://codeclimate.com/github/Terahpatrick/node-pg/maintainability)

Internal social network for employees of an organization

#### users endpoints
| Action| Endpoint | Functionality | 
|----------|----------|---------------|
| GET | `/users/v1/create-user`  | Admin register Employee|
| POST | `/users/v1/signin`  | Login Employee|

User signup schema:
```json

  {
	"firstName": "patrick",
	"lastName": "mwangi",
	"email": "terahd@gmail.com",
	"password": "1234",
	"gender": "male",
	"jobRole": "software engineer",
	"department": "Server Side",
	"address": "some1234thing",
	"isAdmin":false
}

```

Employee login schema:
```json
  {
	"email": "ngugi@gmail.com",
	"password": "1234"
}
```

#### GIFs endpoints
| Action| Endpoint | Functionality | 
|----------|----------|---------------|
| POST | `/gifs/v1/`  | Employee Post a GIF|
| GET | `/gifs/v1/`  | Employee Get GIFs|
| GET | `/gifs/v1/:gifId`  | Employee Get a single GIF|
| POST | `/gifs/v1/:gifId/comment`  | Employee Post a comment to a GIF|

Gif post schema:
```json
  {
	"title": "An awesome GIF",
	"image": "C:/Users/user/Desktop/official/picture.png"
}
```

Gif comment schema:
```json
  {
    "comment": "A wonderful comment about this GIF"
    }
```


#### categories endpoints
| Action| Endpoint | Functionality | 
|----------|----------|---------------|
| GET | `/categories/v1/`  | Admin get categories|
| GET | `/categories/v1/:id`  | Admin get single category|
| POST | `/categories/v1/`  | Admin create category|
| PATCH | `/categories/v1/:id`  | Admin Edit category|
| DELETE | `/categories/v1/:id`  | Admin delete category|
| GET | `/categories/:categoryId/articles`  | Employee Get articles in a category|

Category schema:
```json
  {
	"categoryName": "updated first category"
}
```


#### articles endpoints
| Action| Endpoint | Functionality | 
|----------|----------|---------------|
| POST | `/articles/v1/`  | Employee Post an article|
| GET | `/articles/v1/`  | Employee Get articles|
| GET | `/articles/v1/:articleId`  | Employee Get a single article|
| PATCH | `/articles/v1/:articleId`  | Employee Edit an article|
| DELETE | `/articles/v1/:articleId`  | Employee Delete an article|
| POST | `/articles/v1/articleId/comment`  | Employee Post an article comment|

Article schema:
```json
 {
	"title": "some article title",
	"article": "some article very long",
	"categoryId": "1361"
}
```


### Prerequisites
- Javascript (A programming language)
- Node.js (A Javascript server side framework)
- Express (Server side framework)
- npm install (dependencies used in the project)
- GitHub project management board (A project management tool) (optional)
- ​PostgreSQL (DataBase)
- Jest (Tool for testing)
- The app is hosted on heroku

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [cloudinary](https://github.com/cloudinary) - To connect to the cloudinary for posting GIFs
- [express-fileupload](https://github.com/jsonwebtoken) - Help us upload and destroy files from a cloudinary
- [pg](https://github.com/pg) - To connect to postgresql database
- [bcrypt](https://github.com/bcrypt) - For hashing password to ensure that where store there are secure
- [@hapi/joi](https://github.com/@hapi/joi) - For validating inputs before hitting database validation.
- [coveralls](https://github.com/coveralls) - For generating coverage for the code tested
- [jest](https://github.com/jest) - For testing our Endpoints
- [supertest](https://github.com/supertest) - Help for testing when working with jest to request server
- [eslint](https://github.com/eslint) - For proper styling of our code.
- [express-async-errors](https://github.com/express-async-errors) - To handle async await catch block.


## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Error Handling

In `routes/api/index.js`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 422 status code and format the response to have [error messages the clients can understand](https://github.com/gothinkster/realworld/blob/master/API.md#errors-and-status-codes)

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `routes/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.