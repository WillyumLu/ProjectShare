import { readUser } from "./user";

import { setState, setEmptyState } from "./helpers";

import { getState } from "statezero";
import { set } from "mongoose";

const log = console.log

export const updateProjectList = () => {
    const url = "/allProjects";
    log("updating all projects...")
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            log("ALL the projects")
            log(json.projects)
            setState("projectList", json.projects);
        })
        .catch(error => {
            console.log(error);
        });
};

export const addProject = (projectStruct) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/addProject", {
        method: "post",
        body: JSON.stringify(projectStruct),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("add project requesting")
    log(JSON.stringify(projectStruct))
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                log(res.json);
                updateProjectList()
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });
};


export const deleteProject = (projectID) => {
    // Create our request constructor with all the parameters we need
    console.log("sending delete request via action")
    const request = new Request(`/deleteProject/${projectID}`, {
        method: "delete"
    });
        // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
             // this is saved in local storage for now, need to use session and cookie
                updateProjectList()
                readUser()
                log(res.json);
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });

}
export const search = (projectID) => {
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
        }).then(json => {
            console.log("json.project:"+json.project)
            if (json.project !== undefined) {
                console.log("setting projectList state")
                setState("projectList", json.project);
                console.log("searched projectList set")

            }
        })
        .catch(error => {
            console.log("set state")
            setState('erorrMessage', true)
            setState("projectList", []);
            console.log("searched projectList set empty")
            console.log(JSON.stringify(getState('errorMessage')))
            log("error")
            console.log(error);
        });
};

export const addJoinRequest = (title) => {
    // Create our request constructor with all the parameters we need
    console.log(title)
    const request = new Request(`/join/${title}`, {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("created post /join request")
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            // returns the user id
            if(json.id !== undefined){
                console.log(json.id)
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateProject = (body, id) => {
    const url = "/editProject/" + id
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("updating project information")
    fetch(request)
    .then(res => {
        if (res.status === 200) {
            return res.json();        }
    })
    .then(updated => {
        log("updated project")
        log(updated)
        readUser()
    })
    .catch(error => {
        console.log(error);
    });
}
export const updateSearchKeyWord = field => {
    const { name, value } = field;
    setState(`searchKeyWord.title`, value)
};

