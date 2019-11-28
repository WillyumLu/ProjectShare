import React from 'react';
import 'antd/dist/antd.css';
import QueueAnim from 'rc-queue-anim';


import { Redirect } from 'react-router-dom'
import { message, Avatar, Layout, List, Card, Descriptions, Collapse, Form, Input,Button, Modal,Tag, Icon, Upload, Divider, Table, Popconfirm, Select} from 'antd';

const { Option } = Select;
const { Content } = Layout;
const { Meta } = Card;
const { Panel } = Collapse;
const { TextArea } = Input;
const log = console.log
const userdata = {
    userName: "admin",
    pwd: "admin",
    profileImage: require('./admin.jpg'),
    firstName: "Donald",
    lastName: "Trump",
    orgnazation: "University of Toronto",
    bio: '"I Am Inevitable."',
    email: "admin@mail.com",
    phone: "1919810",
    projects: [{id: 0, title: "Project1", avatar: null, status: "in progress", link: '/'}, 
                {id: 1, title: "Project2", avatar: null, status: "in progress"},
                {id: 2, title: "Project3", avatar: null, status: "complete"},
                {id: 3, title: "Project4", avatar: null, status: "in progress"},
                {id: 4, title: "Project5", avatar: null, status: "in progress"}]
}

const websiteData = {
    users: [{userName: "user", userId:0, pwd: "user", avatar:require('./userprofile.jpg'),type: "user"},
    {userName: "Alpha", userId:1, pwd: "123123", avatar:null, type: "user"},
    {userName: "Bravo", userId:2, pwd: "barvo", avatar:null, type: "user"},
    {userName: "Charlie", userId:3, pwd: "sadasdasd",avatar:null, type: "user"},
    {userName: "Delta", userId:4, pwd: "asdasdads", avatar:null, type: "user"},
    {userName: "Foxtrot", userId:5, pwd: "wwwwweww", avatar:null, type: "user"},
    {userName: "Golf", userId:6, pwd: "lol",avatar:null, type: "user"},
    {userName: "Hotel", userId:7, pwd: "lmao",avatar:null,type: "user"},
    {userName: "India", userId:8, pwd: "new", avatar:null,type: "user"},
    {userName: "Juliet", userId:9, pwd: "what",avatar:null, type: "user"},
    {userName: "Admin", userId:10, pwd: "what",avatar:null, type: "admin"},
    ],
    projects: 
        [{id: 0, title: "Project1", avatar: require('./tech.jpg'), status: "in progress", creator: "John Wick"}, 
        {id: 1, title: "Project2", avatar: null, status: "in progress", creator:"Jane Doe"},
        {id: 2, title: "Project3", avatar: null, status: "complete", creator: "Mike"},
        {id: 3, title: "Project4", avatar: require('./southeast.jpg'), status: "in progress", creator: "Alex"},
        {id: 4, title: "Project5", avatar: null, status: "in progress", creator: "Lucy"},
        {id: 5, title: "Project6", avatar: null, status: "complete", creator: "Wendy"}]
}

//remove the user with id
function removeUser(id){
    for (let i = 0; i < websiteData.users.length; i++){
        if (websiteData.users[i].userId === id){
            websiteData.users.splice(i,1);
            return;            
        }
    }
}

function removeProj(id){
    for (let i = 0; i < websiteData.projects.length; i++){
        if (websiteData.projects[i].id === id){
            websiteData.projects.splice(i,1);
            return;            
        }
    }
}

function updateUserInfo(id, name, pwd){
    for (let i = 0; i < websiteData.users.length; i++){
        if (websiteData.users[i].userId === id){
            websiteData.users[i].userName = name? name:websiteData.users[i].userName;
            websiteData.users[i].pwd = pwd? pwd:websiteData.users[i].pwd;
            return;
        }
    }
}

function updateProjInfo(id, title, status){
    for (let i = 0; i < websiteData.users.length; i++){
        if (websiteData.projects[i].id === id){
            websiteData.projects[i].title = title? title:websiteData.projects[i].title;
            websiteData.projects[i].status = status? status:websiteData.projects[i].status;
            return;
        }
    }
}
//check if a file uploaded is valid
//Change it in phase 2
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must smaller than 10MB!');
    }
    const newImagePath = './' + file.name;
    //require(newImagePath) don't work, for dynamic file name it needs context.
    let assetRequire = require.context('./', true, /\.(png|jpg|svg)$/)   
    userdata.profileImage = assetRequire(newImagePath);

    //for phase 1 it always returns false to prevent default behaviour try to make a sever call
    return false;
  }   

class UploadProfilePicture extends React.Component{
    state = {loading: false}
    handleChange = (pic) => {
        //add in Phase 2        
    }

    render() {
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
            )
        
        const {imageUrl} = this.state;
        
        return(
            <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}  
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            >
               {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            
            </Upload>
        )
    }    


}
class SettingProfileForm extends React.Component{
    state = {       
        firstName: null,
        lastName: null,
        orgnazation: null, 
        email: null,
        phone: null,
        bio: null,
        loadingImage: false   
        
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name; 
            
        // 'this' is bound to the component in this arrow function.
        this.setState({
          [name]: value  // [name] sets the object property name to the value of the 'name' variable.
        })    
      }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        userdata.bio = this.state.bio? this.state.bio: userdata.bio;
        userdata.firstName = this.state.firstName? this.state.firstName: userdata.firstName;
        userdata.lastName = this.state.lastName? this.state.lastName: userdata.lastName;
        userdata.email = this.state.email? this.state.email: userdata.email;
        userdata.orgnazation = this.state.orgnazation? this.state.orgnazation: userdata.orgnazation;     
     };

    render(){
        const formItemLayout ={
            labelCol: { span: 3},
            wrapperCol: { span: 10 },
          }       

        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 3,
              },
            },
          }; 
          
        return(           
                   
        <Form onSubmit={this.handleSubmit}>
            <Form.Item label="First Name" {...formItemLayout}>
            <Input name = "firstName" placeholder="input your first name" onChange={this.handleInputChange}/>
            </Form.Item>
            <Form.Item label="Last Name" {...formItemLayout}>
            <Input name = "lastName" placeholder="input your first name" onChange={this.handleInputChange}/>
            </Form.Item>
            <Form.Item label="Orgnazation" {...formItemLayout}>
            <Input name = "orgnazation" placeholder="input your orgnazation" onChange={this.handleInputChange}/>
            </Form.Item>
            <Form.Item label="Email" {...formItemLayout}>
            <Input name = "email" placeholder="input your email address" onChange={this.handleInputChange}/>
            </Form.Item>
            <Form.Item label="Phone Number" {...formItemLayout}>
            <Input name = "phone" placeholder="input your phone number" onChange={this.handleInputChange}/>
            </Form.Item>
            <Form.Item label="Bio" {...formItemLayout}>
            <TextArea name = "bio" rows={4} placeholder ="add a Bio" onChange={this.handleInputChange}/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Save
            </Button>
        </Form.Item>
        </Form>)

    }
}

class SettingAccountForm extends React.Component{
    state = {
        userVisible: false,
        pwdVisible: false,
        newName:null       
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        })    
      }

    showUser = () => {
        this.setState({ userVisible: true });
    };

    cancelUser = () => {
        this.setState({ userVisible: false });
    };
        

    showPwd = () => {
        this.setState({ pwdVisible: true });
    };

    cancelPwd = () => {
        this.setState({ pwdVisible: false });       
    };

    submitNewName = () =>{
        //validate the new user name
        //For phase 1 we don't do validation because no exist user data hardcoded on this page

        //change the username
        //replace it with server call on phase 2
        userdata.userName = this.state.newName? this.state.newName:userdata.userName;

        //reload the webpage
        //For phase 1 it doesn't change the user view because data are hardcoded, all changes are gone when refreshed.
        window.location.reload();    
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    submitNewPwd = () =>{
        //validate the new password
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //change the user's password
                //replace it with a server call in phase 2
                userdata.pwd = values.Password;
                console.log("new password:", values.password);
                window.location.reload();   
            }
          });
       
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(        
            <div>
                <Button type="primary" onClick={this.showUser}>
                    Change username
                </Button>
                <br/>
                
                <br/>
                <Button type="primary" onClick={this.showPwd}>
                    Change password
                </Button>

                <Modal 
                    visible={this.state.userVisible}
                    title="Choose a new username"
                    okText="Change my username"
                    onCancel={this.cancelUser}
                    onOk={this.submitNewName}>
                    <Form layout="vertical">
                        <Form.Item label="Username">
                            <Input name = "newName" placeholder="new username" onChange={this.handleInputChange}/>
                        </Form.Item>
                    </Form>                    
                </Modal>

                <Modal 
                    visible={this.state.pwdVisible}
                    title="Choose a new password"
                    okText="Update password"
                    onCancel={this.cancelPwd}
                    onOk={this.submitNewPwd}>
                    <Form layout="vertical">
                        <Form.Item label="New password" hasFeedback>
                        {getFieldDecorator('password', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                        validator: this.validateToNextPassword,
                        },
                        ],
                         })(<Input.Password />)}
                           
                        </Form.Item>

                        <Form.Item label="Confirm Password" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                                ],
                            })(<Input.Password />)}
                            </Form.Item>
                    </Form>         
                </Modal>
            </div>        
            
            
        );
    }
}

const AccountForm = Form.create()(SettingAccountForm); 
class ProfileDisplay extends React.Component{
    render(){
        return(
            <Descriptions title="User Info" layout="vertical">
                <Descriptions.Item id ='profile-username'label="User Name">{userdata.userName}</Descriptions.Item>
                <Descriptions.Item id ='profile-firstname' label="First Name">{userdata.firstName}</Descriptions.Item>
                <Descriptions.Item id ='profile-firstname' label="Last Name">{userdata.lastName}</Descriptions.Item>
                <Descriptions.Item label="Orgnazation">{userdata.orgnazation}</Descriptions.Item>
                <Descriptions.Item label="Email">{userdata.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number:">{userdata.phone}</Descriptions.Item>
                <Descriptions.Item id ='profilebio' label="Bio">{userdata.bio}</Descriptions.Item>
            </Descriptions>
        );
    }
}
const profileForm = <SettingProfileForm/>

const userinfo = <ProfileDisplay/>

const settingContent =
    <Collapse bordered={false} defaultActiveKey={['0']}>
         <Panel header="Upload profile picture" key="0">
            {<UploadProfilePicture/>}
        </Panel>
        <Panel header="Edit profile" key="1">
            {profileForm}
        </Panel>
        <Panel header="Account" key="2">      
            <AccountForm />        
        </Panel>
       
        
    </Collapse>   

const tabList = [
    {
      key: 'project',
      tab: 'My project',
    },
    {
      key: 'profile',
      tab: 'My profile',
    },

    {
        key: 'settings',
        tab: 'Settings',
    },

    {
        key: 'userlist',
        tab: 'Mange Users',
    },

    {
        key: 'projlist',
        tab: 'Mange Projects',
    }

  ];

class ProjectList extends React.Component{
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
  
    toPath(addr){
        this.setState({redirect: true});
        this.setState({projectAddr: addr});
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to= {this.state.projectAddr}/>
        }
    }

    //quit the project
    //should be changed in phase 2
    handleDelete(item){
        //replace it with a server call    
        
        userdata.projects.splice(userdata.projects.indexOf(item), 1);         
        this.props.rerenderParentCallback();
    }
    
      render(){
          const items = userdata.projects.map((item) => 
          <div key= {item.id}>    
            <List.Item >                        
                <Card style={{width: '50%'}} 
                actions={[
                    <Icon type="select" key= "detail" onClick={() => this.toPath(item.link)}/>,
                    <Icon type="edit" key="edit" />,
                    <Icon type="delete" key="delete"  onClick={() => this.handleDelete(item)}/>,
                    ]}                  
                    >
                    <Meta
                        avatar = {<Avatar src ={item.avatar}/>}
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
                {userdata.projects.length? items:empty} 
                                
            </QueueAnim>
        </div>
          )
      }
  }

class ModalUserUpdater extends React.Component{
    render(){
        const { visible, onCancel, onUpdate, form } = this.props;
        const { getFieldDecorator } = form;
        return(
            <Modal 
                visible={visible}
                title="Update User information"
                okText="Update"
                onCancel={onCancel}
                onOk={onUpdate}>
                <Form layout="vertical">
                    <Form.Item label="New username" hasFeedback>
                        {getFieldDecorator('username', {
                        rules: [
                        {
                            required: false
                        },
                        
                        ],
                        })(<Input/>)}
                
                    </Form.Item>
                        <Form.Item label="password" hasFeedback>
                            {getFieldDecorator('password', {
                            rules: [
                            {
                                required: false
                               
                            }
                                
                            ],
                            })(<Input.Password />)}
                        </Form.Item>
                    </Form>         
            </Modal>
        )
    }    

}
const UpdateUserForm = Form.create({ name: 'user_modal' })(ModalUserUpdater)
class UserManager extends React.Component{
    state = {
        visible: false,        
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    show = () => {        
        this.setState({ visible: true })
    }

    cancel = () => {
        this.setState({ visible: false});
      };

    onDelete(id){
        log('delete user with id ', id);
        removeUser(id);
        let userlist = websiteData.users
        this.setState({userlist});        
    }

    onEdit = (id) => {        
        this.show();
        this.setState({editing:id})
       
    }

    onSubmit = () => {        
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
            return;
            }
            
            log('Change user info with id:', this.state.editing)
            let id = this.state.editing
            
            updateUserInfo(id,values.username,values.password);
                      
            form.resetFields();
            this.setState({ visible: false});});
    }

    render()   
    {
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);          
        const columns = [
            {
                title: "Avatar",
                dataIndex: 'avatar',
                key: 'avatar',
                render: picture => <Avatar src={picture}/>
            },

            {
                title: "User Name",
                dataIndex: 'userName',
                key: 'userName',                
                render: text => <a href="">{text}</a>
            },

            {
                title: "User Id",
                dataIndex: 'userId',
                key: 'userId'                
            },
            
             {
                title: "User Type",
                dataIndex: 'type',
                key: 'userType',
                render: type => 
                    <Tag color={type === 'user'? 'blue': 'gold'}>
                        {type.toUpperCase()}
                    </Tag>
                   
            },

            {
                title: "Password",
                dataIndex: 'pwd',
                key: 'pwd',               
            },

           {
                title: 'Action',
                key: 'action',
                render: (text,record, index) =>                    
                 (
                    <span>
                        <Icon type = 'form' onClick={this.onEdit.bind(this,record.userId)}/>                         
                        <Divider type="vertical"/>                        
                        <Popconfirm title="Sure to delete the user?" onConfirm={this.onDelete.bind(this,record.userId)}>
                            <Icon type = 'user-delete'/>
                        </Popconfirm>
                  </span>)                
                
              },

        ];
        return(
            <div>
                <Table columns={columns} dataSource={websiteData.users} rowKey = "userId"/>
                <UpdateUserForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.cancel}
                    onUpdate={this.onSubmit}                    
                />              
            </div>
        )
    }
}

class ModalProjUpdater extends React.Component{
    render(){
        const { visible, onCancel, onUpdate, form } = this.props;
        const { getFieldDecorator } = form;
        return(
            <Modal 
                visible={visible}
                title="Update Project information"
                okText="Update"
                onCancel={onCancel}
                onOk={onUpdate}>
                <Form layout="vertical">
                    <Form.Item label="New project title" hasFeedback>
                        {getFieldDecorator('title', {
                        rules: [
                        {
                            required: false
                        },
                        
                        ],
                        })(<Input/>)}
                
                    </Form.Item>
                        <Form.Item label="Change status" hasFeedback>
                            {getFieldDecorator('status', {
                            rules: [
                            {
                                required: false
                               
                            }
                            ],
                            })(<Select>
                                <Option value="in progress">in progress</Option>
                                <Option value="compelete">compelete</Option>                                
                              </Select>)}
                        </Form.Item>
                    </Form>         
            </Modal>
        )
    }    

}

const UpdateProjForm = Form.create('proj_modal')(ModalProjUpdater)

class ProjManager extends React.Component{
    state = {
        visible: false,        
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    show = () => {        
        this.setState({ visible: true })
    }

    cancel = () => {
        this.setState({ visible: false});
      };

    onDelete(id){
        log('delete project with id ', id);
        removeProj(id);
        let projlist = websiteData.projects
        this.setState({projlist});        
    }

    onEdit = (id) => {        
        this.show();
        this.setState({editing:id})
       
    }

    onSubmit = () => {        
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
            return;
            }
            
            log('Change project info with id:', this.state.editing)
            let id = this.state.editing
            
            updateProjInfo(id,values.title,values.status);
                      
            form.resetFields();
            this.setState({ visible: false});});
    }

    render()   
    {
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);          
        const columns = [
            {
                title: "Avatar",
                dataIndex: 'avatar',
                key: 'avatar',
                render: picture => <Avatar src={picture}/>
            },

            {
                title: "Project Title",
                dataIndex: 'title',
                key: 'title',                
                render: text => <a href="">{text}</a>
            },

            {
                title: "Project Id",
                dataIndex: 'id',
                key: 'id'                
            },
            
             {
                title: "Project Status",
                dataIndex: 'status',
                key: 'status',
                render: status => 
                    <Tag color={status === 'in progress'? 'green': 'blue'}>
                        {status.toUpperCase()}
                    </Tag>
                   
            },

            {
                title: "Creator",
                dataIndex: 'creator',
                key: 'creator', 
                render: text => <a href="">{text}</a>              
            },

           {
                title: 'Action',
                key: 'action',
                render: (text,record, index) =>                    
                 (
                    <span>
                        <Icon type = 'form' onClick={this.onEdit.bind(this,record.id)}/>                         
                        <Divider type="vertical"/>                        
                        <Popconfirm title="Sure to delete the Project?" onConfirm={this.onDelete.bind(this,record.id)}>
                            <Icon type = 'delete'/>
                        </Popconfirm>
                  </span>)                
                
              },

        ];
        return(
            <div>
                <Table columns={columns} dataSource={websiteData.projects} rowKey="id"/>
                <UpdateProjForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.cancel}
                    onUpdate={this.onSubmit}                    
                />              
            </div>
        )
    }
}
class UserView extends React.Component{
    constructor(props) {
        super(props);
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    }

    rerenderParentCallback() {
        log("rerendered!");
        this.forceUpdate();
    }
    state = {        
        key: "project",      
        
    }  

   
    onTabChange = (key, type) => {
        console.log(key, type);
        this.render();
        this.setState({ [type]: key });
    };

    render(){
        const contentListNoTitle = {
            project: <ProjectList key="projlst" rerenderParentCallback={this.rerenderParentCallback}/>,      
            profile: userinfo,
            settings: settingContent,
            userlist:<UserManager/>,
            projlist: <ProjManager/>            

          };
        return(
            <Layout>                
                <Content style={{background: '#fff'}}>
                    <Card style = {{margin: '50px', float: "left"}} bordered={false}>                       
                        <Avatar size ={400} shape="square" src={userdata.profileImage}/>
                        <br/>                       
                        <p><font size="6">{userdata.userName}</font></p>
                        <p><font size="4">{userdata.bio}</font></p>
                        <br/>
                        <Tag color="gold">Admin</Tag>
                    </Card>

                    <Card
                        style={{top: '50px',width: "70%", height: "80%", float:"left" }}
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