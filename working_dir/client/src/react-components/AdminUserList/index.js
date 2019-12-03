import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom'
import {deleteUser} from "../../actions/user";

import BaseReactComponent from '../BaseReactComponent'
import { message, Avatar, Layout, List, Card, Descriptions, Collapse, Form, Input,Button, Modal,Tag, Icon, Upload} from 'antd';
const { Content } = Layout;
const { Meta } = Card;
const { Panel } = Collapse;
const { TextArea } = Input;

class AdminUserList extends BaseReactComponent{

    filterState({ userList }) {
        return { userList };
    }

    state = {
        redirect: false,
        userAddr: null,         
    }

    decideColor(item){
        if (item.status === "in progress"){
            return "green"
        }
        return "blue"
    }
  
    toPath(addr){
        this.setState({redirect: true});
        this.setState({userAddr: addr});
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to= {this.state.userAddr}/>
        }
    }

    //should be changed in phase 2
    handleDelete(item){
        //replace it with a server call    
        deleteUser(item._id)
        this.props.rerenderParentCallback();
    }
    
      render(){
          const { userList } = this.state;
          const items = userList.map((user) => 
          <div key= {user.title}>    
            <List.Item >                        
                <Card style={{width: '50%'}} 
                actions={[
                    <Icon type="delete" key="delete"  onClick={() => this.handleDelete(user)}/>,
                    ]}                  
                    >
                    <Meta
                        title = {user.username}
                    />                                               
                </Card>
            </List.Item></div>)            
            const empty = <List dataSource = {[]}/>
          return(
            <div>
            {this.renderRedirect()}   
            <QueueAnim type={["bottom", "right"]}>
                {userList.length? items:empty} 
            </QueueAnim>
        </div>
          )
    }
}

export default AdminUserList;