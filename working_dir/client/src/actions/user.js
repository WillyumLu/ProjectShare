import { setState, setEmptyState } from "./helpers";
// getState is used to get the value of a state path
import { getState } from "statezero";
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
    setState(`loginForm.${name}`, value);
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
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                setState("currentUser", json.currentUser);
            }
        })
        .catch(error => {
            console.log("set state")
            setState('erorrMessage', true)
            console.log(JSON.stringify(getState('errorMessage')))
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
                setState("currentUser", json.currentUser);
                console.log("state set")
            }
        })
        .catch(error => {
            log("error")
            console.log(error);
        });
};

export const logout = () => {
    setState("currentUser", null)

    const url =  "/logout";

    fetch(url)
        .then(res => {
            setEmptyState();
        })
        .catch(error => {
            console.log(error);
        });
};
