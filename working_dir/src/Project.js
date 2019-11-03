import React from 'react';
import './Project.css'
import { Avatar, Layout, List, Card, Carousel, Button} from 'antd';
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
		this.props.sendSelectedProject(this.project.title);
	}
	render() {

		return(
			<div className="project">
				<Card id="card" title = {this.project.title} style = {{margin: "10px", float: "left", hoverable: true, width: 900}}>
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
				</Card>
			</div>
			)
	}

}
export default Project;
