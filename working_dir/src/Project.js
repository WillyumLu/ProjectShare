import React from 'react';
import './Project.css'
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
				<div className="title">{this.project.title}</div>
				<div className="start_date">{this.project.start_date}</div>
				<div className="status">{this.project.status}</div>

			</div>
			)
	}
}
export default Project;
