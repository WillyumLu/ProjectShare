import React from 'react';
import './Project.css'
import { Link } from 'react-router-dom';
const log = console.log

class Project extends React.Component {

	constructor(props){
		super(props)
		this.project = this.props.project;
		this.onItemClick = this.onItemClick.bind(this)
		log("Project.project")
		log(this.project)
	}
	onItemClick(event) {
		/*for the div that was clicked, send an object of it's info back to the Home component*/
		/*const data = {title: e.target}*/
		this.props.sendSelectedProject(event.target.innerHTML);
	}
	render() {

		return(
			<div className="project">
				<div className="title" onClick={this.onItemClick}><Link to={'/projectView'}>{this.project.title}</Link></div>
				<div className="start_date">{this.project.start_date}</div>
				<div className="status">{this.project.status}</div>

			</div>
			)
	}

}
export default Project;
