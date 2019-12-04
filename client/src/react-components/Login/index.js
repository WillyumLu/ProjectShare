import React from 'react';

// Importing actions/required methods
import { updateLoginForm, login, createAccount } from "../../actions/user";
import BaseReactComponent from "../BaseReactComponent"
import ErrorMessage from "../ErrorMessage"
import './Login.css';

const log = console.log

class LoginBox extends BaseReactComponent{

    filterState({ errorMessage }) {
        console.log("LoginBox is calling filter")
        return { errorMessage };
    }

    render(){
        console.log("rendering login")
        const { errorMessage } = this.state
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
                <small className = "login-err">
                        {
                            errorMessage ?  <ErrorMessage/> : ""
                        }
                </small>
                <div className="signUpOption">
                    <div className="OptionHeader"> 
                        Don't have an account?
                    </div>
                    <button
                        type="button"
                        className="signup-btn"
                        onClick={createAccount}                     
                    >
                        Create Account
                    </button> 
                </div>
            </div>
        )
    }
}
export default LoginBox;