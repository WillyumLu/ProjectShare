import React from 'react';
import { Menu, Icon, Input, Typography} from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
const { Title } = Typography;
const { Search } = Input;
class Navigation extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  sendData = (value) => {
    this.props.sendSearched(value)
  }

  viewProfile = () => {
    if(localStorage['loggedIn'] === 'true'){
      this.props.history.push("/user");
    }
  }

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"  style={{'marginTop': 8, 'marginBottom': 8}}>
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
        <Menu.Item key="LOGIN" id="floatRight">
          <Link to={'/login'}>
            LOGIN      
					</Link>
        </Menu.Item>
        <Menu.Item key="SIGNUP" id="floatRight">
        <Link to={'/signup'}>
            SIGNUP      
          </Link>
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
      </Menu>
    );
  }
}
export default withRouter(Navigation);
