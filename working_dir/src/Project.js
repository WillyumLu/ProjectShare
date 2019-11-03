import React from 'react';
import './Project.css'
import { Avatar, Icon, Layout, List, Card, Carousel, Popover, Button, Progress} from 'antd';
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
	getType(status){
		if(status === "deployed"){
			return "danger"
		}
		return "primary"
	}
	getStatus(status){
		if (status === "complete"){
			return true
		}
		return false
	}
	getIcon(status){
		if (status === "complete"){
			return "check"
		}
		else if (status === "in progress"){
			return  "bulb"
		}
		return "hourglass"
	}
	getContent(status){
		if (status === "complete"){
			return "This project does not need contribution at the moment."
		}
		else if (status === "in progress"){
			return  "We are actively looking for help!"
		}
		return "We need help maintaining our code!"
	}
	onItemClick(event) {
		/*for the div that was clicked, send an object of it's info back to the Home component*/
		this.props.sendSelectedProject(this.project.id);
	}
	render() {

		return(
			<div className="project">
				<Card id="card" title = {this.project.title} style = {{"border-radius": "1%", margin: "10px", float: "left", hoverable: true, width: 900}}>
					<Link to={'/projectView'}>
						<Button type="dashed" id="viewButton" onClick = {this.onItemClick}>View</Button>
					</Link>
					<Carousel autoplay>
						<div class="slideImage">
							<img src={this.project.image1}/>
						</div>
						<div class="slideImage">
							<img src={this.project.image2}/>
						</div>
						<div class="slideImage">
							<img src={this.project.image3}/>
						</div>
					</Carousel>
					<div class="startDate">
						<Icon type="file-text" />
						{" "} Start Date: {this.project.start_date}
					</div>
					<div class="likes">
						<Icon type="like" />
						{" "} Likes: {this.project.likes}
					</div>
					<div class="progress">
						<Popover content={<div>
											<p>{this.getContent(this.project.status)}</p>
										</div>} 
						title={this.project.status}><Icon type={this.getIcon(this.project.status)} /> {" "}
							<Button type={this.getType(this.project.status)} disabled={this.getStatus(this.project.status)}>{this.project.status}</Button>
						</Popover>
					  </div>
					
					

				</Card>
			</div>
			)
	}

}
export default Project;
