import React from 'react';
import 'antd/dist/antd.css';
import QueueAnim from 'rc-queue-anim';
import { setState } from './../../actions/helpers'
import {readUser, updateUser, changeName, changePassword} from './../../actions/user'
import {deleteProject} from './../../actions/project'
import { Redirect ,Link} from 'react-router-dom'
import BaseReactComponent from "./../BaseReactComponent";
import { message, Avatar, Layout, List, Card, Descriptions, Collapse, Form, Input,Button, Modal,Tag, Icon, Upload} from 'antd';
import { LOADIPHLPAPI } from 'dns';
import { read, link } from 'fs';
import ProjectView from '../ProjectView';
const { Content } = Layout;
const { Meta } = Card;
const { Panel } = Collapse;
const { TextArea } = Input;
const log = console.log

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

//check if a file uploaded is valid
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must smaller than 10MB!');
    }
    
    return isJpgOrPng && isLt10M
  }
   

class UploadProfilePicture extends BaseReactComponent{
    filterState({ userdata }) {
        console.log("UserView is calling filter")
        return { userdata };
    }

    state = {loading: false}
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done'){
            readUser()
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                  imageUrl,
                  loading: false,
                }),
              );
        }

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
            action = '/upload/avatar'
            showUploadList={false}  
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            >
               {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            
            </Upload>
        )
    }    


}

class UploadProjectPicture extends BaseReactComponent{
    filterState({ userdata }) {
        console.log("UserView is calling filter")
        return { userdata };
    }

    state = {loading: false}
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done'){
            readUser()
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                  imageUrl,
                  loading: false,
                }),
              );
        }

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
            name="projImg"
            listType="picture-card"
            className="avatar-uploader"
            action = {this.props.url}
            showUploadList={false}  
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            >
               {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            
            </Upload>
        )
    }    


}

class SettingProfileForm extends BaseReactComponent{
    filterState({ userdata }) {
        console.log("UserView is calling filter")
        return { userdata };
    }

    state = {       
        firstName: null,
        lastName: null,
        school: null, 
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
        const body = {firstName: this.state.firstName?this.state.firstName: this.state.userdata.firstName,
                    lastName: this.state.lastName?this.state.lastName : this.state.userdata.lastName,
                    school: this.state.school?this.state.school : this.state.userdata.school,
                    email: this.state.email?this.state.email:this.state.userdata.email,
                    phone: this.state.phone?this.state.phone:this.state.userdata.phone,
                    bio: this.state.bio?this.state.bio:this.state.userdata.bio}
        updateUser(body);
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
            <Form.Item label="School" {...formItemLayout}>
            <Input name = "school" placeholder="input your school" onChange={this.handleInputChange}/>
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

class SettingAccountForm extends BaseReactComponent{
    filterState({ userdata }) {
        console.log("UserView is calling filter")
        return { userdata };
    }

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
        const { userdata } = this.state
        if (this.state.newName){
            const body =  {user: userdata.username, newName: this.state.newName}
            log(body)
            changeName(body)
        }
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
        
                const { userdata } = this.state
                const body = {user: userdata.username, newPassWord: values.password}
                log(body)
                changePassword(body)
                
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
class ProfileDisplay extends BaseReactComponent{
    filterState({ userdata }) {
        console.log("UserView is calling filter")
        return { userdata };
    }

    render(){
        return(
            <Descriptions title="User Info" layout="vertical">
                <Descriptions.Item id ='profile-username'label="User Name">{this.state.userdata.username}</Descriptions.Item>
                <Descriptions.Item id ='profile-firstname' label="First Name">{this.state.userdata.firstName}</Descriptions.Item>
                <Descriptions.Item id ='profile-firstname' label="Last Name">{this.state.userdata.lastName}</Descriptions.Item>
                <Descriptions.Item label="School">{this.state.userdata.school}</Descriptions.Item>
                <Descriptions.Item label="Email">{this.state.userdata.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number:">{this.state.userdata.phone}</Descriptions.Item>
                <Descriptions.Item id ='profilebio' label="Bio">{this.state.userdata.bio}</Descriptions.Item>
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
    }
  ];

class ProjectList extends BaseReactComponent{

    filterState({ userdata }) {
        console.log("UserView is calling filter")
        return { userdata };
    }

    state = {
        redirect: false,
        projectAddr: null, 
        visible: false   
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
    handleDelete(item, userdata){
        //replace it with a server call    
        deleteProject(item._id)
        this.props.rerenderParentCallback();
    }
    showEdit = () =>{
		this.setState({visible: true})    
    }
    cancelEdit = () => {
		this.setState({visible: false})    
    }
    handleEdit(item){
    	this.setState({editId: item._id})
		this.showEdit()    
    }
    submitProjInfo = () =>{
    
    }
    
    
      render(){
          const { userdata } = this.state
          log('State in ProjectList')
          log(userdata)
          const items = userdata.projects.map((item) => 
          <div key= {item._id}>    
            <List.Item >                        
                <Card style={{width: '50%'}} 
                actions={[
                    // <Link to={'/projectView'}> 
                        <Icon type="select" key= "detail" onClick={() => this.toPath(item)} />,
                    // </Link>, 
                    <Icon type="edit" key="edit" onClick={() => this.handleEdit(item)}/>,
                    <Icon type="delete" key="delete" onClick={() => this.handleDelete(item, userdata)}/>,
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
            <Modal 
                    visible={this.state.visible}
                    title="Edit your project"
                    okText="Submit"
                    onCancel={this.cancelEdit}
                    onOk={this.submitProjInfo}>
                    <UploadProjectPicture url={"/upload/projimg/" + this.state.editId +"/image1"}/>
                    <UploadProjectPicture url={"/upload/projimg/" + this.state.editId +"/image2"}/>
                    <UploadProjectPicture url={"/upload/projimg/" + this.state.editId +"/image3"}/>
                    {/* <Form layout="vertical">
                        <Form.Item label="Username">
                            <Input name = "newName" placeholder="new username" onChange={this.handleInputChange}/>
                        </Form.Item>
                    </Form>                     */}
            </Modal>   
            <QueueAnim type={["bottom", "right"]}>
                {userdata.projects.length? items:empty} 
                                
            </QueueAnim>
        </div>
          )
      }
  }

class UserView extends BaseReactComponent{
    
    filterState({ userdata }) {
        console.log("UserView is calling filter")
        return { userdata };
    }


    constructor(props) {
        super(props);
        this.state =  {     
            key: "project" 
        } 
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    }
    componentDidMount() {
        readUser()
    }

    rerenderParentCallback() {
        log("rerendered!");
        this.forceUpdate();
    }

   
    onTabChange = (key, type) => {
        console.log(key, type);
        this.render();
        this.setState({ [type]: key });
    };

    render(){
        const { userdata } = this.state
        log("State in UserView")
        log( userdata.username)
        const contentListNoTitle = {
            project: <ProjectList key="projlst" rerenderParentCallback={this.rerenderParentCallback} userdata={userdata} history={this.props.history}/>,      
            profile: userinfo,
            settings: settingContent
          };
        return(
            <Layout>                
                <Content style={{background: '#fff'}}>
                    <Card style = {{margin: '50px', float: "left"}} bordered={false}>                       
                        <Avatar size ={400} shape="square" src={userdata.profileImage}/>
                        <br/>                       
                        <p><font size="6">{userdata.username}</font></p>
                        <p><font size="4">{userdata.bio}</font></p>
                    </Card>

                    <Card
                        style={{top: '50px',width: "70%", height: "80%", float:"left" }}
                        tabList={tabList}
                        activeTabKey={this.state.key}
                        tabBarExtraContent={<a href="">More</a>}
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