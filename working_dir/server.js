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

const bcrypt = require('bcryptjs')

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
        req.session.userID = user._id
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
        type: userType,
        profileImage: null,
        firstName:"",
        lastName:"",
        school:"",
        bio:"",
        email:"",
        email:"",
        phone:"",
        projects:[]
    });
    // Save the user
    user.save().then(
        user => {
            req.session.userID = user._id
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

//endpoint to get user data
app.get("/api/user",(req, res) =>{
    log("Session user: " + req.session.user)
    const username = req.session.user
    if (username){
        log("Getting information for "+ username)
        User.findByUsername(username).then(user =>{
            if(!user){
                res.status(404).send();
            }
            else{
                res.send(user)
            }
        }).catch((error) => {
            res.status(500).send()
        })
        
    }
    else{
        res.status(401).send();
    }

})

//endpoint to upadate user data
app.patch("/api/user",(req, res) =>{
    log("request received")
    log(req.body)
    const username = req.session.user
    if (username){
        log(req.body)
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const school = req.body.school
        const bio = req.body.bio
        const email = req.body.email
        const phone = req.body.phone
        log(firstName)
        log("Update information for "+ username)
        User.findOneAndUpdate({username: username}, 
            {$set: {
                firstName: firstName,
                lastName: lastName,
                school: school,
                bio: bio,
                email:email,
                phone: phone
        }}, {new:true, useFindAndModify: false}).then(user =>{
            if(!user){
                res.status(404).send();
            }
            else{
                res.send(user)
            }
        }).catch((error) => {
            res.status(500).send()
        })
        
    }
    else{
        res.status(401).send();
    }

})

//endpoint to upadate username
app.patch("/api/user/username",(req, res) =>{
    const username = req.body.user 
    const newName = req.body.newName
    log("Change username for " + username)
    User.findOne({username: username}).then(user => {
            if(!user){
                res.status(404).send();
            }
            else{
                User.findOne({username: newName}).then(existed => {
                    if (!existed){
                        user.username = newName
                        user.save().then((updated) => {res.send(updated)}
                        )
                    }
                    else{
                        log("User already exist!")
                        res.status(400).send()
                    }
                })
            }
        }).catch((error) => {
            res.status(500).send()
        })
})

//endpoint to upadate password
app.patch("/api/user/password",(req, res) =>{
    const username = req.body.user 
    const newPassWord = req.body.newPassWord
    log("Change password for " + username)
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassWord, salt, (err, hash) => {
            User.findByUsername(username).then(user => {
                if(!user){
                    res.status(404).send();
                }
                else{
                    user.password = newPassWord
                    user.save().then(updated => {res.send(updated)})
                        
                    }
            }).catch((error) => {
                res.status(400).send()
            })
        })
    })
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
        image3: req.body.image3,
        creator: req.body.creator,
        description: req.body.description,
        members: []
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

//endpoint to edit a project
app.patch('/editProject/:id', (req, res) => {
    const id = req.params.id
    log("Updating project " + id )
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Project.findByIdAndUpdate(id, {$set: {title: req.body.title,
                                        status: req.body.status,
                                        description: req.body.description}},
                            {new:true, useFindAndModify: false}
                            ).then(proj =>{
                                if(!proj){
                                    res.status(404).send();
                                }
                                else{
                                    res.send(proj)
                                }

                            }).catch((error) => {
                                res.status(400).send()
                            })
})

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

// endpoint to get all projects by user id
app.get('/allProjects/:id', (req, res) => {
    const creator = req.params.id
    Project.find({creator: creator}).then(
        projects => {
            log("getting all projects for user: ", creator )
            log(projects);
            res.send({ projects }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );

});

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

//endpoint to upload an avatar
app.post("/upload/avatar", multipart(), (req, res) => {
    log(req.files)
    const filename = req.files.avatar.originalFilename || path.basename(req.files.avatar.path);
    const writeStream = gfs.openUploadStream(filename)
    const user = req.session.user? req.session.user: "User01"
    log("Upload profile image for: " + user)    
    fs.createReadStream(req.files.avatar.path).pipe(writeStream)
    writeStream.on('finish', function (file) {
        const imageUri = "/retrieve/" + file._id
        User.findOneAndUpdate({username: user}, {$set:{profileImage: imageUri}}, {new: true, useFindAndModify: false}).then(user => {
            if (!user){
                res.status(404).send();
            }
            else{
                res.send(user)
            }
        }).catch((error) => {
            res.status(500).send()
        })
    });
    writeStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
    });
})

//endpoint to retrieve an file
app.get("/retrieve/:id", (req, res) => {
    const fileId = req.params.id
    log("Getting file with id:" + fileId)
    const readStream = gfs.openDownloadStream(ObjectID(fileId))
    readStream.pipe(res)
    // readStream.on('data', function (data) {
    //     res.send(data)
    //     return
    // });
    // readStream.on('error', () => {
    //     return res.status(404).json({ message: "Cannot find the file" });
    // });
    // readStream.on('end', () => {
    //     return next();
    // });
})

//endpoint to upload an project image
app.post("/upload/projimg/:id/:imageNum", multipart(), (req, res) => {
    log(req.files)
	const id = req.params.id
	const imageNum = req.params.imageNum
    const filename = req.files.projImg.originalFilename || path.basename(req.files.projImg.path);
    const writeStream = gfs.openUploadStream(filename)
    fs.createReadStream(req.files.projImg.path).pipe(writeStream)
    writeStream.on('finish', function (file) {
        const imageUri = "/retrieve/" + file._id
        Project.findById(id).then(project => {
            if (!project){
                res.status(404).send();
            }
            else{
                if (imageNum === "image1"){
					project.image1 = imageUri                
                }
                if (imageNum === "image2"){
					project.image2 = imageUri                
                }
					if (imageNum === "image3"){
					    project.image3 = imageUri                
                }
            }
            project.save().then(updated => {res.send(updated)})
        }).catch((error) => {
            res.status(500).send()
        })
    });
    
    writeStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
})

app.post("/join/:title", (req, res) => {
    log("server join request")
    log(req.params.title)
    Project.findByTitle(req.params.title)
    .then((project) => {
        log("I FOUND ITTTTTTTTTTTTT")
        log(project)
        project.members.push(req.session.userID)
        log(project.requested)
        project.save()
        res.status(200).send(req.session.userID);
    }).catch((error) => {
        log("OH NO")
        res.status(404).send(error)
    })

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







