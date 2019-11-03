import React from 'react';
import Project from './Project';
import ProjectView from './ProjectView'
import { uid } from 'react-uid';
import './Home.css';

var Center = require('react-center');

const global_project_0 = {
	id: 0,
	title: "Project Share",
	start_date: "2019-09-29",
	status: "in progress",
	likes: 3,
	image1: require('./projimg.jpg'),
	image2: require('./projimg.jpg'),
	image3: require('./southeast.jpg')
}
const global_project_1 = {
	id: 1,
	title: "Project2",
	start_date: "000000-MM-DD",
	status: "deployed",
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
						selectedProject: '',
					}
	  }

	receiveSelectedProject = (projectData) => {
      this.setState({selectedProject: projectData})
	}

	/*increment (){
		console.log("add")
		this.state.projects[this.state.selectedProject].likes+=1;
	}*/

	render() {
		 if(this.props.location.pathname === "/projectView"){
		 	/*setTimeout(
		 		function(){
		 			function increment(){
		 				console.log("add")
		 				this.state.projects[this.state.selectedProject].likes+=1;
		 			}
		 			const likeButton = React.findDOMNode(this.refs.'LikeButton')
		 			console.log(likeButton)
		 			console.log("before event gets added")
		 			likeButton.addEventListener("onClick", increment )
		 			console.log("after event gets added")
		 		}
		 		, 1000
		 	)*/

		 	return(
			 	<div>
			 		<ProjectView project={this.state.projects[this.state.selectedProject]}/>
			 	</div>
		 	)
		 }	
		 else if (this.props.location.pathname === "/"){
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

export default Home;
