import React from 'react';
import Project from './Project';
import ProjectView from './ProjectView'
import { uid } from 'react-uid';
import './Home.css';

var Center = require('react-center');

const global_project_0 = {
	id: 0,
	title: "Project1",
	start_date: "YYYY-MM-DD",
	status: "in progress",
	icon: 'url/..../',
	likes: 0,
	image1: require('./projimg.jpg'),
	image2: require('./projimg.jpg'),
	image3: require('./southeast.jpg')
}
const global_project_1 = {
	id: 1,
	title: "Project2",
	start_date: "000000-MM-DD",
	status: "in progress",
	icon: 'url/..../',
	likes: 0,
	image1: require('./chip.jpg'),
	image2: require('./projimg.jpg'),
	image3: require('./userprofile.jpg')
}
const global_project_2 = {
	id: 2,
	title: "Project3",
	start_date: "000000-MM-DD",
	status: "complete",
	icon: 'url/..../',
	likes: 0,
	image1: require('./projimg.jpg'),
	image2: require('./projimg.jpg'),
	image3: require('./southeast.jpg')
}

function loadData() {
	console.log("loadData() called")
	/*const projects = [global_project_0, global_project_1, global_project_2]*/
	const projects = {"Project1": global_project_0, "Project2": global_project_1, "Project3": global_project_2}
	return projects
}

/*const likeButton = document.getElementbyId("LikeButton")
if(this.props.pathname === "/projectView"){
	likeButton.addEventListener("onClick", increment)
}
function increment(){

}
*/


class Home extends React.Component {

	constructor(props) { // When the componenet is created,  calls load data
		super(props)
	  	this.state = {projects: loadData(),
	  				  selectedProject: ''}
	  }

	receiveSelectedProject = (projectData) => {
      this.setState({selectedProject: projectData})
	}

	receiveSearchRequest = function() {
		this.setState({projects: this.projects})
	}
	/*
	localStorage.setItem('sendSearchRequest', receiveSearchRequest)
	*/

	/*increment (){
		console.log("add")
		this.state.projects[this.state.selectedProject].likes+=1;
	}*/

	render() {
		 if(this.props.location.pathname === "/projectView"){
		 	return(
			 	<div>
			 		<ProjectView project={this.state.projects[this.state.selectedProject]}/>
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
			 		<h1 className = "Header"> Project Share </h1>
			 		<Center>
			 		<div className = "ProjectContainer">
					{
						Object.keys(this.state.projects).map((project) => {
							return(
								<Project key={uid(project)}
								         project = {this.state.projects[project]}
								         increment = {this.increment}
								         sendSelectedProject = {this.receiveSelectedProject}
								/>
								)

						})
					}
					</div>
					</Center>					
				</div>
			)
		}
	 }
	}
}

export default Home;
