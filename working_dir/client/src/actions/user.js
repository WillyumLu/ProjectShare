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
    const reqBody = {"username": username, "password": password};
    const request = new Request("/login", {
        method: "post",
        body: JSON.stringify(reqBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("created request")
    // Send the request with fetch()
    return fetch(request)
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
                return(json)

                // setState("currentUser", json.currentUser);
            } 
        })
        .catch(error => {
            log("error")
            console.log(error);
        });

};

export const logout = () => {
    const url = "/users/logout";

    fetch(url)
        .then(res => {
            setEmptyState();
        })
        .catch(error => {
            console.log(error);
        });
};
