import React from 'react';
import { Menu, Icon, Input, Typography} from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import {logout} from "../../actions/user";
import BaseReactComponent from '../BaseReactComponent'


const { Title } = Typography;
const { Search } = Input;
class Navigation extends BaseReactComponent {

  filterState({ userIsAdmin }) {
    console.log("Navigation Bar is calling filter")
        return { userIsAdmin };
  }

  state = {
    current: 'mail',
  };

  viewProfile = () => {
    this.props.history.push("/userView");
  }

  viewEditPage = () => {
    this.props.history.push("/edit")
  }

  render() {
    console.log("rendering navigation")
    const { userIsAdmin } = this.state
    return (
      <Menu selectedKeys={[this.state.current]} mode="horizontal"  style={{'marginTop': 8, 'marginBottom': 8}}>
        <Menu.Item key="logo">
          <Link to={'/'}>
            <Icon type="home" style={{'font-size': 25}}/>
          </Link>
        </Menu.Item>
        <Menu.Item key="name">
          <Link to={'/'}>
            <Title level={3}>Project Share</Title>      
          </Link>
        </Menu.Item>
        <Menu.Item key="LOGOUT" id="floatRight" onClick={logout}>
            LOGOUT    
        </Menu.Item>
        <Menu.Item key="search" id="floatRight">
				  <Search
			      placeholder="search for project"
			      enterButton="Search"
			      style={{'verticalAlign': 'middle'}}
			      onSearch={

              value => {
                console.log(value)
              }

            }
			    />
        </Menu.Item>
        <Menu.Item onClick = {this.viewProfile} key="VIEW PROFILE" id="floatRight">
            VIEW PROFILE      
        </Menu.Item>
        <Menu.Item onClick = {this.viewEditPage} key="DELETE PROJECTS/USERS" id="floatRight">
        {
           userIsAdmin ? "DELETE PROJECTS/USERS" : ""
        }
        </Menu.Item>
      </Menu>
    );
  }
}
export default withRouter(Navigation);
