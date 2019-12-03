import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
/*the main page*/
import BaseReactComponent from './react-components/BaseReactComponent'
import Home from './react-components/Home'
import Navigation from './react-components/navigation';
import UserView from './react-components/UserView'
import AdminView from './react-components/AdminView'
import Entry from './react-components/Entry'

import { readCookie } from "./actions/user";

import './style.css';
import ProjectView from './react-components/ProjectView';

/* main app component*/

class App extends BaseReactComponent {

	filterState({ currentUser }) {
		console.log("App is calling filter")
        return { currentUser };
    }

    constructor(props) {
        super(props);
        readCookie();
    }

	render() {
		console.log("app page")
		const { currentUser } = this.state;
		return(
			<div>
				<BrowserRouter>
				    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
		            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
						<Route exact path='/' component={currentUser ? Home : Entry}/>
						<Route exact path='/user' component={UserView}/>
						<Route exact path='/admin' component={AdminView}/>
						<Route exact path='/projectView' component={ProjectView}/>
						</Switch>
	        	</BrowserRouter>
			</div>
		)
	}
}

export default App;  /* export the App component from this module.*/
