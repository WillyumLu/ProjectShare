/* server.js nov 20 */
'use strict';
const log = console.log

const express = require('express')
// starting the express server
const app = express();

const multipart = require('connect-multiparty');

const fs = require('fs');

const path = require('path');

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')

// using GridFS to store file

const db = mongoose.connection
let gfs;
db.once("open", function() {
    gfs = new mongoose.mongo.GridFSBucket(db.db);
});

// import the mongoose models
const { User } = require('./models/user')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

// Our own express middleware to check for
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }
};

app.post('/login', (req, res) => {
	const username = req.body.username
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password)
    .then((user) => {
        log("I FOUND ITTTTTTTTTTTTT")
        res.status(200).send({ currentUser: user.username, type: user.type });
    }).catch((error) => {
        log("NOOOOOOOOOPPPPPPPPPPPPPPPEEEEEEEE")
		res.status(404).send(error)
    })
})

// Set up a POST route to *create* a user entry.
app.post("/signup", (req, res) => {
    log(req.body);
    const userType = req.body.type === "admin" ? "admin" : "user" 
    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        type: userType
    });
    // Save the user
    user.save().then(
        user => {
            res.send(user);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );

});

app.post("/upload/avatar", multipart(), (req, res) => {
    log(req.files)
    const filename = req.files.avatar.originalFilename || path.basename(req.files.avatar.path);
    const writeStream = gfs.openUploadStream(filename)
    fs.createReadStream(req.files.avatar.path).pipe(writeStream)
    writeStream.on('finish', function (file) {
        res.send(`File has been uploaded ${file._id}`);
    });
    writeStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
})

app.get("/retrieve/avatar/:id", (req, res) => {
    const fileId = req.params.id
    log("Getting avatar with id:" + fileId)
    const readStream = gfs.openDownloadStream(ObjectID(fileId))
    readStream.on('data', function (data) {
        res.send(data)
    });
    readStream.on('error', () => {
        return res.status(404).json({ message: "Cannot find the file" });
    });
    readStream.on('end', () => {
        return res.end();
    });
})



/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/********************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 







