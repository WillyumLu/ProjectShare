/* Project model */
'use strict';

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const ProjectSchema = new mongoose.Schema({
    // id: 2,
	// title: "Project3",
	// start_date: "1999-11-14",
	// status: "in progress",
	// likes: 0,
	// image1: require('./projimg.jpg'),
	// image2: require('./projimg.jpg'),
	// image3: require('./southeast.jpg')
    title: {
        type: String,
        unique: true,
		required: true,
		minlength: 1
    }, 
    start_date: {
        type: String,
        required: true
    },
    status: {
		type: String,
		required: true,
		minlength: 1
    },
    description:{
        type: String,
        required:false
    }
    ,
    likes: {
        type: Number
    },
    image1: { // THIS have to change into an object
        type: String,
        required: false
    },
    image2: { // THIS have to change into an object
        type: String,
        required: false
    },
    image3: { // THIS have to change into an object
        type: String,
        required: false
    },
    creator: {
        type: String,
        required: false
    }
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
ProjectSchema.statics.findByTitle = function(title) {
	const Project = this // binds this to the Project model

	// First find the user by their username
	return Project.findOne({ title: title }).then((project) => {
		if (!project) {
			console.log("did not find project in project DB")
			return Promise.reject()  // a rejected promise
		}
		// if the project exists
		return Promise.resolve(project)
	})
}

// make a model using the User schema
const Project = mongoose.model('Project', ProjectSchema)
module.exports = { Project }

