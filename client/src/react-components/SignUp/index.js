import React from 'react';

// Importing actions/required methods
import {updateLoginForm, signup, alreadyHaveAccount} from "../../actions/user";

import './SignUp.css';

const log = console.log


class SignUpBox extends React.Component{

    render(){
        return(
            <div className="box-container">
                <div className= "inner-container">
                    <div className="header">
                        Sign Up
                    </div>

                    <div classNme="box">
                        <div className="input-group">
                            <label htmlFor="username" className="signup-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="signup-input"
                                onChange={e => updateLoginForm(e.target)}
                                placeholder="Username"/>                     
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="signup-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="signup-input"
                                onChange={e => updateLoginForm(e.target)}
                                placeholder="Password"/>                           
                        </div>
                        

                        <button
                            type="button"
                            className="signup-btn"
                            onClick={signup}                     
                        >
                            Sign Up
                        </button>        
                    </div>            
                </div>
                <div className="loginOption">
                    <div className="OptionHeader"> 
                        Already have an account?
                    </div>
                    <button
                        type="button"
                        className="login-btn"
                        onClick={alreadyHaveAccount}                     
                    >
                        Switch to Login
                    </button> 
                </div>
            </div>

        )
    }
}
export default SignUpBox;