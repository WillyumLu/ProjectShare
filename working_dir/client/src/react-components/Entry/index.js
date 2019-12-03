import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
/*the main page*/
import BaseReactComponent from '../BaseReactComponent'
import SignUpBox from '../SignUp'
import LoginBox from '../Login'

class Entry extends BaseReactComponent {

	filterState({ loginPath }) {
        return { loginPath };
    }

	render() {
		console.log("entry path")
		console.log({ loginPath })
		const { loginPath } = this.state;
		return(
			<div>
				<BrowserRouter>
				    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
		            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
						<Route exact path="/" component={loginPath === true ? LoginBox : SignUpBox}/>
					</Switch>
	        	</BrowserRouter>
			</div>
		)
	}
}

export default Entry;  