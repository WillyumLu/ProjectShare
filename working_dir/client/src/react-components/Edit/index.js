import React from 'react';
import AdminProjectList from '../AdminProjectList'
import AdminUserList from '../AdminUserList'
import { message, Avatar, Layout, List, Card, Descriptions, Collapse, Form, Input,Button, Modal,Tag, Icon, Upload} from 'antd';
const { Content } = Layout;
const { Meta } = Card;
const { Panel } = Collapse;
const { TextArea } = Input;
const log = console.log

const tabList = [
	    {
	      key: 'projects',
	      tab: 'Projects',
	    },
	    {
	      key: 'users',
	      tab: 'Users',
	    }
  	];

class Edit extends React.Component {

	constructor(props) {
        super(props);
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    }

    rerenderParentCallback() {
        log("rerendered!");
        this.forceUpdate();
    }

	state = {        
        key: "projects"
    }  

    onTabChange = (key, type) => {
        console.log(key, type);
        this.render();
        this.setState({ [type]: key });
    };

	render() {
		console.log("edit page")
		const contentListNoTitle = {
            projects: <AdminProjectList key="projlst" rerenderParentCallback={this.rerenderParentCallback} history={this.props.history} />,      
            users: <AdminUserList key="userlst" rerenderParentCallback={this.rerenderParentCallback}/>
          };
		return(
			<div>
				<Card
                        style={{top: '50px',width: "70%", height: "80%", float:"left" }}
                        tabList={tabList}
                        activeTabKey={this.state.key}
                        onTabChange={key => {
                            this.onTabChange(key, 'key');
                        }}
                    >
                    {contentListNoTitle[this.state.key]}
                </Card>
			</div>
		)
	}
}

export default Edit;  