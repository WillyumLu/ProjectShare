import React from 'react';
import BaseReactComponent from "./../BaseReactComponent";
import { getState } from "statezero";
import { addProject } from "./../../actions/project"
import Project from './../Project';
import ProjectView from './../ProjectView'
import {message, Icon, Upload, Card, Input, Button} from 'antd';
import { uid } from 'react-uid';
import './Home.css';
import { updateProjectList } from "./../../actions/project"
import { getAllUsers } from "./../../actions/user"
import { isPromiseAlike } from 'q';
import Navigation from '../Navigation'
import {readUser} from './../../actions/user'
import { Redirect } from 'react-router-dom'

var Center = require('react-center');
const { TextArea } = Input

const global_project_0 = {
	id: 0,
	title: "Project Share",
	start_date: "2019-09-29",
	status: "in progress",
	likes: 0,
	image1: require('./projimg.jpg'),
	image2: require('./projimg.jpg'),
	image3: require('./southeast.jpg')
}
const global_project_1 = {
	id: 1,
	title: "Project2",
	start_date: "000000-MM-DD",
	status: "deployed",
	likes: 1,
	image1: require('./chip.jpg'),
	image2: require('./projimg.jpg'),
	image3: require('./userprofile.jpg')
}
const global_project_2 = {
	id: 2,
	title: "Project3",
	start_date: "000000-MM-DD",
	status: "complete",
	likes: 2,
	image1: require('./projimg.jpg'),
	image2: require('./projimg.jpg'),
	image3: require('./southeast.jpg')
}
const global_project_3 = {
	id: 3,
	title: "Project4",
	start_date: "1999-11-14",
	status: "in progress",
	likes: 3,
	image1: require('./projimg.jpg'),
	image2: require('./projimg.jpg'),
	image3: require('./southeast.jpg')
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-'+ mm + '-'+dd;
var projectData = {
	imagesUploaded: 0,
	title: null,
	start_date: today,
	status: null,
	likes: 0,
	image1: null,
	image2: null,
	image3: null
}

const allProjects = {};
allProjects[global_project_0.id] = global_project_0;
allProjects[global_project_1.id] = global_project_1;
allProjects[global_project_2.id] = global_project_2;
allProjects[global_project_3.id] = global_project_3;


function loadData() {
	console.log("loadData() called")
	/*const projects = [global_project_0, global_project_1, global_project_2]*/
	var projects = {};
	const keys = Object.keys(allProjects)
	for (const key of keys){
		projects[key] = allProjects[key];
	}

	//var projects = {global_project_0.title : global_project_0, "Project2": global_project_1, "Project3": global_project_2}
	return projects
}

/*const likeButton = document.getElementbyId("LikeButton")
if(this.props.pathname === "/projectView"){
	likeButton.addEventListener("onClick", increment)
}
function increment(){
}
*/

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must smaller than 10MB!');
    }
    const newImagePath = './' + file.name;
    //require(newImagePath) don't work, for dynamic file name it needs context.
	let assetRequire = require.context('./', true, /\.(png|jpg|svg)$/)
	if(projectData.imagesUploaded === 0){
		projectData.imagesUploaded += 1
		projectData.image1 = assetRequire(newImagePath);
		console.log(projectData.image1)
	}else if(projectData.imagesUploaded === 1){
		projectData.imagesUploaded += 1
		projectData.image2 = assetRequire(newImagePath);
		console.log(projectData.image2)
	}else{
		projectData.imagesUploaded += 1
		projectData.image3 = assetRequire(newImagePath);
	} 

    //for phase 1 it always returns false to prevent default behaviour try to make a sever call
    return false;
  }

class UploadProjectPicture extends React.Component{
    state = {loading: false}
    handleChange = (pic) => {
    }

    render() {
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
            )
        
        const {imageUrl} = this.state;
        
        return(
            <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}  
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            >
               {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            
            </Upload>
        )
    }    
}

class Home extends BaseReactComponent {

	filterState({ projectList, userdata }) {
		console.log("Home is calling filterState")
        return { projectList, userdata };
    }

	constructor(props) { // When the componenet is created,  calls load data
		super(props)
		updateProjectList()
		readUser()
		getAllUsers()
	  	this.state = {projects: allProjects,
						selectedProject: null,
						canPublish: false
					}
	}

	receiveSelectedProject = (projectData_) => {
      this.setState({selectedProject: projectData_})
	}

	receiveSearchRequest = function() {
		this.setState({projects: this.projects})
	}
	addTitle = (event) => {
		projectData.title = event.target.value
		this.setState({canPublish: (projectData.title && projectData.status)})
		console.log(event.target.value)
	}
	addStatus = (event) => {
		projectData.status = event.target.value
		this.setState({canPublish: (projectData.title && projectData.status)})
	}
	addDescription = (event) => {
		projectData.description = event.target.value
	}
	publishText(userdata) {
		if (getState("currentUser")){
			projectData.creator = userdata._id
			return "Publish!"
		}
		return "You must be logged in!"
	}
	ifloggedIn() {
		if (getState("currentUser")){
			return false
		}
		return true
	}
	publish	= () => {
		addProject(projectData);
	}
	/*
	localStorage.setItem('sendSearchRequest', receiveSearchRequest)
	*/

	/*increment (){
		console.log("add")
		this.state.projects[this.state.selectedProject].likes+=1;
	}*/

	render() {
		const { projectList, userdata } = this.state;
		 if(this.props.location.pathname === "/projectView"){
			 const title = this.state.selectedProject;
		 	console.log(this.state.selectedProject)
		 	console.log(this.state.projects[this.state.selectedProject])
		 	return(
			 	<div>
			 		<ProjectView project={(projectList.filter((project)=>project.title === title))[0]}/>
			 	</div>
		 	)
		 }	
		 else if (this.props.location.pathname === "/"){
		 	const searched = localStorage.getItem('searchedProject')
		 	if (searched in this.state.projects){
		 		console.log("reached")
		 		return(
				 	<div>
						<ProjectView project={this.state.projects[localStorage.getItem('searchedProject')]}/>
					</div>
				)
			}
			else{

			 return(
			 	<div id="MainView">
			 	 <Navigation title = "Navigation"/>
				 <div className="outer">
			 		<div className="inner">
					{
						projectList.map((project) => {
							return(
								<Project style={{"left": "50"}} 
										key={uid(project)}
										 project = {project}
										 history={this.props.history}
								         sendSelectedProject = {this.receiveSelectedProject}
								/>
								)

						})
					}
					</div>
				</div>
				<div id="newProject">
					<Card title="Upload Your Own Project!" className="newProjectCard" style={{"borderRadius": "2%", "width": "60", "right": "50"}}>
						<div>Upload 3 Images for you project:</div>
						<div id="uploadButton"><UploadProjectPicture/></div>
						<div>Title:</div>
						<div><Input placeholder="name your project" onChange={this.addTitle}/></div>
						<div>Status:</div>
						<div><Input placeholder="in progress/deployed/complete" onChange={this.addStatus}/></div>
						<div>Discription:</div>
						<div><TextArea rows={4} placeholder="project description" onChange={this.addDescription}/></div>
						<div>All Set?</div>
						<Button type={"primary"} disabled={ !(this.state.canPublish) } onClick={this.publish}>{this.publishText(userdata)}</Button>
					</Card>
				</div>
				</div>
			)
		}
	 }
	}
}

export default Home;