import React from 'react';
const log = console.log

class ProjectView extends React.Component {

	constructor(props){
		super(props)
		this.project = this.props.project;
		log(this.project)
	}
	render() {

		return(
			<div className="projectView">
				<h1 className="Header">{this.project.title}</h1>
				<div className="info">{this.project.start_date}</div>
				<div className="info">{this.project.status}</div>
				<div className="info">members of the project</div>
				<div className="info">contact info for each of those members</div>
				<div className="info">other information that may not have fit into the project icon in the main view</div>
				<div className="LikeButton">Like Button</div>
				<div className="Request">Request to join</div>
			</div>
			)
	}

}
export default ProjectView;
