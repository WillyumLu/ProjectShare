import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
/*the main page*/
import BaseReactComponent from './react-components/BaseReactComponent'
import Home from './react-components/Home'
import Navigation from './react-components/navigation';
import LoginBox from './react-components/Login'
import UserView from './react-components/UserView'
import AdminView from './react-components/AdminView'
import SignUpBox from './react-components/SignUp'

import './style.css';

/* main app component*/
class App extends BaseReactComponent {

	filterState({ currentUser }) {
        return { currentUser };
    }

	render() {
		console.log("app page")
		const { currentUser } = this.state;
		return(
			<div>
				<BrowserRouter>
					<Navigation title="Navigation"/>
				    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
		            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
						<Route exact path='/' component={currentUser ? Home : LoginBox}/>
						<Route exact path='/login' component={LoginBox}/>
						<Route exact path='/user' component={UserView}/>
						<Route exact path='/admin' component={AdminView}/>
						<Route exact path='/projectView' component={Home}/>
						<Route exact path='/signup' component={SignUpBox}/>
						</Switch>
	        	</BrowserRouter>
			</div>
		)
	}
}

export default App;  /* export the App component from this module.*/