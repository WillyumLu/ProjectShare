import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
/*the main page*/
import Home from './Home'
import Navigation from './navigation';
import './style.css';
import LoginBox from './login'
import UserView from './UserView'
import AdminView from './AdminView'
import SignUpBox from './SignUp'

localStorage.setItem('loggedIn', "false")


/* main app component*/
class App extends React.Component {
	render() {
		console.log("app page")
		return(
			<div>
				<BrowserRouter>
					<Navigation title="Navigation"/>
				    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
		            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
						<Route exact path='/' component={localStorage.getItem('loggedIn') === "true" ? Home : LoginBox}/>
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