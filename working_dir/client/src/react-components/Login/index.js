import React from 'react';

// Importing actions/required methods
import { updateLoginForm, login } from "../../actions/user";

import './Login.css';

const log = console.log

class LoginBox extends React.Component{
    render(){
        return(
            <div className="box-container">
                <div className= "inner-container">
                    <div className="header">
                        Login
                    </div>

                    <div classNme="box">
                        <div className="input-group">
                            <label htmlFor="username" className="login-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="login-input"
                                placeholder="Username"
                                onChange={e => updateLoginForm(e.target)}
                            />                       
                        </div>
                       

                        <div className="input-group">
                            <label htmlFor="password" className="login-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="login-input"
                                placeholder="Password"
                                onChange={e => updateLoginForm(e.target)}
                            />                      
                        </div>
                        

                        <button
                            type="button"
                            className="login-btn"
                            onClick={login}                     
                        >
                            Login
                        </button>        
                    </div>            
                </div>
            </div>

        )
    }
}
export default LoginBox;