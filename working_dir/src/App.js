import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
/*the main page*/
import Home from './Home'
<<<<<<< HEAD
import Nevigation from './nevigation';
import './style.css';
=======
import LoginBox from './login'

>>>>>>> 5b1eeb6bd1d046d1241668fceebf25b57ad3f740

/* main app component*/
class App extends React.Component {
	render() {
		console.log("app page")
		return(
			<div>
				<Nevigation title="Nevigation"/>

				<BrowserRouter>
				    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
		            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
		            <Route exact path='/' component={Home}/>
		            <Route exact path='/login' component={LoginBox}/>
	          	  </Switch>
	        	</BrowserRouter>
			</div>
		)
	}

}

export default App;  /* export the App component from this module.*/