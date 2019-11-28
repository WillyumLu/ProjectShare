## Basically this is how this can be broken down

- Here are the changes:
  - login.js page now:
    1. login button sends a request to server with username and pw (see new Request and fetch() in login.js in /client)
    2. checks for matching username and pw in database (reference: .post(/login) in server.js, which calls functions in ./models/user.js)
    3. returns the user and the type of user upon successful login, returns failed status code if can't log in
    4. login page then redirects as was in phase 1 (all using dummy data, no server implemented for this part)
  - server.js can do 2 things:
    1. handle login requests as said above
    2. handle a signup request which adds a users with username, pw, and type ("user"/admin") to database
      - this is not yet linked with front-end code, so u have to send the .post(/signup) request via postman
      - u need to use this signup request to add some users when u first run it so u can log in
  - database:
    1. has 1 schema called User, which has attributes username, password, and type
    2. need to add projects schema
      
## to run the code
#### Setup
A few things need to happen first:
- npm install (in working_dir)
- npm install (in \client folder)
- cd client (go into client folder)
- npm run build (in \client folder)
- "#" During development, run the following commands for your app to reflect any changes in the code. Make sure mongo is running on a separate terminal.
  - npm run build (in \client folder)
  - node server.js (start server again in\working_dir)
- "#" create Mongo database and run Express server in the root directory (working_dir)
  - mkdir mongo-data (all database values lives here i think)
  
#### Run it
- mongod --dbpath mongo-data (database online)
- node server.js (server online)


## Structure
- \client is all client-side code, which means they are basically the same as phase 1, except in login page the request are added
  - working_dir\client\src\actions should contain a lot of request logic, but its not used for now
- \db has the mongoose.js file (idek what it is)
- \mongo-data was just created by u to store database info
- server.js is the actual server code
