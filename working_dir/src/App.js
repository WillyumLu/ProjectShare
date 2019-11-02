import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
/*the main page*/
import Home from './Home'
import Nevigation from './nevigation';
import './style.css';
import LoginBox from './login'
import UserView from './UserView'


/* main app component*/
class App extends React.Component {
	render() {
		console.log("app page")
		return(
			<div>
				<BrowserRouter>
					<Nevigation title="Nevigation"/>
				    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
		            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
		            <Route exact path='/' component={Home}/>
		            <Route exact path='/login' component={LoginBox}/>
					<Route exact path='/user' component={UserView}/>
	          	  </Switch>
	        	</BrowserRouter>
			</div>
		)
	}

}

export default App;  /* export the App component from this module.*/