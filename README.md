# Tees For Me

## Tech Stack

#### Front-end

* The front-end projfrontend is built as a simple-page-application using React.
* React-Router is used for navigation.
* Bootstrap 4 is used for page styling.

#### Back-end

* The back-end projbackend is built with Express.js and Node.js in MVC pattern, which provides completed REST APIs for data interaction.
* JSON Web Token (JWT) is used for signing in user and making authenticated requests.

#### Database

* MongoDB is used as the back-end database, which include different data models/schemas (i.e., User, Order, Product and Category ).
* Mongoose is used to access the MongoDB for CRUD actions (create, read, update and delete).

## Usage

Running locally you need 3 terminals open: one for projfrontend, one for projbackend, and another one for MongoDB back-end. Below are the steps:

1. Install Node.js;
2. Install MongoDB;
3. `git clone https://github.com/vikassharma1999/Tees-For-Me.git`;
4. Go to directory `projbackend`, and run `npm install`;
5. Go to directory `projfrontend`, and run `npm install`;
6. In one terminal, run `mongod`;
7. In `projbackend` directory, run `npm start`;
8. In `projfrontend` directory, run `npm start`;

Then you are all set. You can go to `http://localhost:3000/` to check you live application.
