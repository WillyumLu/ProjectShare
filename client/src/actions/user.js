import { setState, setEmptyState } from "./helpers";
// getState is used to get the value of a state path
import { getState } from "statezero";
import { set } from "mongoose";
const log = console.log
export const readCookie = () => {
    const url = "/users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if(json.type === "admin"){
                setState("userIsAdmin", true);
            }
            if (json.currentUser !== undefined) {
                setState("currentUser", json.currentUser);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateLoginForm = field => {
    const { name, value } = field;
    setState(`loginForm.${name}`, value)
};

export const login = (username, password) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/login", {
        method: "post",
        body: JSON.stringify(getState("loginForm")),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("created post /login request")
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                setState("errorMessage", null)
                return res.json();
            }
            console.log("set state")
            setState("errorMessage", "true")
            console.log(JSON.stringify(getState("errorMessage")))
        })
        .then(json => {
            // if the returned type is admin, indicating that the user is an admin
            if(json.type !== undefined){
                if(json.type === "admin")
                {
                    setState("userIsAdmin", true);
                }
            }
            if (json.currentUser !== undefined) {
                setState("currentUser", json.currentUser);
            }
        })
        .catch(error => {
            log("error")
            console.log(error);
        });
};

export const createAccount = () => {
    setState("loginPath", false)
}

export const alreadyHaveAccount = () => {
    setState("loginPath", true)
}

export const signup = (username, password) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/signup", {
        method: "post",
        body: JSON.stringify(getState("loginForm")),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("created post /signup request")
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("status === 200")
                return res.json();
            }
        })
        .then(json => {
            console.log(json.currentUser)
            if (json.currentUser !== undefined) {
                console.log("setting state")
                // even though we have signed up, we don't have a user until we
                // get a profile picture, email, etc
                // in order to have a userview set up for the user
                //setState("currentUser", json.currentUser);
                setState("currentUser", json.currentUser)
                console.log("state set")
            }
        })
        .catch(error => {
            log("error")
            console.log(error);
        });
};


export const getCurrentUsersName = () => {
    const userName = getState("currentUser")
    return userName
}

export const getAllUsers = () => {
    const url = "/users";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            setState("userList", json.user)
        })
        .catch(error => {
            console.log(error);
        });
}

export const logout = () => {
    setState("currentUser", null)

    const url =  "/logout";

    fetch(url)
        .then(res => {
            setEmptyState();
            window.location.replace("/")
        })
        .catch(error => {
            console.log(error);
        });
};

export const deleteUser = (userID) => {
    // Create our request constructor with all the parameters we need
    console.log("sending delete user request via action")
    const request = new Request(`/deleteUser/${userID}`, {
        method: "delete"
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // this is saved in local storage for now, need to use session and cookie
                getAllUsers()
                log(res.json);
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });
};

export const readUser = () => {
    const url = "/api/user"
    fetch(url).then(res => {
            if (res.status === 200) {
                return res.json();
            }
    }).then(user => {
        log(user)
        const projectURL = "/allProjects/" + user._id
        fetch(projectURL).then(res => {
            log("Getting project information")
            if (res.status === 200){
                return res.json()
            }
        }).then(resJson => {
            log(resJson.projects)
            user.projects = resJson.projects
            log(user)
            setState("userdata", user)
        })
    }).catch(error => {
        console.log(error);
    });
}

export const updateUser = (content) => {
    console.log(content)
    const url = "/api/user"
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(content),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("update userprofile requesting")
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                log(res.json);
                readUser()
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });
};


export const changeName = (body) => {
    log("Update username")
    const url = "/api/user/username"
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request).then(res => {
        if (res.status === 200) {
            log(res.json);
            alert("Update successful!")
            logout()
        }
        else if (res.status === 400){
            alert("Username already exist!")
        }
    }).catch(error => {
        log("error")
        log(error);
    });
}

export const changePassword = (body) => {
    log("Update password")
    const url = "/api/user/password"
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request).then(res => {
        if (res.status === 200) {
            log(res.json);
            alert("Update successful!")
            logout()
        }
        else if (res.status === 400){
            alert("Cannot update password, please try agin later")
        }
    }).catch(error => {
        log("error")
        log(error);
    });
}