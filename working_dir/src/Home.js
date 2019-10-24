import React from 'react';
import Project from './Project';
import ProjectView from './ProjectView'
import { uid } from 'react-uid';
import { Link } from 'react-router-dom';
import './Home.css';

var Center = require('react-center');

const global_project_0 = {
	id: 0,
	title: "Project1",
	start_date: "YYYY-MM-DD",
	status: "in progress",
	icon: 'url/..../'
}
const global_project_1 = {
	id: 1,
	title: "Project2",
	start_date: "000000-MM-DD",
	status: "in progress",
	icon: 'url/..../'
}
const global_project_2 = {
	id: 2,
	title: "Project3",
	start_date: "000000-MM-DD",
	status: "complete",
	icon: 'url/..../'
}

function loadData() {
	console.log("loadData() called")
	/*const projects = [global_project_0, global_project_1, global_project_2]*/
	const projects = {"Project1": global_project_0, "Project2": global_project_1, "Project3": global_project_2}
	return projects
}


class Home extends React.Component {

	constructor(props) { // When the componenet is created,  calls load data
		super(props)
	  	this.state = {projects: loadData(),
	  				  displaySelectedProject: false,
	  				  selectedProject: ''}
	  }

	receiveSelectedProject = (projectData) => {
      this.setState({selectedProject: projectData})
      this.setState({displaySelectedProject: true})
      console.log(this.state.displaySelectedProject)
	}

	render() {
		 if(this.state.displaySelectedProject){
		 	return(
			 	<div>
			 		<ProjectView project={this.state.projects[this.state.selectedProject]}/>
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
								         sendSelectedProject = {this.receiveSelectedProject}
								/>
								)

						})
					}
					</div>
					</Center>
					<div className="loginBox">
						<Link to={'/login'}>
					        <button>
					            LogIn
					        </button>
					    </Link>
				    </div>
				</div>
			)
		}
	}


}

export default Home;
