import React from 'react';
import {PageHeader, Button} from 'antd';
const log = console.log

class ProjectView extends React.Component {

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
		this.project = this.props.project;
		this.increment = this.increment.bind(this)
		this.state = {project: this.project, likes: this.props.project.likes}
		log(this.project)
	}
	increment(event) {
			this.project.likes+=1
			this.setState({ likes: this.project.likes });
	}

	render() {

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
					Likes: {this.project.likes}
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
						<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						Nulla vel hendrerit augue. Vivamus eu feugiat ante, a maximus eros. 
						Praesent lobortis risus eu venenatis ullamcorper. Curabitur porttitor felis nec cursus tempus. 
						Quisque a libero libero. Vivamus vitae est euismod nibh dictum mattis sit amet eget diam. 
						Integer et congue dui. Donec at metus ex. Maecenas dictum sapien eget nisi luctus convallis.
						</p>
					</div>
					<div className = "para">
						<p>
						Maecenas aliquet, lacus at finibus vulputate, arcu elit venenatis risus, a rhoncus felis lacus quis turpis. 
						Vestibulum malesuada sem eget risus molestie, eget vestibulum dui fringilla. Donec ac fermentum metus. 
						Duis venenatis diam vestibulum, sodales dui in, semper tellus. 
						Sed eros sem, sagittis eget cursus in, dignissim nec libero. 
						Aliquam suscipit pellentesque turpis nec suscipit. 
						urabitur hendrerit justo at augue scelerisque, a dignissim metus porttitor. 
						Aenean sit amet diam nec nulla viverra vehicula eu eu metus.
						</p>
					</div>
				</div>
				<div class="request">
					<Button type="dashed" className="requestButton"> request to join </Button>
				</div>
			 </div>
			)
	}

}
export default ProjectView;
