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
    // by their email and password
    User.findByUsernamePassword(username, password)
    .then((user) => {
        log("I FOUND ITTTTTTTTTTTTT")
        req.session.user = username
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
    if (req.session.user) {
        res.send({ currentUser: req.session.user });
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
    log("Upload profile Image for: " + user)    
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
app.post("/upload/projimg", multipart(), (req, res) => {
    log(req.files)
    const filename = req.files.projimg.originalFilename || path.basename(req.files.projimg.path);
    const writeStream = gfs.openUploadStream(filename)
    fs.createReadStream(req.files.projimg.path).pipe(writeStream)
    writeStream.on('finish', function (file) {
        res.send(`File has been uploaded ${file._id}`);
    });
    writeStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
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







