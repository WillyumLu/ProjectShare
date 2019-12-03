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
            if (json.currentUser !== undefined) {
                setState("currentUser", json.currentUser);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateSearchKeyWord = field => {
    const { name, value } = field;
    setState(`searchKeyWord.title`, value)
};

export const search = (username, password) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/findFuzzyTitle", {
        method: "POST",
        body: JSON.stringify(getState("searchKeyWord")),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("Searching for: "+ getState("searchKeyWord"))
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
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

// export const createAccount = () => {
//     setState("loginPath", false)
// }

// export const alreadyHaveAccount = () => {
//     setState("loginPath", true)
// }

// export const signup = (username, password) => {
//     // Create our request constructor with all the parameters we need
//     const request = new Request("/signup", {
//         method: "post",
//         body: JSON.stringify(getState("loginForm")),
//         headers: {
//             Accept: "application/json, text/plain, */*",
//             "Content-Type": "application/json"
//         }
//     });
//     log("created post /signup request")
//     // Send the request with fetch()
//     fetch(request)
//         .then(res => {
//             if (res.status === 200) {
//                 console.log("status === 200")
//                 return res.json();
//             }
//         })
//         .then(json => {
//             console.log(json.currentUser)
//             if (json.currentUser !== undefined) {
//                 console.log("setting state")
//                 setState("currentUser", json.currentUser);
//                 console.log("state set")
//             }
//         })
//         .catch(error => {
//             log("error")
//             console.log(error);
//         });
// };

// export const logout = () => {
//     const url =  "/SearchResult";

//     fetch(url)
//         .then(res => {
//             setEmptyState();
//         })
//         .catch(error => {
//             console.log(error);
//         });
// };
