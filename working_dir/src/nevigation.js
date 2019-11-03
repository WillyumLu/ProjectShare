import React from 'react';
import { Menu, /**Icon, **/ Input } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';

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

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"  style={{'marginTop': 10}}>
        <Menu.Item key="logo">
        	LOGO
        </Menu.Item>
        <Menu.Item key="LOGIN" id="floatRight">
          <Link to={'/login'}>
            LOGIN      
					</Link>
        </Menu.Item>
        <Menu.Item key="search" >
				<Search
			      placeholder="project you wanna search"
			      enterButton="Search"
			      style={{'verticalAlign': 'middle'}}
			      onSearch={

              value => {
                console.log(value)
              }

            }
			    />

        </Menu.Item>
        <Menu.Item key="SIGNUP" id="floatRight">
        SIGNUP
        </Menu.Item>
      </Menu>
    );
  }
}
export default Navigation;
