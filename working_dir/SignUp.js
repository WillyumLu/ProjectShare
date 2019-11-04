import React from 'react';
import './signUp.css';

const log = console.log

//hardcoded mock user data for phase 1, should be replaced in future
const userData = [{name:"user", password: "user", type: "user"},
{name:"admin", password: "admin", type: "admin"}
]

class SignUpBox extends React.Component{
    state = {
        username: "",
        password: "",
        usernameErr: null,
        passwordErr: null,       
        
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;  
            
        // 'this' is bound to the component in this arrow function.
        this.setState({
          [name]: value  // [name] sets the object property name to the value of the 'name' variable.
        })
    
      }


    
    cleanErr(){
        this.setState({
            usernameErr: null,
            passwordErr: null
        })
    }
    //signup functionality
    //should be changed in the next phase
    submitSignUp(e) {
        this.cleanErr();
        log(this.state);

        for (let i = 0; i < userData.length; i++){
            //prompt user to sign in again
            if (userData[i].name === this.state.username){
                log('passwordErr')
                    this.setState({passwordErr: "This user already exists"});
                    return;
            }
            if(this.state.password === '')
            {
                this.setState({passwordErr: "Please enter a password"})
            }
            //guest can only sign up once they have entered a non existing username, and some password
            else if (userData[i].name !== this.state.username && this.state.password !== ''){
                    //username is new
                    localStorage.setItem('loggedIn', true)
                    log('successful sign up')
                    this.props.history.push("/")
                    return;
            }     
        }          
    }
    render(){
        return(
            <div className="box-container">
                <div className= "inner-container">
                    <div className="header">
                        Sign Up
                    </div>

                    <div className="box">
                        <div className="input-group">
                            <label htmlFor="username" className="signup-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="signup-input"
                                onChange={this.handleInputChange}
                                placeholder="Username"/>
                             <small className="signup-err">{
                                this.state.usernameErr? this.state.usernameErr:""
                            }</small>                            
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="signup-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="signup-input"
                                onChange={this.handleInputChange}
                                placeholder="Password"/> 
                            <small className="signup-err">
                            {this.state.passwordErr? this.state.passwordErr:""}
                            </small>                           
                        </div>
                        

                        <button
                            type="button"
                            className="signup-btn"
                            onClick={this
                                .submitSignUp
                                .bind(this) }                     
                        >
                            Sign Up
                        </button>        
                    </div>            
                </div>
            </div>

        )
    }
}
export default SignUpBox;