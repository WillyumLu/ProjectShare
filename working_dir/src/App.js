import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
/*the main page*/
import Home from './Home'
import Nevigation from './nevigation';
import './style.css';

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
	          	  </Switch>
	        	</BrowserRouter>
			</div>
		)
	}

}

export default App;  /* export the App component from this module.*/