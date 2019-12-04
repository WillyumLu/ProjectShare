import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom'
import {deleteProject} from "../../actions/project";
import { setState } from './../../actions/helpers'
import BaseReactComponent from '../BaseReactComponent'
import { message, Avatar, Layout, List, Card, Descriptions, Collapse, Form, Input,Button, Modal,Tag, Icon, Upload} from 'antd';
const { Content } = Layout;
const { Meta } = Card;
const { Panel } = Collapse;
const { TextArea } = Input;
const log = console.log

class AdminProjectList extends BaseReactComponent{

    filterState({ projectList }) {
        console.log("UserView is calling filter")
        return { projectList };
    }

    state = {
        redirect: false,
        projectAddr: null,     
    }

    decideColor(item){
        if (item.status === "in progress"){
            return "green"
        }
        return "blue"
    }
  
    toPath(proj){
        setState("projectView", proj)
        this.props.history.push('/projectView');
        // this.setState({redirect: true});
        // this.setState({goto: proj});
    }
    
    renderRedirect = () => {
        // if (this.state.redirect) {
        //   return <Redirect to={{
        //     pathname: '/projectView',
        //     state: { project: this.state.goto }
        // }}/>
    // }
    }

    //quit the project
    //should be changed in phase 2
    handleDelete(item){
        //replace it with a server call    
        deleteProject(item._id)
        this.props.rerenderParentCallback();
    }
    
      render(){
          const { projectList } = this.state
          log('State in ProjectList')
          log(projectList)
          const items = projectList.map((item) => 
          <div key= {item._id}>    
            <List.Item >                        
                <Card style={{width: '50%'}} 
                actions={[
                    // <Link to={'/projectView'}> 
                    <Icon type="select" key= "detail" onClick={() => this.toPath(item)} />,
                    // </Link>, 
                    <Icon type="delete" key="delete"  onClick={() => this.handleDelete(item, projectList)}/>,
                    ]}                  
                    >
                    <Meta
                        avatar = {<Avatar src ={item.image1}/>}
                        title = {item.title}
                        description = {<div><br/><Tag color= {this.decideColor(item)}>{item.status}</Tag></div>}                   
                    />                                               
                    
                </Card>
                
            </List.Item></div>)            
            const empty = <List dataSource = {[]}/>
          return(
            <div>
            {this.renderRedirect()}   
            <QueueAnim type={["bottom", "right"]}>
                {projectList.length? items:empty} 
                                
            </QueueAnim>
        </div>
          )
      }
  }

// class AdminProjectList extends BaseReactComponent{

//     filterState({ projectList }) {
//         return { projectList };
//     }

//     state = {
//         redirect: false,
//         projectAddr: null,         
//     }

//     decideColor(item){
//         if (item.status === "in progress"){
//             return "green"
//         }
//         return "blue"
//     }
  
//     toPath(addr){
//         this.setState({redirect: true});
//         this.setState({projectAddr: addr});
//     }
    
//     renderRedirect = () => {
//         if (this.state.redirect) {
//           return <Redirect to= {this.state.projectAddr}/>
//         }
//     }

//     //quit the project
//     //should be changed in phase 2
//     handleDelete(item){
//         //replace it with a server call    
//         //userdata.projects.splice(userdata.projects.indexOf(item), 1);  
//         deleteProject(item._id)
//         this.props.rerenderParentCallback();
//     }
    
//       render(){
//           const { projectList } = this.state;
//           const items = projectList.map((project) => 
//           <div key= {project.title}>    
//             <List.Item >
//                 <Card style={{width: '50%'}} 
//                 actions={[
//                     <Icon type="delete" key="delete"  onClick={() => this.handleDelete(project)}/>,
//                     ]}                  
//                     >
//                     <Meta
//                         title = {project.title}
//                     />                                               
//                 </Card>
//             </List.Item></div>)            
//             const empty = <List dataSource = {[]}/>
//           return(
//             <div>
//             {this.renderRedirect()}   
//             <QueueAnim type={["bottom", "right"]}>
//                 {projectList.length? items:empty} 
//             </QueueAnim>
//         </div>
//           )
//     }
// }

export default AdminProjectList;