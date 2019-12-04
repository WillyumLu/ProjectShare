import React from 'react';
import Navigation from '../Navigation'
import {PageHeader, Button} from 'antd';
import BaseReactComponent from '../BaseReactComponent';
import { addJoinRequest } from '../../actions/project'
const log = console.log

class ProjectView extends BaseReactComponent {
	
	filterState({ projectView }) {
        console.log("ProjectView is calling filter")
        return { projectView };
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

	constructor(props){
		super(props)
		this.increment = this.increment.bind(this)
		this.state = {likes: 0}
	}
	increment(event) {
			//need server call to add like to database
			this.setState({ likes: this.state.likes + 1 });
	}

	render() {
		const { projectView } =this.state
		this.project = projectView
		log(this.project)
		const routes = [
		  {
		    path: 'index',
		    breadcrumbName: '2019',
		  },
		  {
		    path: 'first',
		    breadcrumbName: '09',
		  },
		  {
		    path: 'second',
		    breadcrumbName: '29',
		  },
		];

		return(
			<div>
				<Navigation title = "Navigation"/>
				<PageHeader
				    style={{
				      border: '1px solid rgb(235, 237, 240)',
				    }}
				    title={this.project.title}
				    breadcrumb={{ routes }}
				 />
				 <div class="projectImage">
							<img src={require('./project.jpg')}/>
				</div>
				<div class="userList">
					<div class='userListHeader'>
			 			<h3> List of Users Working on this Project </h3>
			 		</div>
			 		<div class = "user">
				 		<div class="userIconContainer">
							<img class="userIcon" src={require('./userIcon.png')}/>
						</div>
						<div class="userContent">
							<div>

							<b> UserName: </b>
							firstName lastName

							</div>
							
							416 416 4166
						</div>
					</div>
					<div class = "user">
				 		<div class="userIconContainer">
							<img class="userIcon" src={require('./userIcon.png')}/>
						</div>
						<div class="userContent">
							<div>

							<b> UserName: </b>
							firstName lastName

							</div>
							
							416 416 4166
						</div>
					</div>
				</div>
				<div className= "likeButtonContainer">
					<Button type="dashed" onClick = {this.increment}>Like</Button>
				</div>
				<div class="numLikes">
					Likes: {this.state.likes}
				</div>
				<div class="projectInfo">
					<div className = "infoHeader"> <h3> Project Information: </h3> </div>
					<div className = "statusInfo"> Current Status: </div>
					<div className = "statusIcon"> 
						<Button type={this.getType(this.project.status)} disabled={this.getStatus(this.project.status)}>{this.project.status}</Button>
					</div>
				</div>
				<div className= "aboutHeader"> <h4> About </h4> </div>
				<div className ="about">
					<div className = "para">
						{ this.project.description }
					</div>
				</div>
				<div class="request">
					<Button type="dashed" className="requestButton" onClick = {() => addJoinRequest(this.project.title)}> request to join </Button>
				</div>
			 </div>
			)
	}

}
export default ProjectView;