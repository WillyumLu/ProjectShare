import React from 'react';
import Project from './Project';

import { uid } from 'react-uid';


const global_project_0 = {
	id: 0,
	title: "Hello",
	start_date: "YYYY-MM-DD",
	status: "in progress",
	icon: 'url/..../'
}

function loadData() {
	console.log("loadData() called")
	const projects = [global_project_0]
	return projects
}


class Home extends React.Component {

	constructor(props) { // When the componenet is created,  calls load data
		super(props)
	  	this.state = {projects: loadData()}
	  }



	render() {
		return(
			<div>

				<div id="projectContainer">
					{
						this.state.projects.map((project) => {
							return(

								<Project key={ uid(project) }
								project = {project}
								/>
								)

						})
					}
				</div>
			</div>


		)

	}
	
}

export default Home;

