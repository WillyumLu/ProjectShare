import React from 'react';
import './login.css';
import { login }  from './actions/user'

const log = console.log

//hardcoded mock user data for phase 1, should be replaced in future
const userData = [{name:"user", password: "user", type: "user"},
{name:"admin", password: "admin", type: "admin"}
]

class LoginBox extends React.Component{
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
    //login functionality
    //should be changed in the next phase
    submitLogin(e) {
        this.cleanErr();

        const reqBody = {"username": this.state.username, "password": this.state.password};
        const request = new Request("/login", {
            method: "post",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
        log(this.state);
        console.log("created request")
        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    // this is saved in local storage for now, need to use session and cookie
                    localStorage.setItem('loggedIn', "true")
                    log("res.status === 200")
                    log(res.json);
                    return res.json();
                }
            })
            .then(json => {
                if (localStorage.getItem('loggedIn') === "true") {
                    console.log("found user should log in")
                    console.log(json)
                    if (json.type === "admin"){
                        this.props.history.push("/admin");
                    } else {
                        this.props.history.push("/user");
                    }

                    // setState("currentUser", json.currentUser);
                } else {
                    this.setState({usernameErr: "Wrong username or password"});
                }
            })
            .then( () => {
                const loggedin =localStorage.getItem('loggedIn');
            })
            .catch(error => {
                log("error")
                console.log(error);
            });


        // for (let i = 0; i < userData.length; i++){
        //     if (userData[i].name === this.state.username){
        //         if (userData[i].password === this.state.password){
        //         //redirect to the user profile page

        //         log("login successful");
        //         localStorage.setItem('loggedIn', true)
        //         if (userData[i].type === "user"){this.props.history.push("/user");}

        //         else {this.props.history.push("/admin");}
        //         }
        //         else{
        //             //username and password not match
        //             log('passwordErr')
        //             this.setState({passwordErr: "Your username and password don't match"});
        //             return;
        //         }
        //     }            

        // } 
        
        //user does not exist
                  
    }
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
                                onChange={this.handleInputChange}
                                placeholder="Username"/>
                             <small className="login-err">{
                                this.state.usernameErr? this.state.usernameErr:""
                            }</small>                            
                        </div>
                       

                        <div className="input-group">
                            <label htmlFor="password" className="login-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleInputChange}
                                className="login-input"
                                placeholder="Password"/> 
                            <small className="login-err">
                            {this.state.passwordErr? this.state.passwordErr:""}
                            </small>                           
                        </div>
                        

                        <button
                            type="button"
                            className="login-btn"
                            onClick={this
                                .submitLogin
                                .bind(this) }                     
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