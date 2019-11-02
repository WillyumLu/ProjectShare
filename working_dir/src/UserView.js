import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Layout, List, Card} from 'antd';
const { Content } = Layout;
const { Meta } = Card;

const userdata = {
    userName: "user",
    profileImage: require('./userprofile.jpg'),
    firstName: "Jason",
    lastName: "Bourne",
    school: "University of Toronto",
    description: "Jesus christ it's jason bourne!",
    projects: [{title: "Project1", status: "in progress"}, 
                {title: "Project2", status: "in progress"},
                {title: "Project3", status: "complete"}]
}

const tabList = [
    {
      key: 'project',
      tab: 'My project',
    },
    {
      key: 'profile',
      tab: 'My profile',
    }   
  ];

  const contentListNoTitle = {
    project: 
        <List
            dataSource={userdata.projects}             
            renderItem={item => (
            <List.Item>                        
                <Card style={{width: '300px'}} title={item.title}>Card content</Card>
            </List.Item>)}
        />,
    profile: <p>profile content</p>,
  };



class UserView extends React.Component{

    state = {        
        key: "project",      
        
    }


    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render(){
        return(
            <Layout>                
                <Content style={{background: '#fff'}}>
                    <Card style = {{margin: '50px', float: "left"}} bordered={false}>                       
                        <Avatar size ={400} shape="square" src={userdata.profileImage}/>
                        <p></p>                       
                        <p><font size="6">{userdata.userName}</font></p>
                    </Card>

                    <Card
                        style={{top: '50px',width: "60%", height: "80%", float:"left" }}
                        tabList={tabList}
                        activeTabKey={this.state.key}
                        tabBarExtraContent={<a href="#">More</a>}
                        onTabChange={key => {
                            this.onTabChange(key, 'key');
                        }}
                    >
                        {contentListNoTitle[this.state.key]}
                    </Card>
                    
                    
                </Content>
                 
            </Layout>
        )
    }

}
export default UserView;