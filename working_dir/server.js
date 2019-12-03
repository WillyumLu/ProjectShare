/* server.js nov 20 */
'use strict';
const log = console.log

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')

// import the mongoose models
const { User } = require('./models/user')
const { Project } = require('./models/project')

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
        // expires: 60000,
        httpOnly: true
    }
}));

// Our own express middleware to check for
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/home'); // home to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }
};

app.post('/login', (req, res) => {
	const username = req.body.username
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their username
    User.findByUsernamePassword(username, password)
    .then((user) => {
        log("I FOUND ITTTTTTTTTTTTT")
        req.session.user = user.username
        req.session.type = user.type
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
    req.session.user = req.body.username;
    req.session.type = userType;
    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        type: userType
    });
    // Save the user
    user.save().then(
        user => {
            res.status(200).send({ currentUser: user.username, type: user.type });
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );

});

app.get("/logout", (req, res)=>{
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
})

app.get("/users/check-session", (req, res) => {
    console.log(req.session.user)
    if (req.session.user) {
        res.send({ currentUser: req.session.user, type: req.session.type });
    } else {
        res.status(401).send();
    }
})

// save a project
app.post('/addProject', (req, res) => {
    const project = new Project({
        title: req.body.title,
        start_date: req.body.start_date,
        status: req.body.status,
        likes: req.body.likes,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3
    })
    project.save().then(
        project => {
            res.status(200).send({ project: project });
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

// delete a project
app.delete('/deleteProject/:id', (req, res) => {
    console.log("deleting")
    const id = req.params.id
    console.log(id)

     // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Delete a student by their id
    Project.findByIdAndRemove(id)
        .then(project => {
            if (!project) {
                res.status(404).send();
            } else {
                res.send(project);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});

// delete a user
app.delete('/deleteUser/:id', (req, res) => {
    console.log("deleting user")
    const id = req.params.id
    console.log(id)

     // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Delete a user by their id
    User.findByIdAndRemove(id)
        .then(user => {
            if (!user) {
                res.status(404).send();
            } else {
                res.send(user);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});

app.get('/allProjects', (req, res) => {
    Project.find().then(
        projects => {
            log();
            res.send({ projects }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );

});

/// Route for getting all users.
app.get('/users', (req, res) => {
    // Add code here
    User.find({type: "user"}).then(
        (user) => {
            res.send({ user })
    }, 
    (error) => {
        res.status(500).send(error) // server error
    })
})

app.post('/findProject', (req, res) => {
    Project.findByTitle(req.body.title)
    .then((project) => {
        log("I FOUND ITTTTTTTTTTTTT")
        res.status(200).send({ project: project });
    }).catch((error) => {
        log("OH NO")
		res.status(404).send(error)
    })
});

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







