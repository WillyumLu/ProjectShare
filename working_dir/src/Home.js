import React from 'react';
import Project from './Project';

import { uid } from 'react-uid';
import LoginBox from './login';
import { Link } from 'react-router-dom';
import './Home.css';


const global_project_0 = {
	id: 0,
	title: "Hello",
	start_date: "YYYY-MM-DD",
	status: "in progress",
	icon: 'url/..../'
}
const global_project_1 = {
	id: 1,
	title: "World",
	start_date: "000000-MM-DD",
	status: "in progress",
	icon: 'url/..../'
}

function loadData() {
	console.log("loadData() called")
	const projects = [global_project_0, global_project_1]
	return projects
}


class Home extends React.Component {

	constructor(props) { // When the componenet is created,  calls load data
		super(props)
	  	this.state = {projects: loadData()}
	  }



	render() {
		return(
			return (<div id="projectContainer">
				{
					this.state.projects.map((project) => {
						return(
							<Project key={ uid(project) }
							project = {project}
							/>
							)

					})
				}
				<div className="loginBox">
				<Link to={'/login'}> { /* This element will link the URL path to /queue */ }
			        <button>
			            LogIn
			        </button>
		      </Link>
		      </div>
			</div>)



		)

	}
	
}

export default Home;

