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
- \mongo-data was just created to store database info
- server.js is the actual server code

#### Functionality
 - When you start the app, you have the option to sign up if you don't have an account, or log in
 - If you enter the incorrect credentials, are warning message will be displayed
 - Once you log in with correct username and password combination, or you sign up with a new username, you will be lead to the home page of the website
 - In the home page, you will be able see a list of all projects that are in the database
 - In addition, you can search for projects by keyword
 - Once you have found a project that you are interested in, you can click on view to learn more about it
 - In the home page, users can view and edit their profile picture, username and password, as well as personal information
 - Admins have the added option of deleting existing projects/users
 - Users can create their own project. Simply upload 3 pictures, a status, a title, and brief description
 - If a user refreshes the page, they will remain logged in via session cookie
 - Once the user is finished using the website, they can choose to logout
 
