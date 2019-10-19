import React from 'react';
const log = console.log

class Project extends React.Component {

	constructor(props){
		super(props)
		this.project = this.props.project;
		log("Project.project")
		log(this.project)
	}

	render() {

		return(
			<div id="project">
				{this.project.title},
				{this.project.start_date},
				{this.project.status},
			</div>
			)
	}
}
export default Project;